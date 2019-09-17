import { get } from 'lodash'
import Router from 'next/router'
import { createContext } from 'react'

export const AuthContext = createContext()
export const getAuth = ctx => getCookie('auth', get(ctx, 'req.headers.cookie'))

function redirigirA(destino, res, status = 301) {
  if (res) {
    res.writeHead(status, { Location: destino })
    res.end()
  } else {
    if (destino[0] === '/' && destino[1] !== '/') {
      Router.push(destino)
    } else {
      window.location = destino
    }
  }
}
const conRedireccionSiAutenticado = (debeEstarAutenticado, rutaARedirigir) => pagina => {
  const { getInitialProps } = pagina
  pagina.getInitialProps = ctx => {
    const auth = getAuth(ctx)
    if (debeEstarAutenticado === !!auth) {
      redirigirA(rutaARedirigir, ctx.res)
    }
    return getInitialProps ? getInitialProps(ctx) : {}
  }
  return pagina
}

export const redirigirSiEstaAutenticado = conRedireccionSiAutenticado(true, '/')
export const redirigirSiNoEstaAutenticado = conRedireccionSiAutenticado(false, '/registro')

function setCookie(nombre, valor, horas = 360 * 24) {
  let cookie = `${encodeURIComponent(nombre)}=${btoa(JSON.stringify(valor))};path=/;`
  if (horas) {
    const d = new Date()
    d.setTime(d.getTime() + (horas * 60 * 60 * 1000))
    cookie += `expires=${d.toUTCString()}`
  }
  return document.cookie = cookie
}
const decode = this && this.atob ? atob : s => Buffer.from(s, 'base64').toString('ascii')
function getCookie(nombre, cookie = document.cookie) {
  const encoded = ` ${encodeURIComponent(nombre)}=`
  const start = cookie.indexOf(encoded) + encoded.length
  if (start < encoded.length) return null
  const stop = cookie.indexOf(';', start)
  const value = cookie.slice(start, stop === -1 ? undefined : stop)
  return JSON.parse(decode(value))
}

export const setUsuario = usuario => setCookie('auth', usuario)
export const removeUsuario = () => setCookie('auth', '', -1)
export const getUsuario = () => getCookie('auth')
