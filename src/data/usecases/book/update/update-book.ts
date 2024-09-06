import { InvalidParamsError } from '../../../../domain/errors/invalid-params-error'
import { UnexpectedError } from '../../../../domain/errors/unexpected-error'
import { IBook } from '../../../../domain/protocols/book/book'
import {
  IUpdateBook,
  IUpdateBookModel
} from '../../../../domain/usecases/book/iupdate-book'
import { IHttpPatchClient } from '../../../protocols/http/patch/http-patch-client'

export class RemoteUpdateBook implements IUpdateBook {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpPatchClient
  ) {}
  async update(book: IUpdateBookModel): Promise<IBook> {
    const response = await this.httpClient.patch({ url: this.url, body: book })
    switch (response.statusCode) {
      case 200:
        return Promise.resolve(response.body)
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
