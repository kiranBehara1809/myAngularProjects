import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  API = `http://localhost:2111/api/`
  RAPID_API = `https://imdb8.p.rapidapi.com/`
  constructor(private http: HttpClient) { }

  get(endPoint: string) {
    return this.http.get(`${this.API}${endPoint}`)
  }
  post(endPoint: string, payload: any) {
    return this.http.post(`${this.API}${endPoint}`, payload)
  }
  patch(endPoint: string, payload: any) {
    return this.http.patch(`${this.API}${endPoint}`, payload)
  }
  imdbRelatedAPI() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-RapidAPI-Key' : '0193f3e8admshf7d38ba385bf363p1a9d9fjsn73c13c71d735',
      'X-RapidAPI-Host' : 'imdb8.p.rapidapi.com'
    });
    return this.http.get("https://imdb8.p.rapidapi.com/title/find?q=game%20of%20thr",{
      headers: headers
    })
  }
  getAllCountries(){
    return this.http.get(`https://restcountries.com/v2/all?fields=name,capital,currencies,flags`)
  }
  covidAllData(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-RapidAPI-Key' : '0193f3e8admshf7d38ba385bf363p1a9d9fjsn73c13c71d735',
      'X-RapidAPI-Host' : 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
    });
    return this.http.get("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/",{
      headers: headers
    })
  }
  getNasaData(camera:string){
    // https://api.nasa.gov/planetary/apod?api_key=MDvZw4oBbORQPFoMrwOaydj4yXjtI5YTy1XktmaM
    return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${camera.toLocaleLowerCase()}&api_key=MDvZw4oBbORQPFoMrwOaydj4yXjtI5YTy1XktmaM`)
  }
  getPnrStatus(pnrNumber:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-RapidAPI-Key' : '0193f3e8admshf7d38ba385bf363p1a9d9fjsn73c13c71d735',
      'X-RapidAPI-Host' : 'pnr-status-indian-railway.p.rapidapi.com'
    });
    return this.http.get(`https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/${pnrNumber}`,{
      headers: headers
    })
  }
  getWeatherInfo(cityName:string){
    // return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=da931ad4502df1d216edb321e2af6ecc`)
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=da931ad4502df1d216edb321e2af6ecc&units=metric`)
  }
}
