/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpResponse } from '../../../../presentation/protocols/http'
import { IHttpClientParams } from '../../../protocols/http/post/http-post-client'
import { InvalidParamsError } from '../../../../domain/errors/invalid-params-error'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'
import { IHttpPatchClient } from '../../../protocols/http/patch/http-patch-client'
import {
  IUpdateBook,
  IUpdateBookModel
} from '../../../../domain/usecases/book/iupdate-book'
import { RemoteUpdateBook } from './update-book'

interface SutTypes {
  sut: IUpdateBook
  httpClientStub: IHttpPatchClient
}

const makeSut = (): SutTypes => {
  const httpClientStub = makeHttpClientStub()
  const sut = new RemoteUpdateBook('any_url', httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

const makeHttpClientStub = (): IHttpPatchClient => {
  class HttpClientStub implements IHttpPatchClient {
    async patch(params: IHttpClientParams): Promise<HttpResponse> {
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

const makeFakeBook = (): IUpdateBookModel => ({
  id: 'any_id',
  book_name: 'any_name',
  student_name: 'any_name'
})

describe('RemoteUpdateBook', () => {
  it('Should call patch with correct values', async () => {
    const { sut, httpClientStub } = makeSut()
    const patchSpy = jest.spyOn(httpClientStub, 'patch')
    await sut.update(makeFakeBook())
    expect(patchSpy).toHaveBeenCalledWith({
      url: 'any_url',
      body: makeFakeBook()
    })
  })

  it('Should return book on patch succeed', async () => {
    const { sut } = makeSut()
    const response = await sut.update(makeFakeBook())
    expect(response.id).toBe('any_id')
    expect(response.book_name).toBe('any_book')
  })

  it('Should throw an invalid params error on patch return 400', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'patch').mockReturnValueOnce(Promise.resolve({ statusCode: 400 }))
    const promise = sut.update(makeFakeBook())
    expect(promise).rejects.toThrow(new InvalidParamsError())
  })
  /*
  it('Should throw an unexpected error on getBy return an error', async () => {
    const { sut, httpClientStub } = makeSut()
    jest
      .spyOn(httpClientStub, 'getBy')
      .mockReturnValueOnce(Promise.resolve({ statusCode: 500 }))
    const promise = sut.getBy(makeFakeBook())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  it('Should throw if httpclient throws', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'getBy').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.getBy(makeFakeBook())
    expect(promise).rejects.toThrow()
  }) */
})
