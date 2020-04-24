import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class NewsResolver implements Resolve<string> {
  constructor() {}

  resolve() {
    return of('Hello Alligator!').pipe(delay(1000));
  }
}