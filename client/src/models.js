//@flow


export class Issue {
    title: string
    content: string
    image: string
    status: number
    date: string

    constructor(title: string, content: string, image: string, status: number, date: string){
        this.title = title
        this.content = content
        this.image = image
        this.status = status
        this.date = date
    }
}