import { HttpResponse } from "../../../presentation/protocols/http"

export interface IAddAccountModel {
  name: string
  email: string
  password: string
}

export interface IAddAccount {
  add(account: IAddAccountModel): Promise<HttpResponse>
}