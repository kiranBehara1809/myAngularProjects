import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedObject: any = null;
  batteryObject: any;
  sampleForm: FormGroup;
  systemInformation: any = null;
  selectedColor: any = '#007ccf';
  settingsList = [
    // {
    //   id: 1,
    //   name: 'Brightness',
    //   class: ''
    // },
    {
      id: 2,
      name: 'Battery',
      color: ''
    },
    {
      id: 3,
      name: 'Notifications',
      color: ''
    },
    {
      id: 6,
      name: 'General',
      color: ''
    },
    {
      id: 7,
      name: 'Theme',
      color: ''
    },
  ];
  themes:any[]=[
    {
      name : 'Default Theme',
      id : 'defaultId',
      color : 'green',
      selected : true,
      themeName : 'defaultTheme'
    },
    {
      name : 'Pink Theme',
      id : 'pinkThemeId',
      color : 'pink',
      selected : false,
      themeName : 'pinkTheme'
    },
    {
      name : 'Brown Theme',
      id : 'brownThemeId',
      color : 'brown',
      selected : false,
      themeName : 'brownTheme'
    },
    {
      name : 'Teal Theme',
      id : 'tealThemeId',
      color : 'teal',
      selected : false,
      themeName : 'tealTheme'
    }
  ]
  constructor(private fb: FormBuilder, private commonService: CommonService) {
    const sessionColor = sessionStorage.getItem("MATERIAL_COMPONENT_COLOR")
    if (sessionColor != null && sessionColor != undefined) {
      this.selectedColor = sessionColor
    }
    this.sampleForm = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(12)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)]))
    })
  }

  ngOnInit(): void {
    let mobile = window.matchMedia("(max-width: 600px)");
    let tablet = window.matchMedia("(max-width: 900px)");
    if (mobile.matches || tablet.matches) {
      this.settingsList = this.settingsList.filter(x => x.id != 3)
    }
    this.commonService.getBatteryDetails().then(res => {
      this.batteryObject = res
    })
    this.systemInformation = this.commonService.getSystemInformation();
  }


  showNotification() {
    this.commonService.requestAndShowPermission(this.sampleForm.value.title, this.sampleForm.value.description)
    this.sampleForm.reset()
  }
  getErrorMessage(fg: FormGroup, fc: string) {
    return this.commonService.getFormFieldErrorMessage(fg, fc)
  }

  getBgColor(color: string, bgColor: string) {
    return {
      'background-color': bgColor,
      'color': color
    }
  }
  onClickLoopItem(item: any) {
    this.selectedObject = null;
    this.settingsList = this.settingsList?.map((c: any) => {
      return {
        ...c,
        color: item.id === c.id ? 'primary' : ''
      }
    })
    this.selectedObject = this.settingsList.find((x: any) => x.id === item.id) || null
  }
 
  changeTheme(theme){
    document.body.className = ''
    document.body.className = `mat-typography ${theme.themeName}`
    this.themes = this.themes.map(rec=>{
      return {
        ...rec,
        selected : theme.id == rec.id ? true : false
      }
    })
  }
}
