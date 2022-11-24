import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-imdb',
  templateUrl: './imdb.component.html',
  styleUrls: ['./imdb.component.scss']
})
export class ImdbComponent implements OnInit {
  searchedValue:string=""
  constructor(private globalService : GlobalService) { }

  ngOnInit(): void {
    this.globalService.imdbRelatedAPI().subscribe(res=>{
      console.log(res)
    })
  }

}
