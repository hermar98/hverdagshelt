// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';


/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { text: React.Node, type: string }[] = [];

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={i} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button
              className="close"
              onClick={() => {
                this.alerts.splice(i, 1);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'danger' });
    });
  }
}

class NavBarBrand extends Component <{ image?: React.Node, children?: React.Node }> {
    render() {
        if(!this.props.children) return null;
        return(
            <NavLink className="navbar-brand" activeClassName="active" exact to="/">
                <a><img src={this.props.image} alt="" width="50px" height="40px"/></a>
                {this.props.children}
            </NavLink>
        );
    }
}

class NavBarLink extends Component <{ to: string, exact?: boolean, children?: React.Node}> {
    render() {
        if(!this.props.children) return null;
        return(
            <NavLink className="nav-link" activeClassName="active" exact={this.props.exact} to={this.props.to}>
                <form className="form-inline">
                    <button className="btn btn-sm btn-outline-light">{this.props.children}</button>
                </form>
            </NavLink>
        );
    }
}

export class NavBar extends Component<{ children: React.Element<typeof NavBarBrand | typeof NavBarLink>[] }> {
    static Brand = NavBarBrand;
    static Link = NavBarLink;

    render(){
        return(
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark mt-0">
                <div className="container-fluid">
                    {this.props.children.filter(child => child.type == NavBarBrand)}
                    <ul className="nav navbar-nav navbar-right">{this.props.children.filter(child => child.type == NavBarLink)}</ul>
                </div>
            </nav>
        );
    }
}
