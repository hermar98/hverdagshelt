
import * as React from 'react';
import { Component } from 'react-simplified';
import { Issue } from './models';

export class IssueLarge extends Component<{ issue: Issue }> {
    render() {
        return (
            <div className="issue-large" issue={this.props.issue}>
                <div className="card">
                    <img className="card-img-top" src={this.props.issue.image}/>
                    <div className="card-body">
                        <div className="card-title">
                            <h4>{this.props.issue.title}</h4>
                        </div>
                        <div className="card-text">
                            <p>{this.props.issue.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class IssueSmall extends Component<{issue: Issue}> {
    render() {
        return (
            <div className="issue-small" issue={this.props.issue}>
                <Status status={this.props.issue.status}/>
                <div className="card">
                    <img className="card-img" src={this.props.issue.image}/>
                    <div className="card-body">
                        <div className="card-title">
                            <h4>{this.props.issue.title}</h4>
                        </div>
                        <div className="card-text">
                            <p>{this.props.issue.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class Status extends Component<{status: number}> {
    render () {
        switch (this.props.status){
            case 1: return (
                <div className="status">
                    <div className="card-title">
                        Ikke behandlet
                    </div>
                </div>
                )
                break;
            case 2: return (
                <div className="status">
                    <div className="card-title">
                        Under behandling
                    </div>
                </div>
            )
                break;
            case 3: return (
                <div className="status">
                    <div className="card-title">
                        Behandlet
                    </div>
                </div>
            )
                break;
            default: break;
        }
    }
}