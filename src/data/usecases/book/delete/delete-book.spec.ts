/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpResponse } from '../../../../presentation/protocols/http'

import { IHttpClientParams } from '../../../protocols/http/post/http-post-client'
import { InvalidParamsError } from '../../../../domain/errors/invalid-params-error'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'
import { IDeleteBook, IDeleteBookModel } from '../../../../domain/usecases/book/idelete-book'
import { IHttpDeleteClient } from '../../../protocols/http/delete/http-delete-client'
import { RemoteDeleteBook } from './remote-delete-book'

interface SutTypes {
  sut: IDeleteBook
  httpClientStub: IHttpDeleteClient
}

const makeSut = (): SutTypes => {
  const httpClientStub = makeHttpClientStub()
  const sut = new RemoteDeleteBook('any_url', httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

const makeHttpClientStub = (): IHttpDeleteClient => {
  class HttpClientStub implements IHttpDeleteClient {
    async delete(params: IHttpClientParams): Promise<HttpResponse> {
      return Promise.resolve({
        statusCode: 200,
        body: 1
      })
    }
  }
  return new HttpClientStub()
}

const makeFakeBook = (): IDeleteBookModel => ({
  id: 'any_id'
})

describe('RemoteDeleteBook', () => {
  it('Should call delete with correct values', async () => {
    const { sut, httpClientStub } = makeSut()
    const deleteSpy = jest.spyOn(httpClientStub, 'delete')
    await sut.delete(makeFakeBook())
    expect(deleteSpy).toHaveBeenCalledWith({
      url: 'any_url',
      body: makeFakeBook()
    })
  })
   it('Should return boolean on delete succeed', async () => {
    const { sut } = makeSut()
    const response = await sut.delete(makeFakeBook())
    expect(response).toBeTruthy()
  })
  /*
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
  }) */
})
