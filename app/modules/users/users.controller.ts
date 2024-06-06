import { Controller } from '@nestjs/common'
import { UsersService } from './users.service'
import { MessagePattern } from '@nestjs/microservices'
import { User } from './entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users:createUser')
  async createUser(data: Partial<User>) {
    return this.usersService.createUser(data)
  }

  @MessagePattern('users:getCountByState')
  async getCountByState(data: boolean) {
    return this.usersService.getCountByState(data)
  }

  @MessagePattern('users:update')
  async update(data: Partial<User>) {
    return this.usersService.update(data)
  }

  @MessagePattern('users:getAllUsers')
  async getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @MessagePattern('users:findByEmail')
  async findByEmail(data: string) {
    return this.usersService.findByEmail(data)
  }
}
