const form=document.querySelector('#form');
const expenseAmount=document.querySelector('#expense-amount');
const desc=document.querySelector('#desc');
const category=document.querySelector('#category');
const rzpBtn=document.querySelector('#rzp-btn');
const expenses=document.querySelector('.expenses');
const leaderboard=document.querySelector('.leaderboard');
const leaderList=document.querySelector('#leader-list');
const noOfRows=document.querySelector('#no-of-rows');
const expenseHead=document.getElementById('expense-head');

let ul=document.querySelector('#expense-list')
let Data=document.getElementById('data');

async function getExpenses(){
    let token=localStorage.getItem('token');
    console.log(token);
  let response=await axios("http://65.1.165.115:800/show-expense",
  {
     headers: {
'Authorization': token,
}});

  let data=response.data;
  console.log(data);
  return data;
}

async function postExpenses(){
   const token=localStorage.getItem('token');
    const obj={
        expenseAmount:expenseAmount.value,
        desc:desc.value,
        category:category.value
    }
    let response=await axios.post("http://65.1.165.115:800/add-expense",obj,{headers:{"Authorization":token}});
    console.log(response);
    let data=response.data[response.data.length-1];
    return response;
}

async function postAddProduct(e){
    e.preventDefault();
    let data=await postExpenses();
    const limit=localStorage.getItem('limit');
    console.log(data);
    generatePage();
    displayRecords();
    
}

function createList(){
    let li=document.createElement('li');
    let deleteBtn=createDeleBtn();
    ul.appendChild(li);
    return li;
}

function createDeleBtn(){
    let deleteBtn=document.createElement('button');
    deleteBtn.textContent="Delete Expense";
    return deleteBtn;
}
 
async function leaderHandler(){
    const token=localStorage.getItem('token');
    let response=await axios("http://65.1.165.115:800/purchase/leaderboard",{headers:{"Authorization":token}})
   console.log(response);
   let board=document.getElementById('board');
   board.style.cssText="text-align:center;margin:2%;font-family:Abril fatFace"
   board.removeAttribute('hidden');
   leaderList.removeAttribute('hidden');
   let statement="";
   response.data.forEach(function(element){
    statement+="<tr>"
    statement+=`<td>${element.id}</td>`;
    statement+=`<td>${element.name}</td>`;
    statement+=`<td>${element.email}</td>`;
    statement+=`<td>${element.totalExpenses}</td>`;
    "<tr>"
   })
   document.getElementById('data').innerHTML=statement;
   const showLeaderBtn = document.getElementById("show-leader");
  showLeaderBtn.style.display = "none";
  const hideLeaderBtn = document.createElement('button');
 hideLeaderBtn.textContent = "Hide LeaderBoard";
hideLeaderBtn.style.cssText="margin-left:35%;margin-top:5%;padding:2%;border-radius:1rem;font-family:Abril fatFace;"
hideLeaderBtn.addEventListener('click', function () {
document.getElementById('data').innerHTML = "";
leaderList.setAttribute('hidden',true);
board.setAttribute('hidden',true);
showLeaderBtn.style.display = "block";
hideLeaderBtn.style.display = "none";

});
leaderList.after(hideLeaderBtn);
}

function createLeaderBoardBtn(parent){
    let btn=document.createElement('button');
          btn.textContent="Show LeaderBoard";
          btn.style.cssText="margin-left:35%;padding:2%;border-radius:1rem;font-family:Abril fatFace;"
          btn.addEventListener('click',leaderHandler);
          btn.id="show-leader";
          parent.appendChild(btn);
         
}


async function getAddProduct(){

const token=localStorage.getItem('token');


let data=await getExpenses();
console.log(data);


  const decoded=parseJwt(token);
  console.log(decoded);

  if(decoded.isPremium ===true){
    let parent=rzpBtn.parentElement;
           parent.removeChild(rzpBtn);
          let span=document.createElement('span');
          span.setAttribute('class','premium-user');
          span.innerText="You are a premium user now";
          span.style.cssText="font-family: 'Abril Fatface';font-size:1.5em;text-align:center;margin-left:24%;"
          leaderboard.insertAdjacentElement("afterbegin",span);
        
          //parent.appendChild(span);
          createLeaderBoardBtn(leaderboard);
          
          
    }else{
        leaderboard.classList.remove('leaderboard');
        document.getElementsByClassName('wrapper')[0].style.cssText="justify-content:center;"
    }
   /*let ans=await axios.get("http://65.1.165.115:800/get-premium",{headers:{"Authorization":token}})
  decoded.isPremium=ans.data.isPremium;*/
  
   console.log(decoded);
   
}
     
async function rzpHandler(e){
    var token=localStorage.getItem('token');
    const response=await axios("http://65.1.165.115:800/purchase/premiumMembership",{headers:{"Authorization":token}})
    console.log(response);
    let options={
        order_id:response.data.data.id,
        keyId:response.data.key_id,
        handler:async function(response){
            console.log(response);
          let ans=await axios.post("http://65.1.165.115:800/updatemembership",{
            orderId:options.order_id,
            paymentId:response.razorpay_payment_id
          },{
            headers:{
                "Authorization":token
            }
          })
          console.log(ans.data.token);
          localStorage.setItem('token',ans.data.token);
          const decoded=parseJwt(token);
          
          console.log(decoded);
          alert(ans.data.message);
          let parent=rzpBtn.parentElement;
           parent.removeChild(rzpBtn);
          let span=document.createElement('span');
          span.innerText="You are a premium user now";
          parent.appendChild(span);
          createLeaderBoardBtn(parent)
          
        }
        }
        const rzp1=new Razorpay(options)
        rzp1.open();
        rzp1.on('payment.failed',async function(response){
            alert('Something went wrong')
            let ans=await axios.post("http://65.1.165.115:800/updatemembershipFailed",{
            status:"Failed",
            orderId:options.order_id,
            paymentId:response.razorpay_payment_id
        },{headers:{"Authorization":token}})
        })
        
        //console.log(ans);
       
    }

    function parseJwt (token) {
var base64Url = token.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);
} 


var pageUl=document.querySelector('.pagination');
var lists=[];

async function getData(){
const ans=await getExpenses();
lists=ans;
console.log(lists);

}
getData();



let records_per_page=2;
let page_number=1; 
let total_page;

async function totalPages(){
await getData();
const total_records=lists.length;
let total_page=Math.ceil(total_records/records_per_page)
return total_page;
}
async function displayRecords(){
let start_index=(page_number-1)*records_per_page;
let end_index=start_index+(records_per_page-1);
await getData();
const total_pages=await totalPages();
if(end_index>=lists.length){
    end_index=lists.length-1;
}
let statement='';

for(let i=start_index;i<=end_index;i++){
    await getData();
   console.log(lists);
    let div=document.createElement('div');
   let li=document.createElement('li');
   li.className="list-group-item";
   let span1=document.createElement('span');
   span1.textContent=`${lists[i].expenseAmount}`;
   li.appendChild(span1);
   let span2=document.createElement('span');
   span2.textContent=`${lists[i].desc}`;
   li.appendChild(span2);
   let span3=document.createElement('span');
   span3.textContent=`${lists[i].category}`;
   li.appendChild(span3);
   //li.innerText=`${lists[i].expenseAmount}-${lists[i].desc}-${lists[i].category}`;
   let btn=document.createElement('button');
   btn.textContent="Delete Expense";
   btn.id=lists[i].Id;
   li.appendChild(btn)
   div.appendChild(li);
   statement+=`${div.innerHTML}`;
}

 document.getElementById('expense-list').innerHTML=statement;
 

document.querySelectorAll('.dynamic-item').forEach(item => {
    item.classList.remove('active');
 });
 document.getElementById(`page${page_number}`).classList.add('active');
 if(page_number ==1){
  document.getElementById('prevBtn').parentElement.classList.add('disabled');
 }else{
    document.getElementById('prevBtn').parentElement.classList.remove('disabled');
 }
 if(page_number===total_pages){
    document.getElementById('nextBtn').parentElement.classList.add('disabled');
 }else{
    document.getElementById('prevBtn').parentElement.classList.remove('disabled');
 }
 document.getElementById('page-details').innerHTML=`Showing ${start_index+1} to ${end_index+1} of ${lists.length}`
}
generatePage();  
displayRecords();
console.log(document.getElementById(`page${page_number}`))

async function generatePage(){
let prevBtn=` <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="prevBtn();" id="prevBtn">Previous</a></li>`;
let nextBtn=`<li class="page-item"><a href="javascript:void(0)" class="page-link" onclick="nextBtn();" id="nextBtn">Next</a></li>`;
let buttons='';
let i=1;
const total_page=await totalPages();
console.log(total_page);
let activeClass='';
while(i<=total_page){
if(i==1){
    activeClass='active';
}else{
    activeClass='';
}
buttons+=`<li class="page-item dynamic-item ${activeClass}" id="page${i}"><a class="page-link" href="javascript:void(0)" onclick="page(${i});">${i}</a></li>`
i++;
}

document.getElementById('pagination').innerHTML=`${prevBtn} ${buttons} ${nextBtn}`
}

function prevBtn(){
page_number--;
displayRecords();
}

function nextBtn(){

page_number++;
displayRecords();
}
function page(index){
page_number=parseInt(index);
displayRecords();
}
noOfRows.addEventListener('change',async function(e){
records_per_page=  parseInt(noOfRows.value);
let totalPage=await totalPages();
total_page=totalPage;
generatePage();
displayRecords();
})

document.getElementById('expense-list').addEventListener('click',async function(e){
console.log(e.target.id);
let token=localStorage.getItem('token');
let response=await axios.delete(`http://65.1.165.115:800/delete-expense/${e.target.id}`,{headers:{"Authorization":token}});
console.log(response);
let id=document.getElementById(`${response.data.expense.Id}`)
console.log(id);
let parent=id.parentElement;
let superParent=parent.parentElement;
superParent.removeChild(parent);
})

window.addEventListener('DOMContentLoaded',getAddProduct);
form.addEventListener('submit',postAddProduct);
rzpBtn.addEventListener('click',rzpHandler)


const itemsShow=document.querySelector('#itemsperpage');
function viewFile(){
    window.location.href="http://65.1.165.115:800/file/read";
}

