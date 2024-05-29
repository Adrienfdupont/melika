import type { extractedData } from './extractedData';

export interface WordData {
	targetWord: string;
	matchedWord: string | null;
	page: string | null;
	extractedData: extractedData;
}
