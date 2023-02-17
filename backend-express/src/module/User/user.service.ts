import { User } from "./entities/user.entity";
import { UserCreate } from "./interface/user.interface";

import { AppDataSource } from "../../../ormconfig";

export class UserService {
  constructor() {}

  async firstOne(email: string) {
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        email
      },
      select: ["email", "password"]
    });

    console.log(user);

    // return user;
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
    const user = await AppDataSource.getRepository(User)
      .create({
        name,
        email,
        password
      })
      .save();

    return user;
  }
}
