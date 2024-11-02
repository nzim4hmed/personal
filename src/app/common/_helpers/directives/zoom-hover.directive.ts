import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoomHover]'
})
export class ZoomHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.5)');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '10');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'static');
  }
}
