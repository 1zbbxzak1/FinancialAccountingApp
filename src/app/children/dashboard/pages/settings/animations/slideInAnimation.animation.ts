import { style, transition, trigger, query, animateChild, group,animate } from "@angular/animations";

export const slideInAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 0 
            }),
        ]),
        query(':enter', [style({ opacity: 0 })]), 
        group([
            query(':leave', [
                animate(
                    '500ms ease-out',
                    style({ opacity: 0 }) 
                ),
            ]),
            query(':enter', [
                animate(
                    '800ms ease-out',
                    style({ opacity: 1 }) 
                ),
            ]),
        ]),
    ]),
]);
