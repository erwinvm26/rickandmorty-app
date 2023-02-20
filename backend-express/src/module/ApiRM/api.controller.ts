import { Router, Request, Response } from "express";
import axios from "axios";
import {ApiService} from "./api.service"
import {CreateFav, NumberPages} from "./api.interface"


export class ApiController {
  constructor() {}

  async getAll(req: Request<{}, {}, {}, NumberPages>, res: Response) {
    const { numberPage = "1", op } = req.query;


    try {

      

      const { data, status } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${numberPage}`,
        {
          headers: {
            Accept: "application/json"
          }
        }
      );

      
      const numFavorite = parseInt(numberPage || "")
      const Op = parseInt(op || "")

      // const r = await this.returnResult(numFavorite, Op )

      // console.log(r);
      

      const favorite = await new ApiService().findAll(Op, numFavorite)

      const result = data.results.map((d: any) => {
        let p = favorite.filter(f => f.idCharacter === d.id)
        
        if (p.length > 0) {
          return {fav:  p[0].fav, ...d}
        }

        return {fav: false, ...d}
      })

      // const data = this.returnResult(numFavorite, op)
      
      res.status(status).json(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  async addFav(req: Request<{}, {}, CreateFav, NumberPages>, res: Response) {
    const {idCharacter, fav, details, userId} = req.body
    const { numberPage } = req.query;

    const user = await new ApiService().create({
      idCharacter,
      fav,
      details,
      userId,
      numberPage: numberPage
    })

    // -----------------------------
    const { data, status } = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${numberPage}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );
    
    const numFavorite = parseInt(numberPage || "")
    const Op = userId

    const favorite = await new ApiService().findAll(Op, numFavorite)

    const result = data.results.map((d: any) => {
      let p = favorite.filter(f => f.idCharacter === d.id)
      
      if (p.length > 0) {
        return {fav: p[0].fav, ...d}
      }

      return {fav: false, ...d}
    })
    // -----------------------------

    res.status(status).json(result);
  }

  async returnResult (numberPage: number, userId: number) {

    console.log(numberPage, userId);
    
    const { data, status } = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${numberPage}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    const favorite = await new ApiService().findAll(userId, numberPage)

    const result = data.results.map((d: any) => {
      let p = favorite.filter(f => f.idCharacter === d.id)
      
      if (p.length > 0) {
        return {fav: true, ...d}
      }

      return {fav: false, ...d}
    })

    return result
  }
}
