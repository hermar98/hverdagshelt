//@flow
import {IssueCategory} from "../models/IssueCategory";
import service from "./Service";
import {tokenManager} from "../tokenManager";

class IssueCategoryService {
  getCategories(): Promise<IssueCategory[]> {
    return service.get('/issueCat');
  }

  getCategory(categoryId: number): Promise<IssueCategory> {
    return service.get('/issueCat/' + categoryId);
  }

  updateCategory(category: IssueCategory): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.put('/issueCat/' + category.categoryId, category, {
      headers: {'x-access-token': token}
    });
  }

  addCategory(category: IssueCategory): Promise<number> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.post('/issueCat', category, {
      headers: {'x-access-token': token}
    });
  }

  deleteCategory(categoryId: number): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.delete('/issueCat/' + categoryId, {
      headers: {'x-access-token': token}
    });
  }
}

export let issueCategoryService = new IssueCategoryService();