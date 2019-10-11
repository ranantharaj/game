import { Component, Input } from '@angular/core';
import { CommonService } from '../services/commonservice';
// import { NavController } from 'ionic-angular';
// import { Storage } from '../../../node_modules/@ionic/storage';
import { Storage } from '@ionic/storage';
import { Tab3Page } from '../tab3/tab3.page';
import * as _ from 'lodash';
import { Router } from '@angular/router';

export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  displayTime: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

//  constructor(public navCtrl: NavController, public common: CommonService, public storage: Storage) { }
  constructor(public common: CommonService, public storage: Storage, private router: Router) { }

  @Input() timeInSeconds: number;
  timer: CountdownTimer;
  randomNumbers = [];
  actualAnswers = [];
  userAnswers = [];
  displayTarget: number;
  buttonClickValue = 0;
  currentScore: any;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.initTimer();
    this.randomFunc();
  }

  // functions to generate Random numbers and Correct Answer for that addition calculation
  randomFunc() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.common.randomNumberLength; i++) {
      this.randomNumbers[i] = _.random(1, 50);
    }

    const randomAdditionCount = _.random(2, 3);
    const additionValue = _.sampleSize(this.randomNumbers, randomAdditionCount);
    this.displayTarget = _.sum(additionValue);
    this.actualAnswers.push(this.displayTarget);
  }

  // Push to Result Page when Set Timeout Happens
  hasFinished() {
    alert("Timeout");
    const correctAnswers = _.intersection(this.actualAnswers, this.userAnswers);
    this.storage.set('TotalQuestions', this.actualAnswers.length);
    this.storage.set('CorrectAnswers', correctAnswers);
   // this.navCtrl.push(Tab3Page);
   this.router.navigateByUrl('/tab3');
  }

  // Button Click to Add Click Value to buttonClickValue variable
  addTargetValue(item) {
    this.buttonClickValue += Number(item);
  }

  // next question generate using "NEXT" Button
  nextQuestion() {
    this.userAnswers.push(this.buttonClickValue);
    this.buttonClickValue = 0;
    // display current score when "next" button click
    const score = _.intersection(this.actualAnswers, this.userAnswers);
    this.currentScore = score.length;
    this.currentScore = (this.currentScore > 0)? this.currentScore : 0;
    this.randomFunc();
  }

  // Timer Function
  initTimer() {
    if (!this.timeInSeconds) { }
    this.timeInSeconds = this.common.timer;   // total time set
    this.timer = {
      seconds: this.timeInSeconds,
      secondsRemaining: this.timeInSeconds
    } as CountdownTimer;
    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.hasFinished();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let minutesString = '';
    let secondsString = '';
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }
}