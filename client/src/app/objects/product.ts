import {Category} from "./category"

export class Product {
  id: number;
  name: string;
  pricekg: number;
  stock: number;
  description: string;
  categories: Category[]
}
