import { InvalidParamsError } from '../../../../domain/errors/invalid-params-error'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'
import {
  IDeleteBook,
  IDeleteBookModel
} from '../../../../domain/usecases/book/idelete-book'
import { IHttpDeleteClient } from '../../../protocols/http/delete/http-delete-client'

export class RemoteDeleteBook implements IDeleteBook {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpDeleteClient
  ) {}
  async delete(book: IDeleteBookModel): Promise<boolean> {
    const result = await this.httpClient.delete({ url: this.url, body: book })
    switch (result.statusCode) {
      case 200:
        return Promise.resolve(result.body)
        break
      case 400:
        throw new InvalidParamsError()
        break
      default:
        throw new UnexpectedError()
        break
    }
  }
}
