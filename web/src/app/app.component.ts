import { Component } from '@angular/core';

export class Event {
  //odata_etag: string;
  id: string;
  subject: string;
  start: StartEndTime;
  end: StartEndTime;
  location: Location;
}
export class StartEndTime{
  dateTime: Date;
  timeZone: string;
}
export class Location {
  displayName: string;
}
export class Resource {
  id: string;
  busy: boolean;
  name: string;
}

const RESOURCE: Resource = {
  id: "ITB-1109",
  busy: false,
  name: "ITB 1109"
}

const EVENTS: Event[] = [
  {
    //odata_etag: "W/\"kal774q57USEnNvMn5Fi3gAAA7Zpzg==\"",
    id: "AAMkAGYyOWNlMTE5LTIwMjgtNGEwZC1iMDBhLTRkNDE2MDZmMGNkMABGAAAAAACvXGSow_mFT5i0N4qoQmUZBwAjYARZJafSQaeN02GBwVpfAAAAAAENAACRqXvvirntRISc28yfkWLeAAADthwEAAA=",
    subject: "Dan's meeting",
    start: {
      dateTime: new Date("2017-09-28T04:00:00.0000000"),
      timeZone: "UTC"
    },
    end: {
      dateTime:  new Date("2017-09-28T04:30:00.0000000"),
      timeZone: "UTC"
    },
    location: {
      displayName: "itb-1109"
    }
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  events = EVENTS;
  resource = RESOURCE;
  selectedEvent: Event;
  date: Date;
  occupied: boolean;
  unoccupied: boolean;
  cancellation: boolean;
  scheduleNow: boolean;
  bookEvent: boolean;
  currentEvent: boolean;

  ngOnInit(): void {
    this.utcTime();
    this.occupied = this.resource.busy;
    this.unoccupied = !(this.occupied)
    this.currentEvent = false;

    this.cancellation = false;
    this.scheduleNow = false;
    this.bookEvent = false;
  }
  onSelect(event: Event): void {
    this.selectedEvent = event;
  }
  utcTime(): void {
    setInterval(() => {         //replaced function() by ()=>
      this.date = new Date();
    }, 1000);
  }

  reset(): void {
    this.cancellation = false;
    this.scheduleNow = false;
    this.bookEvent = false;
  }

  cancelEvent(event: Event): void {
    this.cancellation = true;
  }
  bookNow(): void {
    this.bookEvent = true;
  }

  scheduleEvent(): void {
    this.scheduleNow = true;
  }
}
