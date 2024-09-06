/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { IHttpClientParams } from '../../../data/protocols/http/post/http-post-client'
import * as faker from 'faker'
import { IAddBookModel } from '../../../domain/protocols/book/iadd-book'
import { AxiosUpdateClient } from './axios-update-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.patch.mockResolvedValue({ status: 200, data: [] } as any)

const makeFakeRequest = (): IHttpClientParams => ({
  url: faker.internet.url(),
  body: {
    book_name: 'any_name'
  } as IAddBookModel
})

describe('AxiosUpdateClient', () => {
  it('Should call axios with correct values', async () => {
    const sut = new AxiosUpdateClient()
    const patchSpy = jest.spyOn(mockedAxios, 'patch')
    const expectedValue = makeFakeRequest()
    await sut.patch(expectedValue)
    expect(patchSpy).toHaveBeenCalledWith(
      expectedValue.url,
      expectedValue.body,
      {}
    )
  })
  it('Should return httpResponse on axios succeed', async () => {
    const sut = new AxiosUpdateClient()
    const response = await sut.patch(makeFakeRequest())
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })
  it('Should return httpResponse on axios fail', async () => {
    const sut = new AxiosUpdateClient()
    jest.spyOn(mockedAxios, 'patch').mockImplementationOnce((): any => {
      return new Promise((resolve, reject) => {
        reject({
          response: {
            status: 400,
            data: 'any_error'
          }
        })
      })
    })
    const response = await sut.patch(makeFakeRequest())
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('any_error')
  })
  it('Should return server error if axios throws', async () => {
    const sut = new AxiosUpdateClient()
    jest.spyOn(mockedAxios, 'patch').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.patch(makeFakeRequest())
    expect(response.statusCode).toBe(500)
  })
})
