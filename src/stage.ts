import {Observable, of, pipe} from 'rxjs';
import {map, tap} from 'rxjs/operators';

type Slice<T> = {[P in keyof T]: Pick<T, P>}[keyof T];

export class Extendable<T> {
    extend<U extends Slice<T>>(properties: U): this & U {
        return Object.assign(this, properties);
    }
}


type MyType = {
    a: number,
    b: number,
    c: number,
};

type A = {
    a: number;
}
type B = {
    b: number;
}
type C = {
    c: number;
}

type Mine = A & B & C;
let x = new Extendable<Mine>();
const y = x.extend({a: 5});
of(y).pipe(
    map(addBB),
    map(addC),
    tap((a) => console.log('hi')),
).subscribe((mine) => {
    console.log(mine);
});

function addBB<U extends Extendable<Mine>>(a: U): U & B {
    const extended = a.extend({b: 4});
    return extended;
}

function addC<U extends Extendable<Mine>>(a: U): U & C {
    const extended = a.extend({c: 4});
    return extended;
}

