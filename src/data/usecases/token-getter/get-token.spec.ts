/* eslint-disable @typescript-eslint/no-unused-vars */
import { ItemStorage } from "../../protocols/token/item-storage"
import { GetToken } from "./get-token"

interface SutTypes {
  sut: GetToken
  getTokenStub: ItemStorage
} 

const makeSut = (): SutTypes => {
  const getTokenStub = makeGetTokenStub()
  const sut = new GetToken(getTokenStub)
  return {
    sut,
    getTokenStub
  }
}

const makeGetTokenStub = (): ItemStorage => {
  class GetTokenStub implements ItemStorage {
    getItem(item: string): string {
      return 'any_token'
    }
  }
  return new GetTokenStub()
}

describe('TokenGetter', () => {
  it('Should call getItem with correct value', () => {
    const { sut, getTokenStub } = makeSut()
    const getSpy = jest.spyOn(getTokenStub, 'getItem')
    sut.getToken('token')
    expect(getSpy).toHaveBeenCalledWith('token')
  })
  it('Should return getItem result', () => {
    const { sut } = makeSut()
    const result = sut.getToken('token')
    expect(result).toBe('any_token')
  })
  it('Should throw if getItem throws', () => {
    const { sut, getTokenStub } = makeSut()
    jest.spyOn(getTokenStub, 'getItem').mockImplementation(() => {
      throw new Error()
    })
    expect(sut.getToken).toThrow()
  })
})