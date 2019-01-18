//@flow
import {EventCategory} from "../models";
import axios from "axios";

class EventCategoryService {
  getCategories(): Promise<EventCategory[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/secure/eventCat', {
      headers: {'x-access-token': token}
    });
  }

  getCategory(categoryId: number): Promise<EventCategory> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/secure/eventCat/' + categoryId, {
      headers: {'x-access-token': token}
    });
  }

  updateCategory(category: EventCategory): Promise<void> {
    return axios.put('/secure/eventCat/' + category.categoryId, category);
  }

  addCategory(category: EventCategory): Promise<number> {
    return axios.post('/secure/eventCat', category);
  }

  deleteCategory(categoryId: number): Promise<void> {
    return axios.delete('/secure/eventCat/' + categoryId);
  }
}

export let eventCategoryService = new EventCategoryService();