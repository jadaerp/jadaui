(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('BankFilesController', BankFilesController);

    BankFilesController.$inject = ['$scope','$http','$resource', 'BankfileService','jadaApiUrl','FileSaver','Blob'];
    function BankFilesController($scope,$http,$resource,BankfileService,jadaApiUrl,FileSaver,Blob) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
vm.val = {
    text: 'Hey ho lets go!'
  };

  $scope.download = function(table) {
    // var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // FileSaver.saveAs(data, 'text.txt');

              $http.get(jadaApiUrl+'api/bankfileexport').success(function(data) {
                console.log(data);
              // $scope.employees = data;
          
            });

//   var ele = document.getElementById(table);
// var blob = new Blob([ele.innerText], {
//         type: "text/plain;charset=utf-8"
//     });
//     FileSaver.saveAs(blob, "bank-file.txt");
};
              $scope.exportTableToCSV=function($table, filename) {
                var $headers = $table.find('tr:has(th)')
                    ,$rows = $table.find('tr:has(td)')

                    // Temporary delimiter characters unlikely to be typed by keyboard
                    // This is to avoid accidentally splitting the actual contents
                    ,tmpColDelim = String.fromCharCode(11) // vertical tab character
                    ,tmpRowDelim = String.fromCharCode(0) // null character

                    // actual delimiter characters for CSV format
                    ,colDelim = '","'
                    ,rowDelim = '"\r\n"';

                    // Grab text from table into CSV formatted string
                    var csv = '"';
                    csv += formatRows($headers.map(grabRow));
                    csv += rowDelim;
                    csv += formatRows($rows.map(grabRow)) + '"';

                    // Data URI
                    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

                // For IE (tested 10+)
                if (window.navigator.msSaveOrOpenBlob) {
                    var blob = new Blob([decodeURIComponent(encodeURI(csv))], {
                        type: "text/csv;charset=utf-8;"
                    });
                    navigator.msSaveBlob(blob, filename);
                } else {
                    $(this)
                        .attr({
                            'download': filename
                            ,'href': csvData
                            //,'target' : '_blank' //if you want it to open in a new window
                    });
                }
                function formatRows(rows){
                    return rows.get().join(tmpRowDelim)
                        .split(tmpRowDelim).join(rowDelim)
                        .split(tmpColDelim).join(colDelim);
                }
                // Grab and format a row from the table
                function grabRow(i,row){
                     
                    var $row = $(row);
                    //for some reason $cols = $row.find('td') || $row.find('th') won't work...
                    var $cols = $row.find('td'); 
                    if(!$cols.length) $cols = $row.find('th');  

                    return $cols.map(grabCol)
                                .get().join(tmpColDelim);
                }
                // Grab and format a column from the table 
                function grabCol(j,col){
                    var $col = $(col),
                        $text = $col.text();

                    return $text.replace('', ''); // escape double quotes

                }
            }    
            
    function download_csv(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV FILE
        csvFile = new Blob([csv], {type: "text/csv"});

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // We have to create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Make sure that the link is not displayed
        downloadLink.style.display = "none";

        // Add the link to your DOM
        document.body.appendChild(downloadLink);

        // Lanzamos
        downloadLink.click();
    }

    function export_table_to_csv(html, filename) {
      var csv = [];
      var rows = document.querySelectorAll("table#dvData tr");
      
        for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
            for (var j = 0; j < cols.length; j++) {
              
                row.push(""+cols[j].innerText+"");
    
            }
               
            
        csv.push(row.join(","));    
      }

    // Download CSV
    download_csv(csv.join("\n"), filename);
    }

            $scope.exportToCSV=function(){
                var html = $( "#dvData" ).html();
                var today = new Date().toString().replace(/[^\w]/g, '');
              export_table_to_csv(html, "BANK-FILE-"+today+".csv");           
            }    


       var currentPeriod=1;
        $scope.bankfiles=BankfileService.get({});


              $http.get(jadaApiUrl+'api/bankfilereport').success(function(data) {
              $scope.bankfiles = data;

            });

          console.log($scope.bankfiles);


              $http.get(jadaApiUrl+'api/currentperiod').success(function(data) {
              $scope.period = data;
              

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });


        }
    }
})();