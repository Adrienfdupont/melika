import type { WordData } from './WordData';

export interface TranslationResult {
	input: string;
	translation: string;
	wordsData: WordData[];
}
