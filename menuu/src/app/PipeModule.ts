 import { NgModule }      from '@angular/core';

 @NgModule({
     imports:  []
 })

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 } 