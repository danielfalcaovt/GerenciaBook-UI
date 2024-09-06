/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidParamsError } from "../../../../domain/errors/invalid-params-error"
import { UnexpectedError } from "../../../../domain/errors/unexpected-error"
import { HttpResponse } from "../../../../presentation/protocols/http"
import { IAddBook, IAddBookModel } from "../../../protocols/book/iadd-book"
import { IHttpClientParams, IHttpPostClient } from "../../../protocols/http/post/http-post-client"
import { AddBook } from "./add-book"

interface SutTypes {
  sut: IAddBook
  httpClientStub: IHttpPostClient
}

const makeSut = (): SutTypes => {
  const httpClientStub = makeHttpClientStub()
  const sut = new AddBook('any_url', httpClientStub)
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

const makeFakeBook = (): IAddBookModel => ({
  book_name: 'any_name',
  lend_day: 'any_day',
  student_class: 3001,
  student_name: 'any_name'
})

describe('RemoteAddBook', () => {
  it('Should call post with correct values', async () => {
    const { sut, httpClientStub } = makeSut()
    const postSpy = jest.spyOn(httpClientStub, 'post')
    await sut.add(makeFakeBook())
    expect(postSpy).toHaveBeenCalledWith({ url: 'any_url', body: makeFakeBook() })
  })
  it('Should return account on post succeed', async () => {
    const { sut } = makeSut()
    const response = await sut.add(makeFakeBook())
    expect(response.id).toBe('any_id')
    expect(response.book_name).toBe('any_book')
  })
  it('Should throw an invalid credentials error on post return 400', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'post').mockReturnValueOnce(Promise.resolve({ statusCode: 400 }))
    const promise = sut.add(makeFakeBook())
    expect(promise).rejects.toThrow(new InvalidParamsError())
  })
})