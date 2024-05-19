import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
    private months: string[] = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    transform(value: Date): string {
        const day: number = value.getDate();
        const month: string = this.months[value.getMonth()];
        const year: number = value.getFullYear();
        return `${day} ${month} ${year}`;
    }
}

