import mongoose from "mongoose";
import { IMyth, MythModel } from "../models/myth.js";
import { Request, response, Response } from "express";
import { shuffle } from "../utils/shuffle.js";
import slug from "slug";
import randomItem from 'random-item';
import { sendNotification } from "../utils/resend.js";

export async function getMyth(req: Request<{ id: string}>, res: Response): Promise<void> {
    if (!req?.params?.id) {
        return void res.status(404).json({message: 'myth id required'});
    }
    const search = ({$or: [
        {slug: req.params.id},
        {_id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null},
		{active: true}
    ]})
    const myth = await MythModel.findOne(search);
    if (!myth) {
        return void res.status(404).json({message: 'myth not found'});
    }
	return void res.status(200).json(myth);
}

export async function getRandomMyth(req: Request, res: Response): Promise<void>{
    const myths = await MythModel.find({active:true}, '_id').lean();
    const randomMyth = randomItem(myths);
    const myth = await MythModel.findById(randomMyth._id);
    return void res.status(200).json(myth);
}

export async function getRandomListOfMyths(req: Request, res: Response): Promise<void>{
	const allMyths = await MythModel.find({active:true}).lean();
	const randomized = shuffle(allMyths);
	return void res.status(200).json(randomized);
}

export async function getAllMyths(req: Request, res: Response): Promise<void>{
	const allMyths = await MythModel.find({}).lean();
	return void res.status(200).json(allMyths);
}
export async function getActiveMyths(req: Request, res: Response): Promise<void>{
	const allMyths = await MythModel.find({active:true}).lean();
	return void res.status(200).json(allMyths);
}
export async function addMyth(req: Request<{}, {}, Partial<IMyth>>, res:Response): Promise<void> {
	try {
		const { myth, fact, image, moreInfo, submitted_by, email_address } = req.body;
		if (!myth || !fact) {
			return void res.status(400).json({'message': 'myth & fact required'})
		}
		const slug = await generateSlug(myth);
		MythModel.init();
		const newMyth = await MythModel.create({ myth, fact, slug, image, moreInfo, submitted_by, email_address, active: false});
		if (submitted_by?.toLowerCase() !== 'phantomadoptee'){
			sendNotification(myth);
		}
		// sendNotification(myth);

		return void res.status(201).json({'ok': true});
	} catch (error) {
		return void res.status(500).json({'ok': false});
	} 
}
export async function updateMyth(req: Request<{id: string}, {}, Partial<IMyth>>, res:Response): Promise<void>{
	const { myth, fact, slug, image, learn_more, submitted_by, active, email_address} = req.body ?? {};
	const { id } = req.params;
	if (!id) {
		return void res.status(400).json({'message': 'id missing'});
	}
	const filter = {
		_id: mongoose.Types.ObjectId.isValid(id) ? id : null
	}
	const updateKeys = Object.entries({myth, fact, slug, image, learn_more, active, submitted_by})
		.filter(([_, v]) => v !== undefined);
	const update = Object.fromEntries(updateKeys);	
	const updated = await MythModel.findOneAndUpdate(filter, update, {
		returnDocument: 'after'
	});
	return void res.status(200).json({_id: updated?._id.toString()});
}

export async function generateSlug(text:string):Promise<string>{
	let conflicts: boolean = true;
	let inc: number = 0;
	let convertedSlug: string = '';
	let slugLength = Number(process.env.SLUG_LENGTH) || 5;
	do {
		const words = text.split(' ');
		const slugWords = words.splice(0, slugLength);
		const str = inc.toString();
		if (inc > 0) {
			slugWords.push(str);
		} 
		const phrase = slugWords.join('-');
		convertedSlug = slug(phrase, {lower: true});
		conflicts = await checkDupes(convertedSlug);
		if (conflicts === true) {
			inc++;
		} else {

		}
	} while (conflicts === true);
	return convertedSlug;
	
}

async function checkDupes(newSlug: string):Promise<boolean>{
	const search = ({$or: [
        {slug: newSlug}
    ]})
	const myth = await MythModel.findOne(search);
    if (myth) {
        return true;
    }
	return false;
}