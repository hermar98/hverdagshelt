//@flow

import {Issue} from "../models/Issue";
import service from "./Service";
import {tokenManager} from "../tokenManager";


class IssueService {
  getIssues(): Promise<Issue[]> {
    return service.get('/issues');
  }

  getIssuesByUser(userId: number): Promise<Issue[]> {
    return service.get('/users/' + userId + '/issues');
  }

  getIssue(issueId: number): Promise<Issue> {
    return service.get('/issues/' + issueId);
  }

  getIssuesByMunicipal(munId: number): Promise<Issue[]> {
    return service.get('/municipals/' + munId + '/issues');
  }

  updateIssue(issue: Issue): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.put('/issues/' + issue.issueId, issue, {
      headers: {'x-access-token': token}
    });
  }

  addIssue(issue: Issue): Promise<Issue> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.post('/issues', issue, {
      headers: {'x-access-token': token}
    });
  }

  deleteIssue(issueId: number): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.delete('/issues/' + issueId, {
      headers: {'x-access-token': token}
    });
  }

  getNumberOfIssues(munId: number, year: number): Promise<JSON[]> {
      return service.get('/municipals/' + munId + '/issues/count?year=' + year);
  }
}

export let issueService = new IssueService();