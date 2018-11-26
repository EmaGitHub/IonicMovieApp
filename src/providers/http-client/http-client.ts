import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import  { map } from 'rxjs/operators';

/*
  Generated class for the HttpClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpClientProvider {

  apiKey = "c4d79d0d1e50bf8bc86b7afbd240e4df";

  url: string;

  params= new HttpParams()
  .set('api_key', this.apiKey);

  constructor(public http: HttpClient) {
    console.log('Hello HttpClientProvider Provider');
  }

  getFilms(category: string, page: number){

  switch (category) {

      case 'popular':
          this.url = "https://api.themoviedb.org/3/movie/popular";
          break;

      case 'recent':
          this.url = "http://api.themoviedb.org/3/discover/movie";
          this.params = this.params.append('sort_by', 'release_date.desc');
          this.params = this.params.append('release_date.lte', '2018-10-01');

          break;
  }

  this.params = this.params.append('page', page.toString());

    return this.http.get(this.url, {params: this.params})
      .pipe( map(
        (response: Response) => {
          this.params = this.params.delete("page");
          this.params = this.params.delete("sort_by");
          this.params = this.params.delete("release_date.lte");
          return response["results"];
        }
      ));
  }

  getGenreById(id: number) {


    return this.http.get('api.themoviedb.org/3/genre/movie/list', {params: this.params})
    .pipe( map(
      (response: Response) => {
        this.params = this.params.delete("page");
        this.params = this.params.delete("sort_by");
        this.params = this.params.delete("release_date.lte");
        return response;
      }
    ));
  }

  getFavouriteFilms(favourites, _callback) {

    let films= [];

    for(let i=0; i<favourites.length; i++){
        
        
        this.getFilmDetail(favourites[i]).subscribe(
        (resp: Response) => {

          films.push(resp);
          
          if (i == favourites.length-1) _callback(films);

        }
        );
    }


    
  }

  getFilmDetail(id: string) {

    this.url = " http://api.themoviedb.org/3/movie/"+id;

    return this.http.get(this.url, {params: this.params})
      .pipe( map(
        (response: Response) => {
          return response;
        }
      ));

  }

}
