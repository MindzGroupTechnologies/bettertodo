define(["require", "exports"], function (require, exports) {
    "use strict";
    var ToDoApp;
    (function (ToDoApp) {
        var saveLocalData = function () {
            localStorage.setItem('tasks', JSON.stringify(ToDoApp.todoList));
            localStorage.setItem('appSettings', JSON.stringify(ToDoApp.appSettings));
        };
        var loadLocalData = function () {
            var tasksJSON = localStorage.getItem('tasks');
            if (tasksJSON) {
                var tasks = JSON.parse(tasksJSON);
                if (tasks && Array.isArray(tasks) && tasks.length > 0) {
                    tasks.forEach(function (taskItem) {
                        ToDoApp.todoList.push({ Text: taskItem.Text, IsCompleted: taskItem.IsCompleted });
                    });
                }
            }
            var appSettingsJSON = localStorage.getItem('appSettings');
            if (appSettingsJSON) {
                ToDoApp.appSettings = JSON.parse(appSettingsJSON);
            }
        };
        var ToDo = (function () {
            function ToDo(Text, IsCompleted) {
                this.Text = Text;
                this.IsCompleted = IsCompleted;
            }
            return ToDo;
        }());
        ToDoApp.ToDo = ToDo;
        var AppSettings = (function () {
            function AppSettings() {
                this.showCompleted = true;
            }
            return AppSettings;
        }());
        ToDoApp.todoList = [];
        ToDoApp.appSettings = new AppSettings();
        ToDoApp.addToDo = function (todo) {
            ToDoApp.todoList.push(todo);
            saveLocalData();
        };
        ToDoApp.removeToDo = function (todo) {
            ToDoApp.todoList.splice(ToDoApp.todoList.indexOf(todo), 1);
            saveLocalData();
        };
        ToDoApp.updateAppData = function () {
            saveLocalData();
        };
        ToDoApp.init = function () {
            loadLocalData();
        };
    })(ToDoApp || (ToDoApp = {}));
    return ToDoApp;
});
