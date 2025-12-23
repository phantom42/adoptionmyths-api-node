import mongoose from "mongoose";
import { MythModel } from "../models/myth.js";
import { createRequire} from 'module';
const require = createRequire(import.meta.url);
const shuffle = require('knuth-shuffle-seeded');
import randomItem from 'random-item';

export async function getMyth(req, res) {
    if (!req?.params?.id) {
        return res.status(404).json({message: 'myth id required'});
    }
	console.log(req.params.id);
    const search = ({$or: [
        {slug: req.params.id},
        {_id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null}
    ]})
    const myth = await MythModel.findOne(search);
    if (!myth || myth.length === 0) {
        return res.status(404).json({message: 'myth not found'});
    }
	return res.status(200).json(myth);
}

export async function getRandomMyth(req, res){
    const myths = await MythModel.find({}, '_id').lean();
    const randomMyth = randomItem(myths);
    const myth = await MythModel.findById(randomMyth._id);
    return res.status(200).json(myth);
}

export async function getRandomListOfMyths(req, res){
	const allMyths = await MythModel.find({}).lean();
	const randomized = shuffle(allMyths);
	return res.status(200).json(randomized);
}

export async function getAllMyths(req, res){
	const allMyths = await MythModel.find({}).lean();
	return res.status(200).json(allMyths);
}
