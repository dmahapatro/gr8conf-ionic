(function(){
    angular.module('gr8conf.filters', [])
        .filter('withHandle', function(){
            return function(twitterHandle) {
                if ( !twitterHandle ) return twitterHandle;

                return twitterHandle.charAt(0) == '@' ?
                    twitterHandle : '@' + twitterHandle;
            }
        })
        .filter('specialIcons', function(){
            return function(item){
                var specialIconClass = '';
                if ( !item.name ) return specialIconClass;

                if( item.name.indexOf('Registration') != -1 ) {
                    specialIconClass = 'ion-ribbon-b';
                } else if ( item.name.indexOf('Lunch') != -1 ) {
                    specialIconClass = 'ion-pizza';
                } else if ( item.name.indexOf('Snack') != -1 ) {
                    specialIconClass = 'ion-coffee';
                } else if ( item.name.indexOf('Happy Hour') != -1 ) {
                    specialIconClass = 'ion-beer';
                } else if ( item.name.indexOf('Breakfast') != -1 ) {
                    specialIconClass = 'ion-fork';
                } else if ( item.name.indexOf('Closing') != -1 ) {
                    specialIconClass = 'ion-mic-c';
                }

                return specialIconClass;
            }
        })
        .filter('formatted', function(){
            return function(timestamp) {
                if ( !timestamp ) return '';
                var momentDate = moment(timestamp, 'HH:mm:ss');

                return momentDate.isValid() ? momentDate.format('hh:mm A') : '';
            }
        })
        .filter('collateName', function(){
            return function(speakers) {
                if ( !speakers || speakers.length < 1 ) return '';

                return speakers.map(function(speaker){
                    return speaker.name;
                }).join(', ');
            }
        });
})();