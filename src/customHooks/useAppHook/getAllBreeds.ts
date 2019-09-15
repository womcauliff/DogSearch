import axios, { AxiosResponse } from 'axios';

export interface AllBreedsResponse {
  status: 'success';
  message: {
    [breed: string]: string[];
  };
}

export function getAllBreeds(): Promise<AxiosResponse<AllBreedsResponse>> {
  return axios.request({
    url: '/breeds/list/all',
    method: 'GET',
    baseURL: 'https://dog.ceo/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
}

/** An object containing the displayName of the dog breed, and the path for additional API calls. */
export type Breed = { displayName: string; apiPath: string };

/**
 * Parses the nested object of dog breeds into a flat array of objects.
 */
export function parseSuccessResponse(response: AllBreedsResponse): Breed[] {
  const output: Breed[] = [];
  Object.keys(response.message).forEach(breed => {
    if (response.message[breed].length === 0) {
      output.push({
        displayName: breed,
        apiPath: breed
      });
    } else {
      response.message[breed].forEach(subBreed => {
        output.push({
          displayName: `${subBreed} ${breed}`,
          apiPath: `${breed}/${subBreed}`
        });
      });
    }
  });
  return output;
}
