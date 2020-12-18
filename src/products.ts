import { Product } from './models/product.model';


export const Products: Product[] = [
  {
    itemName: 'ASUS TUF Gaming NVIDIA GeForce RTX 3080 TUF-RTX3080-10G-GAMING Video Card',
    itemNumber: '14-126-453',
    itemUrl: 'https://www.newegg.com/asus-geforce-rtx-3080-tuf-rtx3080-10g-gaming/p/N82E16814126453',
    cartUrl: 'https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16814126453',
    label: {
      query: '.product-buy',
      targetText: 'add to cart',
    }
  },
  {
    itemName: 'WD Red Pro WD6003FFBX 6TB 7200 RPM 256MB Cache SATA 6.0Gb/s 3.5" Internal Hard Drive Bare Drive',
    itemNumber: '14-126-453',
    itemUrl: 'https://www.newegg.com/red-pro-wd6003ffbx-6tb/p/N82E16822234344',
    cartUrl: 'https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16822234344',
    label: {
      query: '.product-buy',
      targetText: 'add to cart',
    }
  }
]
