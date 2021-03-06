//@flow
import {Issue, User, UserIssue} from '../models';
import Sequelize from "../../flow-typed/npm/sequelize_v4.x.x";
import {tokenManager} from "../tokenManager";

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//GET
app.get('/secure/usersIssue/:id', (req: Request, res: Response) => {
  return Issue.findAll({
    include: [
      {
        model: User,
        as: 'Users',
        attributes: [],
        through: { model: UserIssue, as: 'UserIssues' }
      }
    ],
    where: { '$Users.userId$': Number(req.params.id) }
  }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.get('/secure/freeUsersIssues/:statusId', (req: Request, res: Response) => {
  const Op = Sequelize.Op;
  console.log('oh fuk');
  return Issue.findAll({
    include: [
      {
        model: User,
        as: 'Users',
        through: { model: UserIssue, as: 'UserIssues' },
        // attributes: [],
        required: false
      }
    ],
    where: { '$Users.userId$': null, $or: [{statusId: 1}, {statusId: 2}, {statusId: 3}] }
    // where: { statusId: Number(req.params.statusId)}
  }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.get('/secure/UsersIssues/:rank/status/:statusId', (req: Request, res: Response) => {
    console.log("oh fuk");
    return User.findAll({
        include: [
            {
                model: Issue,
                as: 'Issues',
                // through: { model: UserIssue, as: 'UserIssues' },
                // attributes: [],
                required:   false,
                where: {$or: [{statusId: 1}, {statusId: 2}, {statusId: 3}]}
            }
        ],
        where: {rank: req.params.rank},
        // where: { statusId: Number(req.params.statusId)}
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
