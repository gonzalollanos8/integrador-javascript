//elementos del html
const containerProd = document.querySelector('.Products-card');
const seeMore = document.querySelector('.seeMore');
const addProd = document.getElementById('.btnAdd');

//categorias para filtros
const filterContainer = document.querySelector('#dropdown')
const category = document.querySelectorAll('.category');

//productos

// template de card html
const createCard = (prod) =>{
    const {name,price,description,img}= prod
    
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
        <button class="btnAdd">+ Add cart</button>
        </div>
    </div>
    `
};

//funcion render
const renderCard = (productList) =>{

    containerProd.innerHTML += productList.map(createCard).join('');
};


//-------logica de filtros--------------


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



const init = () =>{

    renderCard(appState.products[0]);
    seeMore.addEventListener('click', seeMoreProducts);
    filterContainer.addEventListener('click', applyFilter);
}


init()
