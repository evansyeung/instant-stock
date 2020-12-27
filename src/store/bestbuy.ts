import { Store } from "../models/store.model";


export const Bestbuy: Store = {
  name: "Bestbuy",
  products: [],
  queryLabel: {
    inStockLabel: {
      selector: ".product-buy",
      targetText: "add to cart",
      type: "innerHTML",
    },
    currentPriceLabel: {
      selector: ".product-buy",
      targetText: "",
      type: "textContent",
    }
  }
};
