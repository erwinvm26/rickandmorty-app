import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";
import { User } from "./entities/user.entity";
import { UserCreate } from "./interface/user.interface";

import { AppDataSource } from "../../../ormconfig";
import config from "../../config";

interface ReturnFunToken {
  token: string;
}

interface ReturnFunFirstOne {
  id: number;
  email: string;
  password: string;
  error: false;
}

interface ReturnError {
  error: true;
  message: string;
}

type ReturnFunction = ReturnFunFirstOne | ReturnError;

export class UserService {
  constructor() {}

  async getUser (id: number): Promise<User | undefined> {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id }
    })

    return user || undefined
  }

  async firstOne(email: string): Promise<ReturnFunction> {
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        email
      },
      select: ["email", "password", "state", "id"]
    });    

    if (!user) {
      return {
        error: true,
        message: "User not found"
      };
    }

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      error: false
    };
  }

  async create({
    name,
    email,
    password
  }: UserCreate): Promise<ReturnFunToken | ReturnError> {
    const alreadyExistsUser = await this.firstOne(email);

    // If the user already exists
    if (!alreadyExistsUser.error) {
      return {
        error: true,
        message: "User already exists"
      };
    }

    const pass = await hash(password, 10);
    const user = await AppDataSource.getRepository(User)
      .create({
        name,
        email,
        password: pass
      })
      .save();

    const token = await this.token(user);

    return { token };
  }

  async token(user: User): Promise<string> {
    return await jwt.sign({ user }, config.secret_key, {
      expiresIn: "24h"
    });
  }
}
