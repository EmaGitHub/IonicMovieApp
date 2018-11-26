import { NgModule } from '@angular/core';
import { FilmCardComponent } from './film-card/film-card';
import { PagesToolbarComponent } from './pages-toolbar/pages-toolbar';
@NgModule({
	declarations: [FilmCardComponent,
    PagesToolbarComponent],
	imports: [],
	exports: [FilmCardComponent,
    PagesToolbarComponent]
})
export class ComponentsModule {}
