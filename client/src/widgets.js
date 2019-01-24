// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { issueCategoryService } from './services/IssueCategoryService.js';
import { eventCategoryService } from './services/EventCategoryService.js';

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

class ButtonBasic extends Component<{
  onClick: () => mixed,
  children: React.Node
}> {
  render() {
    return (
      <button className="btn btn-default" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonLink extends Component<{
  onClick: () => mixed,
  children: React.Node
}> {
  render() {
    return (
      <button className="btn btn-link" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonRemove extends Component<{
  onClick: () => mixed,
  children: React.Node
}> {
  render() {
    return (
      <button className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonSuccess extends Component<{
  onClick: () => mixed, //Any function
  children: React.Node
}> {
  render() {
    return (
      <button className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonEdit extends Component<{
  to: React.Node,
  children: React.Node
}> {
  render() {
    return (
      <a href={this.props.to}>
        <button className="btn btn-info">{this.props.children}</button>
      </a>
    );
  }
}

export class Button {
  static Success = ButtonSuccess;
  static Remove = ButtonRemove;
  static Edit = ButtonEdit;
  static Basic = ButtonBasic;
  static Link = ButtonLink;
}

export class Card extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <h5 className="card-title">{this.props.title}</h5>
            </div>
          </div>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

class NavBarButton extends Component<{ onClick: () => mixed, children?: React.Node }> {
  render() {
    return (
      <form className="form-inline">
        <button onClick={this.props.onClick} className="custom-nav-btn btn btn-outline-light">
          {this.props.children}
        </button>
      </form>
    );
  }
}

class NavBarBrand extends Component<{ image?: React.Node, to?: string, children?: React.Node }> {
  render() {
    if (!this.props.children) return null;
    return (
      <NavLink className="navbar-brand" exact to={this.props.to ? this.props.to : '/'}>
        <img src={this.props.image} alt="" width="50px" height="40px" />

        {this.props.children}
      </NavLink>
    );
  }
}

class NavBarLink extends Component<{ to: string, exact?: boolean, children?: React.Node }> {
  render() {
    if (!this.props.children) return null;
    return (
      <NavLink className="custom-nav-link nav-link" exact={this.props.exact} to={this.props.to}>
        <form className="form-inline">
          <button className="custom-nav-btn btn btn btn-outline-light">{this.props.children}</button>
        </form>
      </NavLink>
    );
  }
}

class NavBarLogout extends Component<{
  to: string,
  onClick: () => mixed,
  exact?: boolean,
  children?: React.Node
}> {
  render() {
    if (!this.props.children) return null;
    return (
      <NavLink className="nav-link mt-5" exact={this.props.exact} to={this.props.to}>
        <form className="form-inline">
          <button className="btn btn-outline-danger" onClick={this.props.onClick}>
            {this.props.children}
          </button>
        </form>
      </NavLink>
    );
  }
}

type S = { isOpen: boolean }; //Quick fix

class NavBarDropdown extends Component<
  {
    title: string,
    children: React.Element<
      typeof DropdownHeader | typeof DropdownFooter | typeof DropdownDivider | typeof DropdownItem
    >[]
  },
  S
> {
  state = { isOpen: false };
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    if (!this.props.children) return null;
    const menuClass = `dropdown-menu${this.state.isOpen ? ' show' : ''}`;
    return (
      <div className="dropdown form-inline ml-2" onClick={this.toggleOpen}>
        <button
          className="custom-nav-btn btn btn-outline-light dropdown-toggle"
          id="profileButton"
          type="button"
          //  id="dropdownMenuButton"
          //  data-toggle="dropdown"
          //  aria-haspopup="true"
        >
          {this.props.title}
        </button>
        <div className={menuClass}>
          {this.props.children.filter(
            child =>
              child.type === DropdownHeader ||
              child.type === DropdownFooter ||
              child.type === DropdownDivider ||
              child.type === DropdownItem
          )}
        </div>
      </div>
    );
  }
}

export class DropdownHeader extends Component<{ children?: React.Node }> {
  render() {
    if (!this.props.children) return null;
    return <h6 className="dropdown-header">{this.props.children}</h6>;
  }
}

export class DropdownFooter extends Component<{ children?: React.Node }> {
  render() {
    if (!this.props.children) return null;
    return <small className="dropdown-header">{this.props.children}</small>;
  }
}

export class DropdownDivider extends Component {
  render() {
    return <div className="dropdown-divider" />;
  }
}

export class DropdownItem extends Component<{
  onClick: () => mixed,
  children?: React.Node
}> {
  render() {
    if (!this.props.children) return null;
    return (
      <button className="dropdown-item dropdown-submenu" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export class NavBar extends Component<{
  children: React.Element<
    typeof NavBarBrand | typeof NavBarLink | typeof NavBarLogout | typeof NavBarDropdown | typeof NavBarButton
  >[]
}> {
  static Brand = NavBarBrand;
  static Link = NavBarLink;
  static Logout = NavBarLogout;
  static Dropdown = NavBarDropdown;
  static Button = NavBarButton;

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark mt-0">
        <div className="container-fluid custom-container-fluid">
          {this.props.children.filter(child => child.type == NavBarBrand)}
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
            {' '}
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="nav navbar-nav ml-auto ">
              {this.props.children.filter(
                child =>
                  child.type == NavBarLink ||
                  child.type == NavBarLogout ||
                  child.type == NavBarDropdown ||
                  child.type == NavBarButton
              )}
            </ul>
          </div>
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
  placeholder?: string,
  readOnly?: boolean,
  placeholder?: string
}> {
  render() {
    return (
      <div className="form-group row justify-content-center">
        <div className="col-sm-4 col-sm-offset-4">
          <label>{this.props.label}</label>
          <input
            className="form-control"
            type={this.props.type}
            value={this.props.value}
            onChange={this.props.onChange}
            required={this.props.required}
            pattern={this.props.pattern}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
          />
        </div>
      </div>
    );
  }
}

class FormInputDateTime extends Component<{
  label?: React.Node,
  value?: mixed,
  onChange?: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  required?: boolean,
  pattern?: string,
  placeholder?: string,
  onChange2?: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  value2?: mixed,
  label2?: React.Node
}> {
  render() {
    return (
      <div className="form-group row justify-content-center">
        <div className="form-group col-lg-3">
          <label>{this.props.label}</label>
          <input
            className="form-control"
            type="date"
            value={this.props.value}
            onChange={this.props.onChange}
            required={this.props.required}
            pattern={this.props.pattern}
            placeholder={this.props.placeholder}
          />
        </div>
        <div className="form-group col-lg-1">
          <label>{this.props.label2}</label>
          <input className="form-control" type="time" value={this.props.value2} onChange={this.props.onChange2} />
        </div>
      </div>
    );
  }
}

class FormInputBig extends Component<{
  type: string,
  label?: React.Node,
  value?: mixed,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  required?: boolean,
  pattern?: string,
  placeholder?: string
}> {
  render() {
    return (
      <div className="form-group row justify-content-center">
        <div className="col-sm-4 col-sm-offset-4">
          <label>{this.props.label}</label>
          <textarea
            rows="8"
            id="content"
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

class FileInput extends Component<{
  children?: React.Node
}> {
  render() {
    return (
      <form>
        <div className="form-group row">
          <div className="col-sm-4" />
          <div className="col-sm-4 col-form-label">
            <i>{this.props.children}</i>
            <input type="file" className="form-control-file" />
          </div>
        </div>
      </form>
    );
  }
}

class FormAlert extends Component<{ text: string, type: string }> {
  render() {
    return (
      <div className="form-group row justify-content-center">
        <div className="col-sm-10 col-lg-4 justify-content-center">
          <div className={'alert alert-' + this.props.type} role="alert">
            {this.props.text}
          </div>
        </div>
      </div>
    );
  }
}

export class Form {
  static Input = FormInput;
  static InputLarge = FormInputBig;
  static FileInput = FileInput;
  static Alert = FormAlert;
  static InputDateTime = FormInputDateTime;
}

export class DisplayEvent extends Component<{
  title: string,
  content: string,
  image: string,
  longitude: number,
  latitude: number,
  time_start: string,
  time_end: string
}> {
  render() {
    return (
      <Card title={this.props.title}>
        <img src={this.props.image} alt="Bilde kan ikke vises" />
        {this.props.content.split(/\n/).map(paragraph => (
          <p>{paragraph}</p>
        ))}
        <div className="card-footer text-muted">
          {'Starter: ' +
            moment(this.props.time_start).format('DD.MM.YYYY HH:mm') +
            '. Slutter: ' +
            moment(this.props.time_end).format('DD.MM.YYYY HH:mm')}
        </div>
      </Card>
    );
  }
}

class EventCatDropdown extends Component<{
  label?: React.Node,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed
}> {
  categories = [];
  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-1 col-form-label">{this.props.label}</label>
        <div className="col-sm-11">
          <select id="priority" className="form-control form-control">
            {this.categories.map(category => (
              <option value={category.categoryId}>{category.name}</option>
            ))}
            <option value={100}>Annet</option>
          </select>
        </div>
      </div>
    );
  }

  mounted() {
    eventCategoryService
      .getCategories()
      .then(categories => (this.categories = categories))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
