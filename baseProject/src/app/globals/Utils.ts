import { GlobalConstants } from "./GlobalConstants";

export class Utils{
     static getMonthShortName(monthNumber:number){
        return GlobalConstants.MONTHS_SHORT_LIST[monthNumber]
    }
    static getDayShortName(dayNumber:number){
        return GlobalConstants.DAY_SHORT_LIST[dayNumber]
    }
}