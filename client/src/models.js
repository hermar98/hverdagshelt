//@flow

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  rank: number;
  hash: string;
  salt: string;

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
  date: Date; //Works with string, unsure about date convertion

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
  event_id: number;
  title: string;
  content: string;
  image: string;
  longitude: number;
  latitude: number;
  time_start: string;
  time_end: string;

  /*constructor (    event_id: number, title: string, content: string, image: string, longitude: number, latitude: number, time_start: string, time_end: string) {
        this.event_id = event_id
        this.title = title
        this.content = content
        this.image = image
        this.longitude = longitude
        this.latitude = latitude
        this.time_start = time_start
        this.time_end = time_end
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
    mun_id: number;
    name: string;

    /*
    constructor( mun_id: number, title: string){
        this.mun_id = mun_id;
        this.title = title;
    }
     */
}