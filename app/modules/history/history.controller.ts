import { Controller } from '@nestjs/common'
import { HistoryService } from './history.service'
import { MessagePattern } from '@nestjs/microservices'
import { History } from './entities/history.entity'

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @MessagePattern('history:getUser')
  async getUser(data: Partial<History>) {
    return this.historyService.getUser(data)
  }

  @MessagePattern('history:getUsers')
  async getUsers(data: Partial<History>) {
    return this.historyService.getUsers(data)
  }
}
