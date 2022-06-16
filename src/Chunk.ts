import { Product } from "./Product";

export class Chunk{
    products: Product[];
    size: number;
    currentPage: number;
    totalPages: number;
}