import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authConfig from '../config/auth'

import AppError from '../errors/AppError'

import User from '../models/User'

interface RequestDTO {
  email: string
  password: string
}

interface ResponseDTO {
  user: User
  token: string
}

export async function authenticateUser({
  email,
  password
}: RequestDTO): Promise<ResponseDTO> {
  const usersRepository = getRepository(User)

  const user = await usersRepository.findOne({
    where: { email }
  })

  if (!user) {
    throw new AppError('Incorrect email/password combination.', 401)
  }

  const passwordMatched = await compare(password, user.password)

  if (!passwordMatched) {
    throw new AppError('Incorrect email/password combination.', 401)
  }

  const { secret, expiresIn } = authConfig.jwt

  const token = sign({}, secret, {
    subject: user.id,
    expiresIn
  })

  delete user.created_at
  delete user.updated_at
  delete user.password

  return {
    user,
    token
  }
}
