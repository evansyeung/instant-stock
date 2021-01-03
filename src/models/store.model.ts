import { Product } from "../models/product.model";


export interface Store {
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
