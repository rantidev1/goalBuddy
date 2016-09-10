(function() {
    'use strict';

    angular
        .module('goalBuddyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('todo', {
            parent: 'entity',
            url: '/todo?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'goalBuddyApp.todo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/todo/todos.html',
                    controller: 'TodoController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('todo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('todo-detail', {
            parent: 'entity',
            url: '/todo/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'goalBuddyApp.todo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/todo/todo-detail.html',
                    controller: 'TodoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('todo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Todo', function($stateParams, Todo) {
                    return Todo.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'todo',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('todo-detail.edit', {
            parent: 'todo-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/todo/todo-dialog.html',
                    controller: 'TodoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Todo', function(Todo) {
                            return Todo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('todo.new', {
            parent: 'todo',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/todo/todo-dialog.html',
                    controller: 'TodoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                startDate: null,
                                endDate: null,
                                priority: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('todo', null, { reload: 'todo' });
                }, function() {
                    $state.go('todo');
                });
            }]
        })
        .state('todo.edit', {
            parent: 'todo',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/todo/todo-dialog.html',
                    controller: 'TodoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Todo', function(Todo) {
                            return Todo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('todo', null, { reload: 'todo' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('todo.delete', {
            parent: 'todo',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/todo/todo-delete-dialog.html',
                    controller: 'TodoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Todo', function(Todo) {
                            return Todo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('todo', null, { reload: 'todo' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
