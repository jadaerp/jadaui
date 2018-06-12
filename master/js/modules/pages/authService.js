// angular.module('app.pages').factory('authService',
// ['AUTH_ENDPOINT','LOGOUT_ENDPOINT','$http','$cookieStore',
// function(AUTH_ENDPOINT,LOGOUT_ENDPOINT,$http,$cookieStore){
// var auth={};

// auth.login=function(username, password){
// 	var env = {
//                                 username:username,
                                                    
//                                 password:password
//                             };
//                          return $http({
//                                 method: 'POST',
//                                 url: 'http://localhost:56135/api/login',
//                                 data: env,
//                                 headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//                                 transformRequest: function(obj) {
//                                   var str = [];
//                                   for(var p in obj)
//                                   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                                   return str.join("&");
//                                 }
//                             })
//                            .then(function(response,status){

//                             alert(response.token);
//                             // login successful if there's a token in the response
//                     if (response.token) {
//                         // store username and token in local storage to keep user logged in between page refreshes
//                         $localStorage.currentUser = { username: username, token: response.token };

//                         // add jwt token to auth header for all requests made by the $http service
//                         $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;


//                     }
//                     //      auth.user=response.data;
//                     // $cookieStore.put('user',auth.user);
//                     //    return auth.postStatus = 'success: ' + status;
//                       },
//                             function (error, status, headers, config) {
//                              return   auth.postStatus = 'error: ' + status;
//                             });
                            
//                         }

// // return $http.post(AUTH_ENDPOINT,{env},
// // {
// //     headers: {
// //       'Content-Type': 'application/x-www-form-urlencoded'
    
// //     }
// //   },{
// //   	   transformRequest: function(obj) {
// //                                   var str = [];
// //                                   for(var p in obj)
// //                                   str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
// //                                   return str.join("&");
// //                                 }
// //   }).then(function(response,status){
// // auth.user=response.data;
// // $cookieStore.put('user',auth.user);
// // return auth.user;
// // });
// // }
// auth.logout=function(){
// return $http.post(LOGOUT_ENDPOINT).then(function(response){
// auth.user=undefined;
// $cookieStore.remove('user');
// });
// }
// return auth;
// }]);

// angular.module('app.pages').value('AUTH_ENDPOINT',
// 'http://localhost:56135/api/login');
// angular.module('app.pages').value('LOGOUT_ENDPOINT',
// 'http://spblogger-sitepointdemos.rhcloud.com/logout');
// // 'http://spblogger-sitepointdemos.rhcloud.com/login');