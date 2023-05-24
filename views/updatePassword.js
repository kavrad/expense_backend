function formSubmit(e){
    e.preventDefault();
    console.log('called');
    axios.get("http://65.1.165.115:800/password/updatepassword/${id}").then((data)=>{
     alert(data.message);
    })
  }