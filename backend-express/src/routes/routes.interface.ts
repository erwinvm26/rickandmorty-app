import { Router } from "express";

export interface IDinamycImports {
  path?: string | undefined;
  modules: Router;
}
