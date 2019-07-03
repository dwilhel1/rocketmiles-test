import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rocketmiles-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('rocketmiles-test');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to rocketmiles-test!');
  });
});

/* describe('LandingController', function () {
    var LandingController;
    var HotelService;
    var hotelDefer;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('landing'));
    beforeEach(function() {
        angular.mock.module(function($provide) {
            HotelService = {
                get: jasmine.createSpy()
            };

            $provide.value('HotelService', HotelService);
        });
    });

    beforeEach(inject(function($controller, $q) {
        controller = $controller;
        hotelDefer = $q.defer();

        HotelService.get.and.returnValue(hotelDefer.promise);

        LandingController = $controller('LandingController');
    }));

    describe('when the controller loads', function () {
        it('queries for the hotel data', function () {
            expect(HotelService.get).toHaveBeenCalled();
        });
    });
}); */
