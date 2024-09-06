/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpClientParams } from "../../../data/protocols/http/post/http-post-client"
import * as faker from 'faker'
import { AxiosDeleteClient } from "./axios-delete-client"
import axios from "axios"

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
})