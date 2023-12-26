const dropdown = document.querySelector('.dropdown');
const filter_menu = document.querySelector('.filters-btn');

const cartBtn = document.querySelector('.buy-cart');
const cartContainer = document.querySelector('.cart-container');
const menuBtn = document.querySelector('.btn-toggle-menu');
const burgerMenu = document.querySelector('.menu-burger ul')


//abrir menu filtros
const open_filter = () =>{

    if(dropdown.classList.contains('dropdown-open')){
        dropdown.classList.remove('dropdown-open');
        return
    }else{
    dropdown.classList.add('dropdown-open');
    }
}


//==============================CARRITO===========================
const toggleCart = () =>{

    if(cartContainer.classList.contains('cart-container-open')){
        cartContainer.classList.remove('cart-container-open')
    }else{
        cartContainer.classList.add('cart-container-open')
    }
}


//===========================MENU===========================

const toggleMenu = () =>{
    if(burgerMenu.classList.contains('menu-burger-open')){
        console.log(event.target)
        burgerMenu.classList.remove('menu-burger-open')
    }else{
        burgerMenu.classList.add('menu-burger-open')
    }

}


filter_menu.addEventListener('click',open_filter);
cartBtn.addEventListener('click', toggleCart);
menuBtn.addEventListener('click', toggleMenu)
