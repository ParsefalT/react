import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { getAllMovies,createMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get("/all-movies", getAllMovies);

router.post('/create-movie', authenticate, authorizeAdmin, createMovie)

export default router;
