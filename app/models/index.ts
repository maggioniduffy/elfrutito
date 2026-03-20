export type Prices = [string, number][];

export interface Product {
  id: string;
  name: string;
  prices: Prices;
  image: string;
  stock: number;
  sale: boolean;
  description: string;
  type: ProductType;
  isCombo?: boolean;
  comboPrice?: number;
}

export enum ProductType {
  DriedFruit = "Fruto Seco",
  DehydratedFruit = "Fruta Deshidratada",
  Granola = "Granola",
  Mix = "Mix",
  Combo = "Combo",
}

export interface Section {
  name: string;
  ref: string;
  function: () => Promise<Product[]>;
}
