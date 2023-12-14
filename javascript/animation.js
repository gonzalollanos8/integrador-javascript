const dropdown = document.querySelector('.dropdown');
const filter_menu = document.querySelector('.filters-btn');

//abrir menu

const open_filter = () =>{

    if(dropdown.classList.contains('dropdown-open')){
        dropdown.classList.remove('dropdown-open');
        return
    }else{
    dropdown.classList.add('dropdown-open');
    }
}


filter_menu.addEventListener('click',open_filter);

