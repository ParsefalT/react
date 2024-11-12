import { apiSlice } from "./apiSlice";
import BASE_URL from "../constants";

export interface FetchGenresResponse {
	_id: number|string;
	name: string;
}

export const genreSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createGenre: builder.mutation({
			query: (newGenre) => ({
				url: `${BASE_URL.GENRE_URL}`,
				method: "POST",
				body: newGenre,
			}),
		}),

		updateGenre: builder.mutation({
			query: ({ id, updateGenre }) => ({
				url: `${BASE_URL.GENRE_URL}/${id}`,
				method: "PUT",
				body: updateGenre,
			}),
		}),

		deleteGenre: builder.mutation({
			query: (id) => ({
				url: `${BASE_URL.GENRE_URL}/${id}`,
				method: "DELETE",
			}),
		}),

		fetchGenres: builder.query<FetchGenresResponse[], unknown>({
			query: () => `${BASE_URL.GENRE_URL}`,
		}),

		fetchOneGenre: builder.query({
			query: (id) => `${BASE_URL.GENRE_URL}/${id}`,
		}),
	}),
});

export const {
	useCreateGenreMutation,
	useDeleteGenreMutation,
	useFetchGenresQuery,
	useFetchOneGenreQuery,
	useUpdateGenreMutation,
} = genreSlice;
