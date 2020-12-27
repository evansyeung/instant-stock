import { productTypeTest, productTypeGraphicsCard } from "./../utils/constants";
import { Store } from "../models/store.model";


export const Newegg: Store = {
  name: "Newegg",
  products: [
    {
      atcUrl: "https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16822234344",
      brand: "test-brand",
      id: "14-126-453",
      name: "WD Red Pro WD6003FFBX 6TB 7200 RPM 256MB Cache SATA 6.0Gb/s 3.5\" Internal Hard Drive Bare Drive",
      series: "test-series",
      type: productTypeTest,
      url: "https://www.newegg.com/red-pro-wd6003ffbx-6tb/p/N82E16822234344",
    },
    {
      atcUrl: "https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16814137601",
      brand: "msi",
      id: "14-137-601",
      name: "MSI GeForce RTX 3070 DirectX 12 RTX 3070 VENTUS 3X OC 8GB 256-Bit GDDR6 PCI Express 4.0 HDCP Ready Video Card",
      series: "3070",
      type: productTypeGraphicsCard,
      url: "https://www.newegg.com/msi-geforce-rtx-3070-rtx-3070-ventus-3x-oc/p/N82E16814137601",
    },
    {
      atcUrl: "https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16814126453",
      brand: "asus",
      id: "14-126-453",
      name: "ASUS TUF Gaming NVIDIA GeForce RTX 3080 TUF-RTX3080-10G-GAMING Video Card",
      series: "3080",
      type: productTypeGraphicsCard,
      url: "https://www.newegg.com/asus-geforce-rtx-3080-tuf-rtx3080-10g-gaming/p/N82E16814126453",
    },
    {
      atcUrl: "https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16814487518",
      brand: "evga",
      id: "14-487-518",
      name: "EVGA GeForce RTX 3080 FTW3 ULTRA GAMING Video Card, 10G-P5-3897-KR, 10GB GDDR6X, iCX3 Technology, ARGB LED, Metal Backplate",
      series: "3080",
      type: productTypeGraphicsCard,
      url: "https://www.newegg.com/evga-geforce-rtx-3080-10g-p5-3897-kr/p/N82E16814487518",
    }
  ],
  queryLabel: {
    inStockLabel: {
      selector: ".product-buy",
      targetText: "add to cart",
      type: "innerHTML",
    },
    currentPriceLabel: {
      selector: ".price-current",
      targetText: "",
      type: "textContent"
    }
  }
};
