import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError'

import User from '../models/User'

interface RequestDTO {
  email: string
  password: string
}

export async function checkUserExists(email: string): Promise<boolean> {
  const usersRepository = getRepository(User)

  const checkUserExists = await usersRepository.findOne({
    where: { email }
  })

  if (checkUserExists) {
    return true
  }
  return false
}

export async function createUser({
  email,
  password
}: RequestDTO): Promise<User> {
  const usersRepository = getRepository(User)

  const userExists = await checkUserExists(email)

  if (userExists) {
    throw new AppError('Email address already used.')
  }

  const hashedPassword = await hash(password, 8)

  const user = usersRepository.create({
    email,
    password: hashedPassword
  })

  await usersRepository.save(user)

  return user
}
