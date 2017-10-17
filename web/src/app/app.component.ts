import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { SimpleTimer } from 'ng2-simple-timer';
//import { HelpModal } from './helpModal';

import { environment } from '../environments/environment';
import {Event, Timeslot} from './model/o365.model';
//import * as data from './config.json';
/*
type AttendeeType = "required" | "optional";

export class Attendee {
  emailAddress: EmailAddressDetail;
  type: AttendeeType;
}

export class EmailAddressDetail {
  address: string;
  name: string;
}

export class Event {
  id: string;
  subject: string;
  start: StartEndTime;
  end: StartEndTime;
  location: Location;
}

export class EventBody {
  contentType: string;
  content: string;
}

export class Location {
  displayName: string;
}
*/

export class Resource {
  id: string;
  busy: boolean;
  name: string;
  o365Name: string;
}
/*
export class StartEndTime {
  dateTime: string;
  timeZone: string;
}*/

export class TimeIncrement {
  id: number;
  value: string;
  dateTimeValue: Date;
  //milliseconds: number;
}

const RESOURCE: Resource = {
  id: environment.hostname,
  name: environment.resource_name,
  o365Name: environment.resource_id,
  busy: false
}
//const hostname = (<any>data).hostname;
const hostname = environment.hostname;
//const refHours: string[] = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8"];
const refHours: string[] = ["8", "9", "11", "1", "4"];
const HOURS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const MINUTES: string[] = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]
const AMPM: string[] = ["AM", "PM"]

declare var newEvent: Event;

const NOEVENTS_MESSAGES: string[] = ["No Events Today", "Your schedule is clear", "My schedule is wide open"]

/*const EVENTS: Event[] = [{
  "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAAKQ-TBAAA=",
  "subject": "Time Reporting",
  "start": {
    "dateTime": "2017-10-13T08:00:00.0000000",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2017-10-13T09:00:00.0000000",
    "timeZone": "UTC"
  },
  "location": {
    "displayName": ""
  }
},
{
  "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAAKQ-TAAAA=",
  "subject": "Lunch",
  "start": {
    "dateTime": "2017-10-13T09:00:00.0000000",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2017-10-13T10:00:00.0000000",
    "timeZone": "UTC"
  },
  "location": {
    "displayName": ""
  }
},
{
  "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAAKQ-S-AAA=",
  "subject": "Devotional",
  "start": {
    "dateTime": "2017-10-13T11:00:00.0000000",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2017-10-13T01:00:00.0000000",
    "timeZone": "UTC"
  },
  "location": {
    "displayName": ""
  }
},
{
  "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAAKQ-S_AAA=",
  "subject": "Show and  Tell",
  "start": {
    "dateTime": "2017-10-13T01:00:00.0000000",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2017-10-13T04:00:00.0000000",
    "timeZone": "UTC"
  },
  "location": {
    "displayName": ""
  }
}
]
*/
/*
const DEFAULTATTENDEE: Attendee = {
  emailAddress: {
    address: "itb-1109@byu.edu",
    name: "ITB-1109"
  },
  type: "required"
}*/

const TIMEZONE = environment.timeZone;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  transitionTimer: SimpleTimer;

  //events: Event[] = [];
  amPm = AMPM;
  bookEvent: boolean;
  calendarWorkdayEndHour: number;
  calendarWorkdayStartHour: number;
  cancellation: boolean;
  currentEvent: Event;
  timePeriod: Timeslot;
  date: Date;
  dayMillis: number;
  timeOptions = {
    hour: "2-digit", minute: "2-digit"
  };
  eventinprogress: boolean;
  //events = EVENTS;
  events: Event[] = [];
  helpRequested: boolean;
  helpPressed: boolean;
  hours = HOURS;
  LOCALE = "en-us";
  modalTransitionTimerCounter = 0;
  modalTransitionTimerID = "modalTransitionTimer";
  modalTimeout = environment.popupWindowTimeout;
  minutes = MINUTES;
  newEvent: Event;
  newEventTitle: string;
  newEventEndTimeId: string;
  newEventStartTimeId: string;
  occupied: boolean;
  refHours = refHours;
  resource = RESOURCE;
  scheduleNow: boolean;
  selectedEvent: Event;
  selectedStartValue: number;
  timeIncrement = 30; // minutes to increment select boxes by
  timeSlots: Timeslot[] = [];
  title = 'Room Scheduler';
  //todayMillis: number;
  schedulingWindow = 5; // minutes after a time window start time when the resource still be scheduled
  unoccupied: boolean;
  validTimeIncrements: TimeIncrement[] = [];
  percentOfDayExpended: number;

  //constructor( @Inject(DOCUMENT) private document: Document) { }
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
    for (var j=0; j<96; j++){
      var tmpTime = new Date();
      var t2 = 0;
      if (j<96){
        t2 = j+1;
      }
      else {
        t2 = j;
      }
      var t = new Timeslot();
      tmpTime.setMinutes(j*15);

      t.Start = tmpTime;
      tmpTime.setMinutes(t2*15);
      t.End = tmpTime;

      this.timeSlots.push(t);
      tmpTime = null;
    }



    //this.deriveVariablesFromHostname(this.resource);

    //this.currentEvent = null;
    //this.eventinprogress = ( this.currentEvent === null ? true : false );
    //this.occupied = this.resource.busy;
    this.bookEvent = false;
    this.cancellation = false;
    this.currentEvent = null;
    this.calendarWorkdayEndHour = 17;
    this.calendarWorkdayStartHour = 8;
    //this.currentEvent = this.events[1];
    this.eventinprogress = false;
    this.helpRequested = false;
    this.helpPressed = false;
    this.newEvent = null;
    this.occupied = false;
    this.scheduleNow = false;
    this.selectedEvent = null;
    this.selectedStartValue = 0;
    this.unoccupied = !(this.occupied);

    for (var i = this.calendarWorkdayStartHour; i <= this.calendarWorkdayEndHour; i++){
      if (i > 12){
        var iNum = +i;
        var nNum = iNum - 12 ;

        this.refHours.push(nNum.toString());
      }
      else {
        this.refHours.push(i.toString());
      }
      var newDate = new Date()
      newDate.setHours(i);
    }


  }

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
    ret = Math.floor((t1-t2) / msIn15Min);
    return ret;
  }

  resetTransitionTimer(): void {
    this.transitionTimer.delTimer('modalTransition');
  }

  percent(): void {
    setInterval(function () {
    var secondsInADay = 24 * 60 * 60;
    var now = new Date();
    var hours = now.getHours() * 60 * 60;
    var minutes = now.getMinutes() * 60;
    var seconds = now.getSeconds();
    var totalSeconds = hours + minutes + seconds;
    var percentSeconds = 100 * totalSeconds/secondsInADay;
    this.percentOfDayExpended = percentSeconds;
    }, 1000);
  }

  evalTime(time: Date): void {
    //var timeDiff =
  }
  helpRequest(): void {
    var resp = this.http.post(environment.slack_webhook_url, "{\"text\":\"Help request from " + this.resource.name + "\"}").subscribe();
    console.log(resp);
  }

  onSelect(event: Event): void {
    this.selectedEvent = event;
  }
  utcTime(): void {
    setInterval(() => {
      this.date = new Date();
      this.timePeriod = this.timeSlots[this.currentTimePeriod()];
    }, 1000);
  }

  refreshData(): void {

  }

  getCurrentEvent(): void {

  }

  helpClick(): void {
    this.helpRequested = true;
    this.transitionTimer.newTimer('modalTransition',1);
		this.subscribeHelpTimer();
  }

  subscribeHelpTimer(){
    if (this.modalTransitionTimerID) {
			// Unsubscribe if timer Id is defined
			this.transitionTimer.unsubscribe(this.modalTransitionTimerID);
      this.modalTransitionTimerCounter = 0;
		} else {
			// Subscribe if timer Id is undefined
			this.modalTransitionTimerID = this.transitionTimer.subscribe('modalTransition', () => this.modalTimerCallback());
		}
  }

  modalTimerCallback(): void {
    if (this.modalTransitionTimerCounter <= this.modalTimeout){
    	this.modalTransitionTimerCounter++;
    } else {
      this.subscribeHelpTimer();
      this.resetModal();
    }
  }

  resetModal(): void {
    this.helpPressed = false;
    this.helpRequested = false;
    /*var m = document.getElementsByClassName("modal");
    for (var mChild in m) {
      setTimeout(function() {
        var m = document.getElementsByClassName("modal")[0];
        m.classList.add("hidden");
        }, 2000);
      }*/
  }
  helpInformationRequest(): void {
    this.resetModal();
    // show information;
  }
  sendHelp(): void {
    this.resetModal();
    //send help
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

  deriveVariablesFromHostname(res: Resource): void {
    var buildingAndRoom = hostname.split(" ", 2);
    var building = buildingAndRoom[0];
    var room = buildingAndRoom[1];

    res.id = building + "-" + room;
    res.busy = false;
    res.name = building + " " + room;
    res.o365Name = res.id;
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

  reset(): void {
    this.cancellation = false;
    this.scheduleNow = false;
    this.bookEvent = false;

    this.newEventEndTimeId = null;
    this.newEventStartTimeId = null;
  }

  cancelEvent(event: Event): void {
    this.reset();
    this.cancellation = true;
  }
  bookNow(): void {
    this.reset();
    this.bookEvent = true;
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
  onStartChange(selectedStartOption): void {
    var i = Number(selectedStartOption) + 1;
    this.newEventEndTimeId = i.toString();
  }
  scheduleEvent(): void {
    this.reset();
    this.scheduleNow = true;
  }
  cancelPage_no(): void {
    this.reset();
  }
  cancelPage_yes(): void {
    this.reset();
  }
  durationString(selectedEvent): string {
    var duration = "";
    var Date_Start = new Date(selectedEvent.start.dateTime);
    var Date_End = new Date(selectedEvent.end.dateTime);
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
  selectByClass(selector: string): HTMLCollectionOf<Element> {
    var elements = document.getElementsByClassName(selector);
    return elements;
  }
  selectById(selector: string): HTMLElement {
    var element = document.getElementById(selector);
    return element;
  }
}
