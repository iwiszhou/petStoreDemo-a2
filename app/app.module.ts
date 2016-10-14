import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { PetsComponent } from './pets/pets.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { CustomCarouselComponent } from './shared/carousel/carousel.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FooterBarComponent } from './footer/footer.component';
import { UtilsService } from './shared/utils.service';
import { UtilsApi } from './shared/apis.service';


@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'pets',
        component: PetsComponent
      },
      {
        path: 'petDetail/:id',
        component: PetDetailComponent
      },
      {
        path: 'createPet',
        component: CreatePetComponent
      },
      {
        path: '',
        redirectTo: '/pets',
        pathMatch: 'full'
      }
    ]) 
  ],
  declarations: [ 
    AppComponent,
    PetsComponent,
    PetDetailComponent,
    CreatePetComponent,
    CustomCarouselComponent,
    MenuBarComponent,
    FooterBarComponent
  ],
  providers: [
    UtilsService,
    UtilsApi
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
