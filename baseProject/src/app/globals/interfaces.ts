export interface MAT_DIALOG_HEADER {
    hideIcons : boolean,
    header : string,
    searchBox?:boolean,
    id?:string,
    maxWidth?: string,
    maxHeight?:string,
    defaultWidth?:string,
    defaultHeight?:string,
    enableOnlyClose? : boolean
}
export interface WEATHER {
    area:string,
    sunrise:string,
    sunset:string,
    temp_max:string,
    temp_min:string,
    pressure:number,
    feels_like:any,
    temp:any,
    humidity:any,
    visibility:any,
    windSpeed:any,
    windDeg:any,
    spinnerValue:any

}