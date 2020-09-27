import React, { useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Background, Content } from './styles'

interface SignUpFormData {
  email: string
  password: string
  repeatPassword: string
}

interface Errors {
  [key: string]: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async ({ email, password, repeatPassword }: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('E-mail nao valido'),
          password: Yup.string().min(
            8,
            'Senha deve ter no minimo 8 caracteres'
          ),
          repeatPassword: Yup.string().min(
            8,
            'Senha deve ter no minimo 8 caracteres'
          )
        })
        await schema.validate(
          { email, password, repeatPassword },
          {
            abortEarly: false
          }
        )

        if (!(repeatPassword === password)) {
          const errors: Errors = {}
          errors['repeatPassword'] = 'Senha nao coincidem'
          formRef.current?.setErrors(errors)

          addToast({
            type: 'error',
            title: 'Erro no formulario',
            description: 'As senhas nao coincidem'
          })
          return
        }

        await api.post('/users', { email, password })

        addToast({
          type: 'success',
          title: 'Usuario criado com sucesso'
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)

          formRef.current?.setErrors(errors)
          return
        }
        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na autenticacao',
          description:
            'Ocorreu um erro ao fazer o cadastro, cheque as credenciais'
        })
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Background>
        <h1>Wish List</h1>
        <p>
          Crie sua conta para aproveitar o nosso sistema de criacao de lista
          personalizadas
        </p>
      </Background>
      <Content>
        <h2>Crie sua conta</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Input name='email' placeholder='E-mail' icon={FiMail} />
          </div>
          <div>
            <Input
              name='password'
              placeholder='Senha'
              type='password'
              icon={FiLock}
            />
          </div>
          <div>
            <Input
              name='repeatPassword'
              placeholder='Repetir senha'
              type='password'
              icon={FiLock}
            />
          </div>
          <Button type='submit'>Cadastrar</Button>
        </Form>
        <p>
          Já tem conta na Wish? <Link to={'/'}>Pagina de login</Link>
        </p>
      </Content>
    </Container>
  )
}

export default SignUp
