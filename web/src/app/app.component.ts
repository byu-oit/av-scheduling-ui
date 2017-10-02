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

declare var newEvent: Event;

const NOEVENTS_MESSAGES: string[] = ["No Events Today","Your schedule is clear","My schedule is wide open"]

const RESOURCE: Resource = {
  id: "ITB-1109",
  busy: false,
  name: "ITB 1109",
  o365Name: "ITB-1109"
}

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
  events: Event[] = [];
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

  ngOnInit(): void {
    this.utcTime();
    this.occupied = this.resource.busy;
    this.unoccupied = !(this.occupied)
    this.currentEvent = null;

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
    this.newEvent = new Event();
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
}
