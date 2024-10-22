/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IAddBook } from '../../../../../domain/usecases/book/iadd-book'
import { IBook } from '../../../../../domain/protocols/book/book'
import { LoaderContext } from '../../../../../main/context/loader-context'

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
    ),
  phone: yup.string().nullable().optional()
})

export default function PostBookForm(dependencies: {
  addBook: IAddBook
  context: React.Context<any>
}) {
  const [formError, setFormError] = useState<string | boolean>(false)
  const [errorIsVisible, setErrorVisible] = useState(false)
  const { setData } = useContext<any>(dependencies.context)
  const { setLoading } = useContext(LoaderContext)
  const { register, reset, handleSubmit } = useForm({
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
        'lend_day',
        'phone'
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

  async function bookSubmit(data: any) {
    reset()
    /* 
        formato new Date() no javascript quando 
        chamado com uma isostring, retorna com o 
        horário as meia noite, fazendo com que o 
        dia seja retornado como o anterior.
    */
    // lendDay = new Date( alterando o horário da data recebida no formato ISOString )

    setLoading(true)
    dependencies.addBook
      .add(data)
      .then((response: IBook) => {
        setData((oldValue: any) => {
          const oldBooks =
            oldValue.books && oldValue.books?.length > 0 ? oldValue.books : []
          if (oldBooks && oldBooks.length > 0) {
            return {
              ...oldValue,
              filteredBooks: undefined,
              books: [...oldBooks, response],
              selectedBook: response
            }
          } else {
            return {
              ...oldValue,
              books: [response]
            }
          }
        })
      })
      .catch((err: Error) => {
        setFormError(err.message)
        setErrorVisible(true)
        setLoading(false)
        setTimeout(() => {
          setErrorVisible(false)
        }, 3000)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div id="formTitle">
        <h1>EMPRÉSTIMO</h1>
      </div>
      <form
        method="POST"
        onSubmit={handleSubmit(bookSubmit, invalidRequest)}
        autoComplete="off"
      >
        <input
          maxLength={100}
          type="text"
          {...register('book_name')}
          id="book_name"
          placeholder="Nome do livro"
        />
        <input
          maxLength={100}
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
          <option value={704}>704</option>
          <option value={801}>801</option>
          <option value={802}>802</option>
          <option value={803}>803</option>
          <option value={901}>901</option>
          <option value={902}>902</option>
          <option value={903}>903</option>
          <option value={904}>904</option>
          <option value={1001}>1001</option>
          <option value={1002}>1002</option>
          <option value={1003}>1003</option>
          <option value={1004}>1004</option>
          <option value={1005}>1005</option>
          <option value={2001}>2001</option>
          <option value={2002}>2002</option>
          <option value={2003}>2003</option>
          <option value={2004}>2004</option>
          <option value={2005}>2005</option>
          <option value={3001}>3001</option>
          <option value={3002}>3002</option>
          <option value={3003}>3003</option>
          <option value={'CF4'}>CF4</option>
          <option value={'AP2'}>AP2</option>
        </select>
        <input id="lend_day" type="date" {...register('lend_day')} />
        <input
          minLength={9}
          maxLength={11}
          id="phone"
          placeholder="Celular"
          type="number"
          {...register('phone')}
        />
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
