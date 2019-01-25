//@flow
import {EventCategory} from "../models/EventCategory";
import service from "./Service";
import {tokenManager} from '../tokenManager.js';

class EventCategoryService {
  getCategories(): Promise<EventCategory[]> {
    return service.get('/eventCat');
  }

  getCategory(categoryId: number): Promise<EventCategory> {
    return service.get('/eventCat/' + categoryId);
  }

  updateCategory(category: EventCategory): Promise<void> {
    let token = tokenManager.getJwt();
    tokenManager.getNewToken()
        .then(newToken => tokenManager.updateToken(newToken))
        .catch((error: Error) => console.log(error));

    return service.put('/eventCat/' + category.categoryId, category, {
        headers: {'x-access-token': token}
    });
  }

  addCategory(category: EventCategory): Promise<number> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

      return service.post('/eventCat', category, {
          headers: {'x-access-token': token}
      });
  }

  deleteCategory(categoryId: number): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

      return service.delete('/eventCat/' + categoryId, {
          headers: {'x-access-token': token}
      });
  }
}

export let eventCategoryService = new EventCategoryService();