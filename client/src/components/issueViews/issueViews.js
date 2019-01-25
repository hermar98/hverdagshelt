import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {Redirect} from 'react-router-dom'
import { Feedback} from '../../models/Feedback';
import {User} from "../../models/User";
import {Issue} from "../../models/Issue";
import {userService} from "../../services/UserService";
import {issueService} from "../../services/IssueService";
import {issueCategoryService} from "../../services/IssueCategoryService";
import {feedbackService} from "../../services/FeedbackService";
import {municipalService} from "../../services/MunicipalService";
import {SimpleMap} from "../map/map";
import {imageService} from "../../services/ImageService";

let sharedFeedback = sharedComponentData({feedback: []});

let formatDate = function (date: Date) {
    if(date != null) {
        let str: string = date;
        str = str.substring(0, str.length - 8);
        str = str.replace("T", " KL. ");
        return str;
    }
    return;
}


/*
Large view of an issue, which includes the title, content, image and status.
 */
export class IssueLarge extends Component<{match: {params: {issueId: number, munId: number}}}> {

    constructor (props) {
        super(props);
        this.statusSelect = React.createRef();
        this.addFeedbackButton = React.createRef();
        this.addFeedbackForm = React.createRef();
        this.bodyRef = React.createRef();
        this.state = {
            clickedStatus: false,
            clickedDelete: false
        }
    }

    issue = new Issue();
    images: [] = [];
    feedbackContent: string = '';
    categoryName: string = '';
    munName: string = '';
    issueText: string = '';
    user: User = new User();
    rank: number = -1;

    lat: number = 0;
    long: number = 0;

    render() {
        if(!this.state.clickedStatus && this.statusSelect.current != null) {
            this.statusSelect.current.classList.add('show-issue')
        }else if(this.statusSelect.current != null){
            this.statusSelect.current.classList.remove('show-issue')
        }

        if(this.state.clickedDelete){
            this.setState({
                clickedDelete: false
            });
            return <Redirect to={"/kommune/" + this.props.match.params.munId + "/issues"} />
        }

        return (
            <div>
                <div className="issue-container">
                    <Status status={this.issue.statusId} id={this.issue.issueId}/>
                    <div className="issue-large">
                        <div className="">
                            <div className="card d-flex flex-row">
                                <div className="card-body issue-large-card">
                                    <div className="d-flex flex-row">
                                        <p className="date date-large">{formatDate(this.issue.createdAt)}</p>
                                        <ButtonGroup onclickC={this.onEdit} onclickT={this.onDelete} id={this.issue.userId} status={this.issue.statusId}/>
                                        <StatusButton status={this.issue.statusId} onclick={() => {
                                            let rank = 0;
                                            userService.getCurrentUser()
                                                .then(user => {
                                                    rank = user.rank;
                                                    if(rank === 3) {
                                                        this.setState({
                                                            clickedStatus: !this.state.clickedStatus
                                                        })
                                                    }
                                                })
                                                .catch(error => console.error("Error: ", error))
                                        }}/>
                                    </div>
                                    <div className="d-flex flex-row justify-content-end">
                                        <div className="status-selection" ref={this.statusSelect}>
                                            <StatusButton status={1} onclick={() => this.onClick(1)} />
                                            <StatusButton status={2} onclick={() => this.onClick(2)} />
                                            <StatusButton status={3} onclick={() => this.onClick(3)} />
                                            <StatusButton status={4} onclick={() => this.onClick(4)} />
                                        </div>
                                    </div>
                                    <p className="date date-large">{this.munName + " Kommune"}</p>
                                    <h5>{this.categoryName}</h5>
                                    <div className="card-text" ref={this.bodyRef}>
                                        <p id="issue-large-text">{this.issue.content}</p>
                                    </div>
                                </div>
                                <div className="issue-map-container">
                                    <SimpleMap lat={this.lat} lng={this.long}/>
                                </div>
                            </div>
                            <div className="issue-images">
                                <h4>&nbsp;Bilder</h4>
                                <div className="flex-container">
                                    {this.images.map(image => {
                                        return <img className="issue-image" src={image.imageSource} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="feedback-title">Oppdateringer</h4>
                    {sharedFeedback.feedback.map(feedback => {
                        return <IssueFeedback feedback={feedback} userId={this.issue.userId}/>
                    })}
                    <div className="feedback-button">
                        { this.renderAddButton() }
                    </div>
                    <div ref={this.addFeedbackForm} className="feedback-container show-issue">
                        <div className="form-group">
                            <textarea className="form-control" placeholder="skriv feedback..." rows={8} value={this.feedbackContent} onChange={
                                event => (this.feedbackContent = event.target.value)
                            } />
                        </div>
                            <HoverButton text="Send" onclick={() => this.onClickFeedback()} />
                    </div>
                </div>
            </div>
        )
    }

    mounted () {
        window.scrollTo(0, 0);
        issueService.getIssue(this.props.match.params.issueId)
            .then(issue => {
                this.issue = issue;
                this.lat = this.issue.latitude;
                this.long = this.issue.longitude;
                issueCategoryService.getCategory(this.issue.categoryId)
                    .then(category => {
                        this.categoryName = category.name
                    })
                    .catch(error => console.error("Error: ", error));
                municipalService.getMunicipal(this.issue.munId)
                    .then(mun => {
                        this.munName = mun.name
                    })
                    .catch(error => console.error("Error: ", error));
                console.log("id client: " + this.issue.issueId)
                imageService.getAllImage(this.issue.issueId)
                    .then(data => {
                        console.log(data.IssuePictures)
                        this.images = data.IssuePictures
                    })
                    .catch(error => console.error("Error: ", error))
            })
            .catch(error => console.error("Error: ", error));
        feedbackService.getFeedbacks(this.props.match.params.issueId)
            .then(data => {
                sharedFeedback.feedback = data;
            })
            .catch(error => console.error("Error: ", error));
        userService.getCurrentUser()
            .then(user => {
                this.user = user;
                this.rank = user.rank
            })
            .catch(error => console.error("Error: ", error));
        userService.getCurrentUser()
            .then(user => this.user = user)
            .catch(error => console.error("Error: ", error))
    }

    renderAddButton(){
        if (this.rank === 3 || this.user.userId === this.issue.userId) {
            return (
                <div>
                    <button ref={this.addFeedbackButton} className="btn" type="button"
                            onClick={() => {
                                this.addFeedbackButton.current.classList.add('show-issue')
                                this.addFeedbackForm.current.classList.remove('show-issue')
                                window.scrollBy(0, 250);
                            }}>
                        <img id="add-image-button" src="../../images/add.png"/>
                    </button>
                </div>
            )
        }else{
            return null
        }
    }

    onClick (val: number) {
        this.issue.statusId = val;
        issueService.updateIssue(this.issue)
            .then(res => {
                issueService.getIssue(this.issue.issueId)
                    .then(issue => {
                        this.issue = issue;
                        this.setState({clickedStatus: !this.state.clickedStatus})
                    })
                    .catch(error => console.error("Error: ", error))
            })
            .catch(error => console.error("Error"))
    }

    onClickFeedback () {
        let feedback = new Feedback();
        feedback.name = '';
        feedback.content = this.feedbackContent;
        feedback.issueId = this.issue.issueId;
        feedback.userId = this.user.userId;
        feedbackService.addFeedback(feedback)
            .then(res => {
                this.addFeedbackButton.current.classList.remove('show-issue')
                this.addFeedbackForm.current.classList.add('show-issue')
                feedbackService.getFeedbacks(this.props.match.params.issueId)
                    .then(data => {
                        sharedFeedback.feedback = data;
                    })
                    .catch(error => console.error("Error: ", error))
                this.feedbackContent = '';
            })
            .catch(error => console.error("Error: ", error))

    }

    onEdit() {
        this.issueText = this.issue.content
        let inp = document.createElement('textarea')
        let btn = document.createElement('button')
        let text = document.getElementById('issue-large-text')
        this.bodyRef.current.removeChild(text)
        inp.id = 'edit-input-feedback'
        inp.value = this.issueText
        inp.onchange = (event) => (this.issueText = event.target.value)
        inp.classList.add('form-control')
        btn.id = 'edit-button-feedback'
        btn.onclick = () => this.onEditComplete(inp, btn, text)
        btn.classList.add('btn')
        btn.innerHTML = "Endre"
        this.bodyRef.current.append(inp)
        this.bodyRef.current.append(btn)
    }

    onEditComplete (inp, btn, text) {
        this.issue.content = this.issueText
        issueService.updateIssue(this.issue)
            .then()
            .catch(error => console.error("Error: ", error))
        this.bodyRef.current.removeChild(inp)
        this.bodyRef.current.removeChild(btn)
        this.bodyRef.current.append(text)
    }

    onDelete() {
        if (confirm("Are you sure?")) {
            issueService.deleteIssue(this.issue.issueId)
                .then(res => {
                    this.setState({
                        clickedDelete: true
                    })
                })
                .catch(error => console.error("Error: ", error))
        }
    }
}

/*
A regular view of the issue, intended to be stacked.
Includes the title and the picture
 */
export class IssueNormal extends Component<{issue: Issue, munId: number}>{

    categoryName: string = '';

    render () {
        return (
            <div className="issue-normal issue-hover" issue={this.props.issue}>
                <a id="a-hover" href={"/#/saker/" + this.props.issue.issueId}>
                    <img src="../../images/arrowRightTrans.png" />
                </a>
                <div className="d-flex flex-row issue-flex">
                    <div className="issue-image-normal-container">
                        <img className="issue-image-normal" src={this.props.issue.image}/>
                    </div>
                    <div id="issue-normal-text">
                        <p id="issue-normal-content">{(this.props.issue.content).substring(0, 136) + " . . ."}</p>
                        <div>
                            <p id="date-normal" className="date">{formatDate(this.props.issue.createdAt)}</p>
                            <h5 id="issue-normal-title">
                                {this.categoryName}
                            </h5>
                        </div>
                    </div>
                    <p className="status-label">Status:&nbsp;&nbsp;</p>
                    <StatusImage status={this.props.issue.statusId} />
                </div>
            </div>
        )
    }

    mounted () {
        issueCategoryService.getCategory(this.props.issue.categoryId)
            .then(category => {
                this.categoryName = category.name
            })
            .catch(error => console.error("Error: ", error))
    }
}

/*
Small view of an issue that displays only the title and the status
 */
export class IssueSmall extends Component<{issue: Issue, munId: number}> {

    categoryName: string = '';
    munName: string = '';

    render() {
        return (
            <div className="issue-small issue-hover" issue={this.props.issue}>
                <a id="a-hover" href={"/#/saker/" + this.props.issue.issueId}>
                    <img src="../../images/arrowRightTrans.png" />
                </a>
                <div>
                    <div className="d-flex flex-row issue-flex justify-content-between">
                        <div className="view-text">
                            <h5>
                                {this.categoryName}
                            </h5>
                            <p className="cat-name">
                                {this.munName + " Kommune"}
                            </p>
                            <p className="date">{formatDate(this.props.issue.createdAt)}</p>
                        </div>
                        <p className="status-label">Status:&nbsp;&nbsp;</p>
                        <StatusImage status={this.props.issue.statusId} />
                    </div>
                </div>
            </div>
        )
    }

    mounted () {
        issueCategoryService.getCategory(this.props.issue.categoryId)
            .then(category => {
                this.categoryName = category.name
            })
            .catch(error => console.error("Error: ", error))
        municipalService.getMunicipal(this.props.issue.munId)
            .then(mun => {
                this.munName = mun.name
            })
            .catch(error => console.error("Error: ", error))
    }
}

/*
A list of issues in small view
 */
export class IssueOverviewSmall extends Component<{munId: number, issues: Issue[]}> {

    status: number = 0;
    timesort: number = 0;
    category: number = 0;
    categories: [] = [];

    render () {
      const hasIssues = this.props.issues.length != 0;
        return (
            <div>
                <div className="d-flex flex-row sort-box justify-content-between">
                    <div className="d-flex flex-row justify-content-start">
                        <div id="sort-push" className="form-group">
                            <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.status = event.target.value)}>
                                <option value={0}>Alle</option>
                                <option value={1}>Ikke påbegynt</option>
                                <option value={2}>Ikke behandlet</option>
                                <option value={3}>Under behandling</option>
                                <option value={4}>Behandlet</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control" value={this.category} onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.category = event.target.value)}>
                                <option value={0}>Alle</option>
                                {this.categories.map(cat => {
                                    return <option value={cat.categoryId}>{cat.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="statusSelect" value={this.timesort} onChange={(event): SyntheticInputEvent<HTMLInputElement> => {
                            this.timesort = event.target.value;
                            this.handleOnChange()
                        }}>
                            <option value={0}>Nyeste</option>
                            <option value={1}>Eldste</option>
                        </select>
                    </div>
                </div>
                <ul className="list-group issue-small-list">
                    {hasIssues ? (this.props.issues.map((issue,index) => {
                        if ((this.status == issue.statusId || this.status == 0) && (this.category == issue.categoryId || this.category == 0)) {
                            return(
                                <li key={index} className="list-group-item issue-small-item">
                                    <IssueSmall issue={issue} munId={this.props.munId}/>
                                </li>
                            )
                        }
                    }) ) : (
                      <li key={0}>
                          <div className="d-flex flex-row justify-content-center">
                             <p id="noIssues">Ingen saker</p>
                          </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    mounted (){
        window.scrollTo(0, 0);
        issueCategoryService.getCategories()
            .then(res => this.categories = res)
            .catch(error => console.error("Error: ", error))
    }

    handleOnChange () {
        if(this.timesort == 0) {
            this.props.issues.sort((a, b) => a.createdAt < b.createdAt)
        }else if (this.timesort == 1) {
            this.props.issues.sort((a, b) => a.createdAt > b.createdAt)
        }
    }
}

/*
A list of issues in normal view
 */
export class IssueOverviewNormal extends Component<{munId: number, issues: Issue[]}> {

    status: number = 0;
    timesort: number = 0;
    category: number = 0;
    categories: [] = []

    render () {
        return (
            <div>
                <div className="d-flex flex-row sort-box justify-content-between">
                    <div className="d-flex flex-row justify-content-start">
                        <div id="sort-push" className="form-group">
                            <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.status = event.target.value)}>
                                <option value={0}>Alle</option>
                                <option value={1}>Ikke behandlet</option>
                                <option value={2}>Under behandling</option>
                                <option value={3}>Behandlet</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control" value={this.category} onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.category = event.target.value)}>
                                <option value={0}>Alle</option>
                                {this.categories.map(cat => {
                                    return <option value={cat.categoryId}>{cat.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="statusSelect" value={this.timesort} onChange={(event): SyntheticInputEvent<HTMLInputElement> => {
                            this.timesort = event.target.value;
                            this.handleOnChange()
                        }}>
                            <option value={0}>Nyeste</option>
                            <option value={1}>Eldste</option>
                        </select>
                    </div>
                </div>
                <ul className="list-group">
                    {this.props.issues.map((issue,index) => {
                        if ((this.status == issue.statusId || this.status == 0) && (this.category == issue.categoryId || this.category == 0)) {
                            return(
                                <li key={index} className="issue-normal-item list-group-item">
                                    <IssueNormal issue={issue} munId={this.props.munId}/>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        )
    }

    mounted (){
        window.scrollTo(0, 0);
        issueCategoryService.getCategories()
            .then(res => this.categories = res)
            .catch(error => console.error("Error: ", error))
    }

    handleOnChange () {
        if(this.timesort == 0) {
            this.props.issues.sort((a, b) => a.createdAt < b.createdAt)
        }else if (this.timesort == 1) {
            this.props.issues.sort((a, b) => a.createdAt > b.createdAt)
        }
    }
}

/*
Widget for displaying a single feedback-card with name, date, profile-picture and content
 */
export class IssueFeedback extends Component<{feedback: Feedback, userId: number}> {

    constructor(props) {
        super(props)
        this.bodyRef = React.createRef()
    }

    user = new User()
    feedText: string = ''
    source: string  = ''

    render() {
        return (
            <div className="feedback" feedback={this.props.feedback}>
                <div className="card feedback-card">
                    <div id={"feedback-body " + this.props.feedback.feedbackId} className="card-body" ref={this.bodyRef}>
                        <div className="d-flex flex-row submitter">
                                <div className="p-2 profile-image-container">
                                    <img className="profile-image" src={this.source}/>
                                </div>
                                <div className="p-2 submitter-info"><h5 className="submitter-name">{this.user.firstName + ' ' + this.user.lastName}</h5><p className="date-small">{formatDate(this.props.feedback.createdAt)}</p></div>
                            <ButtonGroupFeedback onclickC={this.onEdit} onclickT={this.onDelete} id={this.props.feedback.userId} />
                        </div>
                        <div className="card-text feedback-text" id={"feedback-text " + this.props.feedback.feedbackId}>
                            {this.props.feedback.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    mounted () {
        console.log(this.props.feedback.userId)
        userService.getUser(this.props.feedback.userId)
            .then(user => {
                this.user = user
                console.log(this.user)
                switch(this.user.rank){
                    case 1: this.source = "../../images/private.png"; break;
                    case 2: this.source = "../../images/worker.png"; break;
                    case 3: this.source = "../../images/municipal.png"; break;
                    default: break;
                }
            })
            .catch(error => console.error("Error", error))
        this.feedText = this.props.feedback.content
    }

    onEdit() {
        if(this.user.userId == this.props.feedback.userId) {
            let inp = document.createElement('textarea')
            let btn = document.createElement('button')
            let text = document.getElementById('feedback-text ' + this.props.feedback.feedbackId)
            let parent = document.getElementById('feedback-body ' + this.props.feedback.feedbackId)
            parent.removeChild(text)
            inp.id = 'edit-input-feedback'
            inp.value = this.feedText
            inp.onchange = (event) => (this.feedText = event.target.value)
            inp.classList.add('form-control')
            btn.id = 'edit-button-feedback'
            btn.onclick = () => this.onEditComplete(inp, btn, text, parent)
            btn.classList.add('btn')
            btn.innerHTML = "Endre"
            parent.append(inp)
            parent.append(btn)
        }
    }

    onEditComplete (inp, btn, text, parent) {
        this.props.feedback.content = this.feedText
        feedbackService.updateFeedback(this.props.feedback)
            .then()
            .catch(error => console.error("Error: ", error))
        parent.removeChild(inp)
        parent.removeChild(btn)
        parent.append(text)
    }

    onDelete() {
        let rank = 0
        userService.getUser(this.props.userId)
            .then(user => rank = user.rank)
            .catch(error => console.error("Error: ", error))

        if(this.user.userId == this.props.feedback.userId) {
            if (confirm("Are you sure?")) {
                feedbackService.deleteFeedback(this.props.feedback.feedbackId)
                    .then(res => {
                        sharedFeedback.feedback.splice(sharedFeedback.feedback.indexOf(this.props.feedback), 1)
                    })
                    .catch(error => console.error("Error: ", error))
            }
        }
    }
}



/*
A colored status-bar. The number decides which status is rendered
 */
class Status extends Component<{status: number, id: number}> {
    render () {
        switch (this.props.status){
            case 1: return (
                <div className="status status-notstarted">
                    <h4>{"Ikke påbegynt"}</h4>
                </div>
            )
                break;
            case 2: return (
                    <div className="status status-blocked">
                        <h4>{"Ikke behandlet"}</h4>
                    </div>
                )
                break;
            case 3: return (
                    <div className="status status-pending">
                        <h4>{"Under behandling"}</h4>
                    </div>
            )
                break;
            case 4: return (
                    <div className="status status-finished">
                        <h4>{"Behandlet"}</h4>
                    </div>
            )
                break;
            default: return null; break;
        }
    }
}

/*
Widget for displaying the image of a status
 */
class StatusImage extends Component<{status: number}> {
    render () {
        switch (this.props.status){
            case 1: return (
                <div>
                    <img className="status-image" src="../../images/notStarted.png" />
                </div>
            )
            case 2: return (
                <div>
                    <img className="status-image" src="../../images/blockedTrans.png" />
                </div>
            )
                break;
            case 3: return (
                <img className="status-image" src="../../images/pendingTrans.png" />
            )
                break;
            case 4: return (
                <img className="status-image" src="../../images/finishedTrans.png" />
            )
                break;
            default: return null; break;
        }
    }
}


/*
An image-button with the image of a status
 */
class StatusButton extends Component<{status: number, onclick: function}> {
    render () {
        switch (this.props.status){
            case 1: return (
                <ImageButton source="../../images/notStarted.png" onclick={this.props.onclick}/>
            )
            case 2: return (
                <ImageButton source="../../images/blockedTrans.png" onclick={this.props.onclick}/>
            )
                break;
            case 3: return (
                <ImageButton source="../../images/pendingTrans.png" onclick={this.props.onclick}/>
            )
                break;
            case 4: return (
                <ImageButton source="../../images/finishedTrans.png" onclick={this.props.onclick}/>
            )
                break;
            default: return null; break;
        }
    }
}

/*
A button with an image and a function as arguments
 */
export class ImageButton extends Component<{source: string, onclick: function}> {
    render() {
        return(
            <button className="btn image-button" type="button" onClick={this.props.onclick} >
                <img id="image-button-image" src={this.props.source} />
            </button>
        )
    }
}

export class HoverButton extends Component<{id?: string, type?:string, onclick: function, text: string}> {
    render () {
        return (
                <button id={this.props.id ? this.props.id:''} type={this.props.type ? this.props.type:'button'} className="btn hover-button" onClick={this.props.onclick} >
                {this.props.text}
            </button>
        )
    }
}

export class ButtonGroup extends Component<{onclickC: function, onclickT: function, id: number, status: number}> {

    rank: number = -1
    user: User = new User()

    render() {
        if(this.rank == 3 || this.user.userId == this.props.id && this.props.status == 1 ) {
            return (
                <div className="options">
                    <ImageButton source="../../images/cog.png" onclick={this.props.onclickC}/>
                    <ImageButton source="../../images/trashcan.png" onclick={this.props.onclickT}/>
                </div>
            )
        }else if(this.user.userId == this.props.id ){
            return (
                <div className="options">
                    <ImageButton source="../../images/cog.png" onclick={this.props.onclickC}/>
                </div>
            )
        }else{
            return null
        }
    }

    mounted () {
        userService.getCurrentUser()
            .then(user => {
                this.user = user
                this.rank = user.rank
            })
            .catch(error => console.error("Error: ", error))
    }
}

export class ButtonGroupFeedback extends Component<{onclickC: function, onclickT: function, id: number}> {

    user: User = new User()

    render() {
        if(this.props.id == this.user.userId) {
            return (
                <div className="options">
                    <ImageButton source="../../images/cog.png" onclick={this.props.onclickC}/>
                    <ImageButton source="../../images/trashcan.png" onclick={this.props.onclickT}/>
                </div>
            )
        }else{
            return null
        }
    }

    mounted () {
        userService.getCurrentUser()
            .then(user => {
                this.user = user
            })
            .catch(error => console.error("Error: ", error))
    }
}
