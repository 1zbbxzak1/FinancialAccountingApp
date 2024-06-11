import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appCheckDownload]'
})
export class CheckDownloadDirective {

    @Output() fileLoaded = new EventEmitter<File>();

    @HostListener('change', ['$event']) onChange(event: any) {
        const files: File[] = event.target.files;

        if (files && files.length > 0 ){
          this.fileLoaded.emit(files[0]);
        } 
    }
}
