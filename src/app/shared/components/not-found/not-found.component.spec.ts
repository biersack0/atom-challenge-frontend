import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [NotFoundComponent],
            providers: [
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to auth page when goHome is called', () => {
        component.goHome();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth']);
    });

    it('should call window.history.back when goBack is called', () => {
        spyOn(window.history, 'back');
        component.goBack();
        expect(window.history.back).toHaveBeenCalled();
    });
});
