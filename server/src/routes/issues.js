import {Issue, Feedback, User, IssueCategory} from "../models";
import {sequelize} from "../models";
import {mailSender} from '../MailSender';
import {tokenManager} from "../tokenManager";

type Request = express$Request;
type Response = express$Response;

const app = require('../app');

app.get('/issues/:lim/limit/:offset/offset/:catId/category/:order/ordering/:statusId/status/:munId/municipal', (req: Request, res: Response) => {
    let where = {offset: parseInt(req.params.offset)};
    where.where  = {
        categoryId: 0,
    };

    where.where +={
        statusId: 0
    };

    console.log(where);
    console.log(where.where);

    let order;
    if(req.params.order = 0){
        order = 'DESC'
    } else{
        order = 'ASC'
    }

    let catId;
    if(req.params.catId != 0){
        catId = req.params.catId;;
    } else {
        catId = {$ne: null};
    }

    let statusId;
    if(req.params.statusId != 0) {
        statusId = req.params.statusId;
    } else {
        statusId = {$ne: null};
    }

    let munId;
    if(req.params.munId != 0) {
        munId = req.params.munId;
    } else {
        munId = {$ne: null};
    }

    return Issue.findAll({
        where: {
            categoryId: catId,
            statusId: statusId,
            munId: munId
        },
        order: [
            ['createdAt', order]
        ],
        offset: parseInt(req.params.offset),
        limit: parseInt(req.params.lim),
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/desc', (req: Request, res: Response) => {
    return Issue.findAll({
            offset: req.params.offset,
            limit: req.params.lim,
            order: [
                ['createdAt', 'DESC']
            ]
        }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/asc', (req: Request, res: Response) => {
    return Issue.findAll({
        offset: req.params.offset,
        limit: req.params.lim,
        order: [
            ['createdAt']
        ]
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/cat/asc', (req: Request, res: Response) => {
    return Issue.findAll({
        where: {categoryId: req.params.categoryId},
        offset: req.params.offset,
        limit: req.params.lim,
        order: [
            ['createdAt']
        ]
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/issues/:lim/limit/:offset/offset/cat/desc', (req: Request, res: Response) => {
    return Issue.findAll({
        where: {categoryId: req.params.categoryId},
        offset: req.params.offset,
        limit: req.params.lim,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then( issue => (issue ? res.send(issue) : res.sendStatus(404))
    );
});

app.get('/municipals/:id/issues', (req: Request, res: Response) => {
    return Issue.findAll({ where: { munId: Number(req.params.id) },
                            order: [['createdAt', 'DESC']]})
      .then(issues => issues ? res.send(issues) : res.sendStatus(404)
    );
});

app.get('/municipals/:id/issues/count', (req: Request, res: Response) => {
    return sequelize.query(
        'SELECT COUNT(*) AS numberOfIssues, MONTH(createdAt) AS month FROM Issues WHERE munId = :munId AND YEAR(createdAt) = :year GROUP BY MONTH(createdAt)',
        {replacements: {munId: Number(req.params.id), year: Number(req.query.year)}, type: sequelize.QueryTypes.SELECT}
    ).then(count => count ? res.send(count) : res.sendStatus(404));
});

app.get('/users/:id/issues', (req: Request, res: Response) => {
    return Issue.findAll({ where: { userId: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});


//Issue

app.get('/issues', (req: Request, res: Response) => {
    return Issue.findAll().then(issues => res.send(issues));
});
app.get('/issues/:id', (req: Request, res: Response) => {
    return Issue.findOne({ where: { issueId: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});
app.get('/issues/:id/feedback', (req: Request, res: Response) => {
    return Feedback.findAll({ where: { issueId: Number(req.params.id) } }).then(issue =>
        issue ? res.send(issue) : res.sendStatus(404)
    );
});


app.put('/issues/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return Issue.update(
            {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                statusId: req.body.statusId,
                date: req.body.date,
                munId: req.body.munId
            },
            {
                where: {
                    issueId: req.params.id
                }
            }
        ).then(issue => (issue ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});
app.post('/issues', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return Issue.create({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            status: req.body.status,
            statusId: req.body.statusId,
            categoryId: req.body.categoryId,
            munId: req.body.munId,
            userId: req.body.userId
        }).then(count => {
            if(!count){
                console.log("Something went wrong")

                res.sendStatus(404);
            }else{
                console.log("Nothing wrong here, please continue");

                res.send(count);
                User.findOne({
                    where: {
                        userId: req.body.userId
                    }
                }).then(user => mailSender.sendEmail(user.email, "Din sak har blitt registrert!", "Hei " + user.firstName + " " +
                    user.lastName + "!\n\nDin sak har nå blitt registrert i systemet, og en av våre fremste ansatte vil så fort" +
                    " som mulig påbegynne saksbehandlingen. Tusen takk for at du melder inn feil, og bidrar til å gjøre Norge et bedre sted!\n\nMed vennlig hilsen\n" +
                    "Hverdagshelt AS"));
            }
        });
    } else {
        res.sendStatus(401);
    }
});

app.delete('/issues/:id', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
        return Issue.destroy({
            where: {
                issueId: req.params.id
            }
        }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    } else {
        res.sendStatus(401);
    }
});
