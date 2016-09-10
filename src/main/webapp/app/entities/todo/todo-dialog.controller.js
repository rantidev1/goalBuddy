(function() {
    'use strict';

    angular
        .module('goalBuddyApp')
        .controller('TodoDialogController', TodoDialogController);

    TodoDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Todo'];

    function TodoDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Todo) {
        var vm = this;

        vm.todo = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.todo.id !== null) {
                Todo.update(vm.todo, onSaveSuccess, onSaveError);
            } else {
                Todo.save(vm.todo, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('goalBuddyApp:todoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.startDate = false;
        vm.datePickerOpenStatus.endDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
