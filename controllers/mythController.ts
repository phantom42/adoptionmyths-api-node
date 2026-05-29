import mongoose from "mongoose";
import { IMyth, MythModel } from "../models/myth.js";
import { Request, Response } from "express";
import { shuffle } from "../utils/shuffle.js";
import randomItem from 'random-item';

export async function getMyth(req: Request<{ id: string}>, res: Response): Promise<void> {
    if (!req?.params?.id) {
        return void res.status(404).json({message: 'myth id required'});
    }
    const search = ({$or: [
        {slug: req.params.id},
        {_id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null}
    ]})
    const myth = await MythModel.findOne(search);
    if (!myth) {
        return void res.status(404).json({message: 'myth not found'});
    }
	return void res.status(200).json(myth);
}

export async function getRandomMyth(req: Request, res: Response): Promise<void>{
    const myths = await MythModel.find({}, '_id').lean();
    const randomMyth = randomItem(myths);
    const myth = await MythModel.findById(randomMyth._id);
    return void res.status(200).json(myth);
}

export async function getRandomListOfMyths(req: Request, res: Response): Promise<void>{
	const allMyths = await MythModel.find({}).lean();
	const randomized = shuffle(allMyths);
	return void res.status(200).json(randomized);
}

export async function getAllMyths(req: Request, res: Response): Promise<void>{
	const allMyths = await MythModel.find({}).lean();
	return void res.status(200).json(allMyths);
}

export async function addMyth(req: Request<{}, {}, Partial<IMyth>>, res:Response): Promise<void> {
	const { myth, fact, slug, image, learn_more, submitted_by } = req.body;
	if (!myth || !fact) {
		return void res.status(400).json({'message': 'myth & fact required'})
	}
	const newMyth = MythModel.create({ myth, fact, slug, image, learn_more, submitted_by});
	return void res.status(201).json({'ok': true});
}
export async function updateMyth(req: Request<{id: string}, {}, Partial<IMyth>>, res:Response): Promise<void>{
	const { myth, fact, slug, image, learn_more, submitted_by, active} = req.body ?? {};
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