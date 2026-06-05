import  {Schema, model, InferSchemaType, Types} from "mongoose";
//const Schema = mongoose.Schema;

export interface IMyth {
	myth: string;
	fact: string;
	slug?: string;
	image?: string;
	learn_more?: string;
	moreInfo?: string;
	active?: boolean;
	submitted_by?: string;
	email_address?: string;
	_id?: Types.ObjectId;
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
    },
	active: {
		type: Boolean,
		required: false
	},
	submitted_by: {
		type: String,
		required: false
	}
}, {
    collection: "myths"
});

export const MythModel = model<IMyth>('Myth', mythSchema);