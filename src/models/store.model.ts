import { Product } from "../models/product.model";


export interface Store {
  name: string,
  products: Product[],
  queryLabel: {
    inStockLabel: Selector
  }
}

export type Selector = {
  selector: string,
  type: "innerHTML",
  targetText: string,
}
