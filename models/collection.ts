import { Raindrop } from "./raindrop";
export interface Collection {
	collectionId: string;
	count: number;
	items:Raindrop[];
}