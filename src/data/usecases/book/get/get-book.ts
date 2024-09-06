import { InvalidParamsError } from "../../../../domain/errors/invalid-params-error";
import { UnexpectedError } from "../../../../domain/errors/unexpected-error";
import { IBook } from "../../../../domain/protocols/book/book";
import { IGetBook, IGetBookModel } from "../../../../domain/usecases/book/iget-book";
import { IHttpGetByClient } from "../../../protocols/http/get/http-get-by-client";

export class RemoteGetBook implements IGetBook {
  constructor (
    private readonly url: string,
    private readonly httpClient: IHttpGetByClient
  ) {}
  async getBy(book: IGetBookModel): Promise<IBook[]> {
    const response = await this.httpClient.getBy({ url: this.url, body: book })
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