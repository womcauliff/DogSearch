import axios, { AxiosResponse } from 'axios';

export interface BreedImagesResponse {
  status: 'success';
  message: string[];
}

export function getBreedImages(
  breedApiPath: string
): Promise<AxiosResponse<BreedImagesResponse>> {
  return axios.request({
    url: `/breed/${breedApiPath}/images`,
    method: 'GET',
    baseURL: 'https://dog.ceo/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
}
