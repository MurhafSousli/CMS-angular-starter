import {Component} from '@angular/core';
import {Panel, Header} from 'primeng/primeng';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  directives: [Panel, Header],
  styles: [`
  `],
  template: require('./about.html')
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
  }


}
