import { Controller } from '@nestjs/common'
import { HistoryService } from './history.service'
import { MessagePattern } from '@nestjs/microservices'

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @MessagePattern('history:getUser')
  async getUser(data: number) {
    return this.historyService.getUser(data)
  }

  @MessagePattern('history:getUsers')
  async getUsers() {
    return this.historyService.getUsers()
  }
}
