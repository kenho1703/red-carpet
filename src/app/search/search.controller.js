(function () {
  'use strict';

  angular
    .module('myNewProject')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController(SearchService, Account, Airport) {
    var search = this;
    search.searchData = {
      account: Account.data || null,
      numberOfTravellers: 0,
      airport: {}
    };
    search.airportList = Airport.data || [];
    search.getPackages = getPackages;
    search.minusNumber = minusNumber;
    search.plusNumber = plusNumber;
    function minusNumber() {
      if (search.searchData.numberOfTravellers < 1) return;
      search.searchData.numberOfTravellers--;
    }

    function plusNumber() {
      if (search.searchData.numberOfTravellers >= 20) return;
      search.searchData.numberOfTravellers++;
    }

    function getPackages() {
      return SearchService.getPackages(search.searchData, function (respone) {
        console.log('respone', respone)
      })
    }

  }
})();
