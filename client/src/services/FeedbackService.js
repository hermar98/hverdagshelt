//@flow
import {Feedback} from "../models/Feedback";
import service from "./Service";
import {tokenManager} from "../tokenManager";

class FeedbackService {
  getFeedbacks(issueId: number): Promise<Feedback[]> {
    return service.get('/issues/' + issueId + '/feedback');
  }

  addFeedback(feedback: Feedback): Promise<number> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.post('/feedback', feedback, {
      headers: {'x-access-token': token}
    });
  }

  updateFeedback(feedback: Feedback): Promise<number> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.put('/feedback/' + feedback.feedbackId, feedback, {
        headers: {'x-access-token': token}
    });
  }

  deleteFeedback(feedbackId: number): Promise<number> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.delete('/feedback/' + feedbackId, {
      headers: {'x-access-token': token}
    });
  }

}

export let feedbackService = new FeedbackService();