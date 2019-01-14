//@flow

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  rank: number;
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
    mun_id: number;
    name: string;

    /*
    constructor( mun_id: number, title: string){
        this.mun_id = mun_id;
        this.title = title;
    }
     */
}

export class Feedback {
    feedback_id: number
    name: string
    content: string
    date: Date
    user_id: number
    issue_id: number
    user: User
}