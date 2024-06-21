import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const VOYAGER_API_KEY = process.env.VOYAGER_API_KEY;

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'x-api-key': VOYAGER_API_KEY,
        'accept': 'application/json'
      }
    });
  }

  public async get(url: string) {
    try {
      console.log(`Sending GET request to: ${url}`);
      const response = await this.client.get(url);
      console.log(`Response received: `, response.data);
      return response.data;
    } catch (error) {
      const err = error as any;
      console.error('Error during GET request:', err.response ? err.response.data : err.message);
      throw err;
    }
  }
}
