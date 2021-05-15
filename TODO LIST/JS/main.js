// Selectors
const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const todoCont = document.querySelector(".todo-cont")
const errorMsg = document.querySelector(".error-msg");
const settings = document.querySelector(".fa-cog");
const sideBar = document.querySelector(".sidebar");
const deleteCont = document.querySelector(".delete-cont"); 
const homeTodo = document.querySelector(".home-todo");
const recentDeleteBtn = document.querySelector(".recently-del");
const todos = document.querySelector(".todos");
const completedBtn = document.querySelector(".completed");
const completedCont = document.querySelector(".completed-cont");
const QuotesText = document.querySelector(".quotes");
const Quotes = 
[ 
    'The secret of getting ahead is getting started.',
    'Keep up the good work champ, you got this.',
    "Dont stop when you're done, stop when you're finished.",
    'The task ahead of you is never greater than the strength within you.',
    'Rest, get a coffee, relax. You are excelent.',
    'Ignorance is a gift because it leads us to knowledge.',
    'Keep moving forward.',
    'Progress is progress. No matter how small.',
    'Success usually comes to those who are too busy looking for it',
    "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus."
]






// Event Listeners
addBtn.addEventListener("click", addTodo);
settings.addEventListener("click", settingsOpen);
todoCont.addEventListener("click", addDeleteRestore);
recentDeleteBtn.addEventListener("click", showRecentlyDeleted);
deleteCont.addEventListener("click", restoreDelete);
homeTodo.addEventListener("click", showHome);
completedBtn.addEventListener("click", showCompleted);





// Functions

// OPEN THE SETTINGS

function settingsOpen(e){
    const item = e.target;
    sideBar.classList.toggle("openSidebar");
}

// ADD A TODO

function addTodo(e){  // ADD NEW TODO
    e.preventDefault();



    if(input.value === ""){
        input.classList.add("errorInput");
        errorMsg.classList.add("errorPop");
    } else{
        input.classList.remove("errorInput");
        errorMsg.classList.remove("errorPop");

        // Create A div that stores lists
        const todoDiv = document.createElement("div");
        todoDiv.innerHTML = '<img src="Images/Complete.svg" class="check-completed" alt="">'
        todoDiv.classList.add("todo-div");
        todoCont.appendChild(todoDiv);

        // Create List
        const todo = document.createElement("li");
        todo.classList.add("todo");
        todoDiv.appendChild(todo);

        // Create list Value
        const p = document.createElement("p");
        p.classList.add("list-text");
        const inputVal = input.value;
        const todoVal = document.createTextNode(inputVal);
        p.appendChild(todoVal)
        todo.appendChild(p);
        // Create Buttons

        // Create Check Button
        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList.add("done");
        todoDiv.appendChild(checkBtn);

        // Create Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("delete");
        todoDiv.appendChild(deleteBtn);

        input.value = ""
    }

}


// DELETE, RESTORE AND CHECK

function addDeleteRestore(e){
    e.preventDefault();
   
    const item = e.target;
    if(item.classList.contains("done")){
        item.parentElement.classList.add("checkFade");
        setTimeout(()=>{
            completedCont.appendChild(item.parentElement);
            item.parentElement.classList.remove("checkFade", "todo-div");
            item.parentElement.classList.add("completed-div");
           
            item.parentElement.children[2].classList.add("remove");
            item.parentElement.children[3].classList.add("remove");
            item.parentElement.children[0].classList.add("checkCompletedPop")
            
        }, 300)
    }
    if(item.classList.contains("delete")){
        const checkImg = document.querySelector(".check-completed");
        item.parentElement.classList.add("deleteFade");
        setTimeout(() => {
            deleteCont.appendChild(item.parentElement);
            item.parentElement.classList.remove("deleteFade", "todo-div", "checkCompletedPop", "checkFade");
            checkImg.classList.remove("checkCompletedPop")
            item.parentElement.classList.add("delete-div");
            item.parentElement.children[2].innerHTML = '<i class="fas fa-trash-restore"></i>';
             

            // RESTORE

                // CREATE A DIV THAT STORES THE MESSAGE
                const restoreMsg = document.createElement("div");
                restoreMsg.classList.add("restoreMsg");
                item.parentElement.appendChild(restoreMsg);
                

                // CREATE A PARAGRAPH TEXT
                const msgPrompt = document.createElement("p");
                msgPrompt.classList.add("msg-prompt");
                msgPrompt.innerHTML = `Would you like to 
                restore this to-do?`;
                restoreMsg.appendChild(msgPrompt);

                //BUTTONS
                const buttonDiv = document.createElement("div");
                buttonDiv.classList.add("buttonDiv");
                const cancelBtn = document.createElement("p");
                cancelBtn.innerHTML = "cancel";
                cancelBtn.classList.add("cancelBtn");
                const accept = document.createElement("button");
                accept.innerHTML = "YES";
                accept.classList.add("confirm");
                buttonDiv.appendChild(accept);
                restoreMsg.appendChild(buttonDiv);
                buttonDiv.appendChild(cancelBtn);


            // DELETE

                // CREATE A DIV DELETE
                const deleteMsg = document.createElement("div");
                deleteMsg.classList.add("deleteMsg");
                item.parentElement.appendChild(deleteMsg);
                
                 // CREATE A PARAGRAPH TEXT
                 const deleteMsgPrompt = document.createElement("p");
                 deleteMsgPrompt.classList.add("msg-prompt");
                 deleteMsgPrompt.innerHTML = `Would you like to 
                 delete this to-do?`;
                 deleteMsg.appendChild(deleteMsgPrompt);

                 //BUTTONS DIV
                const deleteMsgDiv = document.createElement("div");
                deleteMsgDiv.classList.add("buttonDiv");
                deleteMsg.appendChild(deleteMsgDiv);

                // BUTTONS

                // CANCEL BUTTON
                const deleteMsgAcceptlBtn = document.createElement("button");
                deleteMsgAcceptlBtn.innerHTML = "YES"; 
                deleteMsgAcceptlBtn.classList.add("confirmDel");
                deleteMsgDiv.appendChild(deleteMsgAcceptlBtn);

                 // CANCEL BUTTON
                 const deleteMsgCancelBtn = document.createElement("p");
                 deleteMsgCancelBtn.innerHTML = "cancel"; 
                 deleteMsgCancelBtn.classList.add("cancelBtn");
                 deleteMsgDiv.appendChild(deleteMsgCancelBtn);
        }, 300);

       
    
    }       
   
}

// DELETED PAGE
function restoreDelete(e){
    const item = e.target;
    
    if(item.classList.contains("done")){
        item.parentElement.children[4].classList.add("pop");
    }  
    
    if (item.classList.contains("cancelBtn")){
        item.parentElement.parentElement.classList.remove("pop");
    }


    if(item.classList.contains("confirm")){
       item.parentElement.parentElement.classList.remove("pop");
       item.parentElement.parentElement.parentElement.classList.add("restoreRemove");
       if(item.parentElement.parentElement.parentElement.parentElement.children.length === 2){  
            setTimeout(() => {
                const notDeleted = document.querySelector(".notDeleted");
                notDeleted.classList.remove("remove");
           }, 300);
        } 
       
        setTimeout(() => {
            item.parentElement.parentElement.parentElement.classList.remove("restoreRemove");
            todoCont.appendChild(item.parentElement.parentElement.parentElement);
            item.parentElement.parentElement.parentElement.classList.remove("delete-div");
            item.parentElement.parentElement.parentElement.classList.add("todo-div");
            item.parentElement.parentElement.parentElement.children[2].innerHTML = '<i class="fas fa-check"></i>';
           
       }, 300);
      
    }

    if(item.classList.contains("delete")){
        item.parentElement.children[5].classList.add("pop");
    }

    if(item.classList.contains("confirmDel")){
        item.parentElement.parentElement.parentElement.remove();
        if(deleteCont.children.length === 1){
            const notDeleted = document.querySelector(".notDeleted");
                notDeleted.classList.remove("remove");
        }
    }  
    }


// SHOW RECENTLY DELETED PAGE


function showRecentlyDeleted(){
    todos.classList.add("remove");
    sideBar.classList.remove("openSidebar");
    deleteCont.classList.add("pop")
    completedCont.classList.remove("pop");
    QuotesText.classList.remove("pop");
    errorMsg.classList.remove("errorPop");

        if(deleteCont.children.length > 1){
            const notDeleted = document.querySelector(".notDeleted");
            notDeleted.classList.add("remove");
       }
           

}

// SHOW RECENTLY DELETED TODO PAGE

function showHome(){
    sideBar.classList.remove("openSidebar");
    todos.classList.remove("remove");
    deleteCont.classList.remove("pop");
    completedCont.classList.remove("pop");
    QuotesText.classList.remove("pop");
    
   
}

// SHOW COMPLETED PAGE

function showCompleted(){
    todos.classList.add("remove");
    sideBar.classList.remove("openSidebar");
    deleteCont.classList.remove("pop");
    completedCont.classList.add("pop");
    QuotesText.classList.add("pop");
    errorMsg.classList.remove("errorPop");
    console.log(completedCont.children.length);
        
        if(completedCont.children.length > 1){
         const randomIndex = Math.floor(Math.random() * 10);
         QuotesText.innerHTML = `"${Quotes[randomIndex]}"`; 
         const notCompleted = document.querySelector(".notCompleted");
         notCompleted.classList.add("remove");
         QuotesText.classList.remove("remove");
         
    }
}

