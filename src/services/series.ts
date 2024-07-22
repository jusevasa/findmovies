import { httpClient } from '@/clients/httpClient';

export interface GetgetAllSeriesParams {
  page?: number;
}

export const getAllSeries = async ({ page = 1 }: GetgetAllSeriesParams) => {
  try {
    const response = await httpClient.get(`discover/tv`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tv:', error);
    throw error;
  }
};
