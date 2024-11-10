import mongoose from "mongoose";

const genreScheme = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		maxLength: 22,
		unique: true,
	},
});

export default mongoose.model("Genre", genreScheme);
