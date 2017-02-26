module ToDoApp {
    var saveLocalData = function () {
        localStorage.setItem('tasks', JSON.stringify(todoList));
        localStorage.setItem('appSettings', JSON.stringify(appSettings));
    }

    var loadLocalData = function () {
        // get the tasks
        var tasksJSON = localStorage.getItem('tasks');
        if (tasksJSON) {
            var tasks = JSON.parse(tasksJSON);
            if (tasks && Array.isArray(tasks) && tasks.length > 0) {
                tasks.forEach((taskItem) => {
                    todoList.push({ Text: taskItem.Text, IsCompleted: taskItem.IsCompleted });
                })
            }
        }
        // get the app AppSettings
        var appSettingsJSON = localStorage.getItem('appSettings');
        if(appSettingsJSON) {
            appSettings = JSON.parse(appSettingsJSON) as AppSettings;
        }
    }

    export class ToDo {
        constructor(public Text: string, public IsCompleted: boolean) { }
    }

    class AppSettings {
        public showCompleted: boolean;
        constructor() {
            this.showCompleted = true;
        }
    }

    export var todoList: Array<ToDo> = [];

    export var appSettings: AppSettings = new AppSettings();

    export var addToDo = function (todo: ToDo) {
        todoList.push(todo);
        saveLocalData();
    }

    export var removeToDo = function (todo: ToDo) {
        todoList.splice(todoList.indexOf(todo), 1);
        saveLocalData();
    }

    export var updateAppData = function () {
        saveLocalData();
    }

    export var init = function () {
        loadLocalData();
    }
}

export = ToDoApp;