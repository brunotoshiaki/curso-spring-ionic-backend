import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {

    }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        //encontra um elemento x tal que o x.produto.id = produto.id
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // nao existe 
        if (position == -1) {
            //adiciona o intem
            cart.items.push({ quantidade: 1, produto: produto });
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        //encontra um elemento x tal que o x.produto.id = produto.id
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // se ele for encontrador
        if (position != -1) {
            //remove o intem
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        //encontra um elemento x tal que o x.produto.id = produto.id
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // se ele for encontrador
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        //encontra um elemento x tal que o x.produto.id = produto.id
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // se ele for encontrador
        if (position != -1) {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        let cart = this.getCart();
        let soma = 0;
        for (var i = 0; i < cart.items.length; i++) {
            soma += cart.items[i].produto.preco * cart.items[i].quantidade;
        }

        return soma;
    }



}