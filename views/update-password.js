const form=document.querySelector('#form');
console.log(form);
function submitHandler(e){
    e.preventDefault();

}

form.addEventListener('submit',submitHandler);