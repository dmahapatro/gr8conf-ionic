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

    var SpeakerDetail = function (Speakers) {
        function getDetail(confId, speakerId) {
            if(!speakerId) { return '' };
            var selectedSpeaker = {};

            return Speakers.query({confId: confId}).$promise.then(function(speakers){
                if(speakers) {
                    selectedSpeaker = speakers.filter(function(speaker){
                        return speaker.id == speakerId;
                    });

                    return selectedSpeaker ? selectedSpeaker[0] : {};
                }
            });
        }

        return {
            getDetail: getDetail
        }
    };

    var AgendaService = function () {
        var visitedAgenda;

        function setVisitedAgenda(_visited) {
            visitedAgenda = _visited;
        }

        function getVisitedAgenda() {
            return visitedAgenda;
        }

        return {
            setVisitedAgenda: setVisitedAgenda,
            getVisitedAgenda: getVisitedAgenda
        }
    };

    var injections = ['$resource', 'Api'];

    Talks.$inject = angular.copy(injections);
    Speakers.$inject = angular.copy(injections);
    Agenda.$inject = angular.copy(injections);
    SpeakerDetail.$inject = angular.copy(['Speakers']);

    angular.module('gr8conf.services', ['ngResource'])
        .factory('Talks', Talks)
        .factory('Speakers', Speakers)
        .factory('Agenda', Agenda)
        .factory('SpeakerDetail', SpeakerDetail)
        .factory('AgendaService', AgendaService);
})();