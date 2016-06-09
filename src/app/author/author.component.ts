/**
 * Created by Murhaf on 6/1/2016.
 */
import {Component} from '@angular/core';
import {Panel, Header} from 'primeng/primeng';


console.log('`Author` component loaded asynchronously');

@Component({
  selector: 'author',
  directives: [Panel, Header],
  template: `
    <div class="EmptyBox10"></div>
    <div class="Container100">
      <div class="Container70 Responsive100">
        <div class="Container100">
          <div class="ContainerIndent">
            <div class="Card ShadowEffect HeiAutoOnMobile">
              <h2>Author Page</h2>
              <div class="Separator"></div>
                <p>This page is only available for Admin and Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Author {
  constructor() {
    console.log('hello `Author` component');
  }
}
