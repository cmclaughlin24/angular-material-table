import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialColumnSelectorComponent } from './material-column-selector.component';

describe('MaterialColumnSelectorComponent', () => {
  let component: MaterialColumnSelectorComponent;
  let fixture: ComponentFixture<MaterialColumnSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialColumnSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
