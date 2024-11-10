import { FormEvent, useState } from "react";
import {
	FetchGenresResponse,
	useCreateGenreMutation,
	useDeleteGenreMutation,
	useFetchGenresQuery,
	useUpdateGenreMutation,
} from "../../redux/api/genre";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const GenreList = () => {
	const { data: genres, refetch } = useFetchGenresQuery("genres");
	const [name, setName] = useState<string>("");
	const [select, setSelectedGenre] = useState<FetchGenresResponse | null>(
		null
	);
	const [updating, setUpdating] = useState<string>("");
	const [modalVisible, setModalVisible] = useState(false);

	const [createGenre] = useCreateGenreMutation();
	const [updateGenre] = useUpdateGenreMutation();
	const [deleteGenre] = useDeleteGenreMutation();

	const handleCreateGenre = async (event: FormEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (!name) {
			toast.error("genre name is required");
			return;
		}
		try {
			const result = await createGenre({ name }).unwrap();

			if (result.error) {
				toast.error("gabela");
			} else {
				setName("");
				toast.success("wow");
				refetch();
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleUpdateGenre = async (event: FormEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (!updating) {
			toast.error("genre name is required");
			return;
		}
		try {
			const result = await updateGenre({
				id: select?._id,
				updateGenre: {
					name: updating,
				},
			}).unwrap();

			if (result.error) {
				toast.error("gabela");
			} else {
				setUpdating("");
				toast.success("wow");
				refetch();
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteGenre = async () => {
		try {
			const result = await deleteGenre(select?._id).unwrap();

			if (result.error) {
				toast.error("gabela");
			} else {
				toast.success("wow");
				refetch();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="ml-[10rem] flex flex-col md:flex-row">
			<div className="md:w-3/4 p-3">
				<h1 className="h-12">Manage Genres</h1>
				<GenreForm
					value={name}
					setValue={setName}
					handleSubmit={handleCreateGenre}
				/>
				<br />
				<div className="flex flex-wrap">
					{genres?.map((genre) => (
						<div key={genre._id}>
							<button
								className="bg-teal-500 mr-5 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
								onClick={() => {
									setModalVisible(true);
									setSelectedGenre(genre);
									setUpdating(genre.name);
								}}
							>
								{genre.name}
							</button>
						</div>
					))}
				</div>

				<Modal
					onClose={() => setModalVisible(false)}
					isOpen={modalVisible}
				>
					<GenreForm
						value={updating}
						setValue={(value) => setUpdating(value)}
						handleSubmit={handleUpdateGenre}
						buttonText="Update"
						handleDelete={handleDeleteGenre}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default GenreList;
