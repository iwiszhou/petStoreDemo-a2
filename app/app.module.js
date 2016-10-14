"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var pets_component_1 = require('./pets/pets.component');
var create_pet_component_1 = require('./create-pet/create-pet.component');
var pet_detail_component_1 = require('./pet-detail/pet-detail.component');
var carousel_component_1 = require('./shared/carousel/carousel.component');
var menu_bar_component_1 = require('./menu-bar/menu-bar.component');
var footer_component_1 = require('./footer/footer.component');
var utils_service_1 = require('./shared/utils.service');
var apis_service_1 = require('./shared/apis.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    {
                        path: 'pets',
                        component: pets_component_1.PetsComponent
                    },
                    {
                        path: 'petDetail/:id',
                        component: pet_detail_component_1.PetDetailComponent
                    },
                    {
                        path: 'createPet',
                        component: create_pet_component_1.CreatePetComponent
                    },
                    {
                        path: '',
                        redirectTo: '/pets',
                        pathMatch: 'full'
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                pets_component_1.PetsComponent,
                pet_detail_component_1.PetDetailComponent,
                create_pet_component_1.CreatePetComponent,
                carousel_component_1.CustomCarouselComponent,
                menu_bar_component_1.MenuBarComponent,
                footer_component_1.FooterBarComponent
            ],
            providers: [
                utils_service_1.UtilsService,
                apis_service_1.UtilsApi
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map