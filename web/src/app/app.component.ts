import { Component, ElementRef, HostListener, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { SimpleTimer } from 'ng2-simple-timer';

import { environment } from '../environments/environment';
import { Event, Timeslot } from './model/o365.model';

export class Resource {
  id: string;
  busy: boolean;
  name: string;
  o365Name: string;
}

export class TimeIncrement {
  id: number;
  value: string;
  dateTimeValue: Date;
}

const RESOURCE: Resource = {
  id: environment.hostname,
  name: environment.resource_name,
  o365Name: environment.resource_id,
  busy: false
}
const hostname = environment.hostname;
const ip = environment.hostIP;
declare var newEvent: Event;

const NOEVENTS_MESSAGES: string[] = ["No Events Today", "Your schedule is clear", "My schedule is wide open"]

const TIMEZONE = environment.timezone;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
debug = environment.debug;
  transitionTimer: SimpleTimer;
  controller = this.controller;
  allowBookNowFunction = environment.allow_book_now_function;
  bookEvent: boolean;
  calendarWorkdayEndHour: number;
  calendarWorkdayStartHour: number;
  cancellation: boolean;
  currentEvent: Event;
  currentTimeout: any;
  currentTimeoutTTL = 0;
  eventData: string;
  timePeriod: Timeslot;
  date: Date;
  dayMillis: number;
  timeOptions = {
    hour: "2-digit", minute: "2-digit"
  };
  events: Event[] = [];
  helpRequested: boolean;
  helpInformation: boolean;
  helpPressed: boolean;
  LOCALE = "en-us";
  modalTransitionTimerCounter = 0;
  modalTransitionTimerID = "modalTransitionTimer";
  modalTimeout = environment.popupWindowTimeout;
  newEvent: Event;
  //newEventTitle: string;
  newEventTitle = "Ad-hoc Meeting";
  newEventEndTimeId: string;
  newEventEndTimeValue: string;
  newEventStartTimeId: string;
  newEventStartTimeValue: string;
  occupied: boolean;
  refHours: string[] = [];
  resource = RESOURCE;
  restartRequested: boolean;
  showAgenda: boolean;
  showHelpButton = environment.showHelpButton;
  selectedEvent: Event;
  selectedStartValue: number;
  timeIncrement = environment.time_slot_size; // minutes to increment select boxes by
  timeSlots: Timeslot[] = [];
  title = 'Room Scheduler';
  schedulingWindow = 5; // minutes after a time window start time when the resource still be scheduled
  unoccupied: boolean;
  validTimeIncrements: TimeIncrement[] = [];
  percentOfDayExpended: number;

  duration: number;

  hasAction: boolean;

  isDebug: boolean;

  defaultLocale: string;

ngOnInit(): void {
    //var that = this;
    document.addEventListener("touchstart", function() {}, true);

    this.defaultLocale = ` ${this.LOCALE}`.slice(1);
    this.layouts = Object
      .keys(this._layouts)
      .map((name: string) => ({
        name: name,
        layout: this._layouts[name]
      }))
      .sort((a, b) => a.layout.name.localeCompare(b.layout.name));

    this.utcTime();

    this.transitionTimer = new SimpleTimer();
    // Populate valid time scheduling window
    var d = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(d.getDate() + 1);
    tomorrow.setTime(0);

    var minutes = d.getMinutes();
    //var hours = d.getHours();
    var m = 0;
    if (this.timeIncrement == 15) {
      m = (((minutes + 7.5) / 15 | 0) * 15) % 60; // Nearest 15 minute interval, rounded down
    }
    else {
      m = (((minutes + 15) / 30 | 0) * 30) % 60;
      //m = (Math.round(minutes/30) * 30) % 60;
    }
    //    var h = ((((minutes/105) + .5) | 0) + hours) % 24;  // Not quite right.
    d.setMinutes(m);
    d.setSeconds(0);

    for (var i = 0; i < 96; i++) {
      var amPm = "AM";
      var mins = d.getMinutes();
      var hours = d.getHours();
      if (hours > 12) {
        amPm = "PM";
        hours = hours - 12;
      }
      if ((new Date).getDay() == d.getDay()) {
        this.validTimeIncrements.push({
          id: i,
          dateTimeValue: d,
          value: d.toLocaleTimeString(this.LOCALE, this.timeOptions)
          //value: hours.toString() + ":" + mins.toString() + " " + amPm
        });
      }
      d.setMinutes(mins + this.timeIncrement);
    }

    //Populate timeslots
    for (var j = 0; j < 96; j++) {
      var tmpTime1 = new Date();
      var tmpTime2 = new Date(tmpTime1.valueOf());
      var t2 = 0;

      var t = new Timeslot();
      tmpTime1.setMinutes(j * 15);

      t.Start = tmpTime1;
      if (j < 96) {
        t2 = j + 1;
      }
      else {
        t2 = j;
      }
      tmpTime2.setMinutes((j + 1) * 15);
      t.End = tmpTime2;

      this.timeSlots.push(t);
      
	tmpTime1 = null;
      tmpTime2 = null;
    }

    this.bookEvent = false;
    this.cancellation = false;
    this.calendarWorkdayEndHour = 17;
    this.calendarWorkdayStartHour = 8;
    this.currentEvent = this.events[1];
    this.helpRequested = false;
    this.helpPressed = false;
    this.helpInformation = false;
    this.restartRequested = false;
    this.newEvent = null;
    if (this.currentEvent != null) {
      this.occupied = true;
    }
    else {
      this.occupied = false;
    }
    //this.occupied = false;
    this.showAgenda = false;
    this.selectedEvent = null;
    this.selectedStartValue = 0;
    this.unoccupied = !(this.occupied);
}
  utcTime(): void {
    setInterval(() => {
      this.date = new Date();
      this.timePeriod = this.timeSlots[this.currentTimePeriod()];
      this.percent();
      this.currentMeeting();
      this.evalTime();
    }, 1000);

  }

}
