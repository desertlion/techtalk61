(function(){
    'use strict';
    
    angular
        .module('mdTechtalk')
        .controller('AnnouncementController', AnnouncementController);
    
    AnnouncementController.$inject = ['Announce', '$mdDialog', '$mdToast'];
    function AnnouncementController(Announce, $mdDialog, $mdToast){
        var vm            = this;
        vm.items          = Announce.items;
        vm.showAddDialog  = showAddDialog;
        vm.deleteItem     = deleteItem;
        
        // Function Definition ///////////////////////////////////////
        function showAddDialog(ev){
            $mdDialog.show({
              controller: AddAnnounceController,
              controllerAs: 'AddAnnounce',
              templateUrl: 'addannouncement.tmpl.html',
              targetEvent: ev,
            });
        }
        function deleteItem(id,index, ev){
            var confirm = $mdDialog.confirm()
                .title('Delete Item?')
                .content('Are you sure you want to delete this item?')
                .ok('Yes').cancel('No').targetEvent(ev);
            
            $mdDialog.show(confirm)
            .then(function(){
                Announce.deleteItem(id,index)
                .then(function(){
                    $mdToast.simple().content('Successfully Delete Announcement').position('top right')
                                .hideDelay(3000);
                }, function(){
                    $mdToast.simple().content('Fail Delete Announcement').position('top right')
                                .hideDelay(3000);
                });
            }, function(){
            });
        }
        
        // Init //////////////////////////////////////////////////////
        Announce.loadItems();
    }
    
    angular
        .module('mdTechtalk')
        .controller('AddAnnounceController', AddAnnounceController);
    
    AddAnnounceController.$inject = ['Announce', '$mdToast', '$mdDialog'];
    function AddAnnounceController ( Announce, $mdToast, $mdDialog ) {
        var vm             = this;
        vm.addAnnouncement = addAnnouncement;
        
        function addAnnouncement(){
            Announce.createItem({title:vm.title,description:vm.description}, function(res){
                vm.title       = "";
                vm.description = "";
                $mdDialog.hide();
                $mdToast.simple().content('Successfully add Announcement').position('top right')
                                .hideDelay(3000);
            }, function(err){
                $mdToast.simple().content('Failed adding Announcement').position('top right')
                                .hideDelay(3000);
            });
        }
    }
})();