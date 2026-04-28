import  {Schema, model, InferSchemaType} from "mongoose";
//const Schema = mongoose.Schema;

interface IMyth {
	myth: string;
	fact: string;
	slug?: string;
	image?: string;
	learn_more?: string;
}

const mythSchema = new Schema<IMyth> ({
    myth: {
        type: String,
        required: true
    },
    fact: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    learn_more: {
        type: String,
        required: false
    }
}, {
    collection: "myths"
});

export const MythModel = model<IMyth>('Myth', mythSchema);