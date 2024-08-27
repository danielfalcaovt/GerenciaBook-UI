 
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

describe('HttpPostClient', () => {
    it('Should call axios with correct values', async () => {
        const sut = new AxiosPostClient()
        const postSpy = jest.spyOn(axios, 'post')
        const expectedValue = makeFakeRequest()
        await sut.post(expectedValue)
        expect(postSpy).toHaveBeenCalledWith(expectedValue.url, expectedValue.body)
    })
})