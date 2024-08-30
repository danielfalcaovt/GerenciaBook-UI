import { IHttpPostClient } from "../../data/protocols/http/http-post-client"

export interface LoginControllerDependencies {
  httpPostClient: IHttpPostClient
  url: string
}

export interface SignUpControllerDependencies {
  httpPostClient: IHttpPostClient
  url: string
}
