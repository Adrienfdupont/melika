import type { WordData } from '$lib/types/wordData';
import type { PageServerLoad } from './$types';
import translate from 'translate';

export const load: PageServerLoad = async ({ params }) => {
	const translation = await translate(params.slug, { from: 'fr', to: 'fa' });
	const words = translation.split(' ');
	const wordsData: WordData[] = [];
	const regex = /id="Persian">([\s\S]*?)<h2>/;

	for (const word of words) {
		const wordData: WordData = {
			targetWord: word,
			matchedWord: null,
			page: null,
			extractedData: {
				pronunciation: null,
				definitions: []
			}
		};

		for (let i = 0; i < 3; i++) {
			const pattern = word.slice(0, word.length - i);
			const res = await fetch(`https://en.wiktionary.org/wiki/${pattern}`);
			const rawPage = await res.text();

			if (!rawPage.includes('Wiktionary does not yet have an entry')) {
				const match = regex.exec(rawPage);
				if (match) {
					wordData.matchedWord = pattern;
					wordData.page = match[1];
				}
				break;
			}
		}

		wordsData.push(wordData);
	}

	return { translation: translation, wordData: wordsData };
};
