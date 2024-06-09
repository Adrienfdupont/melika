import type { Page } from '$lib/types/page';
import type { PageServerLoad } from './$types';
import translate from 'translate';

export const load: PageServerLoad = async ({ params }) => {
	const translation = await translate(params.slug, { from: 'en', to: 'fa' });
	const words = translation.split(' ');
	const pages: Page[] = [];
	const regex = /id="Persian">([\s\S]*?)<h2>/;

	for (const word of words) {
		for (let i = 0; i < 3; i++) {
			const pattern = word.slice(0, word.length - i);
			const res = await fetch(`https://en.wiktionary.org/wiki/${pattern}`);
			const rawPage = await res.text();

			if (res.status === 200) {
				const match = regex.exec(rawPage);
				if (match) {
					const page: Page = {
						targetWord: word,
						matchedWord: pattern,
						content: match[1]
					};
					pages.push(page);
				}
				break;
			}
		}
	}

	return { input: params.slug, translation: translation, pages: pages };
};
