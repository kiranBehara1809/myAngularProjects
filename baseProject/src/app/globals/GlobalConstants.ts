import { MatDialogConfig } from "@angular/material/dialog";

export class GlobalConstants {
    // public static readonly DIABOS_USER_NAME :string = "DIABOS";
    //MONTHS & DAYS
        public static readonly MONTHS_LIST :string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        public static readonly MONTHS_SHORT_LIST :string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        public static readonly DAY_LIST :string[]=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
        public static readonly DAY_SHORT_LIST :string[]=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    //MONTHS & DAYS

    public static readonly macintoshModal:MatDialogConfig = {
        panelClass: "macintoshModal",
        hasBackdrop:true,
        disableClose: true,
        height :'auto',
        autoFocus : false
    }
}