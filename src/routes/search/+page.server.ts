import type { Page } from '$lib/types/Page';
import type { PageServerLoad } from './$types';
import { languages } from '$lib/languages';

export const load: PageServerLoad = async ({ url }: { url: URL }) => {
	const language = url.searchParams.get('lang') ?? 'en';
	const output = decodeURIComponent(url.searchParams.get('output') ?? '');
	const words = output.split(' ');
	const pages: Page[] = [];
	const languageName = languages.find((lang) => lang.code === language)?.name;
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

	return { output: output, pages: pages };
};
