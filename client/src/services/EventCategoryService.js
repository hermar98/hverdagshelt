//@flow
import {EventCategory} from "../models";
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
    return service.post('/secure/eventCat', category);
  }

  deleteCategory(categoryId: number): Promise<void> {
    return service.delete('/secure/eventCat/' + categoryId);
  }
}

export let eventCategoryService = new EventCategoryService();