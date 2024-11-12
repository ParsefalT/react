import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { Key } from "react";

const AdminMoviesList = () => {
	const { data: movies } = useGetAllMoviesQuery("");
	return (
		<div className="container mx-[9rem]">
			<div className="flex flex-col md:flex-row">
				<div className="p-3">
					<div className="ml-[2rem] text-xl font-bold h-12">
						All movies ({movies?.length})
					</div>

					<div className="flex flex-wrap justify-around items-center p-[2rem] text-white">
						{movies?.map(
							(movie: {
								detail: string;
								name: string | undefined;
								image: string | undefined;
								_id: Key | null | undefined;
							}) => (
								<Link
									key={movie._id}
									to={`$/admin/movies/update{movie._id}`}
									className="block mb-4 overflow-hidden"
								>
									<div className="flex">
										<div
											key={movie._id}
											className="max-w-sm m-[2rem] rounded overflow-hidden shadow-lg"
										>
											<img
												src={movie.image}
												alt={movie.name}
												className="w-full h-48 object-cover"
											/>
											<div className="px-6 py-4 border border-gray-400">
												<div className="font-bold text-xl mb-2">
													{movie.name}
												</div>
											</div>
											<p className="font-semibold">
												{movie.detail}
											</p>
											<div className="mt-3">
												<Link
													to={`/admin/movies/update/${movie._id}`}
													className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 active:bg-teal-900"
												>
													update
												</Link>
											</div>
										</div>
									</div>
								</Link>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminMoviesList;
