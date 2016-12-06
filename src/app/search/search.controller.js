(function () {
  'use strict';

  angular
    .module('myNewProject')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController(SearchService, Account, Airport) {
    var search = this;
    search.airportLists = Airport.data || [];
    search.searchData = {
      account: Account.data || null,
      numberOfTravellers: 1,
      airport: null
    };
    search.listCart = [];
    search.getPackages = getPackages;
    search.minusNumber = minusNumber;
    search.plusNumber = plusNumber;
    search.bookingPackage = bookingPackage;
    function minusNumber() {
      if (search.searchData.numberOfTravellers < 1) return;
      search.searchData.numberOfTravellers--;
    }

    function plusNumber() {
      if (search.searchData.numberOfTravellers >= 20) return;
      search.searchData.numberOfTravellers++;
    }

    function getPackages() {
      if (!search.bookingForm.$valid) return;
      SearchService.getPackages(search.searchData).then(function (respone) {
        var newData = respone.data.replace('{"d":null}', '');
        search.packageLists = JSON.parse(newData);
      }, function () {

      })
    }

    function bookingPackage(data, flag) {
      if (flag) {
        search.listCart.push(data);
      } else {
        angular.forEach(search.listCart, function (cart, index) {
          if (cart.Id === data.Id) {
            search.listCart.splice(index, 1);
          }
        })
      }
      console.log(search.listCart);
    }
  }
})();
