import { ImageButton } from '../issueViews/issueViews';
import * as React from 'react';
import { municipalService } from '../../services/MunicipalService';
import { autocomplete, glob } from '../../../public/autocomplete';
import { userService } from '../../services/UserService';
import { tokenManager } from '../../tokenManager';
import { issueService } from '../../services/IssueService';
import { issueCategoryService } from '../../services/IssueCategoryService';
import { eventCategoryService } from '../../services/EventCategoryService';
import { IssueCategory } from '../../models/IssueCategory';
import { EventCategory } from '../../models/EventCategory';
import { sharedComponentData } from 'react-simplified';
import { Alert } from '../../widgets';
import { Component } from 'react-simplified';
import {history} from "../../index";

let sharedIssueCategories = sharedComponentData({issueCategory: []});
let sharedEventCategories = sharedComponentData({eventCategory: []});

export class AdminHandleCategories extends Component {
  issueCategory = new IssueCategory();
  eventCategory = new EventCategory();

  newIssueCategoryName = '';
  newEventCategoryName = '';
  render() {
    return (
      <div className="container-fluid categoryContainer">
        <div className="card issueCat">
          <h5 id="issueCat-title">Kategorier for sak</h5>
          <div className="card issueCat-inside">
            <div className="add-issueCat-field justify-content-between d-flex flex-row">
              <input
                className="form-control"
                id="issueCat-Input"
                type="text"
                value={this.newIssueCategoryName}
                placeholder="Legg til kategori for sak..."
                onChange={event => (this.newIssueCategoryName = event.target.value)}
              />
              <ImageButton source="../../images/add.png" onclick={() => this.handleAddIssueCategory()}/>
            </div>
            <ul className="list-group issue-list">
              {sharedIssueCategories.issueCategory.map((iCat, index) => (
                <li className="list-group-item issueCat-item">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    {' '}
                    {iCat.name}
                    <ImageButton
                      source="../../images/trashcan.png"
                      onclick={() => this.deleteIssueCategory(iCat.categoryId)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card eventCat">
          <h5 id="issueCat-title">Kategorier for event</h5>
          <div className="card eventCat-inside">
            <div className="add-issueCat-field justify-content-between d-flex flex-row">
              <input
                className="form-control"
                id="issueCat-Input"
                type="text"
                value={this.newEventCategoryName}
                placeholder="Legg til kategori for event..."
                onChange={event => (this.newEventCategoryName = event.target.value)}
              />
              <ImageButton source="../../images/add.png" onclick={() => this.handleAddEventCategory()}/>
            </div>
            <ul className="list-group event-list">
              {sharedEventCategories.eventCategory.map((eCat, index) => (
                <li className="list-group-item issueCat-item">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    {' '}
                    {eCat.name}
                    <ImageButton
                      source="../../images/trashcan.png"
                      onclick={() => this.deleteEventCategory(eCat.categoryId)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  mounted() {

    issueCategoryService
      .getCategories()
      .then(iCat => sharedIssueCategories.issueCategory = iCat)
      .catch((error: Error) => Alert.danger(error.message));

    eventCategoryService
      .getCategories()
      .then(eCat => (sharedEventCategories.eventCategory = eCat))
      .catch((error: Error) => Alert.danger(error.message));

      userService
          .getCurrentUser()
          .then(user => {
              if (user.rank === 1) {
                  history.push('/minSide');
              } else if (user.rank === 2) {
                  history.push('/bedrift');
              } else if (user.rank === 3) {
                  history.push('/kommune/' + user.munId);
              }
          })
          .catch((error : Error) => {
              console.log(error);
              history.push('/');
          })
  }


  handleAddIssueCategory() {
    if (this.newIssueCategoryName != '') {
      this.issueCategory.name = this.newIssueCategoryName;
      issueCategoryService.addCategory(this.issueCategory)
        .then(() => sharedIssueCategories.issueCategory.push(this.issueCategory))
        .then(() =>issueCategoryService.getCategories()
          .then(iCat => sharedIssueCategories.issueCategory = iCat)
          .catch((error: Error) => Alert.danger(error.message)))
        .catch((error: Error) => Alert.danger(error.message));
      this.newIssueCategoryName = '';

    }
  }

  handleAddEventCategory() {
    if (this.newEventCategoryName != '') {
      this.eventCategory.name = this.newEventCategoryName;
      eventCategoryService.addCategory(this.eventCategory)
        .then(()=> sharedEventCategories.eventCategory.push(this.eventCategory))
        .then(()=>eventCategoryService.getCategories()
          .then(eCat => sharedEventCategories.eventCategory = eCat)
          .catch((error: Error) => Alert.danger(error.message)))
        .catch((error: Error) => Alert.danger(error.message));
      this.newEventCategoryName = '';

    }
  }

  deleteIssueCategory(issueCategoryId: number) {
    issueCategoryService
      .deleteCategory(issueCategoryId)
      .then(rows => (sharedIssueCategories.issueCategory =
        sharedIssueCategories.issueCategory.filter(e => e.categoryId !== issueCategoryId)))
      .catch(error => console.log(error));
  }

  deleteEventCategory(eventCategoryId: number) {
    eventCategoryService
      .deleteCategory(eventCategoryId)
      .then(rows => (sharedEventCategories.eventCategory =
        sharedEventCategories.eventCategory.filter(e => e.categoryId !== eventCategoryId)))
      .catch(error => console.log(error));
  }
}
