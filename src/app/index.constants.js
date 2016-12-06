(function () {
    'use strict';

    angular
        .module('redCarpet')
        .constant('CONFIG', {
            rest: {
                baseURI: ' http://sandbox.airportredcarpet.com/webservices/v2.5/JSON.asmx'
            }
        });
})();
