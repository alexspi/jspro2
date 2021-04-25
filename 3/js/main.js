const catalogImage = 'https://via.placeholder.com//200x150';
const basketImage = 'https://via.placeholder.com/t/100x80';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class Catalog  {

    constructor(cart) {
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/Nev5ya/online-store-api/master/responses/catalogData.json';
        this.container = '.products';
        this.cart = cart;
        this._init();
    }
    _init() {
        this._fetchData();
        this._handleEvents();
    }
    _handleEvents() {
        document.querySelector (this.container).addEventListener ('click', (evt) => {
            if(evt.target.name === 'buy-btn') {
                this.cart.addProduct (evt.target);
            }
        })
    }

    _fetchData() {
        this._makeGetRequest(this.url, jsonData =>{
            this.items = JSON.parse(jsonData);
            this.render();
        });
    }

    _makeGetRequest(url, callback){

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200){
                    callback(xhr.responseText);
                }
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }

    render() {
        let str = '';
        this.items.forEach (item => {
            str += `
                <div class="col" data-id="${item.id_product}">
                   <div class="card themed-grid-col">
                      <img src="https://via.placeholder.com//200x150" class="card-img-top" alt="${item.product_name}">
                      <div class="card-body">
                        <h5 class="card-title">${item.product_name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <p class="price"> Цена: ${item.price} руб.</p>
                        <button  class="btn btn-primary" name="buy-btn"
                                 data-name="${item.product_name}"
                                 data-price="${item.price}"
                                 data-id="${item.id_product}">Купить</button>
                      </div>
                    </div>
                </div>
            `;
        });
        document.querySelector(this.container).innerHTML = str;
    }
}


class Cart {

    constructor() {
        this.items = [];
        this.total = 0;
        this.sum = 0;
        this.container = '.cart-block';
        this.quantityBlock = document.querySelector ('#quantity');
        this.priceBlock = document.querySelector ('#price');
        this._init();
    }

    _init() {
        this._handleEvents();
    }
    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct(evt.target);
            }
        })
    }
    addProduct(product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if(find) {
            find.quantity++;
        } else {
            let prod = this._createNewProduct (product);
            this.items.push (prod);
        }

        this._checkTotalAndSum();
        this.render();
    }
    _createNewProduct(prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        };
    }
    deleteProduct(product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if(find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice (this.items.indexOf(find), 1);
        }

        this._checkTotalAndSum();
        this.render();
    }
    _checkTotalAndSum() {
        let qua = 0;
        let pr = 0;
        this.items.forEach (item => {
            qua += item.quantity;
            pr += item.price * item.quantity;
        });
        this.total = qua;
        this.sum = pr;
    }
    render() {
        let itemsBlock = document.querySelector (this.container).querySelector ('.cart-items');
        let str = '';
        this.items.forEach (item => {
            str += ` <ul class="list-group w-100 list-group-horizontal cart-item" data-id="${item.id_product}">
          <li class="list-group-item w-25"> <img src="https://via.placeholder.com/100x80" alt=""></li>
          <li class="list-group-item w-25">${item.product_name}</li>
          <li class="list-group-item w-25" >${item.price}</li>
           <li class="list-group-item w-25" >${item.quantity}</li>
          <li class="list-group-item w-25"><button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button></li>
        </ul>`;
        });
        itemsBlock.innerHTML = str;
        this.quantityBlock.innerText = this.total;
        this.priceBlock.innerText = this.sum;
    }
}


let cart = new Cart();
let catalog = new Catalog(cart);

