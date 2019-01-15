import {Issue} from "../models";
import Sequelize from "../../flow-typed/npm/sequelize_v4.x.x";

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