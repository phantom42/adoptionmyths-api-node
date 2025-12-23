import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mythSchema = new Schema ({
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

export const MythModel = mongoose.model('Myth', mythSchema);