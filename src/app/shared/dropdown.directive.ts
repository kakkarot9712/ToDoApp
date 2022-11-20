import { Directive, ElementRef, HostListener, Injectable, Input } from "@angular/core";

@Directive({
    selector:'[appDropDown]'
})
export class DropDownDirective{
    isOpen = false
    @Input()appDropDown!: HTMLElement
    constructor(private element: ElementRef){}
    @HostListener('document:click', ['$event.target'])hideMenu(target: HTMLElement){
        if(this.isOpen === true){
            if(target.classList.contains('dropdown-toggle') && target !== this.element.nativeElement ){
                return
            }
            this.appDropDown.classList.remove('show')
        }
        if(this.isOpen === false && target === this.element.nativeElement){
            this.appDropDown.classList.add('show')
        }
        this.isOpen = !this.isOpen
    }
}
