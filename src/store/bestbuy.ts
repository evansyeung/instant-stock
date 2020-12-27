import { productTypeGraphicsCard, productTypeTest } from './../utils/constants';
import { Store } from "../models/store.model";


export const Bestbuy: Store = {
  name: "Bestbuy",
  products: [
    {
      atcUrl: "https://api.bestbuy.com/click/-/6429442/cart",
      brand: "test-brand",
      id: "64294625894142",
      name: "Insignia™ - 8qt Digital Multi Cooker ",
      series: "test-series",
      type: productTypeTest,
      url: "https://www.bestbuy.com/site/insignia-8qt-digital-multi-cooker-stainless-steel/6258941.p?skuId=6258941&intl=nosplash",
    },
    {
      atcUrl: "https://api.bestbuy.com/click/-/6429442/cart",
      brand: "nvidia",
      id: "6429442",
      name: "NVIDIA GeForce RTX 3070 8GB GDDR6 PCI Express 4.0 Graphics Card",
      series: "3070",
      type: productTypeGraphicsCard,
      url: "https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442&intl=nosplash",
    },
    {
      atcUrl: "https://api.bestbuy.com/click/-/6429440/cart",
      brand: "nvidia",
      id: "6429440",
      name: "NVIDIA GeForce RTX 3080 10GB GDDR6X PCI Express 4.0 Graphics Card",
      series: "3080",
      type: productTypeGraphicsCard,
      url: "https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440&intl=nosplash",
    },
    {
      atcUrl: "https://api.bestbuy.com/click/-/6429434/cart",
      brand: "nvidia",
      id: "6429434",
      name: "NVIDIA GeForce RTX 3090 24GB GDDR6X PCI Express 4.0 Graphics Card",
      series: "3090",
      type: productTypeGraphicsCard,
      url: "https://www.bestbuy.com/site/nvidia-geforce-rtx-3090-24gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429434.p?skuId=6429434&intl=nosplash",
    },
  ],
  queryLabel: {
    inStockLabel: {
      selector: ".fulfillment-add-to-cart-button",
      targetText: "add to cart",
      type: "innerHTML",
    },
    currentPriceLabel: {
      selector: ".priceView-hero-price",
      targetText: "",
      type: "textContent",
    }
  }
};
