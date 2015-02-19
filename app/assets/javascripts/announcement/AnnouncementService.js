(function(){
    'use strict';
    
    angular
        .module('mdTechtalk')
        .factory('Announce',Announce);
    
    Announce.$inject = ['AjaxService'];
    function Announce(AjaxService){
        var Announce = {
            items: [],
            loadItems: loadItems,
            createItem: createItem,
            deleteItem: deleteItem
        }
        function loadItems(){
            return AjaxService.AjaxGet('announcements', function(response){
                _.forEach(response, function(res){
                    Announce.items.push(res);
                });
            }, function(err){
            });
        }
        function createItem(data, onSuccess, onFailure){
            return AjaxService.AjaxPost('announcements', data, function(response){
                Announce.items.push(response);
                onSuccess(response);
            }, function(err){
                onFailure(err);
            });
        }
        function deleteItem(id,index){
            return AjaxService.AjaxDelete('announcements/'+id, function(res){
                Announce.items.splice(index,1);
            }, function(err){
                console.error(err);
            });
        }
        return Announce;
    }
})();