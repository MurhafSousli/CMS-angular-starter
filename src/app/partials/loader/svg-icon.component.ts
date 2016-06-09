import {Component, Input} from 'angular2/core';
import {Http, Response} from 'angular2/http';


@Component({
  selector: 'svg-icon',
  template: `<div [innerHTML]="iconData"></div>`
})


export class SvgIconComponent {
  @Input() src:string;

  private iconData:string = '';

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.loadSvg();
  }

  loadSvg() {
    this.http.get( this.src )
      .map( (res: Response) => res.text() )
      .subscribe(
        data => { this.iconData = data; },
        err => { console.error(err); }
      );
  }

}
