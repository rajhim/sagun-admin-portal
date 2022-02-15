import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotListComponent } from './lot-list.component';

describe('LotListComponent', () => {
  let component: LotListComponent;
  let fixture: ComponentFixture<LotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
