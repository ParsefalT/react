import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
	getAllMovies,
	createMovie,
	getMovie,
	updateMovie,
	movieReview,
    deleteMovie
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getMovie);

router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);

router.post("/:id/reviews", authenticate, checkId, movieReview);

export default router;
