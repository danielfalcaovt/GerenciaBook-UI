import { IBook } from "../../../../domain/protocols/book/book";
import { IAddBook, IAddBookModel } from "../../../protocols/book/iadd-book";
import { IHttpPostClient } from "../../../protocols/http/post/http-post-client";

export class AddBook implements IAddBook {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpPostClient
  ) {}
   async add(book: IAddBookModel): Promise<IBook> {
     await this.httpClient.post({ url: this.url, body: book })
     return new Promise(resolve => resolve({} as IBook))
   }
}