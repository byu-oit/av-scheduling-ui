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
  //dateTimeValue: string;
  //hour: number;
  //minute: number;
  milliseconds: number;
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

const quarterTimeIncrements: TimeIncrement[] = [{"id":1,"value":"12:00 AM","milliseconds":0},{"id":2,"value":"12:15 AM","milliseconds":900000},{"id":3,"value":"12:30 AM","milliseconds":1800000},{"id":4,"value":"12:45 AM","milliseconds":2700000},{"id":5,"value":"01:00 AM","milliseconds":3600000},{"id":6,"value":"01:15 AM","milliseconds":4500000},{"id":7,"value":"01:30 AM","milliseconds":5400000},{"id":8,"value":"01:45 AM","milliseconds":6300000},{"id":9,"value":"02:00 AM","milliseconds":7200000},{"id":10,"value":"02:15 AM","milliseconds":8100000},{"id":11,"value":"02:30 AM","milliseconds":9000000},{"id":12,"value":"02:45 AM","milliseconds":9900000},{"id":13,"value":"03:00 AM","milliseconds":10800000},{"id":14,"value":"03:15 AM","milliseconds":11700000},{"id":15,"value":"03:30 AM","milliseconds":12600000},{"id":16,"value":"03:45 AM","milliseconds":13500000},{"id":17,"value":"04:00 AM","milliseconds":14400000},{"id":18,"value":"04:15 AM","milliseconds":15300000},{"id":19,"value":"04:30 AM","milliseconds":16200000},{"id":20,"value":"04:45 AM","milliseconds":17100000},{"id":21,"value":"05:00 AM","milliseconds":18000000},{"id":22,"value":"05:15 AM","milliseconds":18900000},{"id":23,"value":"05:30 AM","milliseconds":19800000},{"id":24,"value":"05:45 AM","milliseconds":20700000},{"id":25,"value":"06:00 AM","milliseconds":21600000},{"id":26,"value":"06:15 AM","milliseconds":22500000},{"id":27,"value":"06:30 AM","milliseconds":23400000},{"id":28,"value":"06:45 AM","milliseconds":24300000},{"id":29,"value":"07:00 AM","milliseconds":25200000},{"id":30,"value":"07:15 AM","milliseconds":26100000},{"id":31,"value":"07:30 AM","milliseconds":27000000},{"id":32,"value":"07:45 AM","milliseconds":27900000},{"id":33,"value":"08:00 AM","milliseconds":28800000},{"id":34,"value":"08:15 AM","milliseconds":29700000},{"id":35,"value":"08:30 AM","milliseconds":30600000},{"id":36,"value":"08:45 AM","milliseconds":31500000},{"id":37,"value":"09:00 AM","milliseconds":32400000},{"id":38,"value":"09:15 AM","milliseconds":33300000},{"id":39,"value":"09:30 AM","milliseconds":34200000},{"id":40,"value":"09:45 AM","milliseconds":35100000},{"id":41,"value":"10:00 AM","milliseconds":36000000},{"id":42,"value":"10:15 AM","milliseconds":36900000},{"id":43,"value":"10:30 AM","milliseconds":37800000},{"id":44,"value":"10:45 AM","milliseconds":38700000},{"id":45,"value":"11:00 AM","milliseconds":39600000},{"id":46,"value":"11:15 AM","milliseconds":40500000},{"id":47,"value":"11:30 AM","milliseconds":41400000},{"id":48,"value":"11:45 AM","milliseconds":42300000},{"id":49,"value":"12:00 PM","milliseconds":43200000},{"id":50,"value":"12:15 PM","milliseconds":44100000},{"id":51,"value":"12:30 PM","milliseconds":45000000},{"id":52,"value":"12:45 PM","milliseconds":45900000},{"id":53,"value":"01:00 PM","milliseconds":3600000},{"id":54,"value":"01:15 PM","milliseconds":4500000},{"id":55,"value":"01:30 PM","milliseconds":5400000},{"id":56,"value":"01:45 PM","milliseconds":6300000},{"id":57,"value":"02:00 PM","milliseconds":7200000},{"id":58,"value":"02:15 PM","milliseconds":8100000},{"id":59,"value":"02:30 PM","milliseconds":9000000},{"id":60,"value":"02:45 PM","milliseconds":9900000},{"id":61,"value":"03:00 PM","milliseconds":10800000},{"id":62,"value":"03:15 PM","milliseconds":11700000},{"id":63,"value":"03:30 PM","milliseconds":12600000},{"id":64,"value":"03:45 PM","milliseconds":13500000},{"id":65,"value":"04:00 PM","milliseconds":14400000},{"id":66,"value":"04:15 PM","milliseconds":15300000},{"id":67,"value":"04:30 PM","milliseconds":16200000},{"id":68,"value":"04:45 PM","milliseconds":17100000},{"id":69,"value":"05:00 PM","milliseconds":18000000},{"id":70,"value":"05:15 PM","milliseconds":18900000},{"id":71,"value":"05:30 PM","milliseconds":19800000},{"id":72,"value":"05:45 PM","milliseconds":20700000},{"id":73,"value":"06:00 PM","milliseconds":21600000},{"id":74,"value":"06:15 PM","milliseconds":22500000},{"id":75,"value":"06:30 PM","milliseconds":23400000},{"id":76,"value":"06:45 PM","milliseconds":24300000},{"id":77,"value":"07:00 PM","milliseconds":25200000},{"id":78,"value":"07:15 PM","milliseconds":26100000},{"id":79,"value":"07:30 PM","milliseconds":27000000},{"id":80,"value":"07:45 PM","milliseconds":27900000},{"id":81,"value":"08:00 PM","milliseconds":28800000},{"id":82,"value":"08:15 PM","milliseconds":29700000},{"id":83,"value":"08:30 PM","milliseconds":30600000},{"id":84,"value":"08:45 PM","milliseconds":31500000},{"id":85,"value":"09:00 PM","milliseconds":32400000},{"id":86,"value":"09:15 PM","milliseconds":33300000},{"id":87,"value":"09:30 PM","milliseconds":34200000},{"id":88,"value":"09:45 PM","milliseconds":35100000},{"id":89,"value":"10:00 PM","milliseconds":36000000},{"id":90,"value":"10:15 PM","milliseconds":36900000},{"id":91,"value":"10:30 PM","milliseconds":37800000},{"id":92,"value":"10:45 PM","milliseconds":38700000},{"id":93,"value":"11:00 PM","milliseconds":39600000},{"id":94,"value":"11:15 PM","milliseconds":40500000},{"id":95,"value":"11:30 PM","milliseconds":41400000},{"id":96,"value":"11:45 PM","milliseconds":42300000}]

const halfTimeIncrements: TimeIncrement[] = [{"id":1,"value":"12:00 AM","milliseconds":0},{"id":2,"value":"12:15 AM","milliseconds":900000},{"id":3,"value":"12:30 AM","milliseconds":1800000},{"id":4,"value":"12:45 AM","milliseconds":2700000},{"id":5,"value":"01:00 AM","milliseconds":3600000},{"id":6,"value":"01:15 AM","milliseconds":4500000},{"id":7,"value":"01:30 AM","milliseconds":5400000},{"id":8,"value":"01:45 AM","milliseconds":6300000},{"id":9,"value":"02:00 AM","milliseconds":7200000},{"id":10,"value":"02:15 AM","milliseconds":8100000},{"id":11,"value":"02:30 AM","milliseconds":9000000},{"id":12,"value":"02:45 AM","milliseconds":9900000},{"id":13,"value":"03:00 AM","milliseconds":10800000},{"id":14,"value":"03:15 AM","milliseconds":11700000},{"id":15,"value":"03:30 AM","milliseconds":12600000},{"id":16,"value":"03:45 AM","milliseconds":13500000},{"id":17,"value":"04:00 AM","milliseconds":14400000},{"id":18,"value":"04:15 AM","milliseconds":15300000},{"id":19,"value":"04:30 AM","milliseconds":16200000},{"id":20,"value":"04:45 AM","milliseconds":17100000},{"id":21,"value":"05:00 AM","milliseconds":18000000},{"id":22,"value":"05:15 AM","milliseconds":18900000},{"id":23,"value":"05:30 AM","milliseconds":19800000},{"id":24,"value":"05:45 AM","milliseconds":20700000},{"id":25,"value":"06:00 AM","milliseconds":21600000},{"id":26,"value":"06:15 AM","milliseconds":22500000},{"id":27,"value":"06:30 AM","milliseconds":23400000},{"id":28,"value":"06:45 AM","milliseconds":24300000},{"id":29,"value":"07:00 AM","milliseconds":25200000},{"id":30,"value":"07:15 AM","milliseconds":26100000},{"id":31,"value":"07:30 AM","milliseconds":27000000},{"id":32,"value":"07:45 AM","milliseconds":27900000},{"id":33,"value":"08:00 AM","milliseconds":28800000},{"id":34,"value":"08:15 AM","milliseconds":29700000},{"id":35,"value":"08:30 AM","milliseconds":30600000},{"id":36,"value":"08:45 AM","milliseconds":31500000},{"id":37,"value":"09:00 AM","milliseconds":32400000},{"id":38,"value":"09:15 AM","milliseconds":33300000},{"id":39,"value":"09:30 AM","milliseconds":34200000},{"id":40,"value":"09:45 AM","milliseconds":35100000},{"id":41,"value":"10:00 AM","milliseconds":36000000},{"id":42,"value":"10:15 AM","milliseconds":36900000},{"id":43,"value":"10:30 AM","milliseconds":37800000},{"id":44,"value":"10:45 AM","milliseconds":38700000},{"id":45,"value":"11:00 AM","milliseconds":39600000},{"id":46,"value":"11:15 AM","milliseconds":40500000},{"id":47,"value":"11:30 AM","milliseconds":41400000},{"id":48,"value":"11:45 AM","milliseconds":42300000},{"id":49,"value":"12:00 PM","milliseconds":43200000},{"id":50,"value":"12:15 PM","milliseconds":44100000},{"id":51,"value":"12:30 PM","milliseconds":45000000},{"id":52,"value":"12:45 PM","milliseconds":45900000},{"id":53,"value":"01:00 PM","milliseconds":3600000},{"id":54,"value":"01:15 PM","milliseconds":4500000},{"id":55,"value":"01:30 PM","milliseconds":5400000},{"id":56,"value":"01:45 PM","milliseconds":6300000},{"id":57,"value":"02:00 PM","milliseconds":7200000},{"id":58,"value":"02:15 PM","milliseconds":8100000},{"id":59,"value":"02:30 PM","milliseconds":9000000},{"id":60,"value":"02:45 PM","milliseconds":9900000},{"id":61,"value":"03:00 PM","milliseconds":10800000},{"id":62,"value":"03:15 PM","milliseconds":11700000},{"id":63,"value":"03:30 PM","milliseconds":12600000},{"id":64,"value":"03:45 PM","milliseconds":13500000},{"id":65,"value":"04:00 PM","milliseconds":14400000},{"id":66,"value":"04:15 PM","milliseconds":15300000},{"id":67,"value":"04:30 PM","milliseconds":16200000},{"id":68,"value":"04:45 PM","milliseconds":17100000},{"id":69,"value":"05:00 PM","milliseconds":18000000},{"id":70,"value":"05:15 PM","milliseconds":18900000},{"id":71,"value":"05:30 PM","milliseconds":19800000},{"id":72,"value":"05:45 PM","milliseconds":20700000},{"id":73,"value":"06:00 PM","milliseconds":21600000},{"id":74,"value":"06:15 PM","milliseconds":22500000},{"id":75,"value":"06:30 PM","milliseconds":23400000},{"id":76,"value":"06:45 PM","milliseconds":24300000},{"id":77,"value":"07:00 PM","milliseconds":25200000},{"id":78,"value":"07:15 PM","milliseconds":26100000},{"id":79,"value":"07:30 PM","milliseconds":27000000},{"id":80,"value":"07:45 PM","milliseconds":27900000},{"id":81,"value":"08:00 PM","milliseconds":28800000},{"id":82,"value":"08:15 PM","milliseconds":29700000},{"id":83,"value":"08:30 PM","milliseconds":30600000},{"id":84,"value":"08:45 PM","milliseconds":31500000},{"id":85,"value":"09:00 PM","milliseconds":32400000},{"id":86,"value":"09:15 PM","milliseconds":33300000},{"id":87,"value":"09:30 PM","milliseconds":34200000},{"id":88,"value":"09:45 PM","milliseconds":35100000},{"id":89,"value":"10:00 PM","milliseconds":36000000},{"id":90,"value":"10:15 PM","milliseconds":36900000},{"id":91,"value":"10:30 PM","milliseconds":37800000},{"id":92,"value":"10:45 PM","milliseconds":38700000},{"id":93,"value":"11:00 PM","milliseconds":39600000},{"id":94,"value":"11:15 PM","milliseconds":40500000},{"id":95,"value":"11:30 PM","milliseconds":41400000},{"id":96,"value":"11:45 PM","milliseconds":42300000}]

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
  //events: Event[] = [];
  amPm = AMPM;
  bookEvent: boolean;
  calendarWorkdayEndHour: number;
  calendarWorkdayStartHour: number;
  cancellation: boolean;
  currentEvent: Event;
  date: Date;
  eventinprogress: boolean;
  events = EVENTS;
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
  refHours = refHours;
  resource = RESOURCE;
  scheduleNow: boolean;
  selectedEvent: Event;
  timeIncrements = halfTimeIncrements;
  timeIncrement = 30; // minutes to increment select boxes by
  title = 'Room Scheduler';
  todayMillis: number;
  unoccupied: boolean;
  validTimeIncrements = this.timeIncrements;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    document.addEventListener("touchstart", function(){}, true);

    for (var i=0; i<this.validTimeIncrements.length; i++){
      this.evalTime(new Date());
    }

    this.utcTime();
    this.todayMillis = this.dayMilis();
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
    this.unoccupied = !(this.occupied);

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
  dayMilis(): number {
    var d = new Date();
    var t = d.getTime() - (d.getHours()*3600000)+(d.getMinutes()*60000)+(d.getSeconds()*1000)+(d.getMilliseconds());
    return t;
  }
  evalTime(time: Date): void {
    var t = this.todayMillis + this.validTimeIncrements[0].milliseconds;
    if (time.getTime() > t) {
      this.validTimeIncrements.shift(); // Remove first time increment
    }
  }

  onSelect(event: Event): void {
    this.selectedEvent = event;
  }
  utcTime(): void {
    setInterval(() => {         //replaced function() by ()=>
      this.date = new Date();
      this.evalTime(this.date); // update validTimeIncrements
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
