(function() {
    'use strict';

    angular
        .module('goalBuddyApp')
        .controller('TodoDeleteController',TodoDeleteController);

    TodoDeleteController.$inject = ['$uibModalInstance', 'entity', 'Todo'];

    function TodoDeleteController($uibModalInstance, entity, Todo) {
        var vm = this;

        vm.todo = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Todo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
