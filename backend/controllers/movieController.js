import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/Movie.js";

const getAllMovies = async () => {};

const createMovie = async (req, res) => {
	try {
		const newMovie = new Movie(req.body);
		const saveMovie = await newMovie.save();
		res.json(saveMovie);
	} catch (error) {
		res.status(500).json({ error: "sm wrong" });
	}
};

export { getAllMovies, createMovie };
