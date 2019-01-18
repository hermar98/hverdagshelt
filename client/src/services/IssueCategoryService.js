//@flow
import {IssueCategory} from "../models";
import axios from "axios";

class IssueCategoryService {
  getCategories(): Promise<IssueCategory[]> { //TODO: THIS DOES NOT NEED TO BE SECURE? CANT SHOW ISSUES
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/secure/issueCat', {
      headers: {'x-access-token': token}
    });
  }

  getCategory(categoryId: number): Promise<IssueCategory> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/secure/issueCat/' + categoryId, {
      headers: {'x-access-token': token}
    });
  }

  updateCategory(category: IssueCategory): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.put('/secure/issueCat/' + category.categoryId, category, {
      headers: {'x-access-token': token}
    });
  }

  addCategory(category: IssueCategory): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.post('/secure/issueCat', category, {
      headers: {'x-access-token': token}
    });
  }

  deleteCategory(categoryId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.delete('/secure/issueCat/' + categoryId, {
      headers: {'x-access-token': token}
    });
  }
}

export let issueCategoryService = new IssueCategoryService();