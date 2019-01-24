import {Issue} from "../models/Issue";
import {User} from "../models/User";
import service from "./Service";

export class UserIssues {

    getUserIssues(userId: number): Promise<Issue[]> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/secure/users/' + userId + '/issues', {
            headers: {'x-access-token': token}
        });
    }

    getAllUserIssues(rank: number, statusId: number): Promise<User[]> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/secure/usersIssues/' + rank + '/status/' + statusId, {
            headers: {'x-access-token': token}
        });
    }

    getAllFreeUserIssues(statusId: number): Promise<Issue[]> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/secure/freeUsersIssues/' + statusId, {
            headers: {'x-access-token': token}
        });
    }

    addUserIssue(userId: number, issueId: number): Promise<void> {
        let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.post('/secure/users/' + userId + '/issues/' + issueId, {
        headers: {'x-access-token': token}
    });
    }

    deleteUserIssue(userId: number, issueId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.delete('/secure/users/' + userId + '/issues/' + issueId, {
        headers: {'x-access-token': token}
    });
    }
}

export let userIssueService = new UserIssues();