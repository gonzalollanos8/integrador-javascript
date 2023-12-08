const dropdown = document.querySelector('.dropdown');
const filter_menu = document.querySelector('.filters-btn');



filter_menu.addEventListener('click', ()=>{
    console.log(event.target);
    dropdown.classList.add('dropdown-open')
    if(dropdown.classList === 'dropdown-open'){
        console.log(dropdown.classList)
    }

});