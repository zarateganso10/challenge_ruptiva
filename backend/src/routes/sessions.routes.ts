import { Router, Request, Response } from 'express'

import { authenticateUser } from '../services/session'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body

  const { user, token } = await authenticateUser({
    email,
    password
  })

  return response.json({ user, token })
})

export default sessionsRouter
