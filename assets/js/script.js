const itemsContent = document.getElementById('items-content');
const formText = document.querySelector('#formText');
const btnAdd = document.querySelector('#btnAdd');
const btnTab = document.querySelectorAll('.btnTab');
let editId;

const todoLists = [
    { id: 1, text: 'Task 1', isCompleted: false },
    { id: 2, text: 'Task 2', isCompleted: false },
    { id: 3, text: 'Task 3', isCompleted: false },
    { id: 4, text: 'Task 4', isCompleted: false },
    { id: 5, text: 'Task 5', isCompleted: false },
    { id: 6, text: 'Task 6', isCompleted: false }
]

function createTodo() {
    itemsContent.innerHTML = '';
    for (let todo of todoLists) {
        const item = `
            <div class="flex items-center justify-between border border-[#E1E1E1] p-[12px]">
                <label class="flex items-center space-x-[5px] ${todo.isCompleted ? 'line-through' : ''}">
                    <input onchange='todoChecked(this, ${todo.id})' type="checkbox" ${todo.isCompleted ? 'checked' : ''}>
                    <span>${todo.text}</span>
                </label>
                <div>
                    <button onclick='todoEdit(${todo.id})' class="w-[20px] h-[20px] inline-flex items-center justify-center text-[10px] rounded bg-blue-500 text-white">
                        <i class="fa fa-pen"></i>
                    </button>
                    <button onclick='destroyTodo(${todo.id})' class="w-[20px] h-[20px] inline-flex items-center justify-center text-[10px] rounded bg-red-500 text-white">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        itemsContent.insertAdjacentHTML('beforeend', item);
    }
}

btnAdd.addEventListener('click', function (event) {
    event.preventDefault();
    if (editId) {
        let findIndex = getTodoIndexById(editId);
        todoLists[findIndex].text = formText.value;
        editId = '';
    } 
    else {
        todoLists.push({ id: todoLists.length + 1, text: formText.value });
    }
    formText.value = '';
    createTodo();
});

function getTodoIndexById(id) {
    let findIndex;
    for (index in todoLists) {
        if (todoLists[index].id === id) {
            findIndex = index;
        }
    }
    return findIndex;
}

function destroyTodo(id) {
    let isValid = confirm('Bu məlumatı silmək istədiyinizə əminsinizmi?');
    if (isValid) {
        let  findIndex = getTodoIndexById(id);
        todoLists.splice(findIndex, 1);
        createTodo();
    }
}

function todoChecked(e, id) {
    let  findIndex = getTodoIndexById(id);
    todoLists[findIndex].isCompleted = e.checked;
    createTodo();
}

function todoEdit(id) {
    let  findIndex = getTodoIndexById(id);
    let todo = todoLists[findIndex];
    formText.value = todo.text;
    editId = id;
}

btnTab.forEach( function(i) {
    
    i.addEventListener('click', function(e) {
        btnTab.forEach( function(button) {
            button.classList.remove('bg-[#8F8F8F]', 'text-white')
        })

        const value = e.target.getAttribute('data-value');
        e.target.classList.add('bg-[#8F8F8F]', 'text-white');
    })
    
})

createTodo();


// https://github.com/eminazeroglu/todo-list-javascript