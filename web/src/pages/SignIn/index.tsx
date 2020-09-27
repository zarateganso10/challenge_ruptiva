import React, { useCallback, useRef } from 'react'
import { FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Background, Content } from './styles'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('E-mail nao valido'),
          password: Yup.string().min(8, 'Senha deve ter no minimo 8 caracteres')
        })
        await schema.validate(
          { email, password },
          {
            abortEarly: false
          }
        )
        await signIn({ email, password })
        history.push('/dashboard')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)

          formRef.current?.setErrors(errors)
          return
        }
        console.log('passou')
        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na autenticacao',
          description: 'Ocorreu um erro ao fazer o login, cheque as credenciais'
        })
      }
    },
    [signIn, history, addToast]
  )

  return (
    <Container>
      <Content>
        <h2>Faca seu login</h2>
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
          <Button type='submit'>Entrar</Button>
        </Form>
        <p>
          Nao tem conta na Wish? <Link to={'/signup'}>Criar conta</Link>
        </p>
      </Content>
      <Background>
        <h1>Wish List</h1>
        <p>Faça login e crie sua lista personalizada de desejos</p>
      </Background>
    </Container>
  )
}

export default SignIn
