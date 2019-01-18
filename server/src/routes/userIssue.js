//@flow
import {Issue, User, UserIssue} from '../models';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//GET
app.get('/secure/users/:id/issues', (req: Request, res: Response) => {
    return Issue.findAll({
        include: [
            {
                model: User,
                as: 'Users',
                attributes: [],
                where: { userId: Number(req.params.id) }
                // through: { model: UserIssue, as: 'UserIssues' }
            }
        ]
    }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.post('/secure/users/:userId/issues/:issueId', (req: Request, res: Response) => {
    return UserIssue.create({
        userId: req.params.userId,
        issueId: req.params.issueId
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/users/:userId/issues/:issueId', (req: Request, res: Response) => {
    return UserIssue.destroy({ where: { userId: req.params.userId, issueId: req.params.issueId } }).then(count =>
        count ? res.sendStatus(200) : res.sendStatus(404)
    );
});
