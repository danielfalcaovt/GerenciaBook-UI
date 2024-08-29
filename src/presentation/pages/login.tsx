/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { LoginControllerDependencies } from '../protocols/controller'

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

export default function Login(data: LoginControllerDependencies) {
  const [formError, setFormError] = useState<string | boolean>(false)
  const [rememberPassword, setRememberPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) })
  // Alterar o data context
  // Conduzir usuário para próxima página
  async function loginSubmit(userData: any) {
    await data.httpPostClient
      .post({ url: data.url, body: userData })
      .then((response) => {
        if (response.statusCode === 200) {
          setFormError(false)
          const token = response.body
          localStorage.setItem('token', token)
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setFormError('Credenciais Inválidas.')
        } else {
          setFormError('Ocorreu um erro inesperado.')
        }
      })
  }

  async function invalidRequest(data: any) {
    for (const pos of ['email', 'password']) {
      if (data[pos]) {
        setFormError(
          `Preencha o campo ${
            pos === 'password' ? 'senha' : 'email'
          } corretamente.`
        )
      }
    }
  }

  return (
    <main id="login-page">
      <article id="login-background"></article>
      <article id="login-form-container">
        <div id='login-header'>
          <img src='/assets/pages/login/gerenciabook.png' alt='livro acima de um texto escrito gerencia book'></img>
        </div>
        <form
          id="login-form"
          onSubmit={handleSubmit(loginSubmit, invalidRequest)}
        >
          <div className="form-input-container">
            <input
              className="form-input"
              placeholder="Endereço de email"
              type="email"
              {...register('email', { required: 'O email é obrigatório.' })}
            ></input>
            <span className="input-border"></span>
          </div>
          <div className="form-input-container">
            <input
              className="form-input"
              placeholder="Digite sua senha."
              type="password"
              {...register('password', { required: 'A senha é obrigatória.' })}
            ></input>
            <span className="input-border"></span>
          </div>
          <div id="form-options-div">
            <div id='remember-password'>
              <input
                onChange={(e) => {
                  if (e.target.checked) {
                    setRememberPassword(true)
                  } else {
                    setRememberPassword(false)
                  }
                }}
                type="checkbox"
                id="login-remember"
                name="login-remember"
              ></input>
              <label htmlFor="login-remember">Lembrar senha</label>
            </div>
            <div id='new-user'>
              <a href="">Cadastrar-se</a>
            </div>
          </div>
          <button>Enviar</button>
          {formError ? <span id="login-error">{formError}</span> : []}
        </form>
        <div id="login-footer">
          <img
            src="/assets/pages/login/logo-rj.png"
            alt="brasão do estado do rio de janeiro"
          ></img>
        </div>
      </article>
    </main>
  )
}
