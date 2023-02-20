import { Router, Request, Response } from "express";
import axios from "axios";

interface NumberPages {
  numberPage?: number;
}

export class ApiController {
  constructor() {}

  async getAll(req: Request<{}, {}, {}, NumberPages>, res: Response) {
    const { numberPage = 1 } = req.query;

    console.log({ numberPage });

    try {
      const { data, status } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${numberPage}`,
        {
          headers: {
            Accept: "application/json"
          }
        }
      );
      res.status(status).json(data);
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
}
