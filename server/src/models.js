// @flow

import Sequelize from 'sequelize';
import type { Model } from 'sequelize';

let sequelize = new Sequelize(
  process.env.CI ? 'articles' : 'sebasman',
  process.env.CI ? 'root' : 'sebasman',
  process.env.CI ? '' : 'GSBLuzbB',
  {
    host: process.env.CI ? 'mysql' : 'mysql.stud.iie.ntnu.no',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export let Students: Class<
    Model<{ id?: number, firstName: string, lastName: string, email: string }>
    >= sequelize.define('Students', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING
});

export let User: Class<
    Model<{ user_id?: number, firstName: string, lastName: string, email: string, rank: number, salt: string, hash_str: string }>
    > = sequelize.define('User', {
    user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    rank: Sequelize.INTEGER,
    salt: Sequelize.STRING,
    hash_str: Sequelize.STRING
});

export let County: Class<
    Model<{ county_id?: number, name: string}>
    > = sequelize.define('County', {
    county_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

export let Municipal: Class<
    Model<{ mun_id?: number, name: string}>
    > = sequelize.define('Municipal', {
    mun_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

export let Status: Class<
    Model<{ status_id?: number, name: string}>
    > = sequelize.define('Status', {
    status_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

export let Issue_category: Class<
    Model<{ category_id?: number, name: string}>
    > = sequelize.define('Issue_category', {
    category_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

export let Issue: Class<
    Model<{ issue_id?: number, title: string, content: string, image: string, longitude: number, latitude: number, date: date}>
    > = sequelize.define('Issue', {
    issue_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    image: Sequelize.STRING,
    longitude: Sequelize.BIGINT,
    latitude: Sequelize.BIGINT,
    date: Sequelize.DATE
});

export let Feedback: Class<
    Model<{ feedback_id?: number, content: string, date: date}>
    > = sequelize.define('Feedback', {
    category_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    content: Sequelize.STRING,
    date: Sequelize.DATE,
});

export let Event_category: Class<
    Model<{ event_id?: number, name: string}>
    > = sequelize.define('Event_category', {
    event_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

export let Event: Class<
    Model<{ event_id?: number, title: string, content: string, image: string, longitude: number, latitude: number, date: date}>
    > = sequelize.define('Event', {
    event_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    image: Sequelize.STRING,
    longitude: Sequelize.BIGINT,
    latitude: Sequelize.BIGINT,
    date: Sequelize.DATE
});

County.hasMany(Municipal, {foreignKey: 'county_id'});
Municipal.hasMany(User, {foreignKey: 'municipal_id'});
Municipal.hasMany(Issue, {foreignKey: 'municipal_id'});

Municipal.belongsToMany(User, {through: 'User_municipal', foreignKey: 'mun_id'});
User.belongsToMany(Municipal, {through: 'User_municipal', foreignKey: 'user_id'});

User.belongsToMany(Issue, {through: 'User_issue', foreignKey: 'user_id'});
Issue.belongsToMany(User, {through: 'User_issue', foreignKey: 'issue_id'});

User.hasMany(Issue, {foreignKey: 'user_id'});
User.hasMany(Event, {foreignKey: 'user_id'});
User.hasMany(Feedback, {foreignKey: 'user_id'});

Issue.belongsTo(Issue_category, {foreignKey: 'category_id}'});
Issue.belongsTo(Status, {foreignKey: 'status_id'});
Feedback.hasMany(Issue, {foreignKey: 'feedback_id'});

Event.belongsTo(Event_category, {foreignKey: 'category_id}'});



//Municipal.belongsTo(County, {foreignKey: 'fk_companyname', targetKey: 'name'});
//hasOne, target model is the foreign key
//belongsTO, source model is the foreign key
//hasMany

// Drop tables and create test data when not in production environment
let production = process.env.NODE_ENV === 'production';
// The sync promise can be used to wait for the database to be ready (for instance in your tests)
export let sync = sequelize.sync({ force: production ? false : true }).then(() => {
  if (!production)
    return User.create({
        firstName: 'Vegard',
        lastName: 'Andersson',
        email: 'vegaande@ntnu.stud.no',
        rank: 1,
        salt: 'b79ryp97',
        hash_str: '897dfjsodif5vx24c5vsldfskdclz97cyw7e3o2inJKHaospk902'
    }).then(() =>
      Students.create({
        firstName: 'Kari',
        lastName: 'Larsen',
        email: 'kari.larsen@ntnu.no'
      })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    ).then(() =>
        Students.create({
            firstName: 'Kari',
            lastName: 'Larsen',
            email: 'kari.larsen@ntnu.no'
        })
    );
});
