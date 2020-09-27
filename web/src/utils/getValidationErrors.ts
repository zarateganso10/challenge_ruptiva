import { ValidationError } from 'yup'

interface Errors {
  [key: string]: string
}

export default function getValidationErrors(error: ValidationError): Errors {
  const validationsErros: Errors = {}

  error.inner.forEach((error) => {
    validationsErros[error.path] = error.message
  })

  return validationsErros
}
