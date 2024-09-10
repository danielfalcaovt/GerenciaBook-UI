/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../main/context/data-context'

export default function Aside(props: any) {
  const { setData } = useContext(DataContext)
  return (
    <aside style={props.mobileMenuVisibility ? { transform: 'translateX(0)' }: {}}>
      <div id="aside-header">
        <Link
          to={'/book'}
          onClick={() => {
            props.setMobileMenuVisibility(false)
            props.setStyle({
              bookContainer: {
                gridTemplateRows: '1fr'
              },
              bookSection: {
                gridArea: '1 / 1 / 1 / 1'
              }
            })
            setData((oldValue: any) => {
              return {
                ...oldValue,
                filteredBooks: undefined,
                selectedBook: undefined
              }
            })
          }}
        >
          <img
            src="/assets/pages/login/gerenciabook.png"
            alt="livro acima de um texto escrito gerencia book"
          ></img>
        </Link>
      </div>
      <div id="link-container">
        <ul id="link-main">
          <li>
            <Link
              style={
                window.location.pathname === '/book/cadastrar'
                  ? {
                      background: 'rgb(0, 63, 122)',
                      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.336)'
                    }
                  : {}
              }
              to={'/book/cadastrar'}
              onClick={() => {
                props.setMobileMenuVisibility(false)
                props.setStyle({
                  bookContainer: {
                    gridTemplateRows: '0.5fr 0.5fr'
                  },
                  bookSection: {
                    gridArea: '2 / 1 / 2 / 1'
                  }
                })
              }}
            >
              <div>
                <img
                  src="/assets/pages/books/add-book.png"
                  alt="botão para adicionar novo empréstimo"
                />
              </div>
              <p>Emprestar</p>
            </Link>
          </li>
          <li>
            <Link
              style={
                window.location.pathname === '/book/consultar'
                  ? {
                      background: 'rgb(0, 63, 122)',
                      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.336)'
                    }
                  : {}
              }
              to={'/book/consultar'}
              onClick={() => {
                props.setMobileMenuVisibility(false)
                props.setStyle({
                  bookContainer: {
                    gridTemplateRows: '0.5fr 0.5fr'
                  },
                  bookSection: {
                    gridArea: '2 / 1 / 2 / 1'
                  }
                })
              }}
            >
              <div>
                <img
                  src="/assets/pages/books/search-book.png"
                  alt="botão para buscar um empréstimo"
                />
              </div>
              <p>Consultar</p>
            </Link>
          </li>
          <li>
            <Link
              style={
                window.location.pathname === '/book/atualizar'
                  ? {
                      background: 'rgb(0, 63, 122)',
                      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.336)'
                    }
                  : {}
              }
              to={'/book/atualizar'}
              onClick={() => {
                props.setMobileMenuVisibility(false)
                props.setStyle({
                  bookContainer: {
                    gridTemplateRows: '0.5fr 0.5fr'
                  },
                  bookSection: {
                    gridArea: '2 / 1 / 2 / 1'
                  }
                })
              }}
            >
              <div>
                <img
                  src="/assets/pages/books/patch-book.png"
                  alt="botão para atualizar um empréstimo"
                />
              </div>
              <p>Alterar</p>
            </Link>
          </li>
          <li>
            <Link
              style={
                window.location.pathname === '/book/devolver'
                  ? {
                      background: 'rgb(0, 63, 122)',
                      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.336)'
                    }
                  : {}
              }
              to={'/book/devolver'}
              onClick={() => {
                props.setMobileMenuVisibility(false)
                props.setStyle({
                  bookContainer: {
                    gridTemplateRows: '0.5fr 0.5fr'
                  },
                  bookSection: {
                    gridArea: '2 / 1 / 2 / 1'
                  }
                })
              }}
            >
              <div>
                <img
                  src="/assets/pages/books/delete-book.png"
                  alt="botão para confirmar devolução"
                />
              </div>
              <p>Devolução</p>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
