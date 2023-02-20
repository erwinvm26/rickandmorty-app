export interface CreateFav {
  idCharacter: number;
  userId: number;
  fav: boolean;
  details: any;
}

export interface NumberPages {
  numberPage?: string;
  op?: string
}

export type ReqUpdateFavorite = CreateFav & NumberPages