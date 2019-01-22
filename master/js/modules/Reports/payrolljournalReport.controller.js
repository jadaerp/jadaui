

(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('PayrollJournalReportController', PayrollJournalReportController);

    PayrollJournalReportController.$inject = ['$scope','$http','$resource','jadaApiUrl','PayrollLedgerReportService','FileSaver','Blob'];
    function PayrollJournalReportController($scope,$http,$resource,jadaApiUrl,PayrollLedgerReportService,FileSaver,Blob) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


$http.get(jadaApiUrl+'api/payrollledgerreport/0').then(function(data) {
    console.log(data);
           $scope.jounalreports=data.data;


 
     });
     console.log($scope.jounalreports)
$http.get(jadaApiUrl+'api/pastelexport').then(function(data) {
    
           $scope.pastelExportData=data.data;
          

 
     });            

            $scope.filterData=function(filter){
                var filterType=filter.filterType;
$http.get(jadaApiUrl+'api/payrollledgerreport/'+filterType).then(function(data) {
    console.log(data);
           $scope.jounalreports=data.data;


 
     });
            }

  $scope.download = function(table) {
    // var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // FileSaver.saveAs(data, 'text.txt');
console.log($scope.pastelExportData);
var arr = JSON.parse($scope.pastelExportData);
var file = new File(arr, 'sample.txt', {
    lastModified: new Date(0), // optional - default = now
    type: "overide/mimetype" // optional - default = ''
});

  var ele = document.getElementById(table);
var blob = new Blob([ele.innerText], {
        type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, "pastel.txt");
 



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

                    return $text.replace('"', '""'); // escape double quotes

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
      var rows = document.querySelectorAll("#dvData table tr");
      
        for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
            for (var j = 0; j < cols.length; j++) 
                row.push(cols[j].innerText);
            
        csv.push(row.join(","));    
      }

    // Download CSV
    download_csv(csv.join("\n"), filename);
    }

            $scope.exportToCSV=function(){
                var html = $( "#dvData" ).html();
                var today = new Date().toString().replace(/[^\w]/g, '');
              export_table_to_csv(html, "pastel-"+today+".txt");           
            }                        

              $scope.showcurrentperiod=function(id){
               console.log(id)
                for(var r=0;r< $scope.periods.length;r++){
                  if(id==$scope.periods[r].id){

              
                    $scope.currentMonth=$scope.periods[r].month+' '+$scope.periods[r].year;
                    console.log($scope.currentMonth)
                  }
                  
                }
                
              }

              $scope.printDiv = function (div) {
    console.log('hellow print');
  var docHead = document.head.outerHTML;
  var printContents = document.getElementById(div).outerHTML;
  var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

  var newWin = window.open("", "_blank", winAttr);
  var writeDoc = newWin.document;
  writeDoc.open();
  writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
  writeDoc.close();
  newWin.focus();
}

           

  $scope.exportTableToCSV2=function($table, filename) {
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

                    return $text.replace('"', '""'); // escape double quotes

                }
            }    
            
    function download_csv2(csv, filename) {
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

    function export_table_to_csv2(html, filename) {
      var csv = [];
      var rows = document.querySelectorAll("#dvData2 table tr");
      
        for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
            for (var j = 0; j < cols.length; j++) 
                row.push(cols[j].innerText);
            
        csv.push(row.join(","));    
      }

    // Download CSV
    download_csv2(csv.join("\n"), filename);
    }

            $scope.exportToCSV2=function(){
                var html = $( "#dvData2" ).html();
                var today = new Date().toString().replace(/[^\w]/g, '');
              export_table_to_csv2(html, "palladium-"+today+".txt");           
            }                        
        


        }
    }
})();
















