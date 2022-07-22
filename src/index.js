import './style.css';

class ToDoList {

  itemList;
  ownDiv;
  newListContainer;

  constructor(ownDIv) {
    this.itemList = [];
    this.ownDiv = ownDIv;
    this.newListContainer = document.createElement('div')
  }

  addItem(item) {
    this.itemList.push(item)
    this.showList;
  }

  makeListADiv(thisList) {
    const newListDiv = document.createElement('div')
    const titleDiv = document.createElement('div')
    const descriptionDiv = document.createElement('div')
    const newList = thisList.itemList

    newListDiv.setAttribute('class', 'new-list-div')

    newListDiv.appendChild(titleDiv)
    newListDiv.appendChild(descriptionDiv)
    newListDiv.appendChild(this.newListContainer)
    newList.showList

    titleDiv.innerText = thisList.title
    descriptionDiv.innerText = thisList.description

    return newListDiv;
  }

  removeItem(item) {
    let newItemList = this.itemList.splice(item);
    this.itemList = newItemList;
  }

  sortList() {
    this.itemList.sort((a,b) => {
      return a.priority - b.priority;
    });
  }

  get showList(){
    let listDiv = document.createElement('div')
    if (this.itemList.length === 0) {
      listDiv.innerHTML = ''
    }
    else {
      this.sortList();
      for (let i = 0; i < this.itemList.length; i++) {
        let itemDiv = document.createElement('div');
        let newCheckBox = makeFinishedCheckBox(i);
        itemDiv = this.makeListADiv(this.itemList[i]);
        itemDiv.appendChild(newCheckBox)
        listDiv.appendChild(itemDiv);
        this.itemList[i].showList;
      };
    };
    listDiv.appendChild(makeTaskButton(this))
    this.ownDiv.innerHTML = "";
    this.ownDiv.appendChild(listDiv);
    return listDiv;
  };

  
}


class ToDoItem {

  title;
  description;
  priority;
  finished;
  internalSteps;
  itemList;
  itemDiv;

  constructor(title, description, priority, parentItem) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.itemList = new ToDoList(parentItem.newListContainer);
    this.finished = false;
    this.itemDiv = this.itemList.ownDIv
  }

  toggleFinished(index) {

    let checkChecked = document.getElementById(`finished${index}`)
    if (checkChecked.checked === false) {
      this.finished = true;
      this.itemDiv.setAttribute('class', 'finished');
    }
    else {
      this.finished = false;
      this.itemDiv.classList.remove('finished');
    }
  }

}

class ToDoForm {

  parentItem;
  title;
  description;
  priority;

  constructor(parentItem) {
    this.parentItem = parentItem;
    this.title = this.titleForm();
    this.description = this.descriptionForm();
    this.priority = this.priorityForm();
    let button = this.makeButton();

    this.formDiv = document.createElement('div');
    this.formDiv.setAttribute('class', 'form-div');
    this.formDiv.appendChild(this.title);
    this.formDiv.appendChild(this.description);
    this.formDiv.appendChild(this.priority)
    this.formDiv.appendChild(button);

    button.addEventListener('click', () => {
      this.addItemToButton();
    });
  }

  addItemToButton() { 
    const newItem = new ToDoItem(this.title.lastChild.value, this.description.lastChild.value, this.priority.lastChild.value, this.parentItem)
    this.parentItem.addItem(newItem)
    this.parentItem.showList;
  };

  makeButton() {
    let newButton = document.createElement('button');
    newButton.setAttribute('id', 'toDoSubmit')
    newButton.innerHTML = 'Add Item';

    return newButton;
  }

  titleForm() {
    let titleDiv = document.createElement('div');
    let inputDiv = document.createElement('div');
    let titleInput = document.createElement('input');

    inputDiv.textContent = 'Task';
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('name', 'title');

    titleDiv.appendChild(inputDiv);
    titleDiv.appendChild(titleInput);

    return titleDiv;
  }

  descriptionForm() {
    let titleDiv = document.createElement('div');
    let inputDiv = document.createElement('div');
    let titleInput = document.createElement('input');

    inputDiv.textContent = 'Description';
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'description');
    titleInput.setAttribute('name', 'description');

    titleDiv.appendChild(inputDiv);
    titleDiv.appendChild(titleInput);

    return titleDiv;
  }

  get div() {
    return this.formDiv;
  }

  priorityForm() {
    let priorityDiv = document.createElement('div');
    let inputDiv = document.createElement('div');
    let priorityInput = document.createElement('input');

    priorityDiv.textContent = 'Priority';
    priorityInput.setAttribute('type', 'number');
    priorityInput.setAttribute('id', 'priority');
    priorityInput.setAttribute('name', 'priority');

    priorityDiv.appendChild(inputDiv);
    priorityDiv.appendChild(priorityInput);

    return priorityDiv;
  }

}

const mainList = document.getElementById('main-list');
let mainListDisplay = new ToDoList(mainList);
mainListDisplay.showList;



function addForm(addButton, parentItem){
  const parentElement = addButton.parentElement;
  const newDiv = document.createElement('div');
  const testForm = new ToDoForm(parentItem);
  newDiv.setAttribute('class', 'new-div');

  parentElement.appendChild(newDiv);
  
  newDiv.appendChild(testForm.div);
}


function makeTaskButton(parentItem){
  const addButton = document.createElement('button')
  addButton.setAttribute('class', 'show-add-form')
  addButton.setAttribute('id', 'show-add-form')
  addButton.innerText = "Add Task"
  addButton.addEventListener('click', () => {addForm(addButton, parentItem)});
  return addButton;
}

function makeFinishedCheckBox(index){
  const addBox = document.createElement('input');
  addBox.setAttribute('type', 'checkbox');
  //addBox.setAttribute('onclick', `toggleFinished(${index})`);
  addBox.addEventListener("change", () => {toggleFinished(index)})
  addBox.setAttribute('id', `finished${index}`);
  addBox.setAttribute('name', `finished${index}`);
  return addBox;
}

function toggleFinished(index){

  let checkChecked = document.getElementById(`finished${index}`) 
  let parentDiv = checkChecked.parentElement;
  if (checkChecked.checked === true) {
    parentDiv.classList.add('finished');
  }
  else {
    parentDiv.classList.remove('finished');
  }
}




