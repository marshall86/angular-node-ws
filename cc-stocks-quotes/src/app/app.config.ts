import { importProvidersFrom } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";

export const appConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi()),
        // provideRouter(routes, withPreloading(PreloadAllModules))
    ]
}