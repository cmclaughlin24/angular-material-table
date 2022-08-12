import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';

export interface FabResizeStart {
  event: MouseEvent | TouchEvent;
  column: ElementRef<HTMLElement>;
}

export interface FabResizeEnd {
  prevWidth: number;
  curWidth: number;
  event: MouseEvent | TouchEvent;
  column: ElementRef<HTMLElement>;
}

const FAB_RESIZE_CURSOR_CSS_CLASS = 'mat-header-cell-resize-cursor';
const FAB_RESIZE_TABLE_CSS_CLASS = 'fab-resize-table';
const FAB_RESIZING_CSS_CLASS = 'mat-table-resizing';

@Directive({
  selector: '[fab-resize-column]',
})
export class FabResizeColumnDirective implements OnInit, OnChanges {
  // Input Bindings.
  @Input('fab-resize-column') disabled: boolean | undefined | "";
  @Input() width: number | undefined;

  // Output Bindings.
  @Output() resizeStart = new EventEmitter<FabResizeStart>;
  @Output() resizeEnd = new EventEmitter<FabResizeEnd>;

  private _columnEl: ElementRef<HTMLElement>;
  private _tableEl: HTMLElement;
  private _resizeCursor: HTMLElement;

  private _isPressed: boolean;
  private _startWidth: number;
  private _startPageX: number;
  private _finalWidth: number;

  constructor(private readonly renderer: Renderer2, element: ElementRef) {
    this._columnEl = element;
  }

  ngOnInit(): void {
    this._addEventListeners();
    if (this.width == null || this.width === 0) {
      return;
    }
    this._setColumnWidth(this.width);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const disabledChange = changes['disabled'];

    if (disabledChange) {
      this._toggleResizeCursor(!disabledChange.currentValue)
    }
  }

  onMouseDown = (event: MouseEvent) => {
    if (this.disabled) {
      return;
    }
    this.resizeStart.emit({ event, column: this._columnEl });
    this._isPressed = true;
    this._startPageX = event.pageX;
    this._startWidth = this._columnEl.nativeElement.offsetWidth;
  };

  onMouseMove = (event: MouseEvent) => {
    if (!this._isPressed || !event.buttons) {
      return;
    }
    this._finalWidth = this._calculateColumnWidth(
      this._startWidth,
      this._startPageX,
      event.pageX
    );
    this.renderer.addClass(this._tableEl, FAB_RESIZING_CSS_CLASS);
    this._setColumnWidth(this._finalWidth);
  };

  onMouseUp = (event: MouseEvent) => {
    if(!this._isPressed) {
      return;
    }
    this._isPressed = false;
    this.renderer.removeClass(this._tableEl, FAB_RESIZING_CSS_CLASS);
    this.resizeEnd.emit({
      prevWidth: this._startWidth,
      curWidth: this._finalWidth,
      event: event,
      column: this._columnEl
    });
  };

  private _addEventListeners(): void {
    const row = this.renderer.parentNode(this._columnEl.nativeElement);
    const thead = this.renderer.parentNode(row);
    this._tableEl = this.renderer.parentNode(thead);

    this._resizeCursor = this.renderer.createElement('span');
    this._toggleResizeCursor(!this.disabled);
    this.renderer.appendChild(this._columnEl.nativeElement, this._resizeCursor);

    this.renderer.listen(this._resizeCursor, 'mousedown', this.onMouseDown);
    this.renderer.listen(this._tableEl, 'mousemove', this.onMouseMove);
    this.renderer.listen('document', 'mouseup', this.onMouseUp);

    // Fixme: Should add touch event listeners for tablet devices?
  }

  private _calculateColumnWidth(startWidth: number, startPageX: number, currentPageX: number): number {
    // Fixme: Decide if offset is required for calculation.
    return startWidth + (currentPageX - startPageX);
  }

  private _setColumnWidth(width: number): void {
    this.renderer.setStyle(this._columnEl.nativeElement, 'width', `${width}px`);
  }

  private _toggleResizeCursor(enabled: boolean): void {
    if (!this._resizeCursor) {
      return;
    }

    enabled ? 
      this.renderer.addClass(this._resizeCursor, FAB_RESIZE_CURSOR_CSS_CLASS) :
      this.renderer.removeClass(this._resizeCursor, FAB_RESIZE_CURSOR_CSS_CLASS)
  }
}