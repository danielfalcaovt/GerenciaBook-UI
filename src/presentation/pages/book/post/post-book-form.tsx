/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { DataContext } from '../../../../main/context/data-context'
import { HttpResponse } from '../../../protocols/http'

const bookSchema = yup.object().shape({
  book_name: yup.string().required('O nome do livro é obrigatório'),
  student_name: yup.string().required('O nome do estudante é obrigatório.'),
  student_class: yup.string().notOneOf([''], 'A turma do aluno é obrigatória.'),
  lend_day: yup
    .string()
    .required('O dia do empréstimo é obrigatório.')
    .test(
      'GreatherThanToday',
      'O dia do empréstimo não pode ser maior do que o dia atual.',
      (value) => {
        if (new Date(value) > new Date()) {
          return false
        }
        return true
      }
    )
})

export default function PostBookForm(dependencies: { url: string, HttpClient: any }) {
  const { data, setData } = useContext<any>(DataContext)
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

  async function bookSubmit(value: any) {
    // input date retornando 1 dia anterior
    const lendDay = new Date(value.lend_day)
    lendDay.setDate(lendDay.getDate() + 1)
    // adiciona mais 1 dia na data retornada
    const request = {
      ...value,
      lend_day: lendDay.getTime()
    }

    const httpResponse = await dependencies.HttpClient
      .post({ url: dependencies.url, body: request })
      .then((response: HttpResponse) => {
        console.log(response)
        setData(response.body)
      })
      .catch((err: any) => {
        console.log(err)
      })
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
