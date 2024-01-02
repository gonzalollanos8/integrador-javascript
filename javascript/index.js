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
let cartArray = []

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

//funcion para agregar producto
const addProduct = (e) =>{
    if(!e.target.classList.contains('btnAdd'))return
    const product = e.target.dataset;   
    
    if  (existingProdCart(product)){
        addUnitProd(product);
    }else{
        createCartProd(product);
    };

    cartRender();
    showCartTotal();
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
                    <button class="add" data-id+${id}>+</button>
                </div>
            
            <span class="prod-item-price">$${price*quantity}</span>
        </div>
        </div>
</div>
    `
}

//funcion para ver el total del carrito
const getCartTotal = ()=>{
    return cartArray.reduce((acc, cur)=> acc+ Number(cur.price) * cur.quantity ,0)
}
//funcion para mostrar el total del carrito
const showCartTotal=()=>{
    totalCart.innerHTML =`$${getCartTotal()}`
}



const init = () =>{

    renderCard(appState.products[0]);
    seeMore.addEventListener('click', seeMoreProducts);
    filterContainer.addEventListener('click', applyFilter);
    cartBtn.addEventListener('click', toggleCart);
    containerProd.addEventListener('click', addProduct)
    document.addEventListener('DOMContentLoaded', cartRender)
}


init()
