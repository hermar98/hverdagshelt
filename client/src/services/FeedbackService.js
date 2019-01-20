//@flow
import {Feedback} from "../models/Feedback";
import service from "./Service";

class FeedbackService {
  getFeedbacks(issueId: number): Promise<Feedback[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/issues/' + issueId + '/feedback', {
      headers: {'x-access-token': token}
    });
  }

  addFeedback(feedback: Feedback): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.post('/secure/feedback', feedback, {
      headers: {'x-access-token': token}
    });
  }

  deleteFeedback(feedbackId: number): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.delete('/feedback/' + feedbackId, {
      headers: {'x-access-token': token}
    });
  }

}

export let feedbackService = new FeedbackService();