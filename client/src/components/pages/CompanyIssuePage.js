import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { Redirect, NavLink } from 'react-router-dom';
import { HoverButton, IssueOverviewSmall, IssueOverviewNormal } from '../issueViews/issueViews';
import { issueService } from '../../services/IssueService';
import { userService } from '../../services/UserService';
import { history } from '../../index.js';
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
                if (user.userId === 1) {
                    history.push('/minSide');
                } else if (user.userId === 3) {
                    history.push('/kommune/' + user.userId);
                } else if (user.userId === 4) {
                    history.push('/admin');
                }
                issueService.getIssuesByUser(user.userId)
                    .then(issues => {
                        this.issues = issues
                    })
                    .catch(error => console.error("Error: ", error))
            }).catch(error => {
                console.error(error);
                history.push('/');
            })
    }
}
