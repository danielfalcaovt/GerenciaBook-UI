/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHttpClientParams, IHttpPostClient } from "../../protocols/http/http-post-client"
import { RemoteAuthentication } from "./remote-authentication"
import { AuthParams } from '../../../domain/usecases/login/authentication'
import { HttpResponse } from "../../protocols/http/http-protocol"
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error'
import { UnexpectedError } from '../../../domain/errors/unexpected-error'

interface SutTypes {
    sut: RemoteAuthentication
    httpPostClient: IHttpPostClient
}

const makeSut = (): SutTypes => {
    const url = 'any_url'
    const httpPostClient =  makeHttpPostClientStub()
    const sut = new RemoteAuthentication(url, httpPostClient)
    return {
        sut,
        httpPostClient
    }
}

const makeHttpPostClientStub = (): IHttpPostClient => {
    class HttpPostClientStub implements IHttpPostClient {
        post(params: IHttpClientParams): Promise<HttpResponse> {
            return new Promise(resolve => resolve({
                statusCode: 200
            }))
        }
    }
    return new HttpPostClientStub()
}

const makeFakeRequest = (): AuthParams => ({
    email: 'any_mail@mail.com',
    password: 'any_password'
})

describe('RemoteAuthentication', () => {
    it('Should call HttpClient with correct values', async () => {
        const { sut, httpPostClient } = makeSut()
        const postSpy = jest.spyOn(httpPostClient, 'post')
        await sut.auth(makeFakeRequest())
        expect(postSpy).toHaveBeenCalledWith({
            url: 'any_url',
            body: makeFakeRequest()
        })
    })
    it('Should throw InvalidCredentialsError on HttpPostClient returns 401', async () => {
        const { sut, httpPostClient } = makeSut()
        jest.spyOn(httpPostClient, 'post').mockReturnValueOnce(Promise.resolve({ statusCode: 401 }))
        const promise = sut.auth(makeFakeRequest())
        expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
    it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClient } = makeSut()
        jest.spyOn(httpPostClient, 'post').mockReturnValueOnce(Promise.resolve({ statusCode: 400 }))
        const promise = sut.auth(makeFakeRequest())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
})