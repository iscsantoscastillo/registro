import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { INJECTOR_BLOOM_PARENT_SIZE } from '@angular/core/src/render3/interfaces/injector';

declare var $;
declare var sum;

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css']
})
export class RetirosComponent implements OnInit {

  strCollection: string;
  strFiltro: string;
  strIdVenta: string;
  nTotal: number = 0;
  strTotal: string = "$0.00";
  

  t : any;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.verificar('/');
    this.t = $('#grid').DataTable({
      responsive: false	
    } ); 

    this.poblarTabla();
  }

  logout(){
    this.loginService.logout('/');
  }

   /*FIREBASE get DATA*/
   poblarTabla(){
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    this.strCollection ='registros';
    this.nTotal = 0;

    this.t.clear().draw();
    var firestore = firebase.firestore();
    //console.log(this.strCollection);
    var citiesRef = firestore.collection(this.strCollection);
    //var query = citiesRef.where('ventaTotalCliente', '>', 0).get()

    var query = citiesRef.get()
    .then(snapshot => { snapshot.forEach(async doc => {

          this.t.row.add([
            doc.data().id,
            doc.data().nombre,
            doc.data().correo,
            doc.data().estado,
            doc.data().edad,
            doc.data().telefono
          ]).draw(); 
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });  
   }

   exportar(){
    var outputFile = 'export';
		outputFile = outputFile.replace('.csv', '') + '.csv';
		this.exportTableToCSV(outputFile);
  }

  exportTableToCSV(filename) {

    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++)
        row.push(cols[j].innerHTML);//innerText

      csv.push(row.join(","));
    }

    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);

  }

  downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }//downloadCSV

}
