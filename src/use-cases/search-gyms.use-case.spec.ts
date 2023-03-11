import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { SearchGymsUseCase } from '@/use-cases/search-gyms.use-case'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gym by title', async () => {
    await gymsRepository.create({
      title: 'Gym JavaScript',
      description: 'Gym Description',
      latitude: 1,
      longitude: 1,
    })
    await gymsRepository.create({
      title: 'Gym Java',
      description: 'Gym Description',
      latitude: 1,
      longitude: 1,
    })
    await gymsRepository.create({
      title: 'Gym TypeScript',
      description: 'Gym Description',
      latitude: 1,
      longitude: 1,
    })
    const { gyms } = await sut.execute({
      query: 'Script',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Gym TypeScript',
        }),
        expect.objectContaining({
          title: 'Gym JavaScript',
        }),
      ]),
    )
  })

  it('should be able to search paginated gym by title', async () => {
    const countGyns = 22
    for (let i = 1; i <= countGyns; i++) {
      await gymsRepository.create({
        title: `Gym JavaScript ${i}`,
        description: 'Gym Description',
        latitude: 1,
        longitude: 1,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Script',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Gym JavaScript 21',
        }),
        expect.objectContaining({
          title: 'Gym JavaScript 22',
        }),
      ]),
    )
  })
})
