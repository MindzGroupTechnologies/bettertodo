import * as ToDoApp from "./ToDoApp";
import * as $ from "jquery";

module ToDoAppUI {
    var itemTemplate = $('#item-template').html();
    var taskList = $('#task-list');
    var editingItem: JQuery = null;

    var addListItem = function (todo: ToDoApp.ToDo) {
        // get item template
        var newElement = $(itemTemplate).clone();
        newElement.data('item', todo);

        // update text in tempalte
        var taskItem = $('.task-text', newElement);
        $(taskItem).html(todo.Text);

        // add the new item to DOM
        taskList.append(newElement);

        // attach the remove button event
        bindRemoveItemButton(newElement);

        // attach the remove button event
        bindCompleteItemButton(newElement);

        // attach the item click event
        bindEditItemAction(newElement);
    }

    var bindAddItemButton = function () {
        $('#btnAdd').on('click', function (e) {
            var taskText = $('#txtAdd').val();

            if (taskText) {
                if (editingItem) {
                    var data = editingItem.data('item') as ToDoApp.ToDo;
                    
                    var taskItem = $('.task-text', editingItem);
                    data.Text = taskText;
                    taskItem.html(data.Text);
                    editingItem.data('item', data);
                    ToDoApp.updateAppData();
                    resetEditing();
                }
                else {
                    var todo = new ToDoApp.ToDo(taskText, false);
                    // add item to data list
                    ToDoApp.addToDo(todo);

                    // add item to todo list
                    addListItem(todo);
                }
            }
            resetEditing();

            e.preventDefault();
        });
    }

    var bindResetButton = function () {
        $('#btnCancel').on('click', function (e) {
            resetEditing();
        });
    }
    var bindRemoveItemButton = function (todoListItem: JQuery) {
        // event binding for the remove button
        var removeButton = $('.task-action-remove', todoListItem);
        removeButton.on('click', function (e) {
            ToDoApp.removeToDo(todoListItem.data('item'));
            todoListItem.remove();
            e.preventDefault();
        });
    }

    var bindCompleteItemButton = function (todoListItem: JQuery) {
        // event binding for the remove button
        $(todoListItem).toggleClass('completed', (todoListItem.data('item') as ToDoApp.ToDo).IsCompleted);
        var completeButton = $('.task-action-complete', todoListItem);
        completeButton.on('click', function (e) {
            var data = todoListItem.data('item') as ToDoApp.ToDo;
            data.IsCompleted = !data.IsCompleted;
            todoListItem.data('item', data);
            $(todoListItem).toggleClass('completed', (todoListItem.data('item') as ToDoApp.ToDo).IsCompleted);
            ToDoApp.updateAppData();
            e.preventDefault();
        });
    }

    var bindEditItemAction = function (todoListItem: JQuery) {
        var itemText = $('.task-text', todoListItem);
        itemText.on('click', function (e) {
            loadEditingItem(todoListItem);

            e.preventDefault();
        })
    }

    var loadEditingItem = function (todoListItem: JQuery) {
        editingItem = $(todoListItem);
        var todo = todoListItem.data('item') as ToDoApp.ToDo;

        $('#txtAdd').val(todo.Text);
        $('header').toggleClass('editing', editingItem !== null);
        $('#txtAdd').focus();
    }

    var resetEditing = function () {
        editingItem = null;

        $('#txtAdd').val('');
        $('#txtAdd').focus();
        $('header').toggleClass('editing', editingItem !== null);
    }

    var showHideComplated = function () {
        $("#task-list").toggleClass('hideCompleted', !ToDoApp.appSettings.showCompleted);
    }

    export var init = function () {
        ToDoApp.init();

        // show hide complated ToDos
        showHideComplated();

        // event binding for add button
        bindAddItemButton();

        // event binding for reset button
        bindResetButton();

        ToDoApp.todoList.forEach((item, index) => {
            addListItem(item);
        });

        $('#txtAdd').focus();
    }
}

export = ToDoAppUI;