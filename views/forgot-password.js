const form=document.getElementById('form');
form.addEventListener('submit',async function(e){
    try{
        const token=localStorage.getItem('token');
        e.preventDefault();
        const email=document.querySelector('#email');
        const obj={
            email:email.value
        }
        const result=await axios.post("http://65.1.165.115:800/password/forgot-password",obj,{headers:{"Authorization":token}});
        console.log(result);
        alert(`${result.data.message}`);
        async function showLink(){
          axios.get("http://65.1.165.115:800/password/resetpassword/${id}").then((data)=>{
            console.log(data);
          })
        }
        result.data.link.addEventListener('click',showLink);
    }catch(err){
     console.log(err);
    }
   
})