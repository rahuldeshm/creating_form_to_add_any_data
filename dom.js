const labelinputfield = document.querySelector('#lebalvalue');
const typefield = document.querySelector("#inputType")
const form = document.querySelector("#div2");
var count=1;
var localkey = 100;
labelinputfield.addEventListener("keyup",(e)=>{
    // e.preventDefault();
    // console.log(labelinputfield.value)
    // console.log(e.key)
    if (e.key == "Enter"){
        
        const typeo = typefield.value
        const label = labelinputfield.value
        const div = document.createElement("div");
        let formlbl = document.createElement("label");
        let forminput=null;
        if (typeo==="textarea"){
            forminput=document.createElement("textarea");
        }else{
            forminput = document.createElement("input");
        }
        formlbl.innerText =label
        formlbl.className = "form-label"
        formlbl.id=count+10
        // if (typeo==button){
            
        // }
        forminput.type = typeo
        if (typeo=="submit"){
            // div.appendChild(formlbl);
            
            forminput.value=label
            forminput.id="submit"
            forminput.addEventListener("click",enterchoosedvalue)
            div.appendChild(forminput);
            form.appendChild(div)
        }else{
            forminput.id=count
            count++
            div.appendChild(formlbl);
            div.appendChild(forminput);
            form.appendChild(div)
        }
        labelinputfield.value=""
        console.log(div)
    }
})
// const datasmt = document.getElementById()

function enterchoosedvalue(e){
    e.preventDefault()
    // console.log("you clicked button you created")
    // console.log(form);
    console.log(count)
    let preid=document.getElementById(count-1)
    let prelbl = document.getElementById(count-1+10)
    if (preid ==null){
        console.log("wrong choises");
    }else{
        let obj = {}
        for (let i =count-1;i>0;i--){
            obj[document.getElementById(i+10).textContent]=document.getElementById(i).value;
        }
        obj['button']=document.getElementById('submit').value
        // console.log(preid.value)
        // console.log(prelbl.textContent)
        // console.log(obj)
        // console.log(localkey)
        obj["keyid"]=localkey;
        localkey++
        localStorage.setItem(localkey,JSON.stringify(obj));
        showOnScreen(obj);
        // form.innerHTML=""
    }
    
}

function showOnScreen(obj){
    console.log(obj)
    const parentEme=document.getElementById('div3')
    const childEle=document.createElement('div')
    let innht = "DATA :"
    let objkeys = Object.keys(obj)
    for (let i = 0; i<objkeys.length;i++){
        innht=innht+`<br>${objkeys[i]}: ${obj[objkeys[i]]} `
    }
    childEle.id="diva"
    childEle.innerHTML=innht+"<br>"
    const deleteButton=document.createElement('button')
    // deleteButton.id=obj._id 
    deleteButton.textContent='delete data'
    deleteButton.className = "dbtn"
    deleteButton.onclick =() => {
      localStorage.removeItem(obj["keyid"])
      parentEme.removeChild(childEle)
      // delete api not written//
    }
    childEle.appendChild(deleteButton)
    parentEme.appendChild(childEle)
    // console.log(parentEme)
}
document.addEventListener("DOMContentLoaded",showlocaldata);
function showlocaldata(){
    let keys = Object.keys(localStorage);
    console.log(localkey)
    localkey=parseInt(keys[0])+1
    // localkey= parseInt(keys[0])
    console.log(localkey)
    for (let i = 0 ;i<keys.length;i++){
        let parseobj = JSON.parse(localStorage.getItem(keys[i]))
        showOnScreen(parseobj);
    }

}