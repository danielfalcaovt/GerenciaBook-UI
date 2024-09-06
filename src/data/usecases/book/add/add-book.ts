import { InvalidParamsError } from "../../../../domain/errors/invalid-params-error";
import { UnexpectedError } from "../../../../domain/errors/unexpected-error";
import { IBook } from "../../../../domain/protocols/book/book";
import { IAddBook, IAddBookModel } from "../../../../domain/usecases/book/iadd-book";
import { IHttpPostClient } from "../../../protocols/http/post/http-post-client";

export class AddBook implements IAddBook {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpPostClient
  ) {}
   async add(book: IAddBookModel): Promise<IBook> {
     const result = await this.httpClient.post({ url: this.url, body: book })
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