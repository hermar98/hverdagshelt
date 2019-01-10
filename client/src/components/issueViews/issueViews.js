
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {NavLink} from 'react-router-dom'
import { Issue } from '../../models';

let sharedIssues = sharedComponentData({issues: []})

var issueTest = new Issue(0, "Hull i veien ved Gate 7", "Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3, new Date());
sharedIssues.issues =  [
    new Issue(1, "Hull i veien ved Gate 7" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  1, new Date()),
    new Issue(2, "Ødelagt bom ved broa" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3,new Date()),
    new Issue(3, "Herverk på husveggen min" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  2,new Date()),
    new Issue(4, "Søppeltømmingsplanene fungerer ikke bra" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1 , 2,new Date()),
    new Issue(5, "Hull i veien ved Gate 7" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  3,new Date()),
    new Issue(6, "Ødelagt bom ved broa" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://i.imgur.com/nqTGipe.jpg",1, 1, 3,new Date()),
    new Issue(7, "Herverk på husveggen min" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1, 2,new Date()),
    new Issue(8, "Søppeltømmingsplanene fungerer ikke bra" ,"Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg",1, 1,  1,new Date())
]


/*
Large view of an issue, which includes the title, content, image and status.
 */
export class IssueLarge extends Component<{match: {params: {issueId: number}}}> {

    issue = sharedIssues.issues.find(issue => issue.issueId == this.props.match.params.issueId)

    render() {
        return (
            <div className="issue-large issue-container" issue={this.issue}>
                <Status status={this.issue.status}/>
                <div className="card">
                    <div className="card-body">
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
        )
    }
}

/*
A regular view of the issue, intended to be stacked.
Includes the title and the picture
 */
export class IssueNormal extends Component<{match: {params: {issueId: number}}}>{

    issue = sharedIssues.issues.find(issue => issue.issueId == this.props.match.params.issueId)

    render () {
        return (
            <div className="issue-normal" issue={this.issue}>
                <div className="d-flex flex-row issue-flex">
                    <div className="p-2">
                        <img className="card-img issue-image" src={this.issue.image}/>
                    </div>
                    <div className="p-2"><h1>{this.issue.title}</h1></div>
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
                <Status status={this.props.issue.status}/>
                <NavLink className="navlink-large" to={"/issues/" + this.props.issue.issueId}>
                    {this.props.issue.title}
                </NavLink>
            </div>
        )
    }
}

/*
A list of issues in small view
 */
export class IssueOverviewSmall extends Component {
    render () {
        return (
            <div className="issue-overview-small issue-container">
                <ul className="list-group">
                    {sharedIssues.issues.map(issue =>
                        <li className="list-group-item">
                            <IssueSmall issue={issue}/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

/*
A list of issues in normal view
 */
export class IssueOverviewNormal extends Component<{issues: Issue[]}> {
    render () {
        return (
            <div className="issue-overview-normal">
                <ul className="list-group">
                    {this.props.issues.map(issue =>
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
                        <h3>Ikke behandlet</h3>
                    </div>
                )
                break;
            case 2: return (
                    <div className="status status-pending">
                        <h3>Under behandling</h3>
                    </div>
            )
                break;
            case 3: return (
                    <div className="status status-finished">
                        <h3>Behandlet</h3>
                    </div>
            )
                break;
            default: break;
        }
    }
}