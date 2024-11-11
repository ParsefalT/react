import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/Movie.js";

const getAllMovies = async (req, res) => {
	try {
		const allMovies = await Movie.find({});
		res.status(200).send(allMovies);
	} catch (error) {
		res.status(500).json({ error: "sm wrong" });
	}
};

const getMovie = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Movie.findById(id);
		if (!res) {
			res.status(404).json({ error: "not found" });
		}
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: "sm wrong" });
	}
};

const createMovie = async (req, res) => {
	try {
		const newMovie = new Movie(req.body);
		const saveMovie = await newMovie.save();
		res.json(saveMovie);
	} catch (error) {
		res.status(500).json({ error: "sm wrong" });
	}
};

const updateMovie = async (req, res) => {
	try {
		const { id } = req.params;
		const updateMovie = await Movie.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updateMovie) {
			res.status(404).json({ error: "not found" });
		}

		res.status(200).json(updateMovie);
	} catch (error) {
		res.status(500).json({ error: "sm wrong" });
	}
};

const movieReview = async (req, res) => {
	try {
		const { rating, comment } = req.body;
		const movie = await Movie.findById(req.params.id);

		if (movie) {
			const alreadyReviewd = movie.reviews.find(
				(r) => r.user.toString() == req.user._id.toString()
			);
			if (alreadyReviewd) {
				res.status(400);
				throw new Error("movie already reviewd");
			}

			const review = {
				name: req.user.username,
				rating: Number(rating),
				comment,
				user: req.user._id,
			};

			movie.reviews.push(review);
			movie.numReviews = movie.reviews.length;
			movie.rating =
				movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
				movie.reviews.length;
			await movie.save();
			res.status(201).json({ msg: "nice" });
		} else {
			res.status(404).json({ msg: "error" });
		}
	} catch (error) {
		res.status(500).json({ msg: "error server" });
	}
};

const deleteMovie = async (req, res) => {
	try {
		const { id } = req.params;
		const deleteMovie = await Movie.findByIdAndDelete(id);

		if (!deleteMovie) {
			res.status(404).json({ error: "not found movie" });
		}
		res.status(201).json("deleted");
	} catch (error) {
		res.status(500).json({ msg: "error server" });
	}
};

const deleteComment = async (req, res) => {
	try {
		const { movieId, reviewId } = req.body;
		const movie = await Movie.findById(movieId);

		if (!movie) {
			return res.status(404).json({ error: "not found movie" });
		}
		const reviewIndex = movie.reviews.findIndex(
			(r) => r._id.toString() == reviewId
		);
		if (reviewIndex == -1) {
			return res.status(404).json({ error: "not found" });
		}

		movie.reviews.splice(reviewIndex, 1);

		movie.numReviews = movie.reviews.length;
		movie.rating =
			movie.reviews.length > 0
				? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
				  movie.reviews.length
				: 0;

		await movie.save();
		res.status(201).json({ msg: "comment deleted" });
	} catch (error) {
		res.status(500).json({ msg: "error server" });
	}
};
const getNewMovies = async (req, res) => {
	try {
		const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
		res.status(200).json(newMovies);
	} catch (error) {
		res.status(500).json({ msg: "error server" });
	}
};

const getTopMovies = async (req, res) => {
	try {
		const topMovies = await Movie.find().sort({ numReviews: -1 }).limit(10);
		res.status(200).json(topMovies);
	} catch (error) {
		res.status(500).json({ msg: "error server" });
	}
};

const getRandomMovies = async (req, res) => {
	try {
		const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
		res.status(200).json(randomMovies);
	} catch (error) {
		res.status(500).json({ msg: "error server" });
	}
};

export {
	getAllMovies,
	createMovie,
	getMovie,
	updateMovie,
	movieReview,
	deleteMovie,
	deleteComment,
	getNewMovies,
	getTopMovies,
	getRandomMovies,
};
