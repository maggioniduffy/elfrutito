export type Prices = [string, number][];

export interface Product {
  id: string;
  name: string;
  prices: Prices;
  image: string;
  stock: number;
  sale: boolean;
}

export enum ProductType {
  DriedFruit = "Fruto Seco",
  DehydratedFruit = "Fruta Deshidratada",
}

export interface Section {
  name: string;
  function: () => Promise<Product[]>;
}
