(function(){
    'use strict';

    angular
        .module('mdTechtalk')
        .controller('UserController', UserController);

    UserController.$inject = ['AjaxService','Task','$mdDialog','$mdToast'];
    function UserController(AjaxService,Task,$mdDialog,$mdToast){
        var vm        = this;
        vm.tasks      = Task.tasks;
        vm.showTaskForm = showTaskForm;
        vm.deleteTask = deleteTask;

        //////////// Function Declaration /////////////
        function showTaskForm(ev){
            $mdDialog.show({
                controller: AddTaskController,
                controllerAs: 'TaskForm',
                templateUrl: 'AddTask.tmpl.html',
                targetEvent: ev
            });
        }
        function deleteTask(index,id,ev){
            var confirm = $mdDialog.confirm()
                .title('Confirm')
                .content('Are you sure you want to delete this Data?')
                .ok('Yes')
                .cancel('no')
                .targetEvent(ev);
            $mdDialog.show(confirm)
                .then(function(){
                    Task.deleteTask(index,id)
                    .then(function(){
                         $mdToast.show(
                            $mdToast.simple()
                                .content('You delete the data')
                                .position('top right')
                                .hideDelay(3000)
                        );//
                    })
                }, function(){
                    $mdToast.show(
                        $mdToast.simple()
                            .content('You cancel delete the data')
                            .position('top right')
                            .hideDelay(3000)
                    )
                })
        }
        Task.loadTasks();
    }

    angular
        .module('mdTechtalk')
        .controller('AddTaskController',AddTaskController);

    AddTaskController.$inject = ['$mdDialog', 'Task','$mdToast'];
    function AddTaskController($mdDialog,Task,$mdToast){
        var vm        = this;
        vm.newTaskTxt = '';
        vm.createTask = function (){
            console.log('clicked')
            Task.createTask(vm.newTaskTxt)
            .then(function(response){
                $mdDialog.hide('Task deleted');
                $mdToast.show(
                    $mdToast.simple()
                        .content('Task added')
                        .position('top right')
                        .hideDelay(3000)
                )
            }, function(){
                $mdDialog.cancel('Fail to delete Task');
                $mdToast.show(
                    $mdToast.simple()
                        .content('Fail to add Task')
                        .position('top right')
                        .hideDelay(3000)
                )
            });
        }
    }
})();
