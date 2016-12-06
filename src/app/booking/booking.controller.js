(function () {
  'use strict';

  angular
    .module('myNewProject')
    .controller('BookingController', BookingController);

  /** @ngInject */
  function BookingController(BookingService, Account, Airport) {
    var booking = this;
    booking.airportLists = Airport.data || [];
    booking.searchData = {
      account: Account.data || null,
      numberOfTravellers: 1,
      airport: null
    };
    booking.listCart = [];
    booking.bookingForm = '';
    booking.getPackages = getPackages;
    booking.minusNumber = minusNumber;
    booking.plusNumber = plusNumber;
    booking.bookingPackage = bookingPackage;
    booking.getPrice = getPrice;
    function minusNumber() {
      if (booking.searchData.numberOfTravellers < 1) return;
      booking.searchData.numberOfTravellers--;
    }

    function plusNumber() {
      if (booking.searchData.numberOfTravellers >= 20) return;
      booking.searchData.numberOfTravellers++;
    }

    function getPackages() {
      if (!booking.bookingForm.$valid) return;
      BookingService.getPackages(booking.searchData).then(function (respone) {
        var newData = respone.data.replace('{"d":null}', '');
        booking.packageLists = JSON.parse(newData);
      }, function () {

      })
    }

    function getPrice(Packages) {
      var Price = 0;
      angular.forEach(Packages, function (pack) {
        Price += pack.Price;
      });
      return Price;
    }

    function bookingPackage(data, flag) {
      if (flag) {
        booking.listCart.push(data);
      } else {
        angular.forEach(booking.listCart, function (cart, index) {
          if (cart.Id === data.Id) {
            booking.listCart.splice(index, 1);
          }
        })
      }
      getPrice(booking.listCart.AirportServices);
    }
  }
})();
