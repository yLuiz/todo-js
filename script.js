let btnAdd = document.getElementById('btn-add')
const list = document.getElementById('list')
const tasks = JSON.parse(localStorage.getItem('task_list')) || []
const taskInput = document.getElementById('input-field')

function showTasks() {

  list.innerHTML = ''

  tasks.forEach(t => {
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'listItem')

    const newP = document.createElement('p')
    newP.setAttribute('class', 'paragraph')

    const newTask = document.createTextNode(t)
    newP.appendChild(newTask)

    const linkDelete = document.createElement('a')
    linkDelete.setAttribute('class', 'linkButton')

    linkDelete.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>`    

    const index = tasks.indexOf(t)
    linkDelete.setAttribute('onclick', `deleteTask(${index})`)

    newLi.appendChild(newP)
    newLi.appendChild(linkDelete)

    list.appendChild(newLi)
  })
}

showTasks()
taskInput.addEventListener('keypress', (event) => {
  const keyName = event.key
  if (keyName == 'Enter') {
    addTask()
  }

})

function checkInput () {
  const newLi = document.createElement('li')
  newLi.setAttribute('class', 'listItem listItemErro')
  const noTaskItem = document.querySelectorAll('.listItemErro')

  if(noTaskItem.length == 0) {
    const noTaskElement = document.createElement('h2')
    const noTaskText = document.createTextNode('Insira uma tarefa!')
    const firstChild = list.firstElementChild

    noTaskElement.appendChild(noTaskText)
    noTaskElement.setAttribute('class', 'noTask')

    newLi.appendChild(noTaskElement)
    list.insertBefore(newLi, firstChild)

    setTimeout(() => {
      newLi.parentNode.removeChild(newLi)
    }, 2000)
    }
}

function addTask() {
  const task = taskInput.value

  if (taskInput.value.length == '') return checkInput()

  tasks.push(task)

  document.getElementById('input-field').value = ''
  document.getElementById('input-field').focus()

  showTasks()
  saveOnLocalStorage()
}

btnAdd.setAttribute('onclick', 'addTask()')

function deleteTask(index) {
  tasks.splice(index, 1)
  showTasks()
  saveOnLocalStorage()
}


function saveOnLocalStorage() {
  localStorage.setItem('task_list', JSON.stringify(tasks))
}
