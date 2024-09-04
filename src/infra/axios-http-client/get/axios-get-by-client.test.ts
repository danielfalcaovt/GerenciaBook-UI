 
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios"
import { IHttpClientParams } from "../../../data/protocols/http/post/http-post-client"
import * as faker from 'faker'
import { IAddBook } from "../../../domain/protocols/book/book"
import { AxiosGetByClient } from "./axios-get-by-client"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValue({ status: 200, data: [] } as any)

const makeFakeRequest = (): IHttpClientParams => ({
  url: faker.internet.url(),
  body: {
    book_name: 'any_name'
  } as IAddBook
})

describe('AxiosGetByClient', () => {
  it('Should call axios with correct values', async () => {
    const sut = new AxiosGetByClient()
    const getSpy = jest.spyOn(mockedAxios, 'get')
    const expectedValue = makeFakeRequest()
    await sut.getBy(expectedValue)
    const expectedUrl = expectedValue.url + '?book_name=any_name'
    expect(getSpy).toHaveBeenCalledWith(expectedUrl)
  })
})