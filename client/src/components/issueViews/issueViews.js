
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {NavLink} from 'react-router-dom'
import { Issue} from '../../models';

let sharedIssues = sharedComponentData({issues: []})

var issueTest = new Issue(0, "Hull i veien ved Gate 7", "Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3, new Date());
sharedIssues.issues =  [
    new Issue(1, "Hull i veien ved Gate 7" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  1, Date.now()),
    new Issue(2, "Ødelagt bom ved broa" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3,Date.now()),
    new Issue(3, "Herverk på husveggen min" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  2,Date.now()),
    new Issue(4, "Søppeltømmingsplanene fungerer ikke bra" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1 , 2,Date.now()),
    new Issue(5, "Hull i veien ved Gate 7" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3,Date.now()),
    new Issue(6, "Ødelagt bom ved broa" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://i.imgur.com/nqTGipe.jpg",1, 1, 3,Date.now()),
    new Issue(7, "Herverk på husveggen min" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1, 2,Date.now()),
    new Issue(8, "Søppeltømmingsplanene fungerer ikke bra" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  1,Date.now())
]

/*
Large view of an issue, which includes the title, content, image and status.
 */
export class IssueLarge extends Component<{match: {params: {issueId: number}}}> {

    issue = sharedIssues.issues.find(issue => issue.issueId == this.props.match.params.issueId)

    render() {
        return (
            <div className="issue-container" issue={this.issue}>
                <div className="issue-large">
                    <Status status={this.issue.status}/>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-row issue-flex justify-content-between">
                                <p className="date">14:52 - 05/07/2018</p>
                                <HoverButton onclick={null} title="Slett"/>
                            </div>
                            <div className="card-title">
                                <h2>{this.issue.title}</h2>
                            </div>
                            <div className="card-text">
                                <p>{this.issue.content}</p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <h4>Bilder</h4>
                            <div className="flex-container">
                                    <img className="issue-image" src="https://www.naf.no/globalassets/tips-rad/vei-trafikk/hull_i_veien_bil2.jpg?width=980&height=550&mode=max&anchor=middlecenter&scale=both&quality=85"/>
                                    <img className="issue-image" src={this.issue.image}/>
                                    <img className="issue-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pothole.jpg/250px-Pothole.jpg"/>
                                    <img className="issue-image" src="https://www.pengenytt.no/wp-content/uploads/2017/03/Hull-i-vei-Foto-Wikimedia-Commons-Editor5807.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="feedback-title">Oppdateringer</h2>
                <IssueFeedback/>
                <p id="feedbackFill"/>
                <div className="feedback-button">
                    <HoverButton onclick={null} title="Legg inn oppdatering" />
                </div>
            </div>
        )
    }
}

/*
A regular view of the issue, intended to be stacked.
Includes the title and the picture
 */
export class IssueNormal extends Component<{issue: Issue}>{
    render () {
        return (
            <div className="issue-normal" issue={this.props.issue}>
                <div className="d-flex flex-row issue-flex">
                    <div className="p-2">
                        <img className="card-img issue-image-normal" src={this.props.issue.image}/>
                    </div>
                    <div className="p-2">
                        <NavLink className="navlink-large" to={"/issues/" + this.props.issue.issueId}>
                            {this.props.issue.title}
                        </NavLink>
                        <p className="date">14:52 - 05/07/2018</p>
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
            <div className="issue-small" issue={this.props.issue}>
                <div className="d-flex flex-row issue-flex justify-content-between">
                    <div>
                        <NavLink className="navlink-large" to={"/issues/" + this.props.issue.issueId}>
                            {this.props.issue.title}
                        </NavLink>
                        <p className="date">14:52 - 05/07/2018</p>
                    </div>
                </div>
                <Status className="status-small" status={this.props.issue.status} />
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
                <div className="d-flex flex-row justify-content-between">
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
                        if (this.status == issue.status || this.status == 0) {
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
}

export class IssueFeedback extends Component {
    render() {
        return (
            <div>
                <div className="d-flex flex-row submitter">
                    <div className="p-2">
                        <img className="card-img profile-image" src="data:image/jpeg;base64,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"/>
                    </div>
                    <div className="p-2 submitter-info"><h4 className="submitter-name">Trond Hammer</h4><p className="date-small">14:52 - 05/07/2018</p></div>
                </div>
                <div className="card feedback">
                    <div className="card-body">
                        <div className="card-text">
                            apsnpasnpnasgas gasgmasåomgas gasåogmasåom gaåogmaåsmg asgnpasngasg asgmasmgasg
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*
A list of issues in normal view
 */
export class IssueOverviewNormal extends Component {
    render () {
        return (
            <div className="issue-overview-normal issue-container">
                <ul className="list-group">
                    {sharedIssues.issues.map(issue =>
                        <li className="list-group-item">
                            <IssueNormal issue={issue}/>
                        </li>
                    )}
                </ul>
            </div>
        )
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

export class HoverButton extends Component<{onclick: function, title: string}> {
    render (){
        return (
            <button className="btn hover-button" id="hover-Button" type="button" onClick={this.props.onclick} title={this.props.title}>
                {this.props.title}
            </button>
        )
    }
}