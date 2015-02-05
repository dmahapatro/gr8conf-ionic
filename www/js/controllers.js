// Controllers
(function(){
    var TalksCtrl = function ($scope, $rootScope, $stateParams, $state, Talks) {
        $scope.gr8conf = {talks : [], searchTalk: '', talksTitle: 'Talks'};
        $scope.gr8conf.talksTitle = $scope.confId === 1 ? 'Europe' : 'USA';
        
        if ( $stateParams && $stateParams.confType ) {
            $rootScope.confId = $stateParams.confType == 'eu' ? 1 : 2;
            $scope.gr8conf.talks = Talks;
            $scope.talksError = false;
        } else {
            $scope.talksError = true;
        }

        $scope.talkDetails = function(talkId) {
            $state.go('tab.talk', { talkId: talkId, confId: $scope.confId });
        }
    };

    var AgendaCtrl = function ($scope, Agenda) {
        $scope.gr8conf = { agenda: [], agendaByTimeForDay : [], agendaByDay: [], agendaTitle: 'Agenda' };
        $scope.gr8conf.agendaTitle = $scope.confId === 1 ? 'Europe' : 'USA';

        function setAgendaForDay( conf ) {
            if ( $scope.confId === 1 ) {
                if ( $scope.gr8conf.agendaGroupedByTimePerDay && $scope.gr8conf.agendaGroupedByTimePerDay.length > 2 ) {
                    if ( conf.day == "2014-06-02" ) {
                        $scope.gr8conf.agendaByDay = $scope.gr8conf.agendaGroupedByTimePerDay[0];
                        $scope.gr8conf.agenda[0].active = true;
                        $scope.gr8conf.agenda[1].active = false;
                        $scope.gr8conf.agenda[2].active = false;
                    } else if ( conf.day == "2014-06-03" ) {
                        $scope.gr8conf.agendaByDay = $scope.gr8conf.agendaGroupedByTimePerDay[1];
                        $scope.gr8conf.agenda[1].active = true;
                        $scope.gr8conf.agenda[0].active = false;
                        $scope.gr8conf.agenda[2].active = false;
                    } else {
                        $scope.gr8conf.agendaByDay = $scope.gr8conf.agendaGroupedByTimePerDay[2];
                        $scope.gr8conf.agenda[2].active = true;
                        $scope.gr8conf.agenda[0].active = false;
                        $scope.gr8conf.agenda[1].active = false;
                    }
                }
            } else if ( $scope.confId === 2 ) {
                if ( conf.day == "2014-07-28" ) {
                    $scope.gr8conf.agendaByDay = $scope.gr8conf.agendaGroupedByTimePerDay[0];
                    $scope.gr8conf.agenda[0].active = true;
                    $scope.gr8conf.agenda[1].active = false
                } else {
                    $scope.gr8conf.agendaByDay = $scope.gr8conf.agendaGroupedByTimePerDay[1];
                    $scope.gr8conf.agenda[1].active = true;
                    $scope.gr8conf.agenda[0].active = false
                }
            }
        }

        Agenda.query({confId: $scope.confId}).$promise.then(function(agenda){
            $scope.gr8conf.agenda = agenda;

            function agendaByTimeForDay( agendaPerDay ) {
                var itemsByTimeForDay = [];

                function dateComparator(a, b) {
                    return a.start == b.start ? 0 : a.start < b.start ? -1 : 1;
                }

                // Group tracks and slots by time
                if ( agendaPerDay.tracks ) {
                    var slotsArray = agendaPerDay.tracks.map(function(track){
                        angular.forEach(track.slots, function(slot){
                            slot.roomName = track.name != 'Keynote' && track.name != 'Keynote' ? track.name : '';
                            slot.roomNum = track.room;
                        });

                        return track.slots;
                    });

                    angular.forEach(slotsArray, function(slots){
                        angular.forEach(slots, function(slot){
                            itemsByTimeForDay.push( slot );
                        });
                    });
                }

                return itemsByTimeForDay.sort( dateComparator );
            }

            var agendaGroupedByTimePerDay = [];
            angular.forEach(agenda, function(agendaPerDay){
                agendaGroupedByTimePerDay.push( agendaByTimeForDay(agendaPerDay) );
            });

            $scope.gr8conf.agendaGroupedByTimePerDay = agendaGroupedByTimePerDay;

            // Default to day 1
            setAgendaForDay( $scope.gr8conf.agenda[0] );
        });

        $scope.tracksForTheDay = function(conf) {
            setAgendaForDay( conf );
        };
    };

    var AgendaDetailCtrl = function ($scope, $stateParams, Talks) {
        $scope.agendaDetail = {talks: []};
        Talks.query({confId: $scope.confId}).$promise.then(function(talks){
            if( talks ) {
                angular.forEach(talks, function(talk){
                    if ( $stateParams.talkId == talk.id ) {
                        $scope.selectedTalk = talk;
                    }
                });
            }
        });
    };

    var SpeakersCtrl = function ($scope, Speakers) {
        $scope.gr8conf = {speakers : [], speakersTitle: '' };
        $scope.gr8conf.speakersTitle = $scope.confId === 1 ? 'Europe' : 'USA';

        Speakers.query({confId: $scope.confId}).$promise.then(function(speakers){
            $scope.gr8conf.speakers = speakers;
        });
    };

    // DI for each controller using $inject
    TalksCtrl.$inject = ['$scope', '$rootScope', '$stateParams', '$state', 'Talks'];
    AgendaCtrl.$inject = ['$scope', 'Agenda'];
    AgendaDetailCtrl.$inject = ['$scope', '$stateParams', 'Talks'];
    SpeakersCtrl.$inject = ['$scope', 'Speakers'];

    // All controllers
    angular.module('gr8conf.controllers', [])
        .controller('TalksCtrl', TalksCtrl)
        .controller('AgendaCtrl', AgendaCtrl)
        .controller('AgendaDetailCtrl', AgendaDetailCtrl)
        .controller('SpeakersCtrl', SpeakersCtrl);
})();

