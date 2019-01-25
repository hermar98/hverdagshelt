import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { Redirect, NavLink } from 'react-router-dom';
import { HoverButton, IssueOverviewSmall } from '../issueViews/issueViews';
import { issueService } from '../../services/IssueService';
import { history } from '../../index';
import { userService } from '../../services/UserService';
import { tokenManager } from '../../tokenManager';

export class IssueView extends Component {
  issues: [] = [];
  munId: number = 0;

  render() {
    return (
      <div>
        <div className="card issue-view-container">
          <div className="issue-overview-left">
            <IssueOverviewSmall issues={this.issues} />
          </div>
        </div>
      </div>
    );
  }

  mounted() {

    userService.getCurrentUser()
        .then(user => {
            if (user.userId === 1) {
                history.push('/minSide');
            } else if (user.userId === 2) {
                history.push('/bedrift');
            } else if (user.userid === 4) {
                history.push('/admin');
            }
          this.munId = user.munId;
            issueService
                .getIssuesByMunicipal(this.munId)
                .then(issues => {
                    this.issues = issues;
                })
                .catch(error => console.error('Error: ', error));
        }).catch((error: Error) => {
            console.log(error);
            history.push('/');
    })
  }
}
