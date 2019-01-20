//@flow

import {User} from "../models/User";

export class Feedback {
    feedbackId: number;
    name: string;
    content: string;
    date: Date;
    userId: number;
    issueId: number;
    user: User;
    createdAt: Date;
}
