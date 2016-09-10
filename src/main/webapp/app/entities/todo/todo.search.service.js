(function() {
    'use strict';

    angular
        .module('goalBuddyApp')
        .factory('TodoSearch', TodoSearch);

    TodoSearch.$inject = ['$resource'];

    function TodoSearch($resource) {
        var resourceUrl =  'api/_search/todos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
