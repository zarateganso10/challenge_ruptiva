import { Router } from 'express'

import usersRouter from './users.routes'
import wishesRouter from './wishes.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/wishes', wishesRouter)
routes.use('/sessions', sessionsRouter)

export default routes
