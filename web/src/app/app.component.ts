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

export class timeIncrement {
  id: number;
  value: string;
  dateTimeValue: string;
}

const HOURS: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const MINUTES: string[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
const AMPM: string[] = ["AM","PM"]
const quarterTimeIncrements: timeIncrement[] = [{"id":1,"value":"12:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":2,"value":"12:15 AM","dateTimeValue":"00:15:00.000Z"},{"id":3,"value":"12:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":4,"value":"12:45 AM","dateTimeValue":"00:45:00.000Z"},{"id":5,"value":"01:00 AM","dateTimeValue":"01:00:00.000Z"},{"id":6,"value":"01:15 AM","dateTimeValue":"01:15:00.000Z"},{"id":7,"value":"01:30 AM","dateTimeValue":"01:30:00.000Z"},{"id":8,"value":"01:45 AM","dateTimeValue":"01:45:00.000Z"},{"id":9,"value":"02:00 AM","dateTimeValue":"02:00:00.000Z"},{"id":10,"value":"02:15 AM","dateTimeValue":"02:15:00.000Z"},{"id":11,"value":"02:30 AM","dateTimeValue":"02:30:00.000Z"},{"id":12,"value":"02:45 AM","dateTimeValue":"02:45:00.000Z"},{"id":13,"value":"03:00 AM","dateTimeValue":"03:00:00.000Z"},{"id":14,"value":"03:15 AM","dateTimeValue":"03:15:00.000Z"},{"id":15,"value":"03:30 AM","dateTimeValue":"03:30:00.000Z"},{"id":16,"value":"03:45 AM","dateTimeValue":"03:45:00.000Z"},{"id":17,"value":"04:00 AM","dateTimeValue":"04:00:00.000Z"},{"id":18,"value":"04:15 AM","dateTimeValue":"04:15:00.000Z"},{"id":19,"value":"04:30 AM","dateTimeValue":"04:30:00.000Z"},{"id":20,"value":"04:45 AM","dateTimeValue":"04:45:00.000Z"},{"id":21,"value":"05:00 AM","dateTimeValue":"05:00:00.000Z"},{"id":22,"value":"05:15 AM","dateTimeValue":"05:15:00.000Z"},{"id":23,"value":"05:30 AM","dateTimeValue":"05:30:00.000Z"},{"id":24,"value":"05:45 AM","dateTimeValue":"05:45:00.000Z"},{"id":25,"value":"06:00 AM","dateTimeValue":"06:00:00.000Z"},{"id":26,"value":"06:15 AM","dateTimeValue":"06:15:00.000Z"},{"id":27,"value":"06:30 AM","dateTimeValue":"06:30:00.000Z"},{"id":28,"value":"06:45 AM","dateTimeValue":"06:45:00.000Z"},{"id":29,"value":"07:00 AM","dateTimeValue":"07:00:00.000Z"},{"id":30,"value":"07:15 AM","dateTimeValue":"07:15:00.000Z"},{"id":31,"value":"07:30 AM","dateTimeValue":"07:30:00.000Z"},{"id":32,"value":"07:45 AM","dateTimeValue":"07:45:00.000Z"},{"id":33,"value":"08:00 AM","dateTimeValue":"08:00:00.000Z"},{"id":34,"value":"08:15 AM","dateTimeValue":"08:15:00.000Z"},{"id":35,"value":"08:30 AM","dateTimeValue":"08:30:00.000Z"},{"id":36,"value":"08:45 AM","dateTimeValue":"08:45:00.000Z"},{"id":37,"value":"09:00 AM","dateTimeValue":"09:00:00.000Z"},{"id":38,"value":"09:15 AM","dateTimeValue":"09:15:00.000Z"},{"id":39,"value":"09:30 AM","dateTimeValue":"09:30:00.000Z"},{"id":40,"value":"09:45 AM","dateTimeValue":"09:45:00.000Z"},{"id":41,"value":"10:00 AM","dateTimeValue":"10:00:00.000Z"},{"id":42,"value":"10:15 AM","dateTimeValue":"10:15:00.000Z"},{"id":43,"value":"10:30 AM","dateTimeValue":"10:30:00.000Z"},{"id":44,"value":"10:45 AM","dateTimeValue":"10:45:00.000Z"},{"id":45,"value":"11:00 AM","dateTimeValue":"11:00:00.000Z"},{"id":46,"value":"11:15 AM","dateTimeValue":"11:15:00.000Z"},{"id":47,"value":"11:30 AM","dateTimeValue":"11:30:00.000Z"},{"id":48,"value":"11:45 AM","dateTimeValue":"11:45:00.000Z"},{"id":49,"value":"12:00 PM","dateTimeValue":"12:00:00.000Z"},{"id":50,"value":"12:15 PM","dateTimeValue":"12:15:00.000Z"},{"id":51,"value":"12:30 PM","dateTimeValue":"12:30:00.000Z"},{"id":52,"value":"12:45 PM","dateTimeValue":"12:45:00.000Z"},{"id":53,"value":"01:00 PM","dateTimeValue":"13:00:00.000Z"},{"id":54,"value":"01:15 PM","dateTimeValue":"13:15:00.000Z"},{"id":55,"value":"01:30 PM","dateTimeValue":"13:30:00.000Z"},{"id":56,"value":"01:45 PM","dateTimeValue":"13:45:00.000Z"},{"id":57,"value":"02:00 PM","dateTimeValue":"14:00:00.000Z"},{"id":58,"value":"02:15 PM","dateTimeValue":"14:15:00.000Z"},{"id":59,"value":"02:30 PM","dateTimeValue":"14:30:00.000Z"},{"id":60,"value":"02:45 PM","dateTimeValue":"14:45:00.000Z"},{"id":61,"value":"03:00 PM","dateTimeValue":"15:00:00.000Z"},{"id":62,"value":"03:15 PM","dateTimeValue":"15:15:00.000Z"},{"id":63,"value":"03:30 PM","dateTimeValue":"15:30:00.000Z"},{"id":64,"value":"03:45 PM","dateTimeValue":"15:45:00.000Z"},{"id":65,"value":"04:00 PM","dateTimeValue":"16:00:00.000Z"},{"id":66,"value":"04:15 PM","dateTimeValue":"16:15:00.000Z"},{"id":67,"value":"04:30 PM","dateTimeValue":"16:30:00.000Z"},{"id":68,"value":"04:45 PM","dateTimeValue":"16:45:00.000Z"},{"id":69,"value":"05:00 PM","dateTimeValue":"17:00:00.000Z"},{"id":70,"value":"05:15 PM","dateTimeValue":"17:15:00.000Z"},{"id":71,"value":"05:30 PM","dateTimeValue":"17:30:00.000Z"},{"id":72,"value":"05:45 PM","dateTimeValue":"17:45:00.000Z"},{"id":73,"value":"06:00 PM","dateTimeValue":"18:00:00.000Z"},{"id":74,"value":"06:15 PM","dateTimeValue":"18:15:00.000Z"},{"id":75,"value":"06:30 PM","dateTimeValue":"18:30:00.000Z"},{"id":76,"value":"06:45 PM","dateTimeValue":"18:45:00.000Z"},{"id":77,"value":"07:00 PM","dateTimeValue":"19:00:00.000Z"},{"id":78,"value":"07:15 PM","dateTimeValue":"19:15:00.000Z"},{"id":79,"value":"07:30 PM","dateTimeValue":"19:30:00.000Z"},{"id":80,"value":"07:45 PM","dateTimeValue":"19:45:00.000Z"},{"id":81,"value":"08:00 PM","dateTimeValue":"20:00:00.000Z"},{"id":82,"value":"08:15 PM","dateTimeValue":"20:15:00.000Z"},{"id":83,"value":"08:30 PM","dateTimeValue":"20:30:00.000Z"},{"id":84,"value":"08:45 PM","dateTimeValue":"20:45:00.000Z"},{"id":85,"value":"09:00 PM","dateTimeValue":"21:00:00.000Z"},{"id":86,"value":"09:15 PM","dateTimeValue":"21:15:00.000Z"},{"id":87,"value":"09:30 PM","dateTimeValue":"21:30:00.000Z"},{"id":88,"value":"09:45 PM","dateTimeValue":"21:45:00.000Z"},{"id":89,"value":"10:00 PM","dateTimeValue":"22:00:00.000Z"},{"id":90,"value":"10:15 PM","dateTimeValue":"22:15:00.000Z"},{"id":91,"value":"10:30 PM","dateTimeValue":"22:30:00.000Z"},{"id":92,"value":"10:45 PM","dateTimeValue":"22:45:00.000Z"},{"id":93,"value":"11:00 PM","dateTimeValue":"23:00:00.000Z"},{"id":94,"value":"11:15 PM","dateTimeValue":"23:15:00.000Z"},{"id":95,"value":"11:30 PM","dateTimeValue":"23:30:00.000Z"},{"id":96,"value":"11:45 PM","dateTimeValue":"23:45:00.000Z"}]
const halfTimeIncrements: timeIncrement[] = [{"id":1,"value":"12:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":2,"value":"12:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":3,"value":"-11:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":4,"value":"-11:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":5,"value":"-10:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":6,"value":"-10:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":7,"value":"-9:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":8,"value":"-9:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":9,"value":"-8:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":10,"value":"-8:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":11,"value":"-7:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":12,"value":"-7:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":13,"value":"-6:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":14,"value":"-6:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":15,"value":"-5:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":16,"value":"-5:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":17,"value":"-4:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":18,"value":"-4:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":19,"value":"-3:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":20,"value":"-3:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":21,"value":"10:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":22,"value":"10:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":23,"value":"11:00 AM","dateTimeValue":"00:00:00.000Z"},{"id":24,"value":"11:30 AM","dateTimeValue":"00:30:00.000Z"},{"id":25,"value":"12:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":26,"value":"12:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":27,"value":"1:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":28,"value":"1:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":29,"value":"2:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":30,"value":"2:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":31,"value":"3:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":32,"value":"3:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":33,"value":"4:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":34,"value":"4:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":35,"value":"5:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":36,"value":"5:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":37,"value":"6:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":38,"value":"6:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":39,"value":"7:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":40,"value":"7:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":41,"value":"8:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":42,"value":"8:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":43,"value":"9:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":44,"value":"9:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":45,"value":"10:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":46,"value":"10:30 PM","dateTimeValue":"00:30:00.000Z"},{"id":47,"value":"11:00 PM","dateTimeValue":"00:00:00.000Z"},{"id":48,"value":"11:30 PM","dateTimeValue":"00:30:00.000Z"}]

declare var newEvent: Event;

const NOEVENTS_MESSAGES: string[] = ["No Events Today","Your schedule is clear","My schedule is wide open"]

const RESOURCE: Resource = {
  id: "ITB-1109",
  busy: false,
  name: "ITB 1109",
  o365Name: "ITB-1109"
}

//dev events
const EVENTS: Event[] = [
        {
            "id": "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwNAAA=",
            "subject": "Super secret, uber important meeting between AV Manage...",
            "start": {
                "dateTime": "2017-10-04T20:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-04T22:00:00.0000000",
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
                "dateTime": "2017-10-04T14:30:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-04T15:00:00.0000000",
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
                "dateTime": "2017-10-04T18:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-04T19:00:00.0000000",
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
                "dateTime": "2017-10-04T17:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-04T18:00:00.0000000",
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
                "dateTime": "2017-10-04T15:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2017-10-04T16:00:00.0000000",
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
    this.currentEvent = this.events[0];
    //this.currentEvent = null;

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
