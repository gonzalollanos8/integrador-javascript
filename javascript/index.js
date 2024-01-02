//elementos del html de la pagina principal
const containerProd = document.querySelector('.Products-card');
const seeMore = document.querySelector('.seeMore');
const addProd = document.getElementById('.btnAdd');

//elementos de html del carrito
const ListCart = document.querySelector('.prod-item-list');
const totalCart = document.querySelector('.total-price');
const buyCart = document.querySelector('.btn-action-buy');
const removeCart = document.querySelector('.btn-action-rem');

const btnAddItem = document.querySelector('.add');
const totalItem = document.querySelector('.quantity');
const btnRemoveItem = document.querySelector('.remove');
const itemPrice = document.querySelector('.prod-item-price');



//array para el carrito
let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

//funcion para guardar en el localStorage
const saveCart = () =>{
    localStorage.setItem('cartArray', JSON.stringify(cartArray));

}

//categorias para filtros
const filterContainer = document.querySelector('.dropdown')
const category = document.querySelectorAll('.category');



// template de card html
const createCard = (prod) =>{
    const {name,price,description,img,id}= prod
    
    return  `    
    <div class="Products-card-item">
        <img src="${img}" alt="${name}">
        <div class="line one">
        <h4>${name}</h4>
        <p>${description}</p>
    </div>
    <div class="line sec">
        <span>$${price}</span>
        </div>
    <div class="line thr">
        <button class="btnAdd"
        data-id='${id}'
        data-price='${price}'
        data-name='${name}'
        data-img='${img}'
        >+ Add cart</button>
        </div>
    </div>
    `
};

//funcion RENDER=====================
const renderCard = (productList) =>{

    containerProd.innerHTML += productList.map(createCard).join('');
};



//-------logica de FILTROS--------------


//funcion para cambiar la data del filtro activo (con el elemento data-)
const changeFilter = (btn) =>{
    // let {activeFilter} = appState;

    appState.activeFilter = btn.dataset.category;
    
    changeBtnActiveState(appState.activeFilter)
    
};

//aplicar filtro
const applyFilter = ({target}) =>{
    if(!inactiveFilter(target)) return;

    changeFilter(target);

    containerProd.innerHTML = "";

    if (appState.activeFilter){
        renderFilterProd();
        appState.currentIndex = 0;
        return;
    }

}

//render filtro de productos

const renderFilterProd = () =>{
    const filterContainer = prod.filter((product) => product.category === appState.activeFilter
    );

    // console.log(filterContainer)
    renderCard(filterContainer)
}
//cambiar clase de activo a los botones de filtro

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...category]; //buscamos el nodelist y creamos en un array para poder trabajar sobre el
    console.log(selectedCategory);
    
    categories.forEach((categoryBtn) =>{
        if (categoryBtn.dataset.category !== selectedCategory){
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
}

//contiene la clase de categoria?
const inactiveFilter = (filter) =>{
    return (filter.classList.contains("category") && !filter.classList.contains("active"));
}

//boton de ver mas
const seeMoreProducts = () =>{
    appState.currentIndex += 1;
    
    let {products, currentIndex, productLimit} = appState;

    renderCard(products[currentIndex])

    if(currentIndex === productLimit - 1){
        seeMore.classList.add("hidden");
    };
};


//--------------------LOGICA DEL CARRITO---------------------

//render mensaje del carrito vacio
const cartRender = () =>{
    if(!cartArray.length){
        ListCart.innerHTML = `<p class='empty-msg'> Cart is empty </p>`;
    return
    };

    ListCart.innerHTML = cartArray.map(renderCartItem).join('')
}

//funcion para controlar todas las funciones del estado de carrito

const updateCart = () =>{

    saveCart();
    cartRender();
    showCartTotal();
    disableBtn(buyCart);
    disableBtn(removeCart); 

}

//funcion para agregar producto
const addProduct = (e) =>{
    if(!e.target.classList.contains('btnAdd'))return
    const product = e.target.dataset;   
    
    if  (existingProdCart(product)){
        addUnitProd(product);
    }else{
        createCartProd(product);
    };

    updateCart()
    console.log(cartArray);
}

//funcion para agrgar una unidad de producto al carrito
const addUnitProd = (product) =>{
    cartArray = cartArray.map((cartProd) => 
            cartProd.id === product.id
            ?{...cartProd, quantity: cartProd.quantity + 1}
            :cartProd
        );
}
//funcion para restar una unidad del producto 
const removeUnitProd = (existinCartProduct) =>{
    cartArray = cartArray.map((product) =>{
        return product.id === existinCartProduct.id 
        ?{...product, quantity: product.quantity - 1}
        :product
    })
}

//funcion para saber si el producto ya existe en el carro
const existingProdCart = (product) =>{
    return cartArray.find((item) => item.id === product.id);
}


//funcion para crear array en el carrito
const createCartProd = (product) =>{

    cartArray = [...cartArray, {...product, quantity: 1}];
}

//funcion para renderizar el producto en el carrito
const renderCartItem = (cartArray) =>{

    const {img,quantity,name,price,id} = cartArray

    return `
    <div class="prod-item">
    <img src="${img}" alt="${name}"/>
    
    <div class="prod-item-detail">

        <div class="prod-item-title">
            <p class="prod-info">${name}</p>
            <span class="material-symbols-outlined">
                delete
                </span>
        </div>           

        <div class="prod-item-action">

                <div class="btn-amount">
                    <button class="remove" data-id=${id}>-</button>
                    <span class="quantity">${quantity}</span>
                    <button class="add" data-id=${id}>+</button>
                </div>
            
            <span class="prod-item-price">$${price*quantity}</span>
        </div>
        </div>
</div>
    `
}

//funcion para controlar el boton + de la lista en el carrito
const handlerAddCart = (id) =>{
    const addProdInCart = cartArray.find((item)=> item.id === id);
    addUnitProd(addProdInCart)
}
//funcion para controlar el boton - del carrito 
const handlerRemoveCart = (id) =>{
    const existingCartProd = cartArray.find((item) => item.id === id);

    if(existingCartProd.quantity === 1){
        if(window.confirm('Delete product?')){
            removeProdFromCart(existingCartProd);
        }
        return
    }   

    removeUnitProd(existingCartProd)
    
}
const removeProdFromCart = (existingCartProd) =>{
    cartArray = cartArray.filter ((product) => product.id !== existingCartProd.id)
            updateCart()
}

//funcion manejadora de botones de add y remove
const handlerQuantity = (e) =>{
    if(e.target.classList.contains('add')){
        console.log('add')
        handlerAddCart(e.target.dataset.id); 
    } else if(e.target.classList.contains('remove')){
        handlerRemoveCart(e.target.dataset.id)
    }

    //controlar el estado del cart
    updateCart()
}

//funcion para ver el total del carrito
const getCartTotal = ()=>{
    return cartArray.reduce((acc, cur)=> acc+ Number(cur.price) * cur.quantity ,0)
}
//funcion para mostrar el total del carrito
const showCartTotal=()=>{
    totalCart.innerHTML =`$${getCartTotal()}`
}
//funcion para desactivar los botones del carrito (sin productos)
const disableBtn = (btnCart) =>{
    if(!cartArray.length){
        btnCart.classList.add('disabled');
    }else{
        btnCart.classList.remove('disabled');
    }
}



//funcion para completar accion del carro
const resetCartItem = () => {
    cartArray = [];
    updateCart()
}

const completeCartAction = (confirmMsg) =>{
    if(!cartArray.length) return
    if(window.confirm(confirmMsg)){
        resetCartItem()
        alert(successMsg)
    }
}

//funcion para borrar todo el carro
const deleteCart = () =>{
    completeCartAction('Delete all cart?')
    }

//funcion para completar la compra
const completeBuy = () =>{
    completeCartAction('Finish buy?');
}


const init = () =>{

    renderCard(appState.products[0]);
    seeMore.addEventListener('click', seeMoreProducts);
    filterContainer.addEventListener('click', applyFilter);
    cartBtn.addEventListener('click', toggleCart);
    containerProd.addEventListener('click', addProduct);
    ListCart.addEventListener('click', handlerQuantity);
    document.addEventListener('DOMContentLoaded', cartRender);

    buyCart.addEventListener('click', completeBuy);
    removeCart.addEventListener('click', deleteCart);

    disableBtn(buyCart);
    disableBtn(removeCart);
}


init()
