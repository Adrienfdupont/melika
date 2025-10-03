import jsdom from 'jsdom';
import translate from 'translate';
import { createClient, type RedisClientType } from 'redis';
import type { PageServerLoad } from './$types';
import type { TranslationResult } from '$lib/types/TranslationResult';
import type { WordData } from '$lib/types/WordData';
import { REDIS_URL } from '$env/static/private';

let redisClient: RedisClientType | null = null;

export const load: PageServerLoad = async ({ url }: { url: URL }): Promise<TranslationResult> => {
	await initRedisClient();
	const input = decodeURIComponent(url.searchParams.get('input') ?? '');
	const translation = await translate(input, { from: 'en', to: 'fa' });
	const wordsData: WordData[] = [];

	for (const word of translation.split(' ')) {
		let wordCache: string | null = null;
		if (redisClient) {
			wordCache = await redisClient.get(word);
		}
		if (wordCache) {
			wordsData.push(JSON.parse(wordCache));
		} else {
			for (let i = 0; i < 3; i++) {
				const pattern = word.slice(0, word.length - i);
				const res = await fetch(`https://en.wiktionary.org/wiki/${pattern}`);

				if (res.status === 200) {
					const rawPage = await res.text();
					const wordData = extractWordData(pattern, rawPage);
					if (redisClient) {
						await redisClient.set(word, JSON.stringify(wordData));
					}
					wordsData.push(wordData);
					break;
				}
			}
		}
	}

	return { input, translation, wordsData };
};

function extractWordData(match: string, sectionContent: string): WordData {
	const wordData: WordData = {
		word: match,
		pronunciation: '',
		definitions: [],
		lastUpdate: Date.now()
	};

	const { JSDOM } = jsdom;
	const dom = new JSDOM(sectionContent);
	const sectionTitle = dom.window.document.querySelector('#Persian')?.parentElement;
	let nextElement = sectionTitle?.nextElementSibling;

	while (nextElement) {
		if (nextElement.firstElementChild?.classList.contains('headword-line')) {
			const headwordLine = nextElement.firstElementChild;
			const headwordTr = headwordLine.querySelector('.headword-tr');
			if (headwordTr && headwordTr.textContent) {
				wordData.pronunciation = headwordTr.textContent;
			}
		}

		if (nextElement.tagName === 'OL') {
			const definitionList = Array.from(nextElement.querySelectorAll(':scope > li'));

			for (const definitionLine of definitionList) {
				const toRemove = definitionLine.querySelectorAll(
					'ul, dl, .HQToggle, .nyms-toggle, .wikt-quote-container, .nyms'
				);
				Array.from(toRemove).forEach((n: Element) => n.remove());

				if (definitionLine.textContent) {
					const definitionText = definitionLine.textContent.replace(/\s+/g, ' ').trim();
					wordData.definitions.push(definitionText);
				}
			}
		}

		if (
			!nextElement.classList.contains('mw-heading') ||
			!nextElement.classList.contains('mw-heading2')
		) {
			nextElement = nextElement.nextElementSibling;
		} else {
			break;
		}
	}
	return wordData;
}

async function initRedisClient(): Promise<RedisClientType | null> {
	if (!redisClient) {
		const connectStart = Date.now();
		try {
			redisClient = createClient({
				url: REDIS_URL,
				socket: {
					reconnectStrategy: (retries) => {
						const elapsed = Date.now() - connectStart;
						if (elapsed >= 3000) {
							return new Error('Retry time exhausted');
						}
						return Math.min(retries * 100, 1000);
					}
				}
			});

			await redisClient.connect();
		} catch (error) {
			console.error('Error while connecting to Redis:', error);
			redisClient = null;
		}
	}
	return redisClient;
}
