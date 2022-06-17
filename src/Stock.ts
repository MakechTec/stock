import { Tag } from "./Tag";
import axios from "axios";
import { Category } from "./Category";

export class Stock{

    host: string = "http://localhost:8000";
    defaultUrls = {
        productList: () => this.host+"/api/products",
        productsByTag: (tag: Tag) => this.host+`/api/products/tag/${tag.id}`,
        productsChunk: (page: number, size: number) => this.host+`/api/products/chunk/${page}/${size}`,
        productsByCategory: (category: Category) => this.host+`/api/products/category/${category.id}`,
        productById: (id: number) => this.host+`/api/products/${id}`,
        productsBySearch: (search: string) => this.host+`/api/products/?search=${search}`,
    }

    constructor(host: string = "http://localhost:8000", defaultUrls: any = {}){
        this.host = host;
        this.defaultUrls = {...this.defaultUrls, ...defaultUrls};
    }


    productList(onSuccess: Function, makeUrl: Function = this.defaultUrls.productList){
        this.simpleGet(makeUrl(), onSuccess);
    }

    productsByTag(onSuccess: Function, tag: Tag, makeUrl: Function = this.defaultUrls.productsByTag){
        this.simpleGet(makeUrl(tag), onSuccess);
    }

    productsChunk(page: number, size: number, onSuccess: Function, makeUrl: Function = this.defaultUrls.productsChunk){
        this.simpleGet(makeUrl(page, size), onSuccess);
    }

    productsByCategory(onSuccess: Function, category: Category, makeUrl: Function = this.defaultUrls.productsByCategory){
        this.simpleGet(makeUrl(category), onSuccess);
    }

    productById(id: number, onSuccess: Function, makeUrl: Function = this.defaultUrls.productById){
        this.simpleGet(makeUrl(id), onSuccess);
    }

    productsBySearch(search: string, onSuccess: Function, makeUrl: Function = this.defaultUrls.productsBySearch){
        let searchEncoded = encodeURIComponent(search);
        this.simpleGet(makeUrl(searchEncoded), onSuccess);
    }

    simpleGet(url: string, onSuccess: Function){
        axios.get(url).then(response => {
            let data = response.data;
            onSuccess(data);
        }).catch(error => {
            this.handleError(error);
        });
    }

    handleError(error: any){
        console.log(error);
    }
}
