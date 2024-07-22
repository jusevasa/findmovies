import { httpClient } from '@/clients/httpClient';

export interface GetAllMultiParams {
  query?: string;
}

export const getAllMulti = async ({ query = '' }: GetAllMultiParams) => {
  try {
    if (query === '') return;
    const response = await httpClient.get(`search/multi`, {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
