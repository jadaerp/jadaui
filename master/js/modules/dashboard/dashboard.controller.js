(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','jadaApiUrl','$http', 'ChartData', '$timeout','$localStorage','DashboardService', '$compile', 'uiCalendarConfig'];
    function DashboardController($scope,jadaApiUrl,$http, ChartData, $timeout,$localStorage,DashboardService, $compile, uiCalendarConfig) {
        var vm = this;
  vm.title = 'CalendarController';
        activate();

        ////////////////

        function activate() {


          $scope.dashboard=DashboardService.get();
          console.log($scope.dashboard)

          // SPLINE
          // ----------------------------------- 
          vm.splineData = ChartData.load('server/chart/spline.json');
          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };

var currentDate = new Date();
var day = currentDate.getDate();
var month = (currentDate.getMonth());
var year = currentDate.getFullYear();
var monthsArry=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
$scope.month=monthsArry[month];
$scope.day=day;


          // PANEL REFRESH EVENTS
          // ----------------------------------- 

          $scope.$on('panel-refresh', function(event, id) {
            
            console.log('Simulating chart refresh during 3s on #'+id);

            // Instead of timeout you can request a chart data
            $timeout(function(){
              
              // directive listen for to remove the spinner 
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);
              
              console.log('Refreshed #' + id);

            }, 3000);

          });


          // PANEL DISMISS EVENTS
          // ----------------------------------- 

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){
            
            console.log('Panel #' + id + ' removing');
            
            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();
          
          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });

var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $scope.changeTo = 'Hungarian';
            /* event source that pulls from google.com */
            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event', // an option!
                currentTimezone: 'America/Chicago' // an option!
            };
            /* event source that contains custom events on the scope */
            // $scope.events = [{
            //     title: 'All Day Event',
            //     start: new Date(y, m, 1),
            //     backgroundColor: '#f56954', //red
            //     borderColor: '#f56954' //red
            // }, {
            //     title: 'Long Event',
            //     start: new Date(y, m, d - 5),
            //     end: new Date(y, m, d - 2),
            //     backgroundColor: '#f39c12', //yellow
            //     borderColor: '#f39c12' //yellow
            // }, {
            //     id: 999,
            //     title: 'Repeating Event',
            //     start: new Date(y, m, d + 4, 16, 0),
            //     allDay: false,
            //     backgroundColor: '#00c0ef', //Info (aqua)
            //     borderColor: '#00c0ef' //Info (aqua)
            // }, {
            //     title: 'Birthday Party',
            //     start: new Date(y, m, d + 1, 19, 0),
            //     end: new Date(y, m, d + 1, 22, 30),
            //     allDay: false,
            //     backgroundColor: '#00a65a', //Success (green)
            //     borderColor: '#00a65a' //Success (green)
            // }, {
            //     title: 'Click for Google',
            //     start: new Date(y, m, 28),
            //     end: new Date(y, m, 29),
            //     url: 'http://google.com/',
            //     backgroundColor: '#2f80e7', //Primary (light-blue)
            //     borderColor: '#2f80e7' //Primary (light-blue)
            // }];
            /* event source that calls a function on every view switch */
            $scope.eventsF = function(start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{
                    title: 'Feed Me ' + m,
                    start: s + (50000),
                    end: s + (100000),
                    allDay: false,
                    className: ['customFeed']
                }];
                callback(events);
            };
$scope.events = [{
                title: 'All Day Event',
                start: new Date(y, m, 1),
                backgroundColor: '#f56954', //red
                borderColor: '#f56954' //red
            }, {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                backgroundColor: '#f39c12', //yellow
                borderColor: '#f39c12' //yellow
            }, {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d + 4, 16, 0),
                allDay: false,
                backgroundColor: '#00c0ef', //Info (aqua)
                borderColor: '#00c0ef' //Info (aqua)
            }, {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                backgroundColor: '#00a65a', //Success (green)
                borderColor: '#00a65a' //Success (green)
            }, {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/',
                backgroundColor: '#2f80e7', //Primary (light-blue)
                borderColor: '#2f80e7' //Primary (light-blue)
            }]; 
            
       $http.get(jadaApiUrl+'api/casualtransaction/').success(function(data) {
                 $scope.casualTransactionList = data;
                 console.log(data[0]);
                 // var event={
                 // type:"Casual",
                 // title:"Innocent Khaemba",
                 // start:new Date(data[0].clockIn),
                 // end:new Date(date[0].clockOut),
                 // allDay:false,
                 //  backgroundColor:'#9289ca',
                 // borderColor:'#9289ca'};
 // $scope.calEventsExt = {
 //                color: '#f00',
 //                textColor: 'white',
 //                events: [{
 //                    type: 'party',
 //                    title: 'Lunch',
 //                    start: new Date(y, m, d, 12, 0),
 //                    end: new Date(y, m, d, 14, 0),
 //                    allDay: false,
 //                    backgroundColor: '#9289ca', //pink
 //                    borderColor: '#9289ca' //pink
 //                }, {
 //                    type: 'party',
 //                    title: 'Lunch 2',
 //                    start: new Date(y, m, d, 12, 0),
 //                    end: new Date(y, m, d, 14, 0),
 //                    allDay: false,
 //                    backgroundColor: '#9289ca', //pink
 //                    borderColor: '#9289ca' //pink
 //                }, {
 //                    type: 'party',
 //                    title: 'Click for Google',
 //                    start: new Date(y, m, 28),
 //                    end: new Date(y, m, 29),
 //                    url: 'http://google.com/',
 //                    backgroundColor: '#9289ca', //pink
 //                    borderColor: '#9289ca' //pink

 //                },{
 //                 type:"Party",
 //                 title:"Innocent Khaemba",
 //                 start:new Date(data[0].clockIn),
 //                 end:new Date(data[0].clockOut),
 //                 allDay:false,
 //                  backgroundColor:'#000',
 //                 borderColor:'#9289ca'}]
 //            };           
                
 //                console.log($scope.calEventsExt);

                
              });
       $scope.calEventsExt={};
            // $scope.calEventsExt = {
            //     color: '#f00',
            //     textColor: 'white',
            //     events: [{
            //         type: 'party',
            //         title: 'Lunch',
            //         start: new Date(y, m, d, 12, 0),
            //         end: new Date(y, m, d, 14, 0),
            //         allDay: false,
            //         backgroundColor: '#9289ca', //pink
            //         borderColor: '#9289ca' //pink
            //     }, {
            //         type: 'party',
            //         title: 'Lunch 2',
            //         start: new Date(y, m, d, 12, 0),
            //         end: new Date(y, m, d, 14, 0),
            //         allDay: false,
            //         backgroundColor: '#9289ca', //pink
            //         borderColor: '#9289ca' //pink
            //     }, {
            //         type: 'party',
            //         title: 'Click for Google',
            //         start: new Date(y, m, 28),
            //         end: new Date(y, m, 29),
            //         url: 'http://google.com/',
            //         backgroundColor: '#9289ca', //pink
            //         borderColor: '#9289ca' //pink

            //     }]
            // };
            /* alert on eventClick */
            $scope.alertOnEventClick = function(date, jsEvent, view) {
                $scope.alertMessage = (date.title + ' was clicked ');
            };
            /* alert on Drop */
            $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Droped');// to make dayDelta ' + delta);
            };
            /* alert on Resize */
            $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Resized'); // to make dayDelta ' + delta);
            };
            /* add and removes an event source of choice */
            $scope.addRemoveEventSource = function(sources, source) {
                var canAdd = 0;
                angular.forEach(sources, function(value, key) {
                    if (sources[key] === source) {
                        sources.splice(key, 1);
                        canAdd = 1;
                    }
                });
                if (canAdd === 0) {
                    sources.push(source);
                }
            };
            /* add custom event*/
            $scope.addEvent = function() {
                $scope.events.push({
                    title: 'Open Sesame',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    className: ['openSesame']
                });
            };
            /* remove event */
            $scope.remove = function(index) {
                $scope.events.splice(index, 1);
            };
            /* Change View */
            $scope.changeView = function(view, calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            };
            /* Change View */
            $scope.renderCalender = function(calendar) {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            };
            /* Render Tooltip */
            $scope.eventRender = function(event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            };
            /* config object */
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    buttonIcons: { // note the space at the beginning
                        prev: ' fa fa-caret-left',
                        next: ' fa fa-caret-right'
                    },
                    buttonText: {
                        today: 'today',
                        month: 'month',
                        week: 'week',
                        day: 'day'
                    },
                    eventClick: $scope.alertOnEventClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventRender: $scope.eventRender
                }
            };

            $scope.changeLang = function() {
                if ($scope.changeTo === 'Hungarian') {
                    $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                    $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                    $scope.changeTo = 'English';
                } else {
                    $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    $scope.changeTo = 'Hungarian';
                }
            };
            /* event sources array*/
            // $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
            $scope.eventSources = [$scope.calEventsExt, $scope.eventsF, $scope.events];             

        }
        

        // $scope.Logout=function() {
        //     // remove user from local storage and clear http auth header
        //     delete $localStorage.currentUser;
        //     $http.defaults.headers.common.Authorization = '';
        //     aler("logging out")
        // }


    }
})();