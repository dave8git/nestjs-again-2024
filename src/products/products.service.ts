import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
    public getAll(): Product[] {
        return db.products;
    }
    public getById(id: Product['id']): Product | null {
        return db.products.find((p) => p.id === id);
    }
    public deleteById(id: Product['id']): void {
        db.products = db.products.filter((p) => p.id !== id);
    }
    public create(productData: Omit<Product, 'id'>): Product {
        const newProduct = { ...productData, id: uuidv4()};
        db.products.push(newProduct);
        return newProduct;
    }

    public updateById(id: Product['id'], productData: Omit<Product, 'id'>): void {
        db.products = db.products.map((p) => { // overwirtes whole database with appriopriate data
            if (p.id === id) {
                return { ...p, ...productData }; // overwrite fields in found object (in db)
            } else {
                return p;
            }   
        })
    }
}