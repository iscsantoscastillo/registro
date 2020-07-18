import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { INJECTOR_BLOOM_PARENT_SIZE } from '@angular/core/src/render3/interfaces/injector';

declare var $;
declare var sum;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

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
    
    this.strCollection = $('#cbxAnio').val() + $('#cbxMes').val();
    this.nTotal = 0;

    this.t.clear().draw();
    var firestore = firebase.firestore();
    //console.log(this.strCollection);
    var citiesRef = firestore.collection(this.strCollection);
    //var query = citiesRef.where('ventaTotalCliente', '>', 0).get()
    var query = citiesRef.get()
    .then(snapshot => { snapshot.forEach(async doc => {
        //console.log(doc.data().idVenta);
        //this.nTotal =+ doc.data().ventaTotal;
        this.strFiltro = $('#cbxAnio').val() + $('#cbxMes').val() + $('#cbxDia').val();
        this.strIdVenta = doc.data().idVenta;
        //Este if trae TODO siempre y cuando no se hayan seleccionado las opciones Dia y Responsable.
        if($('#cbxDia').val() == '0' && $('#cbxResponsable').val() == '0'){
          
          this.nTotal = this.nTotal + parseFloat(doc.data().ventaTotal.replace(',',''));
          this.t.row.add([
            doc.data().idCliente,
            doc.data().nombreCliente,
            '<a href=\''+ await this.descargar(doc.data().idVenta).then(function(url){
              return url;
            }).catch(function(error){  })+'\' target=\'_blank\'>'+doc.data().idVenta+'</a>',
            doc.data().correo,
            doc.data().porc,
            doc.data().gananciaCliente,
            doc.data().retiro,
            doc.data().corte,
            doc.data().cuota_,
            doc.data().propina_,
            doc.data().evento_,
            doc.data().basemaquina_,
            doc.data().premio_,
            doc.data().otro_,
            doc.data().ventaTotal.replace(',',''),
            doc.data().notas.replace(',','')
          ]).draw(); 
          //parseFloat(doc.data().ventaTotal.replace(',',''));
          //console.log('Total: ' + this.nTotal);
        }else if($('#cbxDia').val() != '0' && $('#cbxResponsable').val() == '0'){
          if(this.strIdVenta.substring(0,8) == this.strFiltro){
            this.nTotal = this.nTotal + parseFloat(doc.data().ventaTotal.replace(',',''));
            this.t.row.add([
              doc.data().idCliente,
              doc.data().nombreCliente,
              '<a href=\''+ await this.descargar(doc.data().idVenta).then(function(url){
                return url;
              }).catch(function(error){  })+'\' target=\'_blank\'>'+doc.data().idVenta+'</a>',
              doc.data().correo,
              doc.data().porc,
              doc.data().gananciaCliente,
              doc.data().retiro,
              doc.data().corte,
              doc.data().cuota_,
              doc.data().propina_,
              doc.data().evento_,
              doc.data().basemaquina_,
              doc.data().premio_,
              doc.data().otro_,
              doc.data().ventaTotal.replace(',',''),
              doc.data().notas.replace(',','')
            ]).draw();  
          }
        }else if($('#cbxResponsable').val() != '0' && $('#cbxDia').val() == '0'){
          if(doc.data().correo.toUpperCase() == $('#cbxResponsable').val().toUpperCase()){
            this.nTotal = this.nTotal + parseFloat(doc.data().ventaTotal.replace(',',''));
            this.t.row.add([
              doc.data().idCliente,
              doc.data().nombreCliente,
              '<a href=\''+ await this.descargar(doc.data().idVenta).then(function(url){
                return url;
              }).catch(function(error){  })+'\' target=\'_blank\'>'+doc.data().idVenta+'</a>',
              doc.data().correo,
              doc.data().porc,
              doc.data().gananciaCliente,
              doc.data().retiro,
              doc.data().corte,
              doc.data().cuota_,
              doc.data().propina_,
              doc.data().evento_,
              doc.data().basemaquina_,
              doc.data().premio_,
              doc.data().otro_,
              doc.data().ventaTotal.replace(',',''),
              doc.data().notas.replace(',','')
            ]).draw();  
          }
        }else if($('#cbxResponsable').val() != '0' && $('#cbxDia').val() != '0'){
          if(this.strIdVenta.substring(0,8) == this.strFiltro && doc.data().correo.toUpperCase() == $('#cbxResponsable').val().toUpperCase()){
            this.nTotal = this.nTotal + parseFloat(doc.data().ventaTotal.replace(',',''));
            this.t.row.add([
              doc.data().idCliente,
              doc.data().nombreCliente,
              '<a href=\''+ await this.descargar(doc.data().idVenta).then(function(url){
                return url;
              }).catch(function(error){  })+'\' target=\'_blank\'>'+doc.data().idVenta+'</a>',
              doc.data().correo,
              doc.data().porc,
              doc.data().gananciaCliente,
              doc.data().retiro,
              doc.data().corte,
              doc.data().cuota_,
              doc.data().propina_,
              doc.data().evento_,
              doc.data().basemaquina_,
              doc.data().premio_,
              doc.data().otro_,
              doc.data().ventaTotal.replace(',',''),
              doc.data().notas.replace(',','')
            ]).draw();
          }
        }
        
      });
      this.strTotal = formatter.format(this.nTotal);
      //this.strTotal = formatter.format(this.t.column( 4 ).data().sum());
      //$("#dataTable").DataTable().columns().draw();
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });  
  }

  async descargar(idVenta: string){
    var str: any;
    var storage = firebase.storage();
    var gsReference = storage.refFromURL('gs://negociosduno.appspot.com/pdf/'+idVenta+'.pdf');
    await gsReference.getDownloadURL().then(function(url) {
      // Insert url into an <img> tag to "download"
      //console.log(url);
      str = url;
    }).catch(function(error) {
    
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
    
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
    
        case 'storage/canceled':
          // User canceled the upload
          break;
    
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
    console.log(str);
    return str;
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

  writeNewPost() {
    // A post entry.
    var db = firebase.firestore();
    var vRand = Math.floor(Math.random() * 26) + Date.now();
    db.collection('registros').doc(vRand.toString()).set({
      id: Math.floor(Math.random() * 26) + Date.now(),
      nombre: $('#iNombre').val(),
      correo: $('#iCorreo').val(),
      estado: $('#iEstado').val(),
      edad: $('#iEdad').val(),
      telefono: $('#iTelefono').val()
    }).then (function(){
      
      console.log("Document successfully written!");
    }).catch(function(error){
      console.log("Error!", error);
    });

    this.limpiarCampos();
    alert('Se realizo el registro con exito.');
    
  }

  limpiarCampos(){
    $('#iNombre').val('');
    $('#iCorreo').val('');
    $('#iEstado').val('');
    $('#iEdad').val('');
    $('#iTelefono').val('');
  }
}