import type { Page } from '$lib/types/Page';
import type { Word } from '$lib/types/Word';
import type { HistoryResearch } from '$lib/types/HistoryResearch';

export function extractWordData(page: Page): Word {
	const parser = new DOMParser();
	const document = parser.parseFromString(page.content, 'text/html');
	const sectionTitle = document.getElementById('Persian')?.parentElement;
	let definitionsFound = false;
	const word: Word = { match: page.matchedWord, pronunciations: [], definitions: [] };

	let nextElement = sectionTitle?.nextElementSibling;
	while (nextElement) {
		if (nextElement.tagName === 'P' &&
			nextElement.firstElementChild?.classList.contains('headword-line') &&
			word.pronunciations.length === 0
		) {
			const headwordLine = nextElement.firstElementChild;
			for (const child of headwordLine?.children) {
				if (child.classList.contains('headword-tr')) {
					word.pronunciations.push(child.textContent || '');
				}
			}
		}

		if (nextElement.tagName === 'OL') {
			const listItems = nextElement.getElementsByTagName('LI');
			for (const item of listItems) {
				for (const child of item.children) {
					if (child.tagName !== 'DL' && !definitionsFound) {
						word.definitions.push(child.textContent || '');
					}
					definitionsFound = true;
				}
			}
		}

		if (!nextElement.classList.contains('mw-heading') || !nextElement.classList.contains('mw-heading2')) {
			nextElement = nextElement.nextElementSibling;
		} else {
			break;
		}
	}
	return word;
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
	const cardDivs = target.closest('div.bg-primary-bis')?.querySelectorAll('div');
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
	return favourites ? JSON.parse(favourites).reverse() : [];
}

export function wordIsInFavourites(word: Word): boolean {
	const favourites = getFavourites();
	return favourites.some((fav: Word) => fav.match === word.match);
}

export function isOverflowing(element: HTMLDivElement): boolean {
	return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
}

export function displayToast(message: string) {
	const existingToasts = document.querySelectorAll('.toast');
	existingToasts.forEach(toast => toast.remove());

	const toast = document.createElement('div');
	toast.textContent = message;
	toast.className = 'toast fixed bottom-4 left-1/2 text-center transform -translate-x-1/2 bg-primary-bis text-white py-2 px-4 rounded transition-opacity duration-500 w-full max-w-xs';
	document.body.appendChild(toast);

	setTimeout(() => {
		toast.classList.add('opacity-0');
		setTimeout(() => {
			toast.remove();
		}, 500);
	}, 3000);
}