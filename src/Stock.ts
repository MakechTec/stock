import { Tag } from "./Tag";
import axios from "axios";
import { Category } from "./Category";

export class Stock{

    url: string;

    go(url: string){
        this.url = url;
        return this;
    }

    productsByTag(onSuccess: Function, tag: Tag, makeUrl: Function = defaultUrls.productsByTag){
        this.simpleGet(makeUrl(tag), onSuccess);
    }

    productsChunk(page: number, size: number, onSuccess: Function, makeUrl: Function = defaultUrls.productsChunk){
        this.simpleGet(makeUrl(page, size), onSuccess);
    }

    productsByCategory(onSuccess: Function, category: Category, makeUrl: Function = defaultUrls.productsByCategory){
        this.simpleGet(makeUrl(category), onSuccess);
    }

    productById(id: number, onSuccess: Function, makeUrl: Function = defaultUrls.productById){
        this.simpleGet(makeUrl(id), onSuccess);
    }

    productsBySearch(search: string, onSuccess: Function, makeUrl: Function = defaultUrls.productsBySearch){
        let searchEncoded = encodeURIComponent(search);
        this.simpleGet(makeUrl(searchEncoded), onSuccess);
    }

    simpleGet(url: string, onSuccess: Function){
        axios.get(url).then(response => {
            let data = JSON.parse(response.data);
            onSuccess(response.data);
        }).catch(error => {
            this.handleError(error);
        });
    }

    handleError(error: any){
        console.log(error);
    }
}

const defaultUrls = {
    productsByTag: (tag: Tag) => `/api/products/tag/${tag.id}`,
    productsChunk: (page: number, size: number) => `/api/products/chunk/${page}/${size}`,
    productsByCategory: (category: Category) => `/api/products/category/${category.id}`,
    productById: (id: number) => `/api/products/${id}`,
    productsBySearch: (search: string) => `/api/products/?search=${search}`,
}