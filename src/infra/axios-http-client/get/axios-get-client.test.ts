import { IHttpClientParams } from "../../../data/protocols/http/post/http-post-client"
import * as faker from 'faker'
import { AxiosGetClient } from "./axios-get-client"
import axios from "axios"

/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValue({ status: 200, data: [] } as any)

const makeFakeRequest = (): IHttpClientParams => ({
  url: faker.internet.url()
})

describe('AxiosGetClient', () => {
  it('Should call axios with correct values', async () => {
    const sut = new AxiosGetClient()
    const getSpy = jest.spyOn(mockedAxios, 'get')
    const expectedValue = makeFakeRequest()
    await sut.get(expectedValue)
    expect(getSpy).toHaveBeenCalledWith(expectedValue.url)
  })
  it('Should return httpResponse on axios succeed', async () => {
    const sut = new AxiosGetClient()
    const response = await sut.get(makeFakeRequest())
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
})