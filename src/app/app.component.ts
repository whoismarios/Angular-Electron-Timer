import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Electron-Timer';

  max: number = 0;
  current = 0;
  isStarted = false;
  timerSubscription: Subscription | undefined;

  start() {
    if (this.max && this.max > 0) {
      this.isStarted = true;

      this.timerSubscription = interval(100)
        .pipe(
          takeWhile(_ => !this.isFinished),
          tap(i => this.current += 0.1)
        )
        .subscribe();
    }
  }

  finish() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    
    this.current = this.max;
    this.isStarted = false;
  }

  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max * 60; // Convert minutes to seconds
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
