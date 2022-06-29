import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

const TABLE_RESIZING_CSS_CLASS = 'mat-table-resizing';

@Directive({
  selector: '[appMatColumnResize]',
})
export class MatColumnResizeDirective implements OnInit {
  // Todo: Add additional orginizational comments.
  @Input('appMatColumnResize') width: string;
  @Input() columnIndex: number;

  columnEl: HTMLElement;
  tableEl: HTMLElement;

  isPressed: boolean;
  startWidth: number;
  startMouseX: number;

  constructor(private readonly render: Renderer2, element: ElementRef) {
    this.columnEl = element.nativeElement;
  }

  ngOnInit(): void {
    if (!this.width || this.width.trim() === '') {
      return;
    }
    this._setColumnWidth(this.width);
  }

  onMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    this.isPressed = true;
    this.startMouseX = event.pageX;
    this.startWidth = this.columnEl.offsetWidth;
  }

  onMouseMove = (event: MouseEvent): void => {
    if (!this.isPressed || !event.buttons) {
      return;
    }
  }

  onMouseUp = (event: MouseEvent): void => {
    if (!this.isPressed) {
      return;
    }
    this.isPressed = false;
    this.render.removeClass(this.tableEl, TABLE_RESIZING_CSS_CLASS);
  }

  private _setColumnWidth(width: string): void {
    this.render.setStyle(this.columnEl, 'width', width);
  }

  private _calculateColumnWidth(): number {
    return 0;
  }
}
