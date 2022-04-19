angular.module('myapp',['ngRoute'])
.config(function($routeProvider)
{
    $routeProvider.when('/cart',
    {
        templateUrl:'pgs/cart.html',
        controller:'homectrl'}).when('/cart/:first/:last',
        {
            templateUrl:'pgs/cart.html',
            controller:'homectrl'
    }).when('/chat',
    {
        templateUrl:'pgs/chat.html',
        controller:'carctrl'
    }).when('/person',
    {
        templateUrl:'pgs/person.html',
        controller:'bikectrl'
    })
})
.controller('myctrl',function()
{

})
.controller("homectrl",function($scope,$routeParams)
{
    $scope.message="Home Page"
    if($routeParams.first&&$routeParams.last)
    {
        $scope.person={
            first:$routeParams.first,
            last:$routeParams.last
        };
    }
})
.controller("carctrl",function($scope, $http)
{
   

   $http.get("https://rajesh-ss.github.io/grocery_Json/grocery.json")
    .success(function(response)
    {

        $scope.data=response;

        let takeBrand = [];
        let takeModel = [];
        let takeYear = [];

        for(let i=0; i<response.length;i++){
            takeBrand[i]= { "option": response[i].Brand};
        }
        for(let i=0; i<response.length;i++){
            takeModel[i]= { "option": response[i].model};
        }
        for(let i=0; i<response.length;i++){
            takeYear[i]= { "option": response[i].year};
            console.log(takeYear[i]);
        }

        $scope.brand = takeBrand;
        $scope.model = takeModel;
        $scope.year = takeYear;

        $scope.filterDropDown = [
          {"option":"Brand"},
          {"option":"model"},
          {"option":"year"}
        ]
    
        $scope.filterDisplay = [
          {"option":"1"},
          {"option":"2"},
          {"option":"3"}
        ]
    

        $scope.currency = [
          {"option": "rupees"},
          {"option": "dollars"}
        ]
    }); 
})
.filter("myfilterCar",function()
{
    return function(input,option)
    {

          /* console.log(input);  */

          if(option=='rupees'){
              return "₹ "+parseFloat(input);
          }
          else{
            return "\$"+parseFloat(input)/ 64;
          }
    }
})


.controller("bikectrl",function($scope,$http)
{
    $http.get("https://rajesh-ss.github.io/grocery_Json/grocery.json")
    .success(function(response)
    {
      //console.log("got the response");
        $scope.data=response;
        
        let takeBrand = [];
        let takeModel = [];
        let takeYear = [];

        for(let i=0; i<response.length;i++){
            // Make 1st letter capital
            takeBrand[i]= { "option": (response[i].Brand).charAt(0).toUpperCase()+response[i].Brand.substring(1)};
            console.log(takeBrand[i]);
        }
        for(let i=0; i<response.length;i++){
            takeModel[i]= { "option": response[i].model};
        }
        for(let i=0; i<response.length;i++){
            takeYear[i]= { "option": response[i].year};
            console.log(takeYear[i]);
        }

        $scope.brand = takeBrand;
        $scope.model = takeModel;
        $scope.year = takeYear;


        $scope.filterDropDown = [
          {"option":"Brand"},
          {"option":"model"},
          {"option":"year"}
        ]
    
        $scope.filterDisplay = [
          {"option":"1"},
          {"option":"2"},
          {"option":"3"}
        ]

        $scope.currency = [
          {"option": "rupees"},
          {"option": "dollars"}
        ]
    }); 
});
