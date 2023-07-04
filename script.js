const localStorageKey = "todoliststorage"

const inputText = document.getElementById("input-text");

// Adiciona um evento de keyup ao elemento
inputText.addEventListener("keyup", function(e) {
  // Obtém o código da tecla pressionada
  var key = e.which || e.keyCode;
  // Verifica se é a tecla enter
  if (key == 13) {
    // Chama a função addNewTask
    addNewTask();
  }
});

function validateRepetition(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputTextValue = document.getElementById("input-text").value
    let exists = values.find(x => x.name == inputTextValue)
    return exists? true:false
}

function addNewTask() {
    let inputText = document.getElementById("input-text")
    if(!inputText.value){
        alert("Digite um valor de entrada")
    }else if(validateRepetition()){
        alert("Digite um valor não repetido")
        inputText.focus()
        inputText.value = ""
    }else{
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: inputText.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showTasks()
        inputText.focus()
        inputText.value = ""
    }
}
function showTasks() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let taskList = document.getElementById("task-list")
    taskList.innerHTML = ""
    for (let i = 0;i<values.length;i++){
        taskList.innerHTML += `<li>${values[i].name}<button id="btn-remove-task" onclick="removeTask('${values[i].name}')"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg></button></li>`
    }

}
function removeTask(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showTasks()
}

showTasks()