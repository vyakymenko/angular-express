import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { HomeComponent } from './home.component';
import { NameListService } from './name-list.service';
import { SharedModule } from '../shared/shared.module';

describe('Home component', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: NameListService,
          useValue: new MockNameListService()
        }
      ]
    });

  });

  it('should work',
    async(() => {
      TestBed
        .compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(HomeComponent);
          const homeInstance = fixture.debugElement.componentInstance;
          const homeDOMEl = fixture.debugElement.nativeElement;
          const mockNameListService =
            fixture.debugElement.injector.get<any>(NameListService) as MockNameListService;
          const nameListServiceSpy = spyOn(mockNameListService, 'get').and.callThrough();

          mockNameListService.returnValue = ['1', '2', '3'];

          fixture.detectChanges();

          expect(homeInstance.nls).toEqual(jasmine.any(MockNameListService));
          expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
          expect(nameListServiceSpy.calls.count()).toBe(1);

          homeInstance.newName = 'Vale';
          homeInstance.addName();

          fixture.detectChanges();

          expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
          expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Vale');
        });

    }));
});

class MockNameListService {

  returnValue: string[];

  get(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}
