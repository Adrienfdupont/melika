import type { Word } from './Word';

export interface TranslationResult {
	input: string;
	translation: string;
	words: Word[];
}
