const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
const renderProduct = (product, img = 'https://via.placeholder.com/200x150') => {
    return `
<div class="col card themed-grid-col">
  <img src="${img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <p class="price"> Цена: ${product.price} руб.</p>
    <a href="#" class="btn btn-primary">Купить</a>
  </div>
</div>
`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item =>
        renderProduct(item)).join('');

};

renderPage(products);