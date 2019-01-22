//@flow

import {Issue} from "../models";
import service from "./Service";


class IssueService {
  getIssues(): Promise<Issue[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/issues', {
      headers: {'x-access-token': token}
    });
  }

  getIssuesByUser(userId: number): Promise<Issue[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/users/' + userId + '/issues', {
      headers: {'x-access-token': token}
    });
  }

  getIssue(issueId: number): Promise<Issue> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/issues/' + issueId, {
      headers: {'x-access-token': token}
    });
  }

  getIssuesByMunicipal(munId: number): Promise<Issue[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    console.log(munId);
    console.log('s');
    return service.get('/municipals/' + munId + '/issues', {
      headers: {'x-access-token': token}
    });
  }

  updateIssue(issue: Issue): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.put('/secure/issues/' + issue.issueId, issue, {
      headers: {'x-access-token': token}
    });
  }

  addIssue(issue: Issue): Promise<Issue> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.post('/secure/issues', issue, {
      headers: {'x-access-token': token}
    });
  }

  deleteIssue(issueId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.delete('/secure/issues/' + issueId, {
      headers: {'x-access-token': token}
    });
  }
}

export let issueService = new IssueService();