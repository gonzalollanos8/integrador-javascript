const dropdown = document.querySelector('.dropdown');
const filter_menu = document.querySelector('.filters-btn');

//abrir menu

const open_filter = () =>{
    console.log(event.target);
    dropdown.classList.add('dropdown-open')
    if(dropdown.classList === 'dropdown-open'){
        dropdown.classList.remove('dropdown-open');
        dropdown.classList.add('dropdown-close')
    }
}



filter_menu.addEventListener('click',open_filter);

