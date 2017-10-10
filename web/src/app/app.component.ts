import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
//import * as data from './config.json';

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

export class NewEventRequest {
  subject: string;
  body: EventBody;
  start: StartEndTime
  end: StartEndTime;
  location: { displayName: string };
  attendees: Attendee[] = [DEFAULTATTENDEE]
}

export class Resource {
  id: string;
  busy: boolean;
  name: string;
  o365Name: string;
}

export class StartEndTime {
  dateTime: string;
  timeZone: string;
}

export class TimeIncrement {
  id: number;
  value: string;
  dateTimeValue: string;
  hour: number;
  minute: number;
}

const RESOURCE: Resource = {
  id: "ITB-1109",
  name: "ITB 1109",
  o365Name: "ITB-1109",
  busy: false
}
//const hostname = (<any>data).hostname;
const hostname = "ITB-1109-SP1"
const refHours: string[] = ["8","9","10","11","12","1","2","3","4","5","6","7","8"]
const HOURS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
const MINUTES: string[] = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]
const AMPM: string[] = ["AM", "PM"]
const halfTimeIncrements: TimeIncrement[] = [{ "id": 1, "value": "12:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 12, "minute": 0 }, { "id": 2, "value": "12:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 12, "minute": 30 }, { "id": 3, "value": "11:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 1, "minute": 0 }, { "id": 4, "value": "11:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 1, "minute": 30 }, { "id": 5, "value": "10:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 2, "minute": 0 }, { "id": 6, "value": "10:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 2, "minute": 30 }, { "id": 7, "value": "9:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 3, "minute": 0 }, { "id": 8, "value": "9:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 3, "minute": 30 }, { "id": 9, "value": "8:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 4, "minute": 0 }, { "id": 10, "value": "8:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 4, "minute": 30 }, { "id": 11, "value": "7:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 5, "minute": 0 }, { "id": 12, "value": "7:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 5, "minute": 30 }, { "id": 13, "value": "6:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 6, "minute": 0 }, { "id": 14, "value": "6:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 6, "minute": 30 }, { "id": 15, "value": "5:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 7, "minute": 0 }, { "id": 16, "value": "5:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 7, "minute": 30 }, { "id": 17, "value": "4:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 8, "minute": 0 }, { "id": 18, "value": "4:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 8, "minute": 30 }, { "id": 19, "value": "3:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 9, "minute": 0 }, { "id": 20, "value": "3:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 9, "minute": 30 }, { "id": 21, "value": "10:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 10, "minute": 0 }, { "id": 22, "value": "10:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 10, "minute": 30 }, { "id": 23, "value": "11:00 AM", "dateTimeValue": "00:00:00.000Z", "hour": 11, "minute": 0 }, { "id": 24, "value": "11:30 AM", "dateTimeValue": "00:30:00.000Z", "hour": 11, "minute": 30 }, { "id": 25, "value": "12:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 12, "minute": 0 }, { "id": 26, "value": "12:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 12, "minute": 30 }, { "id": 27, "value": "1:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 13, "minute": 0 }, { "id": 28, "value": "1:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 13, "minute": 30 }, { "id": 29, "value": "2:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 14, "minute": 0 }, { "id": 30, "value": "2:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 14, "minute": 30 }, { "id": 31, "value": "3:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 15, "minute": 0 }, { "id": 32, "value": "3:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 15, "minute": 30 }, { "id": 33, "value": "4:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 16, "minute": 0 }, { "id": 34, "value": "4:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 16, "minute": 30 }, { "id": 35, "value": "5:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 17, "minute": 0 }, { "id": 36, "value": "5:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 17, "minute": 30 }, { "id": 37, "value": "6:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 18, "minute": 0 }, { "id": 38, "value": "6:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 18, "minute": 30 }, { "id": 39, "value": "7:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 19, "minute": 0 }, { "id": 40, "value": "7:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 19, "minute": 30 }, { "id": 41, "value": "8:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 20, "minute": 0 }, { "id": 42, "value": "8:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 20, "minute": 30 }, { "id": 43, "value": "9:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 21, "minute": 0 }, { "id": 44, "value": "9:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 21, "minute": 30 }, { "id": 45, "value": "10:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 22, "minute": 0 }, { "id": 46, "value": "10:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 22, "minute": 30 }, { "id": 47, "value": "11:00 PM", "dateTimeValue": "00:00:00.000Z", "hour": 23, "minute": 0 }, { "id": 48, "value": "11:30 PM", "dateTimeValue": "00:30:00.000Z", "hour": 23, "minute": 30 }];

declare var newEvent: Event;

const NOEVENTS_MESSAGES: string[] = ["No Events Today", "Your schedule is clear", "My schedule is wide open"]

//dev events
const EVENTS: Event[] = [
  {
      "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwNAAA=",
      "subject": "AV Services Team Meeting",
      "start": {
          "dateTime": "2017-10-10T20:00:00.0000000",
          "timeZone": "UTC"
      },
      "end": {
          "dateTime": "2017-10-10T22:00:00.0000000",
          "timeZone": "UTC"
      },
      "location": {
          "displayName": "ITB-1109"
      }
  },
  {
      "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAADV2YEL_ZdnT5PBuKemHdHAAAK1ZLqKAAA=",
      "subject": "OIT All-hands meeting",
      "start": {
          "dateTime": "2017-10-10T14:30:00.0000000",
          "timeZone": "UTC"
      },
      "end": {
          "dateTime": "2017-10-10T15:00:00.0000000",
          "timeZone": "UTC"
      },
      "location": {
        "displayName": "ITB-1109"
      }
  },
  {
      "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwKAAA=",
      "subject": "AWS Certification Training",
      "start": {
          "dateTime": "2017-10-10T17:00:00.0000000",
          "timeZone": "UTC"
      },
      "end": {
          "dateTime": "2017-10-10T18:00:00.0000000",
          "timeZone": "UTC"
      },
      "location": {
        "displayName": "ITB-1109"
      }
  }
    ]

const DEFAULTATTENDEE: Attendee = {
  emailAddress: {
    address: "itb-1109@byu.edu",
    name: "ITB-1109"
  },
  type: "required"
}

const TIMEZONE = "Mountain Standard Time";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  amPm = AMPM;
  bookEvent: boolean;
  calendarWorkdayEndHour: number;
  calendarWorkdayStartHour: number;
  cancellation: boolean;
  currentEvent: Event;

  date: Date;
  eventinprogress: boolean;
  events = EVENTS;
  //events: Event[] = [];
  hours = HOURS;
  minutes = MINUTES;
  newEvent: Event;
  newEventEndAmPm: string;
  newEventEndHour: number;
  newEventEndMinute: number;
  newEventEndTime: string;
  newEventStartAmPm: string;
  newEventStartHour: number;
  newEventStartMinute: number;
  newEventStartTime: string;
  occupied: boolean;
  resource = RESOURCE;
  scheduleNow: boolean;
  selectedEvent: Event;
  timeIncrements = halfTimeIncrements;
  title = 'app';
  unoccupied: boolean;
  validTimeIncrements: TimeIncrement[] = [];
  refHours = refHours;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    document.addEventListener("touchstart", function(){}, true);

    this.utcTime();
    //this.deriveVariablesFromHostname(this.resource);

    //this.currentEvent = null;
    //this.eventinprogress = ( this.currentEvent === null ? true : false );
    //this.occupied = this.resource.busy;
    this.bookEvent = false;
    this.calendarWorkdayEndHour = 5;
    this.calendarWorkdayStartHour = 8;
    this.cancellation = false;
    this.currentEvent = this.events[1];
    this.eventinprogress = false;
    this.newEvent = null;
    this.occupied = true;
    this.scheduleNow = false;
    this.selectedEvent = null;
    this.unoccupied = !(this.occupied)


    //Calculate valid time increments to display
    /*
    for (var i=0; i < this.timeIncrements.length; i++){
      var tmp = this.timeIncrements[i];
      if (tmp.hour >= this.calendarWorkdayStartHour && tmp.hour <= this.calendarWorkdayEndHour){
        this.validTimeIncrements.push(tmp);
      }
    }
    alert(this.validTimeIncrements);*/
  }

  onSelect(event: Event): void {
    this.selectedEvent = event;
  }
  utcTime(): void {
    setInterval(() => {         //replaced function() by ()=>
      this.date = new Date();
    }, 1000);
  }

  refreshData(): void {

  }

  getCurrentEvent(): void {

  }

  helpClick(): void {
    alert("help clicked");
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

    var startTime: StartEndTime = new StartEndTime();
    var endTime: StartEndTime = new StartEndTime();
    var req: NewEventRequest = new NewEventRequest();

    endTime.timeZone = TIMEZONE;
    startTime.timeZone = TIMEZONE;

    startTime.dateTime = tmpStartTime;
    endTime.dateTime = tmpEndTime;

    newEvent.start = startTime;
    newEvent.end = endTime;

    req.start = startTime;
    req.end = endTime;
    req.subject = tmpSubject;

    /////////
    ///  SUBMIT
    ///////

    this.refreshData();
  }

  reset(): void {
    this.cancellation = false;
    this.scheduleNow = false;
    this.bookEvent = false;
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
    //this.reset();
    var d = new Date();
    this.bookEvent = true;
    this.newEvent = new Event();
    var year = d.getFullYear().toString();
    var month = d.getMonth().toString();
    var day = d.getDay().toString();
    var s = "" + year + "-" + month + "-" + day +"T";
    var e = "" + year + "-" + month + "-" + day +"T";
    var sH = "";
    var eH = "";
    if (this.newEventStartAmPm === "AM")
    {
      sH = (this.newEventStartHour).toString();
    }
    else{
      var sI = +(this.newEventStartHour);
      sH = (sI + 12).toString();
    }
    if (this.newEventEndAmPm === "AM")
    {
      eH = (this.newEventEndHour).toString();
    }
    else {
      var eI = +(this.newEventEndHour);
      eH = (eI + 12).toString();
    }

    s += sH + ":" + this.newEventStartMinute + ":000";
    e += eH + ":" + this.newEventEndMinute + ":000";
    //alert("start: " + s +"; end: " + e);
    this.reset();
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
    if (diffMins > 0){
      duration = diffMins.toString() + " Minutes"
    }
    if (diffHrs > 0){
      duration = diffHrs + " Hours " + duration;
    }
    return(duration);
  }
}
