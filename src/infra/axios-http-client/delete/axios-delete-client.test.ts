/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
import * as faker from 'faker'
import { AxiosDeleteClient } from './axios-delete-client'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.delete.mockResolvedValue({ status: 200, data: [] } as any)

const makeFakeRequest = (): IHttpClientParams => ({
  url: faker.internet.url(),
  body: {
    id: 'any_id'
  }
})

describe('AxiosDeleteClient', () => {
  it('Should call axios with correct values', async () => {
    const sut = new AxiosDeleteClient()
    const deleteSpy = jest.spyOn(mockedAxios, 'delete')
    const expectedValue = makeFakeRequest()
    await sut.delete(expectedValue)
    const expectedUrl = expectedValue.url + `?id=${expectedValue.body.id}`
    expect(deleteSpy).toHaveBeenCalledWith(expectedUrl, {})
  })
  it('Should return httpResponse on axios succeed', async () => {
    const sut = new AxiosDeleteClient()
    const response = await sut.delete(makeFakeRequest())
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
  it('Should return httpResponse on axios fails', async () => {
    const sut = new AxiosDeleteClient()
    jest.spyOn(mockedAxios, 'delete').mockImplementationOnce((): any => {
      return new Promise((resolve, reject) => {
        reject({ response: { status: 401, data: 'any_error' } })
      })
    })
    const httpResponse = await sut.delete(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('any_error')
  })
  it('Should return server error if axios throw', async () => {
    const sut = new AxiosDeleteClient()
    jest.spyOn(mockedAxios, 'delete').mockImplementation(() => {
      throw new Error()
    })
    const response = await sut.delete(makeFakeRequest())
    expect(response.statusCode).toBe(500)
    expect(response.body).toBe('Internal Server Error')
  })
  it('Should call axios with correct values on token received', async () => {
    const sut = new AxiosDeleteClient('any_token')
    const getSpy = jest.spyOn(axios, 'delete')
    const expectedValue = makeFakeRequest()
    const expectedUrl = expectedValue.url + `?id=${expectedValue.body.id}`
    await sut.delete(expectedValue)
    expect(getSpy).toHaveBeenCalledWith(expectedUrl, {
      headers: {
        Authorization: 'Bearer any_token'
      }
    })
  })
})
