import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilmCardComponent } from "../components/film-card/film-card";
import { IonicModule } from "ionic-angular";

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        FilmCardComponent
    ],
    exports: [
        FilmCardComponent
    ]
})

export class BaseCommonModule {

    static forRoot() {
        return {
            NgModule: BaseCommonModule
        }
    }

}