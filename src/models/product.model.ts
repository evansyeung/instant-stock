export interface Product {
  itemName: string,
  itemNumber: string,
  itemUrl: string,
  cartUrl: string,
  label: Label
}

interface Label {
  query: string,
  targetText: string
}
