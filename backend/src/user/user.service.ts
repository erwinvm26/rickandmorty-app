import { Injectable } from '@nestjs/common';
// import { IUserCreate } from './interfaces/user.interfaces';
// import { InjectRepository } from '@nestjs/typeorm';

// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  // ) {}

  search(id: string) {
    console.log(id);

    // const user = await this.userRepository.findOne({
    //   where: { id: +id },
    //   select: ['email', 'password'],
    // });
    // console.log(user);
  }
}
