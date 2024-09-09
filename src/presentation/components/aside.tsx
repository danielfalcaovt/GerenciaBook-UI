/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../main/context/data-context'

export default function Aside(props: any) {
  const { data, setData } = useContext(DataContext)
  return (
    <aside>
      <div id="aside-header">
        <Link
          to={'/book'}
          onClick={() => {
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
              to={'/book/cadastrar'}
              onClick={()=>{props.setStyle({
                bookContainer: {
                  gridTemplateRows: '0.5fr 0.5fr'
                },
                bookSection: {
                  gridArea: '2 / 1 / 2 / 1'
                }
              })}}
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
              to={'/book/atualizar'}
              onClick={()=>{props.setStyle({
                bookContainer: {
                  gridTemplateRows: '0.5fr 0.5fr'
                },
                bookSection: {
                  gridArea: '2 / 1 / 2 / 1'
                }
              })}}
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
              to={'/book/consultar'}
              onClick={()=>{props.setStyle({
                bookContainer: {
                  gridTemplateRows: '0.5fr 0.5fr'
                },
                bookSection: {
                  gridArea: '2 / 1 / 2 / 1'
                }
              })}}
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
              to={'/book/devolver'}
              onClick={()=>{props.setStyle({
                bookContainer: {
                  gridTemplateRows: '0.5fr 0.5fr'
                },
                bookSection: {
                  gridArea: '2 / 1 / 2 / 1'
                }
              })}}
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
