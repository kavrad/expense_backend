const email=document.querySelector('#emailLogin');
    const password=document.querySelector('#passwordLogin');
    const form=document.querySelector('#form');

    function isLoggedIn(){
      const token=localStorage.getItem('token');
      return token !== null && token !== undefined;
}
    

    async function submitHandler(e){
        try{

        
       e.preventDefault();
       const obj={
        email:email.value,
        password:password.value
       }
       let response=await axios.post("http://13.235.254.164:800/user/login",obj);
       console.log(response);
      
    //    try{
    //     let token=response.data.data.token
    //    }catch(err){
    //     alert(`The password does not exist`);
    //    }
       localStorage.setItem('token',response.data.data.token);
       let id=response.data.id;
       if(response.data.data.responseEmail.email === email.value){
        alert("User logged in sucessfully");
        window.location.href="http://13.235.254.164:800/expense";
        
       
       }/*else if(response.data ==="The email does not exist" || response.data ==="The pasword does not exist"){
        alert(`${response.data}`)
       }/*else{
        document.write(`${response.data}`)
       }*/
       else {
        alert(`The user does not exist`);
        
       }
    }catch(err){
        alert("The user does not exist");
    }
}

    form.addEventListener('submit',submitHandler);

    function forgotHandler(){
        window.location="http://13.235.254.164:800/forgotpassword";
    }