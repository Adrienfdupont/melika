import type { HistoryResearch } from '$lib/types/HistoryResearch';
import type { Word } from './types/Word';

export function getTranslationHistory(): HistoryResearch[] {
	const history = localStorage.getItem('translationHistory');
	return history ? JSON.parse(history) : [];
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

export function displayToast(message: string) {
	const existingToasts = document.querySelectorAll('.toast');
	existingToasts.forEach((toast) => toast.remove());

	const toast = document.createElement('div');
	toast.textContent = message;
	toast.className =
		'toast fixed bottom-4 left-1/2 text-center transform -translate-x-1/2 bg-primary-bis text-white py-2 px-4 rounded transition-opacity duration-500 w-full max-w-xs';
	document.body.appendChild(toast);

	setTimeout(() => {
		toast.classList.add('opacity-0');
		setTimeout(() => {
			toast.remove();
		}, 500);
	}, 3000);
}
