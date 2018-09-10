import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Pipe, PipeTransform} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Pipe({
  name: 'search'
})
export class AppComponent implements PipeTransform{
  public name:string= '';
  numberOfPages:number;
  book:Array<string>  ;
  found:boolean = true;
  personajes:Array<JSON> ;
  personajesTemp:Array<JSON> ;

  constructor (private httpClient: HttpClient){ 
    this.personajes = new Array();
    this.personajesTemp = new Array();
    this.getData();

  }
    onNameKeyUp(event:any){
      this.name=event.target.value;
      console.log(this.name);
      this.filtrar();
    } 
    filtrar(){
      if(this.name!=''||this.name!=null||this.name!=undefined){
        let temp = new Array();
           this.personajesTemp.forEach(item => {
          if(item['name'].toUpperCase().indexOf(this.name.toUpperCase())!=-1){
            temp.push(item);
          }
        });
        this.personajes = temp;
      }else{
        this.personajes = this.personajesTemp;
      }      
    }
    public transform(value, keys: string, term: string) {
      if (!term) return value;
      return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
   }
    
     public initialize() {
        this.getData();
     }
    getData(){
      this.httpClient.get('https://anapioficeandfire.com/api/books/1')
      .subscribe(
        (data:any[]) => {
          this.book = data['characters'];
          console.log("HOLA");
          //console.log(this.book);
          this.getCharacters();
        }
    	)
    }

    getCharacters(){
        this.book.forEach(item => {
          this.httpClient.get(item)
          .subscribe(
            (data:JSON) => {
              this.personajes.push(data);
            }
          )
      }
      );
      console.log(this.personajes);
      this.personajesTemp = this.personajes;
    }
}