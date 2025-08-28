import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [CommonModule, LottieComponent]
})
export class NotFoundComponent {
    notFound: AnimationOptions = {
        path: '../../../assets/json/404.json',
    };

    constructor(private router: Router) { }

    goHome(): void {
        this.router.navigate(['/']);
    }
}
