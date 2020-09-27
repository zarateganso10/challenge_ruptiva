import React, { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import { useModal } from '../../hooks/modal'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Header, Content, Card } from './styles'

import DeleteIcon from '../../assets/cancel.svg'
import { FaArrowLeft } from 'react-icons/fa'

import api from '../../services/api'

interface FormCreateWishData {
  name: string
  description: string
}

interface WishesProps {
  id: string
  user_id: string
  name: string
  description: string
  created_at: Date
  updated_at: Date
  format_date: string
}

const Dashboard: React.FC = () => {
  const [wishes, setWishes] = useState<Array<WishesProps>>([])

  const history = useHistory()

  const { user, signOut } = useAuth()
  const { addToast } = useToast()
  const { addModal } = useModal()

  const handleModal = useCallback(
    (wish) => {
      addModal(wish)
    },
    [addModal]
  )

  const handleDeleteWish = useCallback(
    async (id) => {
      try {
        await api.delete(`wishes/${id}`)
        setWishes(wishes.filter((wish) => wish.id !== id))
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Cant delete wish'
        })
      }
    },
    [addToast, wishes]
  )

  const handleLogout = useCallback(() => {
    signOut()
    history.push('/')
  }, [history, signOut])

  const handleSubmit = useCallback(
    async ({ name, description }: FormCreateWishData) => {
      const responseWish = await api.post<Omit<WishesProps, 'format_date'>>(
        'wishes',
        { name, description, user_id: user.id }
      )

      const createdWish = responseWish.data

      const date = new Date(createdWish.created_at)

      const wish = {
        ...createdWish,
        format_date: date.toLocaleDateString('pt-BR')
      }

      setWishes([...wishes, wish])
    },
    [user.id, wishes]
  )

  useEffect(() => {
    api.get(`wishes/${user.id}`).then((response) => {
      setWishes(
        response.data.map((data: Omit<WishesProps, 'format_data'>) => {
          const date = new Date(data.created_at)
          return {
            ...data,
            format_date: date.toLocaleDateString('pt-BR')
          }
        })
      )
    })
  }, [user.id])

  return (
    <>
      <Header>
        <div>
          <button onClick={handleLogout}>
            <FaArrowLeft size={24} /> <span>Sair</span>
          </button>
        </div>

        <Form onSubmit={handleSubmit}>
          <div>
            <Input name='name' placeholder='Nome' />
          </div>
          <div>
            <Input name='description' placeholder='Descrição' />
          </div>
          <Button type='submit'>Adicionar</Button>
        </Form>
      </Header>
      <Content>
        {wishes.map((wish) => (
          <Card key={wish.id}>
            <div onClick={() => handleModal(wish)}>
              <span>{wish.name}</span>
            </div>
            <button onClick={() => handleDeleteWish(wish.id)}>
              <img src={DeleteIcon} alt='Delete' />
            </button>
          </Card>
        ))}
      </Content>
    </>
  )
}

export default Dashboard
