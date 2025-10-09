import type { HistoryResearch } from '$lib/types/HistoryResearch';
import type { Word } from './types/Word';

export function getTranslationHistory(): HistoryResearch[] {
	const history = localStorage.getItem('translationHistory');
	return history ? JSON.parse(history).reverse() : [];
}

export function extendCard(event: MouseEvent) {
	const target = event.target as HTMLElement;
	const cardDivs = target.closest('div.bg-primary-bis')?.querySelectorAll('div');
	cardDivs?.forEach((p) => p.classList.toggle('whitespace-nowrap'));
}

export function getFavourites(): Word[] {
	const favourites = localStorage.getItem('favourites');
	return favourites ? JSON.parse(favourites).reverse() : [];
}
