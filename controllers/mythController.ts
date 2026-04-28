import mongoose from "mongoose";
import { MythModel } from "../models/myth.js";
import { Request, Response } from "express";
import { shuffle } from "../utils/shuffle.js";
import randomItem from 'random-item';

export async function getMyth(req: Request<{ id: string}>, res: Response): Promise<void> {
    if (!req?.params?.id) {
        return void res.status(404).json({message: 'myth id required'});
    }
	console.log(req.params.id);
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
