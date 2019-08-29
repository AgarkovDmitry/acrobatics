import cookies from 'js-cookie'

const key = 'auth'

export const readAuthFromCookies = () => {
  if (!cookies || !cookies.get) {
    return null
  }

  const token = cookies.get(key)

  if (!token) {
    return null
  }

  return token
}

export const writeAuthToCookies = token => {
  cookies.set(key, token)
  return token
}

export const clearAuthFromCookies = () => {
  cookies.remove(key)
}
