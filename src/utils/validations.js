export const passwordValidation = value => {
  if (!value || value.length < 6) {
    return 'Password must contain at least 6 symbols'
  }

  return null
}

export const termsValidation = value => {
  if (value === false) {
    return 'Terms need to be accepted'
  }

  return null
}

export const baseEmailValidation = value => {
  const re = new RegExp(/\S+@\S+\.\S+/)
  if (!value || !re.test(value)) {
    return 'Please enter a valid email address'
  }

  return null
}

export const passwordsValidation = values => {
  if (values.password !== values.confirmPassword) {
    return { passwords: 'Passwords must be equal' }
  }

  return null
}
