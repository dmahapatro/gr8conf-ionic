// Ionic Gr8Conf App
(function(){
    // Available apis
    var API = {
        Talks: "http://cfp.gr8conf.org/api2/talks/",
        Agenda: "http://cfp.gr8conf.org/api2/agenda/",
        Speakers: "http://cfp.gr8conf.org/api2/speakers/"
    };

    // config of application module
    function appConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tab.conf', {
                url: "/conf",
                views : {
                    'tab-conf': {
                        templateUrl: "templates/tab-conf.html"
                    }
                }
            })
            .state('tab.talks', {
                url: '/talks/:confType',
                views: {
                    'tab-talks': {
                        templateUrl: 'templates/tab-talks.html',
                        controller: 'TalksCtrl',
                        resolve: {
                            talks: "Talks",
                            Talks: function(talks, $stateParams) {
                                var confId = $stateParams.confType == 'eu' ? 1 : 2;
                                return talks.query({confId: confId}).$promise;
                            }
                        }
                    }
                }
            })
            .state('tab.talk', {
                url: '/talk/:confId/:talkId',
                views: {
                    'tab-talks': {
                        templateUrl: 'templates/agenda-detail.html',
                        controller: 'AgendaDetailCtrl'
                    }
                }
            })
            .state('tab.agenda', {
                url: '/agenda',
                views: {
                    'tab-agenda': {
                        templateUrl: 'templates/tab-agenda.html',
                        controller: 'AgendaCtrl'
                    }
                }
            })
            .state('tab.agenda-detail', {
                url: '/agenda/:talkId',
                views: {
                    'tab-agenda': {
                        templateUrl: 'templates/agenda-detail.html',
                        controller: 'AgendaDetailCtrl'
                    }
                }
            })
            .state('tab.speakers', {
                url: '/speakers',
                views: {
                    'tab-speakers': {
                        templateUrl: 'templates/tab-speakers.html',
                        controller: 'SpeakersCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/conf');
    }

    // bootstrap function for application module
    function appRun($ionicPlatform, $cordovaSplashscreen, Talks, Agenda, Speakers) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $cordovaSplashscreen.hide();
        });

        // Resolve all resources after DI is complete.
        function resolveStrategy() {
            Talks.query({confId: 1});
            Talks.query({confId: 2});
            Agenda.query({confId: 1});
            Agenda.query({confId: 2});
            Speakers.query({confId: 1});
            Speakers.query({confId: 2});
        }

        resolveStrategy();
    }

    // Angular module
    angular.module('gr8conf', [
            'ionic',
            'ngCordova',
            'angular.filter',
            'gr8conf.controllers',
            'gr8conf.services',
            'gr8conf.filters'
        ])
        .config(appConfig)
        .run(appRun)
        .constant("Api", API);
})();


