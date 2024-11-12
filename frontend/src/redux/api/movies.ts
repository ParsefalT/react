import { apiSlice } from "./apiSlice";

import BASIC_URL from "../constants";

export const movieApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllMovies: builder.query({
			query: () => `${BASIC_URL.MOVIE_URL}/all-movies`,
		}),

		createMovie: builder.mutation({
			query: (newMovie) => ({
				url: `${BASIC_URL.MOVIE_URL}/create-movie`,
				method: "POST",
				body: newMovie,
			}),
		}),

		updateMovie: builder.mutation({
			query: ({ id, updateMovie }) => ({
				url: `${BASIC_URL.MOVIE_URL}/update-movie/${id}`,
				method: "PUT",
				body: updateMovie,
			}),
		}),

		addMovieReview: builder.mutation({
			query: ({ id, rating, comment }) => ({
				url: `${BASIC_URL.MOVIE_URL}/${id}/reviews`,
				method: "POST",
				body: { rating, id, comment },
			}),
		}),

		deleteComment: builder.mutation({
			query: ({ movieId, reviewId }) => ({
				url: `${BASIC_URL.MOVIE_URL}/delete-comment`,
				method: "DELETE",
				body: { movieId, reviewId },
			}),
		}),

		deleteMovie: builder.mutation({
			query: ({ id }) => ({
				url: `${BASIC_URL.MOVIE_URL}/${id}`,
				method: "DELETE",
			}),
		}),

		getSpecificMovie: builder.query({
			query: (id) => `${BASIC_URL.MOVIE_URL}/specific-movie/${id}`,
		}),

		uploadImage: builder.mutation({
			query: (formData) => ({
				url: `${BASIC_URL.UPLOAD_URL}`,
				method: "POST",
				body: formData,
			}),
		}),

		getNewMovie: builder.query({
			query: () => `${BASIC_URL.MOVIE_URL}/new-movies`,
		}),

		getTopMovies: builder.query({
			query: () => `${BASIC_URL.MOVIE_URL}/tom-movies`,
		}),

		getRandomMovies: builder.query({
			query: () => `${BASIC_URL.MOVIE_URL}/random-movies`,
		}),
	}),
});
export const {
	useGetAllMoviesQuery,   
	useCreateMovieMutation,
	useUpdateMovieMutation,
	useAddMovieReviewMutation,
	useDeleteCommentMutation,
	useDeleteMovieMutation,
	useGetSpecificMovieQuery,
	useUploadImageMutation,
	useGetNewMovieQuery,
	useGetTopMoviesQuery,
	useGetRandomMoviesQuery,
} = movieApiSlice;
