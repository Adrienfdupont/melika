import type { Page } from '$lib/types/Page';
import type { PageServerLoad } from './$types';
import { languages } from '$lib/languages';
import translate from 'translate';

export const load: PageServerLoad = async ({ url }: { url: URL }) => {
	const sourceLanguage = url.searchParams.get('from') ?? 'en';
	const targetLanguage = url.searchParams.get('to') ?? 'fa';
	const textToTranslate = decodeURIComponent(url.searchParams.get('text') ?? '');
	const translation = await translate(textToTranslate, { from: sourceLanguage, to: targetLanguage });
	const words = translation.split(' ');
	const pages: Page[] = [];
	const languageName = languages.find((lang) => lang.code === targetLanguage)?.name;
	const regex = new RegExp(`id="${languageName}">([\\s\\S]*?)<h2>`);

	for (const word of words) {
		for (let i = 0; i < 3; i++) {
			const pattern = word.slice(0, word.length - i);
			const res = await fetch(`https://en.wiktionary.org/wiki/${pattern}`);
			const rawPage = await res.text();

			if (res.status === 200) {
				const match = regex.exec(rawPage);
				if (match) {
					const page: Page = {
						matchedWord: pattern,
						content: match[1]
					};
					pages.push(page);
				}
				break;
			}
		}
	}

	return { input: textToTranslate, translation: translation, pages: pages };
};
