import { Request, Response } from "express";
import { Collection } from "../models/collection";
export async function getRaindrops(req: Request, res: Response):Promise<void>{
	// const pageNum = req?.params?.page || 0;
	const pageNum: number = Number(req?.query?.page) || 0 ;
	const query = req.query.q || '';
	
	let queryString:string = '';
	if (query !== '') {
		queryString = `&search=${query}`;
	}
	const authToken = process.env.RAINDROP_BEARER_ACCESS_TOKEN;
	const collectionId = process.env.RAINDROP_COLLECTION_ID;

	const headers = {
		Authorization: `Bearer ${authToken}`
	}
	
	const url = process.env.RAINDROP_API_URL + `${collectionId}?sort=-created&perpage=50&page=${pageNum}${queryString}`;
	const raindrops = await fetch(url, {method: 'GET', headers});
	const data: Collection = await raindrops.json();
	return void res.status(200).json(data);
}