import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { ApiAtomInterceptor } from "./core/interceptors/api-atom.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiAtomInterceptor,
            multi: true
        }
    ]
};
