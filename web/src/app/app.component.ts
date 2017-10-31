import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SimpleTimer } from 'ng2-simple-timer';

import { environment } from '../environments/environment';
import { Event, Timeslot } from './model/o365.model';
import * as angular from 'angular';

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


export class AppComponent implements OnInit {

  transitionTimer: SimpleTimer;
  controller = this.controller;
  allowBookNowFunction = environment.allow_book_now_function;
  bookEvent: boolean;
  calendarWorkdayEndHour: number;
  calendarWorkdayStartHour: number;
  cancellation: boolean;
  currentEvent: Event;
  currentTimeout: any;
  eventData: string;
  timePeriod: Timeslot;
  date: Date;
  dayMillis: number;
  timeOptions = {
    hour: "2-digit", minute: "2-digit"
  };
  events: Event[] = [];
  helpRequested: boolean;
  helpPressed: boolean;
  LOCALE = "en-us";
  modalTransitionTimerCounter = 0;
  modalTransitionTimerID = "modalTransitionTimer";
  modalTimeout = environment.popupWindowTimeout;
  newEvent: Event;
  newEventTitle: string;
  newEventEndTimeId: string;
  newEventStartTimeId: string;
  occupied: boolean;
  refHours: string[] = [];
  resource = RESOURCE;
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    document.addEventListener("touchstart", function() { }, true);
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
      /*var h = t.Start.getHours();
      if (t.Start.getHours() > 12) {
        h = +(t.Start.getHours()) - 12;
      }
      if (this.refHours.length <= 0) {
        this.refHours.push(h.toPrecision(1).toString());
      }
      else {
        if (this.refHours[-1].valueOf() != h.toPrecision(1).toString()) {
          this.refHours.push(h.toPrecision(1).toString());
        }
      }*/
      tmpTime1 = null;
      tmpTime2 = null;
    }
    console.log(this.timeSlots);

    this.bookEvent = false;
    this.cancellation = false;
    this.calendarWorkdayEndHour = 17;
    this.calendarWorkdayStartHour = 8;
    this.currentEvent = this.events[1];
    this.helpRequested = false;
    this.helpPressed = false;
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

    /*for (var i = this.calendarWorkdayStartHour; i <= this.calendarWorkdayEndHour; i++) {

      if (i > 12) {
        var iNum = +i;
        var nNum = iNum - 12;

        this.refHours.push(nNum.toString());
      }
      else {
        this.refHours.push(i.toString());
      }
      var newDate = new Date()
      newDate.setHours(i);
    }*/
    this.refreshData();

  }

  availabilityClass(e: Event): string {
    if (e.Subject.toString() == 'Available') {
      return "agenda-view-row-available";
    }
    else {
      return "agenda-view-row-unavailable";
    }
  }


  bookNewEvent(): void {
    /*//this.reset();
    var d = new Date();
    this.bookEvent = true;
    this.newEvent = new Event();
    var year = d.getFullYear().toString();
    var month = d.getMonth().toString();
    var day = d.getDay().toString();
    var s = "" + year + "-" + month + "-" + day + "T";
    var e = "" + year + "-" + month + "-" + day + "T";
    var sH = "";
    var eH = "";
    if (this.newEventStartAmPm === "AM") {
      sH = (this.newEventStartHour).toString();
    }
    else {
      var sI = +(this.newEventStartHour);
      sH = (sI + 12).toString();
    }
    if (this.newEventEndAmPm === "AM") {
      eH = (this.newEventEndHour).toString();
    }
    else {
      var eI = +(this.newEventEndHour);
      eH = (eI + 12).toString();
    }

    s += sH + ":" + this.newEventStartMinute + ":000";
    e += eH + ":" + this.newEventEndMinute + ":000";*/
    this.reset();
  }
  bookNow(): void {
    this.reset();
    this.bookEvent = true;
  }
  cancelEvent(event: Event): void {
    this.reset();
    this.cancellation = true;
  }

  cancelPage_no(): void {
    this.reset();
  }
  cancelPage_yes(): void {
    this.reset();
  }
  consolidate_events(): void {
    console.log("Consolidating events");
    var consolidate = true;
    var i = this.events.length - 1;
    //console.log(i.toString());
    while (consolidate) {
      if (i > 0) {
        if (this.events[i].Subject === this.events[i - 1].Subject) {
          this.events[i - 1].End = new Date(this.events[i].End.getDate());
          this.events.pop();
          i = this.events.length - 1;
        }
        else {
          i--;
        }
        if (i == 0) {
          consolidate = false;
          break;
        }
      }
      else {
        break;
      }
    }
  }
  currentMeeting() {
    var now = new Date();
    for (var i = 0; i < this.events.length; i++) {
      if ((new Date(this.events[i].Start) <= now) && (new Date(this.events[i].End) >= now)) {
        this.currentEvent = this.events[i];
        console.log(this.currentEvent);
        return;
      }
    }
    this.currentEvent = null;
    console.log(this.currentEvent);
  }
  /*getTimePeriod(d:Date): number {
    var t = new Date(d.getDate());
    var msIn15Min: number = 900000;
    var secondsInADay: number = 24 * 60 * 60;
    var hours: number = t.getHours() * 60 * 60;
    var minutes: number = t.getMinutes() * 60;
    var seconds: number = t.getSeconds();
    var ms: number = (hours + minutes + seconds) * 1000;
    var t1: number = t.getTime();
    t.setHours(0);
    t.setMinutes(0);
    t.setSeconds(0);
    var t2 = t.getTime();
    var ret = 0;
    ret = Math.floor((t1 - t2) / msIn15Min);
    return ret;
  }*/
  currentTimePeriod(): number { // Return time period (0<x<96) for current time
    var now = new Date();
    var msIn15Min: number = 900000;
    var secondsInADay: number = 24 * 60 * 60;
    var hours: number = now.getHours() * 60 * 60;
    var minutes: number = now.getMinutes() * 60;
    var seconds: number = now.getSeconds();
    var ms: number = (hours + minutes + seconds) * 1000;
    var t1: number = now.getTime();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    var t2 = now.getTime();
    var ret = 0;
    ret = Math.floor((t1 - t2) / msIn15Min);
    return ret;
  }

  deriveVariablesFromHostname(res: Resource): void {
    var buildingAndRoom = hostname.split(" ", 2);
    var building = buildingAndRoom[0];
    var room = buildingAndRoom[1];

    res.id = building + "-" + room;
    res.busy = false;
    res.name = building + " " + room;
    res.o365Name = res.id;
  }
  durationString(selectedEvent): string {
    var duration = "";
    var Date_Start = new Date(selectedEvent.start);
    var Date_End = new Date(selectedEvent.end);
    var Difference = Date_End.valueOf() - Date_Start.valueOf();
    var diffDays = Math.floor(Difference / 86400000); // days
    var diffHrs = Math.floor((Difference % 86400000) / 3600000); // hours
    var diffMins = Math.round(((Difference % 86400000) % 3600000) / 60000); // minutes
    if (diffMins > 0) {
      duration = diffMins.toString() + " Minutes"
    }
    if (diffHrs > 0) {
      duration = diffHrs + " Hours " + duration;
    }
    return (duration);
  }
  evalTime(): void {
    if (this.currentEvent != null) {
      this.occupied = true;
    }
    else {
      this.occupied = false;
    }

    this.unoccupied = !(this.occupied);
  }
  helpClick(): void {
    this.helpPressed = true;
    this.startScreenResetTimeout(10);
  }
  helpInformationRequest(): void {
    this.resetModal();
    // show information;
  }
  helpRequest(): void {
    this.helpPressed = false;
    this.helpRequested = true;
    var resp = this.http.post(environment.slack_webhook_url, "{\"text\":\"Help request from " + this.resource.name + "\"}").subscribe();
    //console.log(resp);

    this.startScreenResetTimeout(3);
  }
  modalTimerCallback(): void {
    if (this.modalTransitionTimerCounter <= this.modalTimeout) {
      this.modalTransitionTimerCounter++;
    } else {
      this.subscribeHelpTimer();
      this.resetModal();
    }
  }
  onSelect(event: Event): void {
    this.selectedEvent = event;
  }
  onStartChange(selectedStartOption): void {
    var i = Number(selectedStartOption) + 1;
    this.newEventEndTimeId = i.toString();
  }
  percent(): void {
    setInterval(function() {
      var secondsInADay = 24 * 60 * 60;
      var now = new Date();
      var hours = now.getHours() * 60 * 60;
      var minutes = now.getMinutes() * 60;
      var seconds = now.getSeconds();
      var totalSeconds = hours + minutes + seconds;
      var percentSeconds = 100 * totalSeconds / secondsInADay;
      this.percentOfDayExpended = percentSeconds;
    }, 1000);
  }
  refreshData(): void {
    this.events = [];
    var url = 'http://' + ip + ':5000/v1.0/exchange/calendar/events';
    this.http.get(url).subscribe(data => {
      angular.forEach(data, function(obj) {
        var e = new Event();
        e.Subject = obj.subject;
        e.Start = obj.start;
        e.End = obj.end;
        this.events.push(e);
      }, this);
    });

    /*  for (var i = 0; i < this.timeSlots.length; i++) {
        var e = new Event();
        e.Subject = "Available";
        e.Start = this.timeSlots[i].Start;
        e.End = this.timeSlots[i].End;
        this.events.push(e);
      }
      this.consolidate_events();*/
    this.currentMeeting();
    console.log(this.events);
    console.log(this.currentEvent);
  }
  reset(): void {
    this.cancellation = false;
    this.showAgenda = false;
    this.bookEvent = false;

    this.newEventEndTimeId = null;
    this.newEventStartTimeId = null;
  }
  resetModal(): void {
    this.helpPressed = false;
    this.helpRequested = false;
    var m = document.getElementsByClassName("modalContent");
    for (var mChild in m) {
      setTimeout(function() {
        var m = document.getElementsByClassName("modal")[0];
        m.classList.add("hidden");
      }, 2000,this);
    }
  }
  resetTransitionTimer(): void {
    this.transitionTimer.delTimer('modalTransition');
  }
  scheduleEvent(): void {
    this.reset();
    this.startScreenResetTimeout(10);
    //this.refreshData();
    this.showAgenda = true;
  }
  scrollReferenceEvent(elem): void {
    var a = document.getElementById("agenda");
    var t = document.getElementById("current-time-bar-wrapper");
    a.scrollTop = elem.scrollTop;
    t.scrollTop = elem.scrollTop;
  }
  scrollAgendaEvent(elem): void {
    var a = document.getElementById("refHours");
    var t = document.getElementById("current-time-bar-wrapper");
    a.scrollTop = elem.scrollTop;
    t.scrollTop = elem.scrollTop;
  }
  selectByClass(selector: string): HTMLCollectionOf<Element> {
    var elements = document.getElementsByClassName(selector);
    return elements;
  }
  selectById(selector: string): HTMLElement {
    var element = document.getElementById(selector);
    return element;
  }
  startScreenResetTimeout(ttl): void { //ttl in s
    var t = ttl * 1000; //convert s to ms
    var that = this;
    this.stopScreenResetTimeout();
    this.currentTimeout = setTimeout(function(){
      that.reset();
    },t);
  }
  stopScreenResetTimeout(): void {
    if (this.currentTimeout != null) {
      clearTimeout(this.currentTimeout);
    }
  }
  submitEvent(tmpSubject: string, tmpStartTime: string, tmpEndTime: string): void {
    var req: Event = new Event();
    req.Subject = tmpSubject;
    req.End = new Date(tmpEndTime);
    req.Start = new Date(tmpStartTime);
    /////////
    ///  SUBMIT
    ///////

    this.refreshData();
  }
  subscribeHelpTimer(): void {
    if (this.modalTransitionTimerID) {
      // Unsubscribe if timer Id is defined
      this.transitionTimer.unsubscribe(this.modalTransitionTimerID);
      this.modalTransitionTimerCounter = 0;
    } else {
      // Subscribe if timer Id is undefined
      this.modalTransitionTimerID = this.transitionTimer.subscribe('modalTransition', () => this.modalTimerCallback());
    }
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
