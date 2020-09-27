import { Router, Request, Response, request } from 'express'

import { createUser } from '../services/user'

const usersRouter = Router()

//Create User
usersRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body

  const userCreated = await createUser({ email, password })

  delete userCreated.password

  return response.status(201).json(userCreated)
})

export default usersRouter
