import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
	useDeleteMovieMutation,
	useGetSpecificMovieQuery,
	useUpdateMovieMutation,
	useUploadImageMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [movieData, setMovieData] = useState<{
		name: string;
		year: number;
		detail: string;
		cast: string[];
		rating: number;
		image: null | string;
		genre: string | number;
	}>({
		name: "",
		year: 0,
		detail: "",
		cast: [],
		rating: 0,
		image: null,
		genre: "",
	});

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const { data: initialMovieData } = useGetSpecificMovieQuery(id);

	useEffect(() => {
		if (initialMovieData) {
			setMovieData(initialMovieData);
		}
	}, [initialMovieData]);

	const [updateMovie] = useUpdateMovieMutation();
	const [uploadImage] = useUploadImageMutation();

	const [deleteMovie] = useDeleteMovieMutation();

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLElement>
	) => {
		if (
			event.target instanceof HTMLInputElement ||
			event.target instanceof HTMLTextAreaElement
		) {
			const { name, value } = event.target;
			setMovieData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setSelectedImage(file);
		}
	};

	const handleUpdateMovie = async () => {
		try {
			if (
				!movieData.name ||
				!movieData.year ||
				!movieData.detail ||
				!movieData.cast ||
				!selectedImage
			) {
				toast.error("please Field all fields");
				return;
			}

			if (selectedImage) {
				let uploadImagePath: string | null = null;
				const formData = new FormData();
				console.log(selectedImage);
				formData.append("image", selectedImage);
				const uploadImageResponse = await uploadImage(formData);
				console.log(uploadImageResponse);
				if (uploadImageResponse.data) {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					uploadImagePath = uploadImageResponse.data.images;
				} else {
					console.log("smt");
					toast.error("smt");
					return;
				}
				await updateMovie({
					id: id,
					updateMovie: {
						...movieData,
						image: uploadImagePath,
					},
				});
				navigate("/movies");

				setMovieData({
					name: "",
					year: 0,
					detail: "",
					cast: [],
					rating: 0,
					image: null,
					genre: "",
				});
				toast.success("movie to database");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteMovie = async () => {
		try {
			await deleteMovie(id);
			navigate("/movies");
			toast.success("delete");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container flex justify-center items-center mt-4">
			<form action="" className="">
				<p className="text-green-200 w-[50rem] text-2xl mb-4">
					Create movie
				</p>
				<div className="mb-4">
					<label htmlFor="">
						Name
						<input
							type="text"
							name="name"
							value={movieData.name}
							onChange={handleChange}
							className="border px-2 py-1 w-full"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="">
						Year
						<input
							type="number"
							name="year"
							defaultValue={movieData.year}
							onChange={handleChange}
							className="border px-2 py-1 w-full"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="">
						Details:
						<textarea
							name="detail"
							id=""
							defaultValue={movieData.detail}
							onChange={handleChange}
							className="border px-2 py-1 w-full"
						></textarea>
					</label>
				</div>
				<div className="mb-4">
					<label htmlFor="">
						Cast
						<input
							type="text"
							name="cast"
							defaultValue={movieData.cast.join(", ")}
							onChange={(e) =>
								setMovieData({
									...movieData,
									cast: e.target.defaultValue.split(", "),
								})
							}
							className="border px-2 py-1 w-full"
						/>
					</label>
				</div>
				{/* <div className="mb-4">
					<label htmlFor="">
						Genre
						<select
							name="genre"
							id=""
							defaultValue={movieData.genre}
							className="border px-2 py-1 w-full"
							// onChange={handleChange}
							style={{
								color: "black",
							}}
						>
							{isLoadingGenres ? (
								<option>Loading genres...</option>
							) : (
								genres?.map((genre) => (
									<option
										key={genre._id}
										defaultValue={genre._id}
									>
										{genre.name}
									</option>
								))
							)}
						</select>
					</label>
				</div> */}
				<div className="mb-4">
					<label htmlFor="">
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							style={{
								border: "1px solid #888",
								borderRadius: "5px",
								padding: "8px",
								color: "white",
							}}
						/>
					</label>
				</div>
				<button
					type="button"
					className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 active:bg-teal-900"
					onClick={handleUpdateMovie}
				>
					Update
				</button>
				<button
					type="button"
					className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 active:bg-teal-900"
					onClick={handleDeleteMovie}
				>
					delete
				</button>
			</form>
		</div>
	);
};

export default UpdateMovie;
