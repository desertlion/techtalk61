(function(){
    'use strict';

    angular
        .module('mdTechtalk')
        .service('AjaxService',AjaxService);

    var baseUrl = 'http://localhost:3000/';
    AjaxService.$inject = ['$http','$q'];
    function AjaxService($http, $q){
        return {
            AjaxGet: function(url, successFunction, errorFunction){
                return $http.get(baseUrl+'tasks')
                    .success(function(response, status, headers, config){
                        successFunction(response, status);
                    })
                    .error(function(err){
                        errorFunction(err);
                    });
            },
            AjaxPost: function(url, data, successFunction, errorFunction){
                return $http.post(url, data)
                    .success(function(response, status, headers, config){
                        successFunction(response, status);
                    })
                    .error(function(err){
                        errorFunction(err);
                    });
            },
            AjaxDelete: function(url, successFunction, errorFunction){
                return $http.delete(url)
                    .success(function(response, status, headers, config){
                        successFunction(response, status);
                    })
                    .error(function(err){
                        errorFunction(err);
                    });
            }
        }
    }

    angular
        .module('mdTechtalk')
        .factory('Task',TaskService);

    TaskService.$inject = ['AjaxService'];
    function TaskService(AjaxService){
        var Task = {
            tasks: [],
            loadTasks: loadTasks,
            createTask: createTask,
            deleteTask: deleteTask,
        }
        function createTask(data){
            return AjaxService.AjaxPost('tasks', {task: data}, function(response, status){
                Task.tasks.push(response);
            }, function(err){
                console.error(err);
            })
        }
        function deleteTask(index,id){
            return AjaxService.AjaxDelete('tasks/'+id, function(response, status){
                Task.tasks.splice(index,1);
            }, function(err){
                console.error(err);
            })
        }
        function loadTasks(){
            return AjaxService.AjaxGet('tasks',function(response, status){
                angular.forEach(response, function(data){
                    Task.tasks.push(data);
                    console.log(data);
                })
            })
        }
        return Task;
    }
})();
