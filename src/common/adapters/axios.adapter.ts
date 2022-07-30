/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly client: AxiosInstance = axios;

  async get<T>(url: string, options?: any): Promise<T> {
    try {
      const { data } = await this.client.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('check the logs');
    }
  }
}
