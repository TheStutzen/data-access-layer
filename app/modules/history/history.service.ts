import { Injectable } from '@nestjs/common'
import { CreateHistoryDto } from './dto/create-history.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { History } from './entities/history.entity'
import { Repository } from 'typeorm'

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    await this.historyRepository.save(createHistoryDto)
  }

  async update(params: any) {
    const { id, ...data } = params

    await this.historyRepository.update(id, data)
  }

  async getUser(params: number) {
    return await this.historyRepository
      .createQueryBuilder('History')
      .where('userId = :userId', { userId: params })
      .getOne()
  }

  async getUsers() {
    return await this.historyRepository.createQueryBuilder('History').getMany()
  }
}
