/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { IHttpGetClient } from "../../../protocols/http-get-client"
import { HttpResponse } from "../../../protocols/http"

const bookSchema = yup.object().shape({
  book_name: yup.string(),
  student_name: yup.string(),
  student_class: yup.string().notOneOf([''], 'A turma do aluno é obrigatória.'),
  lend_day: yup
    .string()
    .test(
      'GreatherThanToday',
      'O dia do empréstimo não pode ser maior do que o dia atual.',
      (value) => {
        if (value) {
          if (new Date(value) > new Date()) {
            return false
          }
        }
        return true
      }
    )
})

export default function GetBookForm(dependencies: {
  url: string,
  HttpClient: IHttpGetClient,
  context: React.Context<any>
}) {
  const {data, setData} = useContext(dependencies.context)
  const [formError, setFormError] = useState<string | boolean>(false)
  const [errorIsVisible, setErrorVisible] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(bookSchema),
    defaultValues: {
      lend_day: new Date().toISOString().slice(0, 10),
      student_class: ''
    }
  })

  async function bookSubmit(value: any) {
    console.log(value.lend_day)
    /* 
        formato new Date() no javascript quando 
        chamado com uma isostring, retorna com o 
        horário as meia noite, fazendo com que o 
        dia seja retornado como o anterior.
    */
    // lendDay = new Date( alterando o horário da data recebida no formato ISOString )
    const lendDay = new Date(value.lend_day + 'T10:20:20.200Z')
    const request = {
      ...value,
      lend_day: lendDay.getTime()
    }
    dependencies.HttpClient.get(request)
    .then((response: HttpResponse) => {
      if (response.statusCode === 200) {
        setData((oldValue: any) => {
          return {
            ...oldValue,
            books: response.body
          }
        })
      }
    })
    .catch((err: any) => {
      setFormError(err.body)
      setErrorVisible(true)
      setTimeout(() => {
        setErrorVisible(false)
      }, 3000)
    })
    .finally(() => {
      console.log(data)
    })
  }

  async function invalidRequest(data: any) {
    if (!errorIsVisible) {
      for (const pos of [
        'book_name',
        'student_name',
        'student_class',
        'lend_day'
      ]) {
        if (data[pos]) {
          setFormError(data[pos].message)
          break
        }
      }
      setErrorVisible(true)
      setTimeout(() => {
        setErrorVisible(false)
      }, 3000)
    }
  }

  return (
    <>
    <form
      method="POST"
      onSubmit={handleSubmit(bookSubmit, invalidRequest)}
      autoComplete="off"
    >
      <input
        type="text"
        {...register('book_name')}
        id="book_name"
        placeholder="Nome do livro"
      />
      <input
        type="text"
        {...register('student_name')}
        id="student_name"
        placeholder="Nome do estudante"
      />
      <select {...register('student_class')}>
        <option value="" disabled>
          Selecione a turma:
        </option>
        <option value={601}>601</option>
        <option value={602}>602</option>
        <option value={603}>603</option>
        <option value={701}>701</option>
        <option value={702}>702</option>
        <option value={703}>703</option>
        <option value={801}>801</option>
        <option value={802}>802</option>
        <option value={803}>803</option>
        <option value={901}>901</option>
        <option value={902}>902</option>
        <option value={903}>903</option>
        <option value={1001}>1001</option>
        <option value={1002}>1002</option>
        <option value={1003}>1003</option>
        <option value={2001}>2001</option>
        <option value={2002}>2002</option>
        <option value={2003}>2003</option>
        <option value={3001}>3001</option>
        <option value={3002}>3002</option>
        <option value={3003}>3003</option>
      </select>
      <input type="date" {...register('lend_day')} />
      <button>Enviar</button>
    </form>
    <div
      id="error-modal"
      style={{
        opacity: errorIsVisible ? 1 : 0,
        zIndex: errorIsVisible ? 99 : 0
      }}
    >
      {formError}
    </div>
  </>
  )
}