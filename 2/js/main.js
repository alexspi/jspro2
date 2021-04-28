class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
            {id: 5, title: 'Notebook', price: 2000},
            {id: 6, title: 'Mouse', price: 20},
            {id: 7, title: 'Keyboard', price: 200},
            {id: 8, title: 'Gamepad', price: 50},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }
    getSum() {
        //reduce используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
        let res = this.allProducts.reduce((sum, item) => sum += item.price, 0);
        // alert(res);
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    }

    render() {
        return `
<div class="col" data-id="${this.id}">
   <div class="card themed-grid-col">
      <img src="${this.img}" class="card-img-top" alt="${this.title}">
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <p class="price"> Цена: ${this.price} руб.</p>
        <a href="#" class="btn btn-primary">Купить</a>
      </div>
    </div>
</div>`
    }
}

let list = new ProductsList();
list.render();
list.getSum();

class Basket {
    addGoods() {

    }
    removeGoods() {

    }
    changeGoods() {

    }
}

class ElemBasket {

}