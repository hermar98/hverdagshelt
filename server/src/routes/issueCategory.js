//@flow
import { IssueCategory } from '../models';
import {tokenManager} from "../tokenManager";

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//IssueCategory
app.get('/issueCat', (req: Request, res: Response) => {
    return IssueCategory.findAll().then(issueCategories => res.send(issueCategories));
});
app.get('/issueCat/:id', (req: Request, res: Response) => {
    return IssueCategory.findOne({ where: { categoryId: Number(req.params.id) } }).then(issueCategory =>
        issueCategory ? res.send(issueCategory) : res.sendStatus(404)
    );
});
app.put('/issueCat/:id', (req: Request, res: Response) => {
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { name } = body;

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return IssueCategory.update(
            {
                name: name
            },
            {
                where: {
                    categoryId: req.params.id
                }
            }
        ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});
app.post('/issueCat', (req: Request, res: Response) => {
    const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
    const { name } = body;

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return IssueCategory.create({
            name: name
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});
app.delete('/issueCat/:id', function(req: Request, res: Response) {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return IssueCategory.destroy({
            where: {
                categoryId: req.params.id
            }
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});