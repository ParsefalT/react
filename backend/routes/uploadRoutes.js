import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const extname = path.extname(file.originalname);
		cb(null, `${file.filename}-${Date.now()}${extname}`);
	},
});

const fileFilter = (req, file, cb) => {
	const filetypes = /jpe?g|png|webp/;
	const mimetypes = /image\/jpe?g|image\/png||image\/webp/;
	const extname = path.extname(file.originalname);
	const mimetype = file.mimetype;

	if (filetypes.test(extname) && mimetypes.test(mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("images only"), false);
	}
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
	uploadSingleImage(req, res, (err) => {
		if (err) {
			res.status(400).send({ error: "gabela" });
		} else if (req.file) {
			res.status(200).send({
				msg: `image uploaded`,
				images: `/${req.file.path}`,
			});
		} else {
			res.status(400).send({ error: "no image provide" });
		}
	});
});

export default router;