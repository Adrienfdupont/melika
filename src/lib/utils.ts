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
	const index = history.findIndex((research: HistoryResearch) => research.input === input);
	if (index !== -1) {
		history.splice(index, 1);
	}
	if (history.length >= 50) {
		history.shift();
	}
	history.push({ input, translation });
	localStorage.setItem('translationHistory', JSON.stringify(history));

}

export function getTranslationHistory(): HistoryResearch[] {
	const history = localStorage.getItem('translationHistory');
	return history ? JSON.parse(history).reverse() : [];
}

export function extendCard(event: MouseEvent) {
	const target = event.target as HTMLElement;
	const cardDivs = target.closest('div.bg-primary')?.querySelectorAll('div');
	cardDivs?.forEach(p => p.classList.toggle('whitespace-nowrap'));
}

export function addWordToFavourites(word: Word) {
	const favourites = localStorage.getItem('favourites');
	const newFavourites = favourites ? JSON.parse(favourites) : [];
	newFavourites.push(word);
	localStorage.setItem('favourites', JSON.stringify(newFavourites));
}

export function removeWordFromFavourites(word: Word) {
	const favourites = localStorage.getItem('favourites');
	const newFavourites = favourites ? JSON.parse(favourites) : [];
	const index = newFavourites.findIndex((fav: Word) => fav.match === word.match);
	newFavourites.splice(index, 1);
	localStorage.setItem('favourites', JSON.stringify(newFavourites));
}

export function getFavourites(): Word[] {
	const favourites = localStorage.getItem('favourites');
	return favourites ? JSON.parse(favourites) : [];
}

export function wordIsInFavourites(word: Word): boolean {
	const favourites = getFavourites();
	return favourites.some((fav: Word) => fav.match === word.match);
}
