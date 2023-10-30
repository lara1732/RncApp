import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor(private http: HttpClient,
    private file: File) { }

  selected2: any[] = [];
  selected3: any[] = [];
  selectedS: any[] = [];

  updateSelected2(value: any[]) {
    this.selected2 = value;
    this.selected3 = value;
    this.selectedS = value;
  }

  getVersion(): string {
    return '1.2.0'; // Cambia este valor según la versión actual
  }

  async getFileFromService(url: string){

    var dirPath = this.file.externalRootDirectory + '/Downloads/';
    let name = "Test.pdf"

    this.getFile(url).subscribe(file => {
      this.file.writeFile(dirPath, name, file)
      .then(x => {
        console.log('PDF Creado: ' +x.toURL())
      })
      .catch(err => {
        this.file.writeExistingFile(dirPath, name, file)
        .then(resp => {
          console.log('PDF Sobreescrito: ' + dirPath + "/" + name);
        })
        .catch( err => {
          console.log("ERROR edición pdf: " + dirPath + "/" + name, err);
        });
      });
    });

  }

  getFile(fileUrl: string): Observable<Blob>{
    return this.http.get(fileUrl, { responseType: 'blob'})
  }
}
