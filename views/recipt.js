function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imagePreview = document.querySelector('#image-preview');
        imagePreview.src = event.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

const form = document.querySelector('#expense-form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  axios.post('http://65.1.165.115:800/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(response => {
    console.log(response.data);
    const showArea=document.getElementById('show-area');
   console.log(showArea);   
   showArea.innerHTML=response.data.text;
  })
  .catch(error => {
    console.error(error);
  });
});
function clearArea(){
const showArea=document.getElementById('show-area');
showArea.innerHTML='';
}