
import * as React from 'react';
import { Component } from 'react-simplified';
import { Issue } from './models';

class IssueLarge extends Component<{ issue: Issue }> {
    render() {
        return (
            <div className="issue-large" issue={this.props.issue}>
                
            </div>
        )

    }
}