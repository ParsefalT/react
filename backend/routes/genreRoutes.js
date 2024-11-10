import express from "express";

const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
	createGenre,
	updateGenre,
	deleteGenre,
	getGenre,
	readGenre,
} from "../controllers/genreController.js";

router.route("/").post(authenticate, authorizeAdmin, createGenre);
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizeAdmin, deleteGenre);
router.route("/:id").get(readGenre);
router.route("/genres").get(getGenre);
export default router;
