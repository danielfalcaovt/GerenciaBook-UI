/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
import * as faker from 'faker'
import { IAddBook } from '../../../data/protocols/book/add-book'
import { AxiosGetByClient } from './axios-get-by-client'

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
    expect(getSpy).toHaveBeenCalledWith(expectedUrl, {})
  })
  it('Should call axios with correct values on receive more than one param', async () => {
    const sut = new AxiosGetByClient()
    const getSpy = jest.spyOn(axios, 'get')
    const expectedValue = {
      url: faker.internet.url(),
      body: { book_name: 'any_name', student_name: 'any_student' }
    }
    await sut.getBy(expectedValue)
    const expectedUrl = expectedValue.url += "?book_name=any_name&student_name=any_student"
    expect(getSpy).toHaveBeenCalledWith(expectedUrl, {})
  })
  it('Should return HttpResponse on axios succeed', async () => {
    const sut = new AxiosGetByClient()
    const expectedValue = makeFakeRequest()
    const result = await sut.getBy(expectedValue)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual([])
  })
  it('Should return httpResponse on axios fails', async () => {
    const sut = new AxiosGetByClient()
    jest.spyOn(mockedAxios, 'get').mockImplementationOnce((): any => {
      return new Promise((resolve, reject) => {
        reject({ response: { status: 401, data: 'any_error' } })
      })
    })
    const httpResponse = await sut.getBy(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toBe('any_error')
  })
  it('Should return server error if axios throw', async () => {
    const sut = new AxiosGetByClient()
    jest.spyOn(mockedAxios, 'get').mockImplementation(() => {
      throw new Error()
    })
    const response = await sut.getBy(makeFakeRequest())
    expect(response.statusCode).toBe(500)
    expect(response.body).toBe('Internal Server Error')
  })
  it('Should call axios with correct values on token received', async () => {
    const sut = new AxiosGetByClient('any_token')
    const getSpy = jest.spyOn(axios, 'get')
    const expectedValue = makeFakeRequest()
    const expectedUrl = expectedValue.url + '?book_name=any_name'
    await sut.getBy(expectedValue)
    expect(getSpy).toHaveBeenCalledWith(expectedUrl, {
      headers: {
        Authorization: 'Bearer any_token'
      }
    })
  })
})
