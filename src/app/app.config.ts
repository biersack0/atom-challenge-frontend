import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { apiAtomInterceptor } from "./core/interceptors/api-atom.interceptor";
import { ModalModule } from "ngx-bootstrap/modal";
import { provideLottieOptions } from "ngx-lottie";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([apiAtomInterceptor])
        ),
        provideLottieOptions({
            player: () => import('lottie-web'),
        }),
        ...(ModalModule.forRoot().providers || []),
    ]
};
