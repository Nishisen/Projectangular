const app = angular.module('app',['ngRoute']);


app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'login.html',
        controller: 'loginController'
    }).when('/home',{
        templateUrl:'home.html',
        controller: 'homeController'    
    }).when('/login',{
        templateUrl:'login.html',
        controller: 'loginController'
    }).when('/register',{
        templateUrl:'register.html',
        controller: 'registerController'
    }).when('/dashboard',{
        templateUrl:'dashboard.html',
        controller: 'dashboardController'
    }).when('/dashboard/:id', {
        templateUrl: 'product.html',
        controller: 'productController'
    }).when('/fav',{
        templateUrl:'fav.html',
        controller: 'favController'

    
    }).when('/logout',{
        redirectTo: '/'
    }).otherwise({
        redirectTo: '/'
    });
});


app.run(['$rootScope', 'favService', '$location',function ($rootScope,favService,$location) {
    $rootScope.registered_users=[];
    $rootScope.all_products=[];
    
    $rootScope.auth=true;
    $rootScope.dashboard=false;
    $rootScope.favProducts = [];
    $rootScope.user;
    $rootScope.curr_product;   

    // $rootScope.isAuthorized = $window.localStorage.getItem('user') != null ? true : false;
    $rootScope.sendSingleProduct = function (x) {
        $rootScope.curr_product = x;
        $location.path('/dashboard/' + x.id);
    };
    $rootScope.addToFav = function (product) {
        favService.addFav(product);
    };
    $rootScope.removeFromFav = function (product) {
        favService.removeFromFav(product);
    };

    favService.getAllFavs(function (data) {
        $rootScope.favProducts = data;
    });

    $rootScope.isThereInFav = function (product) {
        console.log('hererer', $rootScope.favProducts);
        for(let x of $rootScope.favProducts){
            console.log(x);
            if(x.id==product.id)
             return true;
        }
        return false;
        // return $rootScope.favProducts.includes(product);
    };
}]);

app.controller('favController', ['$scope', '$rootScope', 'favService', function ($scope, $rootScope, favService) {
    
}]);

app.controller('productController', ['$scope', '$rootScope', '$routeParams', function ($scope, $rootScope, $routeParams) {
}]);

app.controller('loginController', ['$scope', '$location', '$rootScope', 'userService', function($scope, $location, $rootScope, userService){
    $rootScope.auth=true;
    $rootScope.dashboard=false;
    $scope.login_email;
    $scope.login_password;
    $scope.failure_text="";
    userService.getAllUsers(function(data){
        $rootScope.registered_users=data;
        console.log('reggg', $rootScope.registered_users);
    });
    $scope.login = function(){
        
       
        let isgood = false;
        $rootScope.registered_users.forEach(user => {
            if(user.email ==  $scope.login_email && user.password == $scope.login_password){
                isgood=true;
            }
        });

        if(!isgood){
            
            $scope.failure_text="Invalid Credentials";
            $scope.login_email=null;
            $scope.login_password=null;
        }else{
            $location.path('/home')
            
        }
    }
}]);


app.controller('registerController', ['$scope', 'userService', '$location', function($scope, userService, $location){
    $scope.reg_name;
    $scope.reg_email;
    $scope.reg_password;
    
    var registered_users = [];
    
    $scope.register = function(){
        // event.preventDefault();
        const user = {
            name: $scope.reg_name,
            email: $scope.reg_email,
            password: $scope.reg_password
        }
        console.log('hi', user);
        userService.addData(user);
        // console.log(registered_users);
        // $location.path('/login')
    }
}]);

app.controller('dashboardController', ['$scope', '$rootScope', 'dataService', function($scope, $rootScope, dataService){
    $scope.name="dashboard";
    $rootScope.dashboard=true;
    $rootScope.auth=false;
    $scope.category = 'pizza';
    dataService.getAllPizza(function(data){
        console.log('heyhey', data.menuItems);
        console.log(data);
        $rootScope.all_products=data.menuItems;
        $scope.dashboard_all_products = $rootScope.all_products;
        console.log($scope.dashboard_all_products +"hi");
    });


    $scope.default =true;
    $scope.increment = false;
     $scope.decrement = false;

     $scope.sortInc = function(){
        $scope.default =false;
    $scope.increment = true;
     $scope.decrement = false;

     }

     $scope.sortDec = function(){
        $scope.default =false;
    $scope.increment = false;
     $scope.decrement = true;
        
     }

     


    $scope.findByCategory = function(category){
            if(category=="pizza"){
                dataService.getAllPizza(function(data){
                    $rootScope.all_products=data.menuItems;
                    $scope.dashboard_all_products = $rootScope.all_products;                    
                });
            }else if(category=="rice"){
                dataService.getAllRice( function(data){
                    $rootScope.all_products=data.menuItems;
                    $scope.dashboard_all_products = $rootScope.all_products;                    
                });
            }else if(category=="burger"){
                dataService.getAllBurger(function(data){
                    $rootScope.all_products=data.menuItems;
                    $scope.dashboard_all_products = $rootScope.all_products;                    
                });
            }
        }
    }
]);


app.controller('homeController', ['$scope', '$rootScope', 'dataService', function($scope, $rootScope, dataService){
    
}]);

