
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {Redirect, NavLink} from 'react-router-dom'
import { IssueOverviewSmall } from "../issueViews/issueViews";
import {issueService} from "../../services/IssueService";

class IssueView extends Component {

    issues: [] = []

    render () {
        return (
            <div className="issue-container">
                <IssueOverviewSmall issues={this.issues} />
            </div>
        )
    }

    mounted () {
        issueService.getIssues()
            .then(issues => {
                this.issues = issues
            })
            .catch(error => console.error("Error: ", error))
    }
}