/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
import * as faker from 'faker'
import { IAddBook } from '../../../data/protocols/book/add-book'
import { AxiosUpdateClient } from './axios-update-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValue({ status: 200, data: [] } as any)

const makeFakeRequest = (): IHttpClientParams => ({
  url: faker.internet.url(),
  body: {
    book_name: 'any_name'
  } as IAddBook
})

describe('AxiosUpdateClient', () => {
  it('Should call axios with correct values', async () => {
    const sut = new AxiosUpdateClient()
    const patchSpy = jest.spyOn(mockedAxios, 'patch')
    const expectedValue = makeFakeRequest()
    await sut.patch(expectedValue)
    expect(patchSpy).toHaveBeenCalledWith(expectedValue.url, expectedValue.body)
  })
})