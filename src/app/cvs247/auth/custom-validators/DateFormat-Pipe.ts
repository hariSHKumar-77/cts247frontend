import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatPipe',
})

export class dateFormatPipe implements PipeTransform {
    transform(value: string) {
       var datePipe = new DatePipe("en-US");
        var newDate = datePipe.transform(value, 'dd/MM/yyyy');
        return newDate;
    }
}