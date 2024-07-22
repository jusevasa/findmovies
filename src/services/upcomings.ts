import { httpClient } from '@/clients/httpClient';

export interface GetAllUpComingsParams {
  page?: number;
}

export const getAllUpComings = async ({ page = 1 }: GetAllUpComingsParams) => {
  try {
    const response = await httpClient.get(`movie/upcoming`, {
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
