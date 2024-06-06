import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import { HistoryService } from '../history/history.service'
dayjs.extend(utc)

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly historyService: HistoryService,
  ) {}

  async createUser(params: Partial<User>) {
    const result = await this.userRepository.save(params)

    await this.historyService.create({
      userId: result.id,
      updatedAt: dayjs().utc().format(),
      method: 'created',
    })

    return result
  }

  async findByEmail(params: string): Promise<User> {
    const result = await this.userRepository
      .createQueryBuilder('User')
      .where('User.email = :email', { email: params })
      .getOne()

    return result
  }

  async getCountByState(params: boolean) {
    const result = await this.userRepository
      .createQueryBuilder('User')
      .where('User.state = :state', { state: params })
      .getCount()

    return result
  }

  async update(params: Partial<User>) {
    const { id, ...data } = params

    await this.userRepository.update(id, data)

    await this.historyService.update({
      userId: id,
      updatedAt: dayjs().utc().format(),
      method: 'updated',
    })
  }

  async getAllUsers() {
    return await this.userRepository.createQueryBuilder('User').getMany()
  }
}
