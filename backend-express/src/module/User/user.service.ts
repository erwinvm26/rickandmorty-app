import { User } from "./entities/user.entity";
import { userCreate } from "./interface/user.interface";

import { AppDataSource } from "../../../ormconfig";

export class UserService {
  constructor() {}

  firstOne(id: string) {
    try {
      const user = User.findOne({
        where: {
          id: +id
        },
        select: ["email", "password"]
      });

      console.log(user);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
  async create({ name, email, password }: userCreate) {
    // console.log({ name, email, password });

    try {
      const user = await AppDataSource.getRepository(User).create({
        name,
        email,
        password
      });

      const results = await AppDataSource.getRepository(User).save(user);

      // return results;
    } catch (error) {
      console.log(error);
    }
  }
}
