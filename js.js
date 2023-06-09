let title = document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood ='create';
let tmp;
let body=document.getElementById('tbody');
let hh=document.getElementById('hh')

//create total
function gettotal()
{
    if(price.value != ''){
        let result=(+price.value + +taxes.value + +ads.value)
         - +discount.value;
         document.getElementById('total').innerHTML = result;
         //total.innerHTML=result;
         total.style.backgroundColor='#040'
    
    }else{
        total.innerHTML='';
        total.style.backgroundColor='darkcyan'

    }
}

//craete product
let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}

submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !='' && price.value !='' && category.value !='' && count.value <50){
        if(mood === 'create'){
            if(newpro.count>1){
                for(i=0 ; i< newpro.count ; i++)
                datapro.push(newpro)
        
            }else{
                datapro.push(newpro);
                
            }
    
        }else{
            datapro[tmp]=newpro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
        }
        cleardata()

    }
  
    

    localStorage.setItem('product',  JSON.stringify(datapro ))

showdata()
}


//clear inputs
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML=''
}

// read data in table

function showdata(){
    gettotal()
    let tabel='';
    for(let i=0 ; i<datapro.length;i++){
        tabel +=`
        <tr>
        <td> ${i+1} </td>
        <td> ${datapro[i].title} </td>
        <td> ${datapro[i].price} </td>
        <td> ${datapro[i].taxes} </td>
        <td> ${datapro[i].ads} </td>
        <td> ${datapro[i].discount} </td>
        <td> ${datapro[i].total} </td>
        <td> ${datapro[i].category} </td>
       
        <td> <button onclick="update(${i})" id="update"> update </button> </td>

        <td> <button onclick="deleteelemnt(${i})" id="delete" > delete </button> </td>

    </tr>
        `;
    }
    document.getElementById('tbody').innerHTML=tabel;
    let btndelete=document.getElementById('deleteall')
    if(datapro.length>0){
        btndelete.innerHTML=`
        <button onclick="deleteall()"> Delete All(${datapro.length}) </button>
        `
    
    }else{
        btndelete.innerHTML=''

    }
}

//delete element
function deleteelemnt(i){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro);
showdata()
}

//delete all
function deleteall(){

    localStorage.clear();
    datapro.splice(0)
    showdata()

}

//count


//updata
function update(i){

    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal();
    count.style.display='none';
    category.value=datapro[i].category;
    submit.innerHTML='UpDate';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}


//search

let search='title';
function searchmood(id){
    let serc=document.getElementById('search');
if(id=='searchtitle'){
     search='title';
     serc.placeholder='Search by Title';
}else{
     search='category';
     serc.placeholder='Search by Category';

}
serc.focus()
serc.value='';
showdata()
}

function searchdata(value)
{
    let tabel='';
    if(search=='title')
    {
        for(i=0 ; i<datapro.length ; i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                tabel +=`
                        <tr>
                        <td> ${i+1} </td>
                        <td> ${datapro[i].title} </td>
                        <td> ${datapro[i].price} </td>
                        <td> ${datapro[i].taxes} </td>
                        <td> ${datapro[i].ads} </td>
                        <td> ${datapro[i].discount} </td>
                        <td> ${datapro[i].total} </td>
                        <td> ${datapro[i].category} </td>
                    
                        <td> <button onclick="update(${i})" id="update"> update </button> </td>

                        <td> <button onclick="deleteelemnt(${i})" id="delete" > delete </button> </td>

                    </tr>
                        `;




            }

        }






    }else

    for(i=0 ; i<datapro.length ; i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            tabel +=`
                    <tr>
                    <td> ${i+1} </td>
                    <td> ${datapro[i].title} </td>
                    <td> ${datapro[i].price} </td>
                    <td> ${datapro[i].taxes} </td>
                    <td> ${datapro[i].ads} </td>
                    <td> ${datapro[i].discount} </td>
                    <td> ${datapro[i].total} </td>
                    <td> ${datapro[i].category} </td>
                
                    <td> <button onclick="update(${i})" id="update"> update </button> </td>

                    <td> <button onclick="deleteelemnt(${i})" id="delete" > delete </button> </td>

                </tr>
                    `;




        }

    }

    {

    };
    document.getElementById('tbody').innerHTML=tabel;

}

//dark/white mood
function dark(){
    document.body.style.backgroundColor='white';
    document.body.style.color='black';
    hh.innerHTML="Dark Mood";
}
function white(){
    document.body.style.backgroundColor='#222';
    document.body.style.color='white';
    hh.innerHTML="White Mood";
}

showdata()
