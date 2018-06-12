(function() {
    'use strict';

    angular
        .module('app.transactions')
        .factory('readFileData', readFileData);

    // PayrollProcessingService.$inject = ['$resource','jadaApiUrl'];
    function readFileData() {
 return {
        processData: function(csv) {
            var lines=csv.split(/\r\n|\n/);

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

    var obj = {};
    var currentline=lines[i].split(",");

    for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
        }
    };
          
       
    }

})();


//var csv is the CSV file with headers
// function csvJSON(csv){

//   var lines=csv.split("\n");

//   var result = [];

//   var headers=lines[0].split(",");

//   for(var i=1;i<lines.length;i++){

//     var obj = {};
//     var currentline=lines[i].split(",");

//     for(var j=0;j<headers.length;j++){
//       obj[headers[j]] = currentline[j];
//     }

//     result.push(obj);

//   }
  
//   //return result; //JavaScript object
//   return JSON.stringify(result); //JSON
// }


// processData: function(csv_data) {
//             var record = csv_data.split(/\r\n|\n/);
//             var headers = record[0].split(',');
//             var lines = [];
//             var json = {};

//             for (var i = 0; i < record.length; i++) {
//                 var data = record[i].split(',');
//                 if (data.length == headers.length) {
//                     var tarr = [];
//                     for (var j = 0; j < headers.length; j++) {
//                         tarr.push(data[j]);
//                     }
//                     lines.push(tarr);
//                 }
//             }
            
//             for (var k = 0; k < lines.length; ++k){
//               json[k] = lines[k];
//             }
//             return json;
//         }