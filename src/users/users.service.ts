import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor( @InjectRepository(User) private usersRepository: Repository<User>, ) {}
  create(createUserDto: CreateUserDto) {
    // creates an object ready to be saved into a db table
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    // SELECT * FROM user
    return this.usersRepository.find();

    // for more complex queries
    /* return this.usersRepository.createQueryBuilder('users')
    .select()
    .where()
    .andWhere()
    .orderBy()
    .groupBy(); */
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // returns query result, but not the updated user (with api's you want to return the updated users)
    // return this.usersRepository.update(id, updateUserDto);

    // recommended way
    const user = await this.findOne(id);

    // spread the user and then spread the updates
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    // returns the removed user
    return this.usersRepository.remove(user);

    // alternative; not recommended, doesn't tell you the data that got deleted
    // return this.usersRepository.delete(id);
  }
}
