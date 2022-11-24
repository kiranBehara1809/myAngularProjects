import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
  countries:any=[]
  countriesCovidData:any=[]
  selectedObject:any;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  constructor(private globalService : GlobalService) { 
    // var x = window.matchMedia("(max-width: 600px)")
    // var x = window.matchMedia("(min-width: 600px)")
    // var x = window.matchMedia("(min-width: 768px)")
    // var x = window.matchMedia("(min-width: 992px)")
    // var x = window.matchMedia("(min-width: 1200px)")
  }

  ngOnInit(): void {
    const countriesCovidData = this.globalService.covidAllData();
    const countryCommonData = this.globalService.getAllCountries();
    forkJoin([countriesCovidData, countryCommonData]).subscribe(async (fj:any) =>{
      this.countriesCovidData = fj[0].map((x:any) => {
        return {
          ...x,
          class : '',
          flag : fj[1].find((c:any) => c.name.toLocaleLowerCase() === x.Country.toLocaleLowerCase())?.flags?.png 
        }
      }) || []
      this.countries = fj[1]
    })
  }
  onClickCountry(item:any){
    console.log(item)
    this.countriesCovidData = this.countriesCovidData?.map((c:any) =>{
      return {
        ...c,
        class : item.Country === c.Country ? 'itemSelected' : ''
      }
    })
    this.selectedObject = this.countriesCovidData.find((x:any) => x.Country === item.Country) || null
  }

}
