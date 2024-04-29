import type { PageServerLoad } from './$types';
import translate from 'translate';

export const load: PageServerLoad = async ({ params }) => {
	const translation = await translate(params.slug, { from: 'fr', to: 'fa' });
	const words = translation.split(' ');
	const pages: string[] = [];

	for (const word of words) {
		const regex = /id="Persian">([\s\S]*?)<h2>/g;
		// const res = await fetch(`https://en.wiktionary.org/wiki/${word}`);
		// const rawPage = await res.text();

		// if (!rawPage.includes('Wiktionary does not yet have an entry')) {
		// 	const match = regex.exec(rawPage);
		// 	if (match) pages.push('<h2><span>' + match[1]);
		// } else {
		// 	const retryRes = await fetch(`https://en.wiktionary.org/wiki/${word.slice(0, -1)}`);
		// 	const retryRawPage = await retryRes.text();
		// 	if (!retryRawPage.includes('Wiktionary does not yet have an entry')) {
		// 		const retryMatch = regex.exec(retryRawPage);
		// 		if (retryMatch) pages.push('<h2><span>' + retryMatch[1]);
		// 	}
		// }

		for (let i = 0; i > 3; i--) {
			const res = await fetch(`https://en.wiktionary.org/wiki/${word.slice(0, i)}`);
			const rawPage = await res.text();

			if (!rawPage.includes('Wiktionary does not yet have an entry')) continue;
			const match = regex.exec(rawPage);
			if (match) pages.push('<h2><span>' + match[1]);
		}
	}

	return { translation: translation, pages: pages };
};
