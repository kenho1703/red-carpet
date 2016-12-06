(function () {
  'use strict';

  angular
    .module('myNewProject')
    .factory('AccountService', AccountService);

  /** @ngInject */
  function AccountService(CONFIG, $http) {
    var Account;
    Account = {
      getAccount: getAccount
    };
    return Account;
    function getAccount() {
      return $http({
        method: 'GET',
        url: CONFIG.rest.baseURI + '/GetAccount?identifier=2B7C967B-0428-432B-BD98-E5201ECC7EAE'
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(error) {
        return error;
      });
    }
  }
})();
