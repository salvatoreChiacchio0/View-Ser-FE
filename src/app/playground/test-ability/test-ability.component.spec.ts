import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAbilityComponent } from './test-ability.component';

describe('TestAbilityComponent', () => {
  let component: TestAbilityComponent;
  let fixture: ComponentFixture<TestAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAbilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
