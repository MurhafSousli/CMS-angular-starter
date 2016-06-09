import {Directive, ElementRef} from 'angular2/core';
@Directive({
  selector: '[fillViewHeight]'
})
export class fillViewHeight {
  constructor(private el: ElementRef) {
  }
  ngAfterViewChecked(){
    this.el.nativeElement.style.height = (window.innerHeight - this.el.nativeElement.offsetTop) + 'px' ;
  }
}

