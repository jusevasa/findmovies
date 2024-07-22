import { httpClient } from '@/clients/httpClient';

export interface GetAllMoviesParams {
  id?: string;
  type?: string;
}

export const getDetailCategorie = async ({
  id = '',
  type = 'movie',
}: GetAllMoviesParams) => {
  try {
    const URL_TYPE = type === 'movie' ? 'movie' : 'tv';

    const response = await httpClient.get(`${URL_TYPE}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
