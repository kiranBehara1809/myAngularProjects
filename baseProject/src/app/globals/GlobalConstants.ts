import { MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBarConfig } from "@angular/material/snack-bar";

export class GlobalConstants {

    public static readonly NMD = "Hey There..! No message to display"


    //MONTHS & DAYS
        public static readonly MONTHS_LIST :string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        public static readonly MONTHS_SHORT_LIST :string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        public static readonly DAY_LIST :string[]=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
        public static readonly DAY_SHORT_LIST :string[]=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    //MONTHS & DAYS

    public static readonly macintoshModal:MatDialogConfig = {
        panelClass: "macintoshModal",
        hasBackdrop:true,
        disableClose: true,
        height :'auto',
        autoFocus : false,
        maxHeight:'100vh',
        maxWidth:'100vw'
    }

       //SNACKTOASTER CONSTANTS
       public static readonly DEFAULT_ERROR_MESSAGE :string = "Error";
       public static readonly DEFAULT_INFO_MESSAGE :string = "Info";
       public static readonly DEAFULT_SNACK_TOASTER_TIMER :number = 3000;
       public static readonly DEFAULT_SUCCESS_MESSAGE :string = "Success";
       public static readonly SNACK_TOASTER_INFO :string = "snackToaster_info";
       public static readonly DEFAULT_SNACK_TOASTER_CLASS :string = "snackToaster_info";
       public static readonly SNACK_TOASTER_ERROR :string = "snackToaster_error";
       public static readonly SNACK_TOASTER_WARN :string = "snackToaster_warn";
       public static readonly SNACK_TOASTER_SUCCESS :string = "snackToaster_success";
       public static readonly SNACK_TOASTER_CONFIG :MatSnackBarConfig ={
           politeness : "polite",
           direction : "ltr",
           verticalPosition : 'top',
           horizontalPosition : 'right'
       };
   //SNACKTOASTER CONSTANTS
}