/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHttpPostClient } from "../../protocols/http/http-post-client"
import { RemoteAuthentication } from "./remote-authentication"
import { AuthParams } from '../../../domain/usecases/login/authentication'

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
        post(url: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new HttpPostClientStub()
}

const makeFakeRequest = (): AuthParams => ({
    email: 'any_mail@mail.com',
    password: 'any_password'
})

describe('RemoteAuthentication', () => {
    it('Should call HttpClient with correct URL', async () => {
        const { sut, httpPostClient } = makeSut()
        const postSpy = jest.spyOn(httpPostClient, 'post')
        sut.auth(makeFakeRequest())
        expect(postSpy).toHaveBeenCalledWith('any_url')
    })
})