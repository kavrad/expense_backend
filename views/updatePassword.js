function formSubmit(e){
    e.preventDefault();
    console.log('called');
    axios.get("http://13.235.254.164:800/password/updatepassword/${id}").then((data)=>{
     alert(data.message);
    })
  }