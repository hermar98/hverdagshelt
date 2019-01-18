//@flow
import {Feedback} from "../models";
import axios from "axios";

class FeedbackService {
  getFeedbacks(issueId: number): Promise<Feedback[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/secure/issues/' + issueId + '/feedback', {
      headers: {'x-access-token': token}
    });
  }

  addFeedback(feedback: Feedback): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.post('/secure/feedback', feedback, {
      headers: {'x-access-token': token}
    });
  }

  deleteFeedback(feedbackId: number): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.delete('/feedback/' + feedbackId, {
      headers: {'x-access-token': token}
    });
  }

}

export let feedbackService = new FeedbackService();