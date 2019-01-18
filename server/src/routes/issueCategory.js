//@flow
import {IssueCategory} from '../models';

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//IssueCategory
app.get('/secure/issueCat', (req: Request, res: Response) => {
    return IssueCategory.findAll().then(issueCategories => res.send(issueCategories));
});
app.get('/secure/issueCat/:id', (req: Request, res: Response) => {
    return IssueCategory.findOne({ where: { categoryId: Number(req.params.id) } }).then(issueCategory =>
        issueCategory ? res.send(issueCategory) : res.sendStatus(404)
    );
});
app.put('/secure/issueCat/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);
    return IssueCategory.update(
        {
            name: req.body.name
        },
        {
            where: {
                categoryId: req.params.id
            }
        }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/issueCat', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);
    return IssueCategory.create({
        name: req.body.name
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/secure/issueCat/:id', function(req: Request, res: Response) {
    return IssueCategory.destroy({
        where: {
            categoryId: req.params.id
        }
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});