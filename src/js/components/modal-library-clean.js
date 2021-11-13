'use strict'
import refs from '../../js/refs/refs';
// export { openModalWindowLibrary };

const modalLibrary = document.querySelector('#myModalLibrary');
const btnConfirm = document.querySelecto('confirm-cleaning-js');
const btnCancell = document.querySelecto('cancell-cleaning-js');


// refs.btnCleanLibraryEl.addEventListener('click', onBtnCleanLibraryClick);


// export function openModalWindowLibrary() {
//     modalLibrary.style.display = "block";
// } //; не нужно при таком экспорте

// <span> element closes the modal
// const span = document.querySelector("close");


// function closeModalLibrary() {
//     modalLibrary.style.display = "none";
// }

// When clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modalLibrary.style.display = "none";
    }
}