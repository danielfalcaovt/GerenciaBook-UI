/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpResponse } from '../../../../presentation/protocols/http'

import { IHttpClientParams } from '../../../protocols/http/post/http-post-client'
import { IHttpGetByClient } from '../../../protocols/http/get/http-get-by-client'
import {
  IGetBook,
  IGetBookModel
} from '../../../../domain/usecases/book/iget-book'
import { RemoteGetBook } from './get-book'
import { InvalidParamsError } from '../../../../domain/errors/invalid-params-error'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'

interface SutTypes {
  sut: IGetBook
  httpClientStub: IHttpGetByClient
}

const makeSut = (): SutTypes => {
  const httpClientStub = makeHttpClientStub()
  const sut = new RemoteGetBook('any_url', httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

const makeHttpClientStub = (): IHttpGetByClient => {
  class HttpClientStub implements IHttpGetByClient {
    async getBy(params: IHttpClientParams): Promise<HttpResponse> {
      return Promise.resolve({
        statusCode: 200,
        body: [
          {
            id: 'any_id',
            book_name: 'any_book',
            student_name: 'any_student',
            student_class: 3001,
            lend_day: 'random_day'
          }
        ]
      })
    }
  }
  return new HttpClientStub()
}

const makeFakeBook = (): IGetBookModel => ({
  book_name: 'any_name',
  lend_day: 'any_day',
  student_class: '3001',
  student_name: 'any_name'
})

describe('RemoteGetBook', () => {
  it('Should call get with correct values', async () => {
    const { sut, httpClientStub } = makeSut()
    const getSpy = jest.spyOn(httpClientStub, 'getBy')
    await sut.getBy(makeFakeBook())
    expect(getSpy).toHaveBeenCalledWith({
      url: 'any_url',
      body: makeFakeBook()
    })
  })
  it('Should return book array on getBy succeed', async () => {
    const { sut } = makeSut()
    const response = await sut.getBy(makeFakeBook())
    expect(response[0].id).toBe('any_id')
    expect(response[0].book_name).toBe('any_book')
  })
  it('Should throw an invalid params error on getBy return 400', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'getBy').mockReturnValueOnce(Promise.resolve({ statusCode: 400 }))
    const promise = sut.getBy(makeFakeBook())
    expect(promise).rejects.toThrow(new InvalidParamsError())
  })
  
  it('Should throw an unexpected error on getBy return an error', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'getBy').mockReturnValueOnce(Promise.resolve({ statusCode: 500 }))
    const promise = sut.getBy(makeFakeBook())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  it('Should throw if httpclient throws', async () => {
    const { sut, httpClientStub  } = makeSut()
    jest.spyOn(httpClientStub, 'getBy').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.getBy(makeFakeBook())
    expect(promise).rejects.toThrow()
  })
})
