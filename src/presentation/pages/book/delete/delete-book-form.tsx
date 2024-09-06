/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { IHttpDeleteClient } from '../../../protocols/http-delete-client'
import { HttpResponse } from '../../../protocols/http'
import React from 'react'
import { IBook } from '../../../../domain/protocols/book/book'

const bookSchema = yup.object().shape({
  id: yup.string().required('Selecione um empréstimo antes de continuar.'),
  book_name: yup.string(),
  student_name: yup.string(),
  student_class: yup.string(),
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

export default function DeleteBookForm(dependencies: {
  url: string
  HttpClient: IHttpDeleteClient
  context: React.Context<any>
}) {
  const { data, setData } = useContext(dependencies.context)
  const [formError, setFormError] = useState<string | boolean>(false)
  const [errorIsVisible, setErrorVisible] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(bookSchema),
    defaultValues: {
      student_class: ''
    }
  })

  useEffect(() => {
    if (data.selectedBook) {
      setErrorVisible(false)
      for (const pos of [
        'id',
        'student_name',
        'book_name',
        'student_class'
      ] as ('id' | 'book_name' | 'student_name' | 'student_class')[]) {
        setValue(pos, data.selectedBook[pos])
      }
      const lendDay = new Date(Number(data.selectedBook.lend_day))
        .toISOString()
        .slice(0, 10)
      setValue('lend_day', lendDay)
    } else {
      reset()
    }
  }, [data.selectedBook])

  async function bookSubmit(value: any) {
    const request = {
      url: dependencies.url,
      body: {
        id: value.id
      }
    }
    dependencies.HttpClient.delete(request)
      .then((response: HttpResponse) => {
        if (response.statusCode === 200) {
          setData((oldValue: any) => {
            const bookArray = oldValue.books.filter(
              (book: IBook) => book.id !== value.id
            )
            return {
              ...oldValue,
              books: bookArray,
              selectedBook: undefined
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
      setFormError('Selecione um empréstimo para confirmar a devolução.')
      setErrorVisible(true)
      setTimeout(() => {
        setErrorVisible(false)
      }, 3000)
    }
  }

  function deleteSelectedBook() {
    setData((oldValue: any) => {
      return {
        ...oldValue,
        selectedBook: undefined
      }
    })
  }

  return (
    <>
      <button onClick={deleteSelectedBook}>remover id</button>
      <form
        method="POST"
        onSubmit={handleSubmit(bookSubmit, invalidRequest)}
        autoComplete="off"
      >
        <input
          disabled
          type="text"
          {...register('book_name')}
          id="book_name"
          placeholder="Nome do livro"
        />
        <input
          disabled
          type="text"
          {...register('student_name')}
          id="student_name"
          placeholder="Nome do estudante"
        />
        <select disabled {...register('student_class')}>
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
        <input disabled type="date" {...register('lend_day')} />
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