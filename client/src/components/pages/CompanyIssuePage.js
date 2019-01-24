import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { Redirect, NavLink } from 'react-router-dom';
import { HoverButton, IssueOverviewSmall, IssueOverviewNormal } from '../issueViews/issueViews';
import { issueService } from '../../services/IssueService';
import { tokenManager } from '../../tokenManager';

export class ContractorView extends Component<{ match: { params: { munId: number } } }> {
  issues: [] = [];

  render() {
    return (
      <div>
        <div className="card issue-view-container">
          <h2 className="card-title">Dine tildelte saker</h2>
          <div className="issue-overview-left">
            <IssueOverviewNormal issues={this.issues} />
          </div>
          <div className="issue-options">
            <div className="buttons row justify-content-center">
              <HoverButton onclick={console.log('hello')} text="Trykk" />
              <HoverButton onclick={console.log('hello')} text="Trykk" />
              <HoverButton onclick={console.log('hello')} text="Trykk" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    issueService
      .getIssuesByUser(tokenManager.getUserId())
      .then(issues => {
        this.issues = issues;
      })
      .catch(error => console.error('Error: ', error));
  }
}
