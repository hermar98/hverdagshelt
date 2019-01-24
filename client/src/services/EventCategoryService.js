//@flow
import {EventCategory} from "../models/EventCategory";
import service from "./Service";

class EventCategoryService {
  getCategories(): Promise<EventCategory[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/eventCat', {
      headers: {'x-access-token': token}
    });
  }

  getCategory(categoryId: number): Promise<EventCategory> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/eventCat/' + categoryId, {
      headers: {'x-access-token': token}
    });
  }

  updateCategory(category: EventCategory): Promise<void> {
    return service.put('/secure/eventCat/' + category.categoryId, category);
  }

  addCategory(category: EventCategory): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.post('/secure/eventCat', category, {
      headers: {'x-access-token': token}
    });
  }

  deleteCategory(categoryId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.delete('/secure/eventCat/' + categoryId, {
      headers: {'x-access-token': token}
    });
  }
}

export let eventCategoryService = new EventCategoryService();