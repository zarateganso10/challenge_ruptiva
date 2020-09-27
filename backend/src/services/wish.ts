import { getRepository } from 'typeorm'

import AppError from '../errors/AppError'

import Wish from '../models/Wish'

interface RequestDTO {
  name: string
  description: string
  user_id: string
}

export async function createWish({
  name,
  description,
  user_id
}: RequestDTO): Promise<Wish> {
  const wishesRepository = getRepository(Wish)

  const wish = wishesRepository.create({
    name,
    description,
    user_id
  })

  await wishesRepository.save(wish)

  return wish
}

export async function getWishByUserId(id: string): Promise<Array<Wish>> {
  const wishesRepository = getRepository(Wish)

  const wishes = await wishesRepository.find({ where: { user_id: id } })

  return wishes
}

export async function deleteWishById(id: string): Promise<void> {
  const wishesRepository = getRepository(Wish)

  const wishes = await wishesRepository.find({ where: { id: id } })

  if (!wishes) {
    throw new AppError('wish doesnt exists')
  }

  await wishesRepository.remove(wishes[0])
}
