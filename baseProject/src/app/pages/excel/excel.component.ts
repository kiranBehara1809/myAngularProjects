import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {
  excelForm:FormGroup;
  displayedColumns: any[] = [];
  dataSource = new MatTableDataSource([]);
  constructor(private fb: FormBuilder, private commonService: CommonService, private globalService: GlobalService, private window: Window, private datePipe: DatePipe, private dialog: MatDialog,private bottomSheet: MatBottomSheet){
    this.excelForm = this.fb.group({
      columns : this.fb.array([]),
    })
  }
  get columns() {
    return this.excelForm.controls["columns"] as FormArray;
  }

  ngOnInit(): void {
    const labelValueFormControl = this.fb.group({
      name : new FormControl(null),
      isVisible : new FormControl(true),
      isLabelEncoded : new FormControl(false),
      canReorder : new FormControl(true),
      isSrNoColumn : new FormControl(false),
      // value : new FormControl(null),
      // isValueEncoded : new FormControl(false),
      // isHyperlink:new FormControl(false)
    })
    this.columns.push(labelValueFormControl)
  }
  addLabelValue(){
    const labelValueFormControl = this.fb.group({
      name : new FormControl(null),
      isVisible : new FormControl(true),
      isLabelEncoded : new FormControl(false),
      canReorder : new FormControl(true),
      isSrNoColumn : new FormControl(false),
      // value : new FormControl(null),
      // isValueEncoded : new FormControl(false),
      // isHyperlink:new FormControl(false)
    })
    this.columns.push(labelValueFormControl);
  }

  finalizeColumnsAndData(){
    console.log(this.columns.value)
    const emptyLabel = this.columns.value?.some(x => x.name === null || x.name.length === 0)
    if(emptyLabel) return this.commonService.openSnackBar('Enter Label');
    const colArray = this.columns.value?.map(x=>x.name)
    const duplicated = colArray?.some((element, index) => {
        return colArray?.indexOf(element) !== index
    });
    if(duplicated) return this.commonService.openSnackBar('Column Already Available');
    this.displayedColumns = []
    this.dataSource = new MatTableDataSource([]);
    this.displayedColumns = this.columns.value.map(x => x.name)
  }

  addAnother(){
    this.addLabelValue();
  }
  delete(i:number){
    this.columns.removeAt(i)
  }
}
