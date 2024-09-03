/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpGetClient } from "../../../data/protocols/http/get/http-get-client";
import { IHttpClientParams } from "../../../data/protocols/http/post/http-post-client";
import { HttpResponse } from "../../../presentation/protocols/http";
import axios from "axios";

export class AxiosGetClient implements IHttpGetClient {
  async get(params: IHttpClientParams): Promise<HttpResponse> {
    const axiosResponse = await axios.get(params.url)
    if (axiosResponse.status === 200) {
      return new Promise(resolve => resolve({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }))
    } else {
      const axiosError: any = axiosResponse
      return new Promise(resolve => resolve({
        statusCode: axiosError.response.status,
        body: axiosError.response.data
      }))
    }
  }
}