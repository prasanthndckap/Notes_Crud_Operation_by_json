
let addNew = document.querySelector(".create");


let cancelicon = document.querySelector(".cancel");

let addnote = document.querySelector(".addnote");
let addtitle = document.querySelector(".addtitle")
// console.log(addtitle);
let adddescription = document.querySelector(".description");
let container = document.querySelector(".container")
// console.log(adddescription);
let timestamp = new Date();
let savenote = document.querySelector(".savenote");



addNew.addEventListener("click", () => {
    savenote.innerText="AddNote"

    addnote.classList.add("show");
})
cancelicon.addEventListener("click", () => {
    addnote.classList.remove("show");
})

// window.addEventListener('DOMContentLoaded',()=>{
//     fetch('http://localhost:3000/posts')
//     .then(res=>res.json())
//     .then(datas=>{
//         for (let i = 0; i < datas.length; i++) {
//             // console.log(datas[i])
//             let subdiv = document.createElement('div')
//             subdiv.setAttribute('class','sub-div')
//             let title=document.createElement('h3')
//             title.setAttribute('class','tittle')
//             let description=document.createElement('article')
//             description.setAttribute('class','description')
//             let hr=document.createElement('hr')
//             let time = document.createElement('span')
//             time.setAttribute('class','timestamp')

//             title.innerText=datas[i].title
//             description.innerText=datas[i].body
//             time.innerText=datas[i].time

//             subdiv.append(title)
//             subdiv.append(description)
//             subdiv.append(hr)
//             subdiv.append(time)
//             firstrow.appendChild(subdiv)
//         }
//     })
// })


let lists = document.querySelector(".lists")
window.addEventListener("DOMContentLoaded",()=>{

fetch("http://localhost:3000/posts")
.then(res => res.json())
.then(datas => {
    // console.log(datas);
    for (let i = 0; i < datas.length; i++) {
        // console.log(datas[i].id);
        let newbox = document.createElement("div");
        newbox.setAttribute("class", "newbox");
        let title = document.createElement("h2");
        title.setAttribute('class', "titile");
        let line1 = document.createElement("hr");
        line1.setAttribute("class", "line");
        let description = document.createElement("p")
        description.setAttribute("class", "description");
        let line = document.createElement("hr")
        line.setAttribute("class", "line")
        let time = document.createElement("span")
        time.setAttribute("class", "time");
        let footer_div = document.createElement('div');
        footer_div.setAttribute("class", "footer")
        let option = document.createElement("p");
        option.setAttribute("class", "option")
        option.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>'

        let optiondiv = document.createElement("div");
        optiondiv.setAttribute("class", "optiondiv");

        let deleteicon = document.createElement("button");
        deleteicon.setAttribute("class", "delete");
        deleteicon.setAttribute("data-set", datas[i].id);


        deleteicon.innerHTML = `<i data-set=${datas[i].id} class="fa-solid fa-trash"></i>`

        let Edit = document.createElement("button");
        Edit.setAttribute("class", "edit");
        Edit.setAttribute("data-set", datas[i].id);
        Edit.innerHTML = `<i data-set=${datas[i].id} class="fa-regular fa-pen-to-square"></i>`


        // let closeopt = document.createElement(p);
        // closeopt.setAttribute("class","close");
        // closeopt.innerHTML = '<i class="fa-solid fa-xmark cancel"></i>'
        title.innerText = datas[i].title;
        description.innerText = datas[i].body
        time.innerText = datas[i].time

        newbox.append(title);
        newbox.append(line1);
        newbox.append(description);
        newbox.append(line);
        // option.append(closeopt);
        optiondiv.append(Edit);
        optiondiv.append(deleteicon)

        newbox.append(footer_div);

        newbox.append(optiondiv)
        footer_div.appendChild(time);

        footer_div.appendChild(option);
        container.appendChild(newbox);


        let options = document.querySelectorAll(".option")
        let optiondivs = document.querySelectorAll(".optiondiv");
        let boxes = document.querySelectorAll(".newbox");

        options[i].addEventListener("click", (e) => {
            optiondivs[i].style.display = "block";
            console.log(options);

        })

        // boxes[i].addEventListener("click",(e)=>{
        // if(e.target.classList.contains("option")){
        //     optiondivs[i].style.display = "none";
        // }
        // // else{
        // // optiondivs[i].style.display = "none";
        // // }
        // // alert("hii");
        // })


        // for(let i=0;i<options.length;i++){
        // //    console.log(options[i]);

        // options[i].addEventListener("click",()=>{
        // // optiondivs[i].classList.add("show")
        // })
        // }

        deleteicon.addEventListener("click", (e) => {
            // console.log(e.target);
            let remove = e.target.dataset.set

            // console.log(remove);
            fetch(`http://localhost:3000/posts/${remove}`, {
                method: "DELETE"

                //     headers: {
                // "Content-type": "application/json; charset=UTF-8"}


            })
            location.reload()

        })

        Edit.addEventListener("click", (e) => {
            savenote.innerText = "Update"
            savenote.setAttribute("data-set",datas[i].id)
            // console.log(savenote);
        
            addnote.classList.add("show");
            let editid = e.target.dataset.set

            fetch(`http://localhost:3000/posts/${editid}`)
            .then(data=>data .json())
            .then(data=>{
                 addtitle.value=data.title
                 adddescription.value=data.body

                // console.log(data);
            })


           
            // console.log(editid)
         
        })
    
    }
})


})
savenote.addEventListener("click",(e)=>{
    // e.preventDefault()
    console.log(e.target.dataset.set);
    let Updateid=e.target.dataset.set
    fetch(`http://localhost:3000/posts/${Updateid}`, {
        method: "PUT",
        body: JSON.stringify({
            'title': addtitle.value,
            'body': adddescription.value,
            'time': timestamp.toLocaleDateString(),
            'id':Updateid
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
})





savenote.addEventListener("click", (e) => {
    if (savenote.innerText=="AddNote") {
        if (addtitle.value && adddescription.value != '') {
            fetch("http://localhost:3000/posts/", {
                method: "POST",
                body: JSON.stringify({
                    'title': addtitle.value,
                    'body': adddescription.value,
                    'time': timestamp.toLocaleDateString()
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
    
            })
        }
        else {
            alert("please enter the corret value");
        }
        
    }
    
})


