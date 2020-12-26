import { Store } from "../models/store.model";


export const Newegg: Store = {
  name: "Newegg",
  products: [
    {
      atcUrl: "https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16814126453",
      brand: "asus",
      id: "14-126-453",
      name: "ASUS TUF Gaming NVIDIA GeForce RTX 3080 TUF-RTX3080-10G-GAMING Video Card",
      url: "https://www.newegg.com/asus-geforce-rtx-3080-tuf-rtx3080-10g-gaming/p/N82E16814126453",
    },
    {
      atcUrl: "https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16822234344",
      brand: "westernDigital",
      id: "14-126-453",
      name: "WD Red Pro WD6003FFBX 6TB 7200 RPM 256MB Cache SATA 6.0Gb/s 3.5\" Internal Hard Drive Bare Drive",
      url: "https://www.newegg.com/red-pro-wd6003ffbx-6tb/p/N82E16822234344",
    }
  ],
  queryLabel: {
    inStockLabel: {
      selector: ".product-buy",
      targetText: "add to cart",
      type: "innerHTML",
    }
  }
};
