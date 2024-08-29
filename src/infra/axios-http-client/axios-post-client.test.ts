/* eslint-disable @typescript-eslint/no-explicit-any */

import { IHttpClientParams } from '../../data/protocols/http/http-post-client'
import axios from 'axios'
import { AxiosPostClient } from './axios-post-client'
import faker from 'faker'

const makeFakeRequest = (): IHttpClientParams => ({
  url: faker.internet.url(),
  body: {
    field: 'any_value'
  }
})

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.post.mockResolvedValue({ status: 200, data: [] } as any)

describe('HttpPostClient', () => {
  it('Should call axios with correct values', async () => {
    const sut = new AxiosPostClient()
    const postSpy = jest.spyOn(mockedAxios, 'post')
    const expectedValue = makeFakeRequest()
    await sut.post(expectedValue)
    expect(postSpy).toHaveBeenCalledWith(expectedValue.url, expectedValue.body)
  })
  it('Should return httpResponse on axios succeed', async () => {
    const sut = new AxiosPostClient()
    const response = await sut.post(makeFakeRequest())
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
  it('Should throw if axios throws', async () => {
    const sut = new AxiosPostClient()
    jest.spyOn(axios, 'post').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.post(makeFakeRequest())
    expect(promise).rejects.toThrow()
  })
})
