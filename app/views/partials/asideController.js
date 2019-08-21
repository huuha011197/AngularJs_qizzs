'use strict';

angular.module('myApp.aside', [])
    .controller('asideCtrl', ['studentFactory','$scope', function ( studentFactory, $scope) {
        $scope.isLogin =()=>{
            return studentFactory.getIsLogin();
        };
    }])
   
    
