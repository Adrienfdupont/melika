import type { Page } from '$lib/types/Page';
import type { PageServerLoad } from './$types';
import translate from 'translate';

export const load: PageServerLoad = async ({ url }: { url: URL }) => {

	const textToTranslate = decodeURIComponent(url.searchParams.get('text') ?? '');
	const translation = await translate(textToTranslate, { from: 'en', to: 'fa' });
	const words = translation.split(' ');
	const pages: Page[] = [];

	for (const word of words) {
		for (let i = 0; i < 3; i++) {
			const pattern = word.slice(0, word.length - i);
			const res = await fetch(`https://en.wiktionary.org/wiki/${pattern}`);
			const rawPage = await res.text();

			if (res.status === 200) {
				const page: Page = {
					matchedWord: pattern,
					content: rawPage
				};
				pages.push(page);
				break;
			}
		}
	}

	return { input: textToTranslate, translation: translation, pages: pages };
};
