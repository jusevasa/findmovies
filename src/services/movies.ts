import { httpClient } from '@/clients/httpClient';

export interface GetAllMoviesParams {
  page?: number;
}

export const getAllMovies = async ({ page = 1 }: GetAllMoviesParams) => {
  try {
    const response = await httpClient.get(`discover/movie`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
