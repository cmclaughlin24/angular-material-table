import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

const TABLE_RESIZING_CSS_CLASS = 'mat-table-resizing';
const RESIZE_CURSOR_CSS_CLASs = 'mat-header-cell-resize-cursor';

@Directive({
  selector: '[appMatColumnResize]',
})
export class MatColumnResizeDirective implements OnInit {
  // Input Attributes.
  @Input('appMatColumnResize') width: number | undefined;
  @Input() columnIndex: number;

  // Output Attributes.
  @Output() columnResize = new EventEmitter<number>();

  columnEl: HTMLElement;
  tableEl: HTMLElement;

  isPressed: boolean;
  startWidth: number;
  startPageX: number;

  constructor(private readonly renderer: Renderer2, element: ElementRef) {
    this.columnEl = element.nativeElement;
  }

  ngOnInit(): void {
    this._addEventListenters();
    if (!this.width || this.width === 0) {
      return;
    }
    this._setColumnWidth(this.width);
  }

  onMouseDown = (event: MouseEvent): void => {
    event.stopPropagation();
    this.isPressed = true;
    this.startPageX = event.pageX;
    this.startWidth = this.columnEl.offsetWidth;
  };

  onMouseMove = (event: MouseEvent): void => {
    if (!this.isPressed || !event.buttons) {
      return;
    }
    const width = this._calculateColumnWidth(
      this.startWidth,
      this.startPageX,
      event.pageX
    );
    this.renderer.addClass(this.tableEl, TABLE_RESIZING_CSS_CLASS);
    this._setColumnWidth(width);
    this.columnResize.emit(width);
  };

  onMouseUp = (event: MouseEvent): void => {
    if (!this.isPressed) {
      return;
    }
    this.isPressed = false;
    this.renderer.removeClass(this.tableEl, TABLE_RESIZING_CSS_CLASS);
  };

  private _addEventListenters(): void {
    const row = this.renderer.parentNode(this.columnEl);
    const thead = this.renderer.parentNode(row);
    this.tableEl = this.renderer.parentNode(thead);

    const resizeCursor = this.renderer.createElement('span');
    this.renderer.addClass(resizeCursor, RESIZE_CURSOR_CSS_CLASs);
    this.renderer.appendChild(this.columnEl, resizeCursor);

    this.renderer.listen(resizeCursor, 'mousedown', this.onMouseDown);
    this.renderer.listen(this.tableEl, 'mousemove', this.onMouseMove);
    this.renderer.listen('document', 'mouseup', this.onMouseUp);
  }

  private _setColumnWidth(width: number): void {
    this.renderer.setStyle(this.columnEl, 'width', `${width}px`);
  }

  private _calculateColumnWidth(
    startWidth: number,
    startPageX: number,
    currentPageX: number
  ): number {
    const offset = 0;
    return startWidth + (currentPageX - startPageX - offset);
  }
}
