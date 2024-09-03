import { IGetToken } from "../../../domain/usecases/token/iget-token";
import { ItemStorage } from "../../protocols/token/item-storage";

export class GetToken implements IGetToken {
  constructor(private readonly itemStorage: ItemStorage) {}
  getToken(key: string): string {
    this.itemStorage.getItem(key)
    return ''
  }
}