import { NgModule } from '@angular/core';

import { StarshipService } from './starship/starship.service';

@NgModule({
    providers: [
        StarshipService,
    ]
})
export class ServiceProxyModule { }
