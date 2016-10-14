import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <menu-bar></menu-bar>
    <router-outlet></router-outlet>
    <footer-bar></footer-bar>
  `
})
export class AppComponent { }