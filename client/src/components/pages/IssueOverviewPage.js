import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { Redirect, NavLink } from 'react-router-dom';
import { HoverButton, IssueOverviewSmall } from '../issueViews/issueViews';
import { issueService } from '../../services/IssueService';
import { IssueMenu } from '../menu/IssueMenu';

export class IssueView extends Component<{ match: { params: { munId: number } } }> {
  issues: [] = [];

  render() {
    return (
      <div>
        <IssueMenu />
        <div className="card issue-view-container">
          <div className="issue-overview-left">
            <IssueOverviewSmall issues={this.issues} />
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
      .getIssuesByMunicipal(this.props.match.params.munId)
      .then(issues => {
        this.issues = issues;
      })
      .catch(error => console.error('Error: ', error));
  }
}
