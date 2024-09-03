import { ItemStorage } from "../../data/protocols/token/item-storage";

export class LocalStorageRepository implements ItemStorage {
  getItem(item: string): string | null {
    const token = localStorage.getItem(item)
    if (typeof token === 'string') {
      return token
    } else {
      return null
    }
  }
}