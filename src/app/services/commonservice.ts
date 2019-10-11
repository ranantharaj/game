import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
    public data: any;
    public randomNumberLength = 8;
    public timer = 60;
    constructor() {
    }
}