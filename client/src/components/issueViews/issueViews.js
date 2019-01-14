
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {NavLink} from 'react-router-dom'
import { Issue, Feedback, User } from '../../models';
import { issueService, userService, feedbackService } from "../../services";

let sharedIssues = sharedComponentData({issues: []})
let sharedFeedback = sharedComponentData({feedback: []})

/*var issueTest = new Issue(0, "Hull i veien ved Gate 7", "Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3, new Date());
sharedIssues.issues =  [
    new Issue(1, "Hull i veien ved Gate 7" ," Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  1, 1),
    new Issue(2, "Ødelagt bom ved broa" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3,2),
    new Issue(3, "Herverk på husveggen min" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  2,Date.now()),
    new Issue(4, "Søppeltømmingsplanene fungerer ikke bra" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1 , 2,Date.now()),
    new Issue(5, "Hull i veien ved Gate 7" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3,Date.now()),
    new Issue(6, "Ødelagt bom ved broa" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://i.imgur.com/nqTGipe.jpg",1, 1, 3,Date.now()),
    new Issue(7, "Herverk på husveggen min" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1, 2,Date.now()),
    new Issue(8, "Søppeltømmingsplanene fungerer ikke bra" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  1,Date.now())
]*/

/*
Large view of an issue, which includes the title, content, image and status.
 */
export class IssueLarge extends Component<{match: {params: {issue_id: number}}}> {

    issue = new Issue();

    render() {
        return (
            <div className="issue-container">
                <div className="issue-large">
                    <Status status={this.issue.status_id}/>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-row">
                                <p className="date">{this.issue.date}</p>
                                <div className="options">
                                    <ImageButton source="../../images/cog.png" onclick="Edited" />
                                    <ImageButton source="../../images/trashcan.png" onclick="Deleted" />
                                </div>
                                <StatusImage status={this.issue.status_id} />
                            </div>
                            <div className="card-text">
                                <p>{this.issue.content}</p>
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
                    console.log(JSON.stringify(feedback));
                    return <IssueFeedback feedback={feedback}/>
                })}
                <p id="feedbackFill"/>
                <div className="feedback-button">
                    <HoverButton onclick={null} title="Legg inn oppdatering" />
                </div>
            </div>
        )
    }

    mounted () {
        window.scrollTo(0, 0);
        issueService.getIssue(this.props.match.params.issue_id)
            .then(issue => {
                this.issue = issue;
            })
            .catch(error => console.error("Error: ", error))
        feedbackService.getFeedbacks(this.props.match.params.issue_id)
            .then(data => {
                sharedFeedback.feedback = data;
            })
            .catch(error => console.error("Error: ", error))
    }
}

/*
A regular view of the issue, intended to be stacked.
Includes the title and the picture
 */
export class IssueNormal extends Component<{issue: Issue}>{
    render () {
        return (
            <div className="issue-normal issue-hover" issue={this.props.issue}>
                <a id="a-hover" href={"#issues/" + this.props.issue.issue_id}>
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
                    <div>
                        <StatusImage status={this.props.issue.status_id} />
                    </div>
                </div>
            </div>
        )
    }
}

/*
Small view of an issue that displays only the title and the status
 */
export class IssueSmall extends Component<{issue: Issue}> {
    render() {
        return (
            <div className="issue-small issue-hover" issue={this.props.issue}>
                <a id="a-hover" href={"#issues/" + this.props.issue.issue_id}>
                    <img src="../../images/arrowRightTrans.png" />
                </a>
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <p className="date">{this.props.issue.date}</p>
                        <h5>
                            {this.props.issue.title}
                        </h5>
                    </div>
                    <StatusImage status={this.props.issue.status_id} />
                </div>
            </div>
        )
    }
}

/*
A list of issues in small view
 */
export class IssueOverviewSmall extends Component {

    status: number = 0;
    timesort: string = "Nyeste";

    render () {
        return (
            <div className="issue-overview-small issue-container">
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
                        <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}>
                            <option>Nyeste</option>
                            <option>Eldste</option>
                        </select>
                    </div>
                </div>
                <ul className="list-group">
                    {sharedIssues.issues.map(issue => {
                        if (this.status == issue.status_id || this.status == 0) {
                            return(
                                <li className="list-group-item">
                                    <IssueSmall issue={issue}/>
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
                <div className="d-flex flex-row submitter">
                    <div className="p-2">
                        <img className="card-img profile-image" src={this.user.profilePicture}/>
                    </div>
                    <div className="p-2 submitter-info"><h5 className="submitter-name">{this.user.firstName + ' ' + this.user.lastName}</h5><p className="date-small">{this.props.feedback.date}</p></div>
                    <ImageButton source="../../images/cog.png" onclick="Edited" />
                    <ImageButton source="../../images/trashcan.png" onclick="Deleted" />
                </div>
                <div className="card feedback">
                    <div className="card-body">
                        <div className="card-text">
                            {this.props.feedback.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    mounted () {
        userService.getUser(this.props.feedback.user_id)
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
export class IssueOverviewNormal extends Component {

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
                        if (this.status == issue.status_id || this.status == 0) {
                            return (
                                <li className="list-group-item">
                                    <IssueNormal issue={issue}/>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        )
    }

    mounted (){
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
export class Status extends Component<{status: number}> {
    render () {
        switch (this.props.status){
            case 1: return (

                    <div className="status status-blocked">
                        <h4>Ikke behandlet</h4>
                    </div>
                )
                break;
            case 2: return (
                    <div className="status status-pending">
                        <h4>Under behandling</h4>
                    </div>
            )
                break;
            case 3: return (
                    <div className="status status-finished">
                        <h4>Behandlet</h4>
                    </div>
            )
                break;
            default: return null; break;
        }
    }
}

export class StatusImage extends Component<{status: number}> {
    render () {
        switch (this.props.status){
            case 1: return (
                <img className="status-image" src="../../images/blockedTrans.png" />
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

export class HoverButton extends Component<{onclick: function, title: string}> {
    render (){
        return (
            <button className="btn hover-button" id="hover-Button" type="button" onClick={this.props.onclick} title={this.props.title}>
                {this.props.title}
            </button>
        )
    }
}

export class ImageButton extends Component<{source: string, onclick: function}> {
    render() {
        return(
            <button className="btn image-button" type="button" onClick={this.props.onclick} >
                <img id="image-button-image" src={this.props.source} />
            </button>
        )
    }
}