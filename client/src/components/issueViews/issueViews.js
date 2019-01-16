
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {Redirect, NavLink} from 'react-router-dom'
import { Issue, Feedback, User } from '../../models';
import { issueService, userService, feedbackService } from "../../services";
import Menu from '../menu/Menu';

let sharedIssues = sharedComponentData({issues: []})
let sharedFeedback = sharedComponentData({feedback: []})

/*
Large view of an issue, which includes the title, content, image and status.
 */
export class IssueLarge extends Component<{match: {params: {issueId: number}}}> {

    constructor (props) {
        super(props)
        this.statusSelect = React.createRef()
        this.addFeedbackButton = React.createRef()
        this.state = {
            clickedStatus: false
        }
    }

    issue = new Issue();

    render() {

        if(!this.state.clickedStatus && this.statusSelect.current != null) {
            this.statusSelect.current.classList.add('show')
        }else if(this.statusSelect.current != null){
            this.statusSelect.current.classList.remove('show')
        }

        if(this.addFeedbackButton.current != null && this.addFeedbackButton.current.classList.contains('show')){
            this.addFeedbackButton.current.classList.remove('show')
        }else if(this.addFeedbackButton.current != null){
            this.addFeedbackButton.current.classList.add('show')
        }

        return (
            <div>
                <Menu />
                <div className="issue-container">
                    <div className="issue-large">
                        <Status status={this.issue.statusId} id={this.issue.issueId}/>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-row">
                                    <p className="date">{this.issue.date}</p>
                                    <div className="options">
                                        <ImageButton source="../../images/cog.png" onclick="Edited" />
                                        <ImageButton source="../../images/trashcan.png" onclick="Deleted" />
                                    </div>
                                    <StatusButton status={this.issue.statusId} onclick={() => {
                                        this.setState({
                                            clickedStatus: !this.state.clickedStatus
                                        })
                                    }}/>
                                </div>
                                <div className="d-flex flex-row justify-content-end">
                                    <div className="status-selection" ref={this.statusSelect}>
                                        <StatusButton status={1} onclick={() => this.onClick(1)} />
                                        <StatusButton status={2} onclick={() => this.onClick(2)} />
                                        <StatusButton status={3} onclick={() => this.onClick(3)} />
                                    </div>
                                </div>
                                <div className="card-text">
                                    <p id="issue-large-text">{this.issue.content}</p>
                                </div>
                                <h5>Kategori</h5>
                            </div>
                            <div className="card-footer">
                                <h4>Bilder</h4>
                                <div className="flex-container">
                                        <img className="issue-image" src="https://www.naf.no/globalassets/tips-rad/vei-trafikk/hull_i_veien_bil2.jpg?width=980&height=550&mode=max&anchor=middlecenter&scale=both&quality=85"/>
                                        <img className="issue-image" src={this.issue.image}/>
                                        <img className="issue-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/250px-Pothole.jpg" />
                                        <img className="issue-image" src="https://www.pengenytt.no/wp-content/uploads/2017/03/Hull-i-vei-Foto-Wikimedia-Commons-Editor5807.jpg"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="feedback-title">Oppdateringer</h4>
                    {sharedFeedback.feedback.map(feedback => {
                        return <IssueFeedback feedback={feedback}/>
                    })}
                    <div className="feedback-button">
                        <div>
                            <a id="feedback-link" href={"#issues/" + this.issue.issueId + "/feedback"} >
                                <button ref={this.addFeedbackButton} className="btn image-button" type="button" onClick={() => {

                                }}>
                                    <img id="image-button-image" src="../../images/add.png" />
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    mounted () {
        window.scrollTo(0, 0);
        console.log(this.props.match.params.issueId)
        issueService.getIssue(this.props.match.params.issueId)
            .then(issue => {
                this.issue = issue;
            })
            .catch(error => console.error("Error: ", error))
        feedbackService.getFeedbacks(this.props.match.params.issueId)
            .then(data => {
                sharedFeedback.feedback = data;
            })
            .catch(error => console.error("Error: ", error))
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
}

/*
A regular view of the issue, intended to be stacked.
Includes the title and the picture
 */
export class IssueNormal extends Component<{issue: Issue, munId: number}>{
    render () {
        return (
            <div className="issue-normal issue-hover" issue={this.props.issue}>
                <a id="a-hover" href={"#/municipal/" + this.props.munId + "/issues/" + this.props.issue.issueId}>
                    <img src="../../images/arrowRightTrans.png" />
                </a>
                <div className="d-flex flex-row issue-flex">
                    <div className="issue-image-normal-container">
                        <img className="issue-image-normal" src={this.props.issue.image}/>
                    </div>
                    <div id="issue-normal-text">
                        <p id="issue-normal-content">{(this.props.issue.content).substring(0, 240) + " . . ."}</p>
                        <div>
                            <p id="date-normal" className="date">{this.props.issue.date}</p>
                            <h5 id="issue-normal-title">
                                Kategori
                            </h5>
                        </div>
                    </div>
                    <p className="status-label">Status:&nbsp;&nbsp;</p>
                    <StatusImage status={this.props.issue.statusId} />
                </div>
            </div>
        )
    }
}

/*
Small view of an issue that displays only the title and the status
 */
export class IssueSmall extends Component<{issue: Issue, munId: number}> {
    render() {
        return (
            <div className="issue-small issue-hover" issue={this.props.issue}>
                <a id="a-hover" href={"#/municipal/" + this.props.munId + "/issues/" + this.props.issue.issueId}>
                    <img src="../../images/arrowRightTrans.png" />
                </a>
                <div className="d-flex flex-row issue-flex justify-content-between">
                    <div className="view-text">
                        <p className="date">{this.props.issue.date}</p>
                        <h5>
                            {this.props.issue.title}
                        </h5>
                    </div>
                    <p className="status-label">Status:&nbsp;&nbsp;</p>
                    <StatusImage status={this.props.issue.statusId} />
                </div>
            </div>
        )
    }
}

/*
A list of issues in small view
 */
export class IssueOverviewSmall extends Component<{munId: number}> {

    status: number = 0;
    timesort: string = "Nyeste";

    render () {
        return (
            <div className="issue-overview-small">
                <div className="d-flex flex-row sort-box card-header justify-content-between">
                    <div className="form-group">
                        <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.status = event.target.value)}>
                        <option value={0}>Alle</option>
                        <option value={1}>Ikke behandlet</option>
                        <option value={2}>Under behandling</option>
                        <option value={3}>Behandlet</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}>
                            <option>Nyeste</option>
                            <option>Eldste</option>
                        </select>
                    </div>
                </div>
                <ul className="list-group">
                    {sharedIssues.issues.map(issue => {
                        if (this.status == issue.statusId || this.status == 0) {
                            return(
                                <li className="list-group-item">
                                    <IssueSmall issue={issue} munId={this.props.munId}/>
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
        issueService.getIssues()
            .then(data => {
                sharedIssues.issues = data;
            })
            .catch(error => console.error("Error: ", error))
    }
}

export class IssueFeedback extends Component<{feedback: Feedback}> {

    user = new User()

    render() {
        return (
            <div className="feedback" feedback={this.props.feedback}>
                <div className="card feedback">
                    <div className="card-body">
                        <div className="d-flex flex-row submitter">
                            <div className="p-2">
                                <img className="card-img profile-image" src={this.user.profilePicture}/>
                            </div>
                            <div className="p-2 submitter-info"><h5 className="submitter-name">{this.user.firstName + ' ' + this.user.lastName}</h5><p className="date-small">{this.props.feedback.date}</p></div>
                            <ImageButton source="../../images/cog.png" onclick="Edited" />
                            <ImageButton source="../../images/trashcan.png" onclick="Deleted" />
                        </div>
                        <div id="feedback-text" className="card-text">
                            {this.props.feedback.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    mounted () {
        userService.getUser(this.props.feedback.userId)
            .then(user => {
                this.user = user
                console.log(JSON.stringify(this.user))
            })
            .catch(error => console.error("Error", error))
    }
}

/*
A list of issues in normal view
 */
export class IssueOverviewNormal extends Component<{munId: number}> {

    status: number = 0;
    timesort: number = 0;

    render () {
        return (
            <div className="issue-overview-normal issue-container">
                <div className="d-flex flex-row sort-box justify-content-between">
                    <div className="form-group">
                        <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.status = event.target.value)}>
                            <option value={0}>Alle</option>
                            <option value={1}>Ikke behandlet</option>
                            <option value={2}>Under behandling</option>
                            <option value={3}>Behandlet</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => {
                            this.timesort = event.target.value;
                            this.onChange();
                        }}>
                            <option value={0}>Nyeste</option>
                            <option value={1}>Eldste</option>
                        </select>
                    </div>
                </div>
                <ul className="list-group">
                    {sharedIssues.issues.map(issue => {
                        if (this.status == issue.statusId || this.status == 0) {
                            return (
                                <li className="list-group-item normal-list-item">
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
        console.log("asdasd")
        issueService.getIssues()
            .then(data => {
                sharedIssues.issues = data;
            })
            .catch(error => console.error("Error: ", error))
        sharedIssues.issues.sort((a, b) => a.date - b.date );
    }

    onChange () {
        if(this.timesort == 1) {
            sharedIssues.issues.sort((a, b) => b.date - a.date);
        }else{
            sharedIssues.issues.sort((a, b) => a.date - b.date );
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
                    <div className="status status-blocked">
                        <h4>{"Ikke behandlet"}</h4>
                    </div>
                )
                break;
            case 2: return (
                    <div className="status status-pending">
                        <h4>{"Under behandling"}</h4>
                    </div>
            )
                break;
            case 3: return (
                    <div className="status status-finished">
                        <h4>{"Behandlet"}</h4>
                    </div>
            )
                break;
            default: return null; break;
        }
    }
}

class StatusImage extends Component<{status: number}> {
    render () {
        switch (this.props.status){
            case 1: return (
                <div>
                    <img className="status-image" src="../../images/blockedTrans.png" />
                </div>
            )
                break;
            case 2: return (
                <img className="status-image" src="../../images/pendingTrans.png" />
            )
                break;
            case 3: return (
                <img className="status-image" src="../../images/finishedTrans.png" />
            )
                break;
            default: return null; break;
        }
    }
}

class StatusButton extends Component<{status: number, onclick: function}> {
    render () {
        switch (this.props.status){
            case 1: return (
                <ImageButton source="../../images/blockedTrans.png" onclick={this.props.onclick}/>
            )
                break;
            case 2: return (
                <ImageButton source="../../images/pendingTrans.png" onclick={this.props.onclick}/>
            )
                break;
            case 3: return (
                <ImageButton source="../../images/finishedTrans.png" onclick={this.props.onclick}/>
            )
                break;
            default: return null; break;
        }
    }
}

class ImageButton extends Component<{source: string, onclick: function}> {
    render() {
        return(
            <button className="btn image-button" type="button" onClick={this.props.onclick} >
                <img id="image-button-image" src={this.props.source} />
            </button>
        )
    }
}

class HoverButton extends Component<{onclick: function, text: string}> {
    render () {
        return (
            <button className="btn hover-button" type="button" onClick={this.props.onclick} >
                {this.props.text}
            </button>
        )
    }
}

export class AddFeedback extends Component<{match: {params: {issueId: number}}}> {
    render() {
        return (
            <div className="feedback-container">
                <div className="form-group">
                    <textarea className="form-control" placeholder="skriv feedback..." rows={8} />
                </div>
                <a href={"/#/issues/" + this.props.match.params.issueId}>
                    <HoverButton text="Send" onclick={() => this.onClick()} />
                </a>
            </div>
        )
    }

    mounted () {
        window.scrollTo(0, document.body.scrollHeight);
    }

    onClick() {

    }
}

