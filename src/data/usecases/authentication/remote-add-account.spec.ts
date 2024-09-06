/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddAccount, IAddAccountModel } from "../../../domain/protocols/signup/add-account"
import { HttpResponse } from "../../../presentation/protocols/http"
import { IHttpClientParams, IHttpPostClient } from "../../protocols/http/post/http-post-client"
import { RemoteAddAccount } from "./remote-add-account"

interface SutTypes {
  sut: IAddAccount
  httpClientStub: IHttpPostClient
}

const makeSut = (): SutTypes => {
  const httpClientStub = makeHttpClientStub()
  const sut = new RemoteAddAccount('any_url', httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

const makeHttpClientStub = (): IHttpPostClient => {
  class HttpClientStub implements IHttpPostClient {
    async post(params: IHttpClientParams): Promise<HttpResponse> {
      return Promise.resolve({
        statusCode: 200,
        body: {
          id: 'any_id',
          book_name: 'any_book',
          student_name: 'any_student',
          student_class: 3001,
          lend_day: 'random_day'
        }
      })
    }
  }
  return new HttpClientStub()
}

const makeFakeAccount = (): IAddAccountModel => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password'
})

describe('RemoteAddAccount', () => {
  it('Should call post with correct values', async () => {
    const { sut, httpClientStub } = makeSut()
    const postSpy = jest.spyOn(httpClientStub, 'post')
    await sut.add(makeFakeAccount())
    expect(postSpy).toHaveBeenCalledWith({ url: 'any_url', body: makeFakeAccount() })
  })
})