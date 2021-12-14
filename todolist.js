const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todolist = document.querySelector(".todolist")
const deleteAllBtn = document.querySelector(".footer button")

inputBox.onkeyup =()=>{
    let userData = inputBox.value; // getting user entered value
    if(userData.trim() != 0){//if user values aren't only spaces
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

// if user click on the add button

addBtn.onclick =()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
}

//Add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null)
    { //if localStorage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming json string into a object
    }
    const pendingNumb = document.querySelector(".pendingNumb")
    pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
    if(listArr.length > 0){
        deleteAllBtn.classList.add("active")
    } else {
        deleteAllBtn.classList.remove("active")
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
           newLiTag = `<li>${element}<span onclick="deleteTask(${index})";><i class="fa fa-trash"></i></span></li>`;
    });
    todolist.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value =''; //once task added leave the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function    
}

//delete all tasks functions

deleteAllBtn.onclick =()=>{
    listArr =[];
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function    
}
