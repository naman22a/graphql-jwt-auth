import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findOneById(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    async findOneByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.create({ ...createUserDto }).save();
    }

    async incrementTokenVersion(id: number) {
        return await this.userRepository.increment({ id }, 'tokenVersion', 1);
    }
}
