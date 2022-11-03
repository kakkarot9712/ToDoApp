import { Directive, HostListener, Injectable, Input } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
    selector:'[appDropDown]'
})
export class DropDownDirective{
    isOpen = false
    @Input()appDropDown!: HTMLElement
    @HostListener('document:click', ['$event.target'])hideMenu(target: HTMLElement){
        if(this.isOpen === true){
            this.appDropDown.classList.remove('show')
        }
        if(this.isOpen === false && target === this.appDropDown.previousElementSibling){
            this.appDropDown.classList.add('show')
        }
        this.isOpen = !this.isOpen
    }
}
