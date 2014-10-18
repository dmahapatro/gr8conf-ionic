(function(){
    var Talks = function($resource, Api){
        return $resource(Api.Talks + ":confId", {}, {
            query : {
                method: 'GET',
                isArray: true,
                cache: true
            }
        });
    };

    var Speakers = function($resource, Api){
        return $resource(Api.Speakers + ":confId", {}, {
            query : {
                method: 'GET',
                isArray: true,
                cache: true
            }
        });
    };

    var Agenda = function ($resource, Api) {
        return $resource(Api.Agenda + ":confId", {}, {
            query : {
                method: 'GET',
                isArray: true,
                cache: true
            }
        });
    };

    var injections = ['$resource', 'Api'];

    Talks.$inject = angular.copy(injections);
    Speakers.$inject = angular.copy(injections);
    Agenda.$inject = angular.copy(injections);

    angular.module('gr8conf.services', ['ngResource'])
        .factory('Talks', Talks)
        .factory('Speakers', Speakers)
        .factory('Agenda', Agenda);
})();