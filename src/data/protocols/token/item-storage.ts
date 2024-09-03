export interface ItemStorage {
  getItem(item: string): string | null
}