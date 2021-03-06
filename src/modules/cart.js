import renderCart from "./renderCart";
import postData from "./postData";

const cart = () => {
const cartBtn = document.getElementById('cart'),
      cartModal = document.querySelector('.cart'),
      cartCounter = document.querySelector('.counter'),
      cartCloseBtn = cartModal.querySelector('.cart-close'),
      cartTotal = cartModal.querySelector('.cart-total > span'),
      cartSendBtn = cartModal.querySelector('.cart-confirm'),
      goodsWrapper = document.querySelector('.goods'),
      cartWrapper = document.querySelector('.cart-wrapper');
    const openCart = () => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        cartModal.style.display = 'flex';
        
        renderCart(cart);
          
        cartTotal.textContent = cart.reduce((sum, goodsItem) => {
            return sum + goodsItem.price;
        }, 0);
    };

    const closeCart = () => {
        cartModal.style.display = '';
    };

    cartBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', closeCart);

    goodsWrapper.addEventListener('click', (event) => {
        if(event.target.classList.contains('btn-primary')) {
            const card = event.target.closest('.card');
            const key = card.dataset.key;
            const goods = JSON.parse(localStorage.getItem('goods'));
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            const goodItem = goods.find((item) => {
                return item.id === +key;
            });
            cart.push(goodItem);

            localStorage.setItem('cart', JSON.stringify(cart));
            cartCounter.textContent = JSON.parse(localStorage.getItem('cart')).length;
        }
    });

    cartWrapper.addEventListener('click', (event) => {
        if(event.target.classList.contains('btn-primary')) {
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            const card = event.target.closest('.card');
            const key = card.dataset.key;
            const index = cart.findIndex((item) => {
                return item.id === +key;
            });

            cart.splice(index, 1);

            localStorage.setItem('cart', JSON.stringify(cart));

            renderCart(cart);

            cartCounter.textContent = JSON.parse(localStorage.getItem('cart')).length;
            cartTotal.textContent = cart.reduce((sum, goodsItem) => {
                return sum + goodsItem.price;
            }, 0);
        }
    });

    cartSendBtn.addEventListener('click', () => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        postData(cart).then(() => {
            localStorage.removeItem('cart');

            renderCart([]);

            cartTotal.textContent = 0;
            cartCounter.textContent = 0;
        });
    });  
};

export default cart;