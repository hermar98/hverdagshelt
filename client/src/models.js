//@flow


export class Issue {
    title: string
    content: string
    image: string
    date: string

    constructor(title: string, content: string, image: string, date: string){
        this.title = title
        this.content = content
        this.image = image
        this.date = date
    }
}