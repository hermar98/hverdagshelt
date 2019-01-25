//@flow
import {Issue, User, UserIssue} from '../models';
import {tokenManager} from "../tokenManager";

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//GET
app.get('/users/:id/issues', (req: Request, res: Response) => {
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

app.post('/users/:userId/issues/:issueId', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return UserIssue.create({
            userId: req.params.userId,
            issueId: req.params.issueId
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});

app.delete('/users/:userId/issues/:issueId', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return UserIssue.destroy({ where: { userId: req.params.userId, issueId: req.params.issueId } }).then(count =>
            count ? res.sendStatus(200) : res.sendStatus(404)
        );
    } else {
        res.sendStatus(401);
    }
});
