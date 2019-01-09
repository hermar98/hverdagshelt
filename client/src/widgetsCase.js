
import * as React from 'react';
import { Component } from 'react-simplified';
import { Issue } from './models';


/*
Large view of an issue, which includes the title, content, image and status.
 */
export class IssueLarge extends Component<{ issue: Issue }> {
    render() {
        return (
            <div className="issue-large" issue={this.props.issue}>
                <Status status={this.props.issue.status}/>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2>{this.props.issue.title}</h2>
                        </div>
                        <div className="card-text">
                            <p>{this.props.issue.content}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <h4>Bilder</h4>
                        <div className="flex-container">
                                <img className="issue-image" src="https://www.naf.no/globalassets/tips-rad/vei-trafikk/hull_i_veien_bil2.jpg?width=980&height=550&mode=max&anchor=middlecenter&scale=both&quality=85"/>
                                <img className="issue-image" src={this.props.issue.image}/>
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
export class IssueNormal extends Component<{issue: Issue}>{
    render () {
        return (
            <div className="issue-normal" issue={this.props.issue}>
                <div className="d-flex flex-row issue-flex">
                    <div className="p-2">
                        <img className="card-img issue-image" src={this.props.issue.image}/>
                    </div>
                    <div className="p-2"><h1>{this.props.issue.title}</h1></div>
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
                <div className="card-title">
                    <h4>{this.props.issue.title}</h4>
                </div>
            </div>
        )
    }
}

/*
A list of issues in small view
 */
export class IssueOverviewSmall extends Component<{issues: Issue[]}> {
    render () {
        return (
            <div className="issue-overview-small">
                <ul className="list-group">
                    {this.props.issues.map(issue =>
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