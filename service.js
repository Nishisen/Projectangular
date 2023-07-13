app.service('userService', ['$http', function($http){
    this.getAllUsers = function(cb){
        $http({
            method:'GET',
            url:('http://localhost:3000/users')
        }).then(function(res){console.log(res.data); cb(res.data)},function(err){console.log(err);})
    }
    this.addData = function(user){
        console.log('here service', user);
        $http({
            method:'POST',
            url:('http://localhost:3000/users'),
            data:user
        }).then(function(res){console.log('hi service'); console.log('resss',res); cb(res)},function(err){console.log('errrrrrr',err);})
    }
}]);

app.service('dataService', ['$http', function($http){
    this.getAllPizza = function(cb){
        $http({
            method:'GET',
            url:('https://api.spoonacular.com/food/menuItems/search?query=pizza&apiKey=65cedb504cdc4655bd8642fb1541475a&number=50')
        }).then(function(res){console.log(res.data); cb(res.data)},function(err){console.log(err);})
    }
    this.getAllRice = function(cb){
        $http({
            method:'GET',
            url:('https://api.spoonacular.com/food/menuItems/search?query=rice&apiKey=65cedb504cdc4655bd8642fb1541475a&number=50')
        }).then(function(res){console.log(res.data); cb(res.data)},function(err){console.log(err);})
    }
    this.getAllBurger = function(cb){
        $http({
            method:'GET',
            url:('https://api.spoonacular.com/food/menuItems/search?query=burger&apiKey=b704e8ebf621414e9f24daf3fb5f69b4&number=50')
        }).then(function(res){console.log(res.data); cb(res.data)},function(err){console.log(err);})
    }
}]);

app.service('favService', ['$http', function ($http) {
    this.getAllFavs = function (cb) {
        $http({
            method: 'GET',
            url: (`http://localhost:3000/favs`)
        }).then(
            function (res) { 
                cb(res.data)
            }, 
            function(err) { 
                console.log(err); 
            })
    }
    this.addFav = function (product) {
        $http({
            method: 'POST',
            url: (`http://localhost:3000/favs`),
            data: product
        }).then(
            function (res) { 
                console.log(res);
             }, 
             function (err) { 
                console.log(err); 
            })
    }
    this.removeFromFav = function (product) {
        $http({
            method: 'DELETE',
            url: (`http://localhost:3000/favs/${product.id}`),
            data: product
        }).then(function (res) { 
            console.log(res); 
        }, function (err) { 
            console.log(err); 
        })
    }
}]);