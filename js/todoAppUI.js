define(["require", "exports", "./todoApp", "jquery"], function (require, exports, ToDoApp, $) {
    "use strict";
    var ToDoAppUI;
    (function (ToDoAppUI) {
        var itemTemplate = $('#item-template').html();
        var taskList = $('#task-list');
        var editingItem = null;
        var addListItem = function (todo) {
            var newElement = $(itemTemplate).clone();
            newElement.data('item', todo);
            var taskItem = $('.task-text', newElement);
            $(taskItem).html(todo.Text);
            taskList.append(newElement);
            bindRemoveItemButton(newElement);
            bindCompleteItemButton(newElement);
            bindEditItemAction(newElement);
        };
        var bindAddItemButton = function () {
            $('#btnAdd').on('click', function (e) {
                var taskText = $('#txtAdd').val();
                if (taskText) {
                    if (editingItem) {
                        var data = editingItem.data('item');
                        var taskItem = $('.task-text', editingItem);
                        data.Text = taskText;
                        taskItem.html(data.Text);
                        editingItem.data('item', data);
                        ToDoApp.updateAppData();
                        resetEditing();
                    }
                    else {
                        var todo = new ToDoApp.ToDo(taskText, false);
                        ToDoApp.addToDo(todo);
                        addListItem(todo);
                    }
                }
                resetEditing();
                e.preventDefault();
            });
        };
        var bindResetButton = function () {
            $('#btnCancel').on('click', function (e) {
                resetEditing();
            });
        };
        var bindRemoveItemButton = function (todoListItem) {
            var removeButton = $('.task-action-remove', todoListItem);
            removeButton.on('click', function (e) {
                ToDoApp.removeToDo(todoListItem.data('item'));
                todoListItem.remove();
                e.preventDefault();
            });
        };
        var bindCompleteItemButton = function (todoListItem) {
            $(todoListItem).toggleClass('completed', todoListItem.data('item').IsCompleted);
            var completeButton = $('.task-action-complete', todoListItem);
            completeButton.on('click', function (e) {
                var data = todoListItem.data('item');
                data.IsCompleted = !data.IsCompleted;
                todoListItem.data('item', data);
                $(todoListItem).toggleClass('completed', todoListItem.data('item').IsCompleted);
                ToDoApp.updateAppData();
                e.preventDefault();
            });
        };
        var bindEditItemAction = function (todoListItem) {
            var itemText = $('.task-text', todoListItem);
            itemText.on('click', function (e) {
                loadEditingItem(todoListItem);
                e.preventDefault();
            });
        };
        var loadEditingItem = function (todoListItem) {
            editingItem = $(todoListItem);
            var todo = todoListItem.data('item');
            $('#txtAdd').val(todo.Text);
            $('header').toggleClass('editing', editingItem !== null);
            $('#txtAdd').focus();
        };
        var resetEditing = function () {
            editingItem = null;
            $('#txtAdd').val('');
            $('#txtAdd').focus();
            $('header').toggleClass('editing', editingItem !== null);
        };
        var showHideComplated = function () {
            $("#task-list").toggleClass('hideCompleted', !ToDoApp.appSettings.showCompleted);
        };
        ToDoAppUI.init = function () {
            ToDoApp.init();
            showHideComplated();
            bindAddItemButton();
            bindResetButton();
            ToDoApp.todoList.forEach(function (item, index) {
                addListItem(item);
            });
            $('#txtAdd').focus();
        };
    })(ToDoAppUI || (ToDoAppUI = {}));
    return ToDoAppUI;
});
