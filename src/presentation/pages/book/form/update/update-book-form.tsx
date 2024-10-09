/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import React from 'react'
import { IBook } from '../../../../../domain/protocols/book/book'
import { IUpdateBook } from '../../../../../domain/usecases/book/iupdate-book'
import TrashButton from '../../../../elements/trash'
import { LoaderContext } from '../../../../../main/context/loader-context'

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
    ),
  phone: yup.string().nullable().optional()
})

export default function UpdateBookForm(dependencies: {
  updateBook: IUpdateBook
  context: React.Context<any>
}) {
  const { data, setData } = useContext(dependencies.context)
  const [formError, setFormError] = useState<string | boolean>(false)
  const [errorIsVisible, setErrorVisible] = useState(false)
  const { setLoading } = useContext(LoaderContext)
  const { register, setValue, handleSubmit, reset } = useForm({
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
        'student_class',
        'phone'
      ] as (
        | 'id'
        | 'book_name'
        | 'student_name'
        | 'student_class'
        | 'phone'
      )[]) {
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

  async function bookSubmit(data: any) {
    reset()
    const request = data
    if (data.lend_day) {
      request.lend_day = new Date(data.lend_day + 'T10:20:20.200Z').getTime()
    }
    setLoading(true)
    dependencies.updateBook
      .update(request)
      .then((response: IBook[]) => {
        setData((oldValue: any) => {
          const bookArray = oldValue.books?.filter(
            (book: IBook) => book.id !== data.id
          )
          bookArray.push(response[0])
          console.log(response)
          return {
            ...oldValue,
            books: bookArray,
            filteredBooks: undefined
          }
        })
      })
      .catch((err: any) => {
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

  async function invalidRequest(_data: any) {
    if (!errorIsVisible) {
      setFormError('Selecione um empréstimo para alterar.')
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
      <div id="formTitle">
        <h1>CORREÇÃO</h1>
      </div>
      <TrashButton onClick={deleteSelectedBook} />
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
          disabled={data.selectedBook ? false : true}
        />
        <input
          maxLength={100}
          type="text"
          {...register('student_name')}
          id="student_name"
          placeholder="Nome do estudante"
          disabled={data.selectedBook ? false : true}
        />
        <select
          {...register('student_class')}
          disabled={data.selectedBook ? false : true}
        >
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
        <input
          id="lend_day"
          type="date"
          {...register('lend_day')}
          disabled={data.selectedBook ? false : true}
        />
        <input
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
