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
    await this.httpClient.patch({ url: this.url, body: book })
    return Promise.resolve({} as IBook)
  }
}
