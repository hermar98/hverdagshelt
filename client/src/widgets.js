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

class ButtonBasic extends Component <{
    onClick: () => mixed,
    children: React.Node
}> {
    render() {
        return(
            <button className="btn btn-default" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

class ButtonLink extends Component <{
  onClick: () => mixed,
  children: React.Node
}> {
    render() {
        return(
            <button className="btn btn-link" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

class ButtonRemove extends Component <{
    onClick: () => mixed,
    children: React.Node
}> {
    render() {
        return(
            <button className="btn btn-danger" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

class ButtonSuccess extends Component <{
    onClick: () => mixed, //Any function
    children: React.Node
}> {
    render(){
        return(
            <button className="btn btn-success" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

class ButtonEdit extends Component <{
    to: React.Node,
    children: React.Node
}>{
    render() {
        return(
            <a href={this.props.to}>
                <button className="btn btn-info">
                    {this.props.children}
                </button>
            </a>
        );
    }
}


export class Button{
    static Success = ButtonSuccess;
    static Remove = ButtonRemove;
    static Edit = ButtonEdit;
    static Basic = ButtonBasic;
    static Link = ButtonLink;
}


export class Card extends Component<{ title: React.Node, children?: React.Node }> {
    render(){
        return(
            <div className="card">
                <div className="card-body">
                    <div className="container h-100">
                        <div className="row h-100 justify-content-center align-items-center">
                            <h5 className="card-title">{this.props.title}</h5>
                        </div>
                    </div>
                    <div className="card-text">{this.props.children}</div>
                </div>
            </div>
        );
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
                    <button className="btn btn btn-outline-light">{this.props.children}</button>
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


class FormInput extends Component<{
    type: string,
    label?: React.Node,
    value?: mixed,
    onChange?: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
    required?: boolean,
    pattern?: string,
    placeholder?: string
}> {
    render() {
        return (
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">{this.props.label}</label>
                <div className="col-sm-4">
                    <input
                        className="form-control"
                        type={this.props.type}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        required={this.props.required}
                        pattern={this.props.pattern}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </div>
        );
    }
}

class FormInputBig extends Component <{
    type: string,
    label: React.Node,
    value: mixed,
    onChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
    required?: boolean,
    pattern?: string,
    placeholder?: string
}> {
    render() {
        return(
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">{this.props.label}</label>
                <div className="col-sm-4">
                    <textarea rows="8" id="content"
                              className="form-control"
                              type={this.props.type}
                              value={this.props.value}
                              onChange={this.props.onChange}
                              required={this.props.required}
                              pattern={this.props.pattern}
                              placeholder={this.props.placeholder}/>
                </div>
            </div>
        );
    }
}

class FileInput extends Component <{
    children?: React.Node
}> {
    render() {
        return(
            <form>
                <div className="form-group row">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4 col-form-label">
                        <i>{this.props.children}</i>
                        <input type="file" className="form-control-file"/>
                    </div>
                </div>
            </form>
        );
    }
}

export class Form {
    static Input = FormInput;
    static InputLarge = FormInputBig;
    static FileInput = FileInput;
}
