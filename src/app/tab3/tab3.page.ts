import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  correctAnswers: any;
  totalQuestions: number;
  constructor(public storage: Storage) {
    setTimeout(() => {
      this.storage.get('CorrectAnswers').then((val) => {
        this.correctAnswers = val.length;
      });

      this.storage.get('TotalQuestions').then((val1) => {
        this.totalQuestions = val1;
      })
    }, 100)
  }

}
