/* eslint-disable @typescript-eslint/no-explicit-any */

import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
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
    expect(postSpy).toHaveBeenCalledWith(
      expectedValue.url,
      expectedValue.body,
      {}
    )
  })
  it('Should return httpResponse on axios succeed', async () => {
    const sut = new AxiosPostClient()
    const response = await sut.post(makeFakeRequest())
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
  it('Should return server error if axios throw', async () => {
    const sut = new AxiosPostClient()
    jest.spyOn(mockedAxios, 'post').mockImplementation(() => {
      throw new Error()
    })
    const response = await sut.post(makeFakeRequest())
    expect(response.statusCode).toBe(500)
    expect(response.body).toBe('Internal Server Error')
  })
  it('Should call axios with correct values on token received', async () => {
    const sut = new AxiosPostClient('any_token')
    const postSpy = jest.spyOn(axios, 'post')
    const expectedValue = makeFakeRequest()
    await sut.post(expectedValue)
    expect(postSpy).toHaveBeenCalledWith(
      expectedValue.url,
      expectedValue.body,
      {
        headers: {
          Authorization: 'Bearer any_token'
        }
      }
    )
  })
})
