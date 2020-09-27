import { Router, Request, Response } from 'express'

import { createWish, getWishByUserId, deleteWishById } from '../services/wish'

const wishesRouter = Router()

//Create User
wishesRouter.post('/', async (request: Request, response: Response) => {
  const { name, description, user_id } = request.body

  const wishCreated = await createWish({ name, description, user_id })

  return response.status(201).json(wishCreated)
})

wishesRouter.get('/:user_id', async (request: Request, response: Response) => {
  const { user_id } = request.params

  const wishes = await getWishByUserId(user_id)

  return response.json(wishes)
})

wishesRouter.delete('/:id', async (request: Request, response: Response) => {
  const { id } = request.params

  await deleteWishById(id)

  return response.send()
})

export default wishesRouter
