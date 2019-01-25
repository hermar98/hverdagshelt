import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { Redirect, NavLink } from 'react-router-dom';
import { HoverButton, IssueOverviewSmall, IssueOverviewNormal } from '../issueViews/issueViews';
import { issueService } from '../../services/IssueService';
import { userService } from '../../services/UserService';
import { tokenManager } from '../../tokenManager';

export class ContractorView extends Component<{ match: { params: { munId: number } } }> {
  issues: [] = [];

  render() {
    return (
      <div>
        <div className="card issue-view-container">
          <h2 className="card-title">Dine tildelte saker</h2>
          <div className="issue-overview-left">
            <IssueOverviewSmall issues={this.issues} />
          </div>
        </div>
      </div>
    );
  }

    mounted () {
        userService.getCurrentUser()
            .then(user => {
                issueService.getIssuesByUser(user.userId)
                    .then(issues => {
                        this.issues = issues
                    })
                    .catch(error => console.error("Error: ", error))
            }).catch(error => console.error("Error: ", error))
    }
}
