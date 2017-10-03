import { Component } from '@angular/core';

export class Event {
  id: string;
  subject: string;
  start: StartEndTime;
  end: StartEndTime;
  location: Location;
}
export class StartEndTime{
  dateTime: string;
  timeZone: string;
}
export class Location {
  displayName: string;
}
export class Resource {
  id: string;
  busy: boolean;
  name: string;
  o365Name: string;
}

export class EventBody {
  contentType: string;
  content: string;
}

type attendeeType  =  "required" | "optional";

export class emailAddressDetail {
  address: string;
  name: string;
}

export class Attendee {
  emailAddress: emailAddressDetail;
  type: attendeeType;
}

export class NewEventRequest {
  subject: string;
  body: EventBody;
  start: StartEndTime
  end: StartEndTime;
  location: { displayName:string };
  attendees: Attendee[] = [DEFAULTATTENDEE]
}

const HOURS: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const MINUTES: string[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
const AMPM: string[] = ["AM","PM"]

declare var newEvent: Event;

const NOEVENTS_MESSAGES: string[] = ["No Events Today","Your schedule is clear","My schedule is wide open"]

const RESOURCE: Resource = {
  id: "ITB-1109",
  busy: false,
  name: "ITB 1109",
  o365Name: "ITB-1109"
}

const EVENTS: Event[] = [
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwNAAA=",
            "subject": "Super secret, uber important meeting between AV Management regarding the future of all",
            "start": {
                "dateTime": "2017-10-02T20:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-02T22:00:00.0000000",
                "timeZone": "UTC"
            },
            "location": {
                "displayName": "ITB-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAADV2YEL_ZdnT5PBuKemHdHAAAK1ZLqKAAA=",
            "subject": "Test",
            "start": {
                "dateTime": "2017-10-02T14:30:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-02T15:00:00.0000000",
                "timeZone": "UTC"
            },
            "location": {
              "displayName": "ITB-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAADV2YEL_ZdnT5PBuKemHdHAAAK1ZLqJAAA=",
            "subject": "Lunch Meeting",
            "start": {
                "dateTime": "2017-10-02T18:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-02T19:00:00.0000000",
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
                "dateTime": "2017-10-02T17:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-02T18:00:00.0000000",
                "timeZone": "UTC"
            },
            "location": {
              "displayName": "ITB-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwJAAA=",
            "subject": "AV Engineering Meeting",
            "start": {
                "dateTime": "2017-10-02T15:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-02T16:00:00.0000000",
                "timeZone": "UTC"
            },
            "location": {
                "displayName": "ITB-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwHAAA=",
            "subject": "This was submitted via Postman",
            "start": {
                "dateTime": "2017-10-01T20:00:00.0002702",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-01T20:30:00.0002702",
                "timeZone": "UTC"
            },
            "location": {
              "displayName": "ITB-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwGAAA=",
            "subject": "This was submitted via Postman",
            "start": {
                "dateTime": "2017-09-29T19:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-09-29T19:30:00.0000000",
                "timeZone": "UTC"
            },
            "location": {
                "displayName": "ITB-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwEAAA=",
            "subject": "Dan's meeting",
            "start": {
                "dateTime": "2017-09-28T04:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-09-28T04:30:00.0000000",
                "timeZone": "UTC"
            },
            "location": {
                "displayName": "itb-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAADV2YEL_ZdnT5PBuKemHdHAAAD9qKjsAAA=",
            "subject": "tesst",
            "start": {
                "dateTime": "2017-09-28T00:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-09-28T00:30:00.0000000",
                "timeZone": "UTC"
            },
            "location": {
              "displayName": "ITB-1109"
            }
        },
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAADV2YEL_ZdnT5PBuKemHdHAAAK1ZLqIAAA=",
            "subject": "Test",
            "start": {
                "dateTime": "2017-09-27T21:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-09-27T21:30:00.0000000",
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
export class AppComponent {
  title = 'app';
  resource = RESOURCE;
  //events: Event[] = [];
  events = EVENTS;
  selectedEvent: Event;
  date: Date;
  occupied: boolean;
  unoccupied: boolean;
  cancellation: boolean;
  scheduleNow: boolean;
  bookEvent: boolean;
  currentEvent: Event;
  eventinprogress: boolean;
  newEvent: Event;
  hours = HOURS;
  minutes = MINUTES;
  amPm = AMPM;
  newEventStartHour: number;
  newEventStartMinute: number;
  newEventStartAmPm: string;
  newEventEndHour: number;
  newEventEndMinute: number;
  newEventEndAmPm: string;

  ngOnInit(): void {
    this.utcTime();
    //this.occupied = this.resource.busy;
    this.occupied = true;
    this.unoccupied = !(this.occupied)
    this.currentEvent = this.events[4];

    this.cancellation = false;
    this.scheduleNow = false;
    this.bookEvent = false;
    this.selectedEvent = null;
    //this.eventinprogress = ( this.currentEvent === null ? true : false );
    this.eventinprogress = false;
    this.newEvent = null;
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
    alert("start: " + s +"; end: " + e);
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
