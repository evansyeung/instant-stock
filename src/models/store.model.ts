import { Product } from "../models/product.model";


export interface Store {
  checkStore: boolean,
  id: string,
  name: string,
  products: Product[],
  queryLabel: {
    inStockLabel: Selector,
    currentPriceLabel: Selector
  }
}

export type Selector = {
  selector: string,
  type: "innerHTML" | "textContent",
  targetText: string,
}
