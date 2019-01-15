//@flow

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  rank: number;
  munId: number;
  password: string;

  /*constructor (userId: number, firstName: string, lastName: string, email: string, rank: number, hash: string, salt: string) {
        this.userId = userId
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.rank = rank
        this.hash = hash
        this.salt = salt
    }*/
}

export class Issue {
  issueId: number;
  title: string;
  content: string;
  image: string;
  longitude: number;
  latitude: number;
  status: number;
  categoryId: number;

  /*constructor(issueId: number, title: string, content: string, image: string, longitude: number, latitude: number, status: number, date: Date){
        this.issueId = issueId
        this.title = title
        this.content = content
        this.image = image
        this.longitude = longitude
        this.latitude = latitude
        this.status = status
        this.date = date
    }*/
}

export class IssueCategory {
  categoryId: number;
  name: string;

  /*constructor (categoryId: number, name: string) {
        this.categoryId = categoryId
        this.name = name
    }*/
}

export class Event {
  eventId: number;
  title: string;
  content: string;
  image: string;
  longitude: number;
  latitude: number;
  timeStart: string;
  timeEnd: string;
  categoryId: number;

  /*constructor (    eventId: number, title: string, content: string, image: string, longitude: number, latitude: number, timeStart: string, timeEnd: string) {
        this.eventId = eventId
        this.title = title
        this.content = content
        this.image = image
        this.longitude = longitude
        this.latitude = latitude
        this.timeStart = timeStart
        this.timeEnd = timeEnd
    }*/
}

export class EventCategory {
  categoryId: number;
  name: string;

  /*constructor (categoryId: number, name: string) {
        this.categoryId = categoryId
        this.name = name
    }*/
}

export class Municipal {
  munId: number;
  name: string;

  /*
    constructor( munId: number, title: string){
        this.munId = munId;
        this.title = title;
    }
     */
}

export class UserMunicipal {
  userId: number;
  munId: number;
}

export class Feedback {
  feedbackId: number;
  name: string;
  content: string;
  date: Date;
  userId: number;
  issueId: number;
  user: User;
}
