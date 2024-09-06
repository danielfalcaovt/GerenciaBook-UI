import { IBook } from "../../../../domain/protocols/book/book";
import { IGetBook, IGetBookModel } from "../../../../domain/usecases/book/iget-book";
import { IHttpGetByClient } from "../../../protocols/http/get/http-get-by-client";

export class GetBook implements IGetBook {
  constructor (
    private readonly url: string,
    private readonly httpClient: IHttpGetByClient
  ) {}
  async getBy(book: IGetBookModel): Promise<IBook[]> {
    await this.httpClient.getBy({ url: this.url, body: book })
    return Promise.resolve([])
  }
}