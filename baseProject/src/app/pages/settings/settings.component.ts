import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedObject:any=null;
  sampleForm:FormGroup;
  selectedColor:any = '#007ccf';
  settingsList = [
    // {
    //   id: 1,
    //   name: 'Brightness',
    //   class: ''
    // },
    // {
    //   id: 2,
    //   name: 'Battery',
    //   class: ''
    // },
    {
      id: 3,
      name: 'Notifications',
      class: ''
    },
    {
      id: 4,
      name: 'Wallpaper',
      class: '',
      wallpaperList : [
      {value : 'wallpaper1' , name : 'Classic'},
      {value : 'wallpaper2' , name : 'Sunrise Peak'},
      {value : 'wallpaper3' , name : 'Winter Alps'},
      {value : 'wallpaper4' , name : 'Snake Island'},
      {value : 'wallpaper5' , name : 'Jogging Track'},
      {value : 'wallpaper6' , name : 'Foggy Forest'},
      {value : 'wallpaper7' , name : 'Greedy'},
      {value : 'wallpaper8' , name : 'Pure'},
    ]
    },
    {
      id: 5,
      name: 'Color Scheme',
      class: ''
    },
  ]
  constructor(private commonService:CommonService, private fb:FormBuilder) { 
    const sessionColor = sessionStorage.getItem("MATERIAL_COMPONENT_COLOR")
    if(sessionColor != null && sessionColor != undefined ){
      this.selectedColor = sessionColor
    }
    this.sampleForm = this.fb.group({
      title : new FormControl('',Validators.compose([Validators.required, Validators.maxLength(12)])),
      description : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)]))
    })
  }

  ngOnInit(): void {
    let mobile = window.matchMedia("(max-width: 600px)");
    let tablet = window.matchMedia("(max-width: 900px)");
    if(mobile.matches || tablet.matches){
     this.settingsList = this.settingsList.filter(x => x.id != 3)
    }
  }
  onClickSetting(item:any){
    this.selectedObject = null;
    this.settingsList = this.settingsList?.map((c:any) =>{
      return {
        ...c,
        class : item.id === c.id ? 'itemSelected' : ''
      }
    })
    this.selectedObject = this.settingsList.find((x:any) => x.id === item.id) || null
  }
  changeWallpaper(wallpaper:string){
    const element = document.getElementById(`${wallpaper}`) as HTMLInputElement | null
    if(element){
      element.checked  = true
      let root = document.documentElement;
      root.style.setProperty('--url', `url("../assets/images/${wallpaper}.jpg")`)
    }
  }
  showNotification(){
    this.commonService.requestAndShowPermission(this.sampleForm.value.title, this.sampleForm.value.description)
    this.sampleForm.reset()
  }
  getErrorMessage(fg:FormGroup, fc:string){
    return this.commonService.getFormFieldErrorMessage(fg,fc)
  }
  onChangeColor(){
      let root = document.documentElement;
      root.style.setProperty('--materialComponentColor', `${this.selectedColor}`)
      sessionStorage.setItem("MATERIAL_COMPONENT_COLOR", `${this.selectedColor}`)
  }
}
