import { Fav } from "./entities/fav.entity";
import { AppDataSource } from "../../../ormconfig";
import { CreateFav, ReqUpdateFavorite } from "./api.interface";
import {UserService} from "../User/user.service"

export class ApiService {
  constructor() {}

  async findOne(idCharacter: number) {
    const favorite = await AppDataSource.getRepository(Fav).findOne({
      where: {
        idCharacter
      },
      select: ["idCharacter", "fav", "details", "page"]
    });    

    if (!favorite) {
      return false
    }

    return favorite;
  }

  async findAll(userId: number, page: number) {
    const user = await new UserService().getUser(userId)

    return await AppDataSource.getRepository(Fav).find({
      where: {
        page,
        accessId: userId
      }
    })
  }

  async create({ idCharacter, fav, details, userId, numberPage }: ReqUpdateFavorite) {
    const numFavorite = parseInt(numberPage || "1")
    
    const user = await new UserService().getUser(userId)

    const character = await this.findOne(idCharacter)  

    if (user && character) {
      await AppDataSource.getRepository(Fav).update({
        idCharacter
      }, { fav, accessId: userId })

      // return await this.findOne(idCharacter)
      return await this.findAll(userId, numFavorite)
    }
    
    await AppDataSource.getRepository(Fav).create({
      idCharacter,
      fav,
      details,
      user: user,
      page: numFavorite,
      accessId: userId
    }).save()

    return await this.findAll(userId, numFavorite)
  }
}
