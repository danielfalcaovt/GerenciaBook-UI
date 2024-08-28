/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { IHttpPostClient } from '../../data/protocols/http/http-post-client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

interface LoginDependencies {
  httpPostClient: IHttpPostClient
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Endereço de email inválido.')
    .required('O email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve possuir no mínimo 6 caracteres.')
    .required('A senha é obrigatória')
})

export default function Login(dependencies: LoginDependencies) {
  const [validationError, setValidationError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) })
  // validar todos os dados: ReactForm
  // Enviar para o axios
  // Enviar para o local storage
  // Alterar o data context
  // Conduzir usuário para próxima página
  async function loginSubmit(data: any) {
    setValidationError(false)
    dependencies.httpPostClient.post({ url:  })
  }

  async function invalidRequest(data: any) {
    for (const pos of ['email', 'password']) {
      if (data[pos]) {
        setValidationError(true)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(loginSubmit, invalidRequest)}>
      <input
        type="email"
        {...register('email', { required: 'O email é obrigatório.' })}
      ></input>
      <input
        type="password"
        {...register('password', { required: 'A senha é obrigatória.' })}
      ></input>
      {(validationError && errors.email || errors.password) && <span>Preencha os campos corretamente.</span>}
      <button>Enviar</button>
    </form>
  )
}
