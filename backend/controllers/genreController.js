import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res.json({ error: "Name is required" });
		}

		const existingGenre = await Genre.findOne({ name });

		if (existingGenre) {
			return res.status(400).json({ error: "already exist" });
		}

		const genre = await new Genre({ name }).save();
		res.status(406).json(genre);
	} catch (error) {
		console.log(error);
		return res.this.status(500).json(error);
	}
});
const updateGenre = asyncHandler(async (req, res) => {
	try {
		const { name } = req.body;
		const { id } = req.params;

		const genre = await Genre.findOne({ _id: id });
		if (!genre) {
			return res.status(404).json({ error: "not found" });
		}

		genre.name = name;

		const updateGenre = await genre.save();

		res.send(updateGenre);
	} catch (error) {
		console.log(error);
		return res.this.status(500).json(error);
	}
});

const deleteGenre = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const genre = await Genre.findByIdAndDelete(id);
		if (!genre) {
			return res.status(404).json({ error: "not found" });
		}

		res.send({ msg: "success" });
	} catch (error) {
		console.log(error);
		return res.this.status(500).json(error);
	}
});

const getGenre = asyncHandler(async (req, res) => {
	try {
		// const {id} = req.params
		const genre = await Genre.find();
		if (!genre) {
			return res.status(404).json({ error: "not found" });
		}

		res.send(genre);
	} catch (error) {
		console.log(error);
		return res.this.status(500).json(error);
	}
});

const readGenre = asyncHandler(async (req, res) => {
	try {
		const {id} = req.params
		const genre = await Genre.find({_id: id});
		if (!genre) {
			return res.status(404).json({ error: "not found" });
		}

		res.send(genre);
	} catch (error) {
		console.log(error);
		return res.this.status(500).json(error);
	}
});

export { createGenre, updateGenre, deleteGenre, getGenre, readGenre };
