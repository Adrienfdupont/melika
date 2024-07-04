import type { Page } from '$lib/types/Page';
import type { Word } from '$lib/types/Word';

export function extractWordData(page: Page): Word {
	const htmlDOM = new DOMParser().parseFromString(page.content, 'text/html');
	const definitionItems = htmlDOM.querySelector('ol')?.querySelectorAll('li');
	const definitions: string[] = [];

	definitionItems?.forEach((item) => {
		item.childNodes.forEach((child) => {
			if (child.nodeName === 'A') {
				definitions.push(child.textContent ?? '');
			}
		});
	});

	return {
		target: page.targetWord,
		match: page.matchedWord,
		pronunciation: htmlDOM.querySelector('.headword-tr')?.textContent ?? '',
		definitions: definitions.join(', '),
	};
}

export function fadeButton(button: HTMLButtonElement) {
	if (button.classList.contains('animate-fade')) {
		button.classList.remove('animate-fade');
	}
	setTimeout(() => {
		button.classList.add('animate-fade');
	}, 10);
}

