import type { Page } from '$lib/types/Page';
import type { Word } from '$lib/types/Word';
import type { HistoryResearch } from '$lib/types/HistoryResearch';

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

export function addTranslationToHistory(input: string, translation: string) {
	const history = getTranslationHistory();
	if (!history.some((research: HistoryResearch) => research.input === input)) {
		if (history.length >= 50) {
			history.shift();
		}
		history.push({ input, translation });
		localStorage.setItem('translationHistory', JSON.stringify(history));
	}
}

export function getTranslationHistory(): HistoryResearch[] {
	const history = localStorage.getItem('translationHistory');
	return history ? JSON.parse(history).reverse() : [];
}

export function extendCard(event: MouseEvent) {
	const target = event.target as HTMLElement;
	const cardP = target.closest('button')?.querySelectorAll('p');
	cardP?.forEach(p => p.classList.toggle('whitespace-nowrap'));
}
