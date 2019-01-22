import Sequelize from 'sequelize';
import type { Model } from 'sequelize';
import { modelsTestData } from "./ModelsTestData";
// import { modelsTestDataSmall } from "./ModelsTestDataSmall";
require('dotenv').config({ path: '../.env' });

console.log(process.env.DATA_USERNAME);

let sequelize = new Sequelize(
  process.env.CI ? 'database' : process.env.DATA_BASE,
  process.env.CI ? 'root' : process.env.DB_USERNAME,
  process.env.CI ? '' : process.env.DB_PASSWORD,
  {
    host: process.env.CI ? 'mysql' : process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(function() {
    console.log('sucess');
  })
  .catch(function(error) {
    console.log('error: ' + error);
  });

export let Feedback: Class<
  Model<{ feedbackId?: number, name: string, content: string, date: Date }>
> = sequelize.define('Feedback', {
  feedbackId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  content: Sequelize.STRING(2000),
  date: Sequelize.DATE
});

export let Issue: Class<
  Model<{
    issueId?: number,
    title: string,
    content: string,
    image: string,
    longitude: number,
    latitude: number,
    statusId: number
  }>
> = sequelize.define('Issue', {
  issueId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  content: Sequelize.STRING(2500),
  image: Sequelize.STRING,
  longitude: Sequelize.DOUBLE,
  latitude: Sequelize.DOUBLE,
  statusId: { type: Sequelize.INTEGER, defaultValue: 1 }
});

export let IssuePicture: Class<
  Model<{
    pictureId?: number,
    title: string,
    imageSource: string
  }>
> = sequelize.define('IssuePicture', {
  pictureId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  imageSource: Sequelize.STRING
});

export let Event: Class<
  Model<{
    eventId?: number,
    title: string,
    content: string,
    image: string,
    longitude: number,
    latitude: number,
    timeStart: Date,
    timeEnd: Date
  }>
> = sequelize.define('Event', {
  eventId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  image: Sequelize.STRING,
  longitude: Sequelize.DOUBLE,
  latitude: Sequelize.DOUBLE,
  timeStart: Sequelize.DATE,
  timeEnd: Sequelize.DATE
});

export let User: Class<
  Model<{
    userId?: number,
    firstName: string,
    lastName: string,
    email: string,
    rank: number,
    salt?: string,
    hashStr?: string,
    munId: number,
    profilePicture?: string,
    resetPasswordToken?: string,
    resetPasswordExpires?: Date,
    activateAccountToken?: string
  }>
> = sequelize.define('User', {
  userId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true },
  rank: Sequelize.INTEGER,
  salt: Sequelize.STRING,
  hashStr: Sequelize.STRING,
  profilePicture: Sequelize.STRING,
  resetPasswordToken: { type: Sequelize.STRING, notNull: false },
  resetPasswordExpires: { type: Sequelize.DATE, notNull: false },
  activateAccountToken: { type: Sequelize.STRING, notNull: false }
});

export let Municipal: Class<Model<{ munId?: number, name: string, municipalShield?: string }>> = sequelize.define(
  'Municipal',
  {
    munId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    municipalShield: Sequelize.STRING
  }
);

export let County: Class<Model<{ countyId?: number, name: string, countyShield?: string }>> = sequelize.define(
  'County',
  {
    countyId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    countyShield: Sequelize.STRING
  }
);

export let Status: Class<Model<{ statusId?: number, name: string }>> = sequelize.define('Status', {
  statusId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING
});

export let IssueCategory: Class<Model<{ categoryId?: number, name: string }>> = sequelize.define('IssueCategory', {
  categoryId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING
});

export let EventCategory: Class<Model<{ categoryId?: number, name: string }>> = sequelize.define('EventCategory', {
  categoryId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING
});

export let UserMunicipal: Class<Model<{}>> = sequelize.define('UserMunicipal', {});

export let UserIssue: Class<Model<{}>> = sequelize.define('UserIssue', {});

County.hasMany(Municipal, { foreignKey: 'countyId' });
Municipal.hasMany(User, { foreignKey: 'munId' });
Municipal.hasMany(Issue, { foreignKey: 'munId' });
Municipal.hasMany(Event, { foreignKey: 'munId' });

Municipal.belongsToMany(User, { through: 'UserMunicipal', foreignKey: 'munId' });
User.belongsToMany(Municipal, { through: 'UserMunicipal', foreignKey: 'userId' });

User.belongsToMany(Issue, { through: 'UserIssue', foreignKey: 'userId' });
Issue.belongsToMany(User, { through: 'UserIssue', foreignKey: 'issueId' });

Issue.belongsTo(IssueCategory, { foreignKey: 'categoryId' });
Issue.belongsTo(Status, { foreignKey: 'statusId' });
Issue.hasMany(Feedback, { foreignKey: 'issueId' });
Issue.hasMany(IssuePicture, { foreignKey: 'issueId' });

User.hasMany(Issue, { foreignKey: 'userId' });
User.hasMany(Event, { foreignKey: 'userId' });
User.hasMany(Feedback, { foreignKey: 'userId' });

Event.belongsTo(EventCategory, { foreignKey: 'categoryId' });

//Municipal.belongsTo(County, {foreignKey: 'fk_companyname', targetKey: 'name'});
//hasOne, target model is the foreign key
//belongsTO, source model is the foreign key
//hasMany

// Drop tables and create test data when not in production environment
let production = process.env.NODE_ENV === 'production';
// The sync promise can be used to wait for the database to be ready (for instance in your tests)
export let sync = sequelize.sync({ force: !production }).then(() => {
    if (!production) {
        return modelsTestData.createAll()
    }
});
// export let syncSmall = sequelize.sync({ force: !production }).then(() => {
//     if (!production) {
//         return modelsTestDataSmall.createAll()
//     }
// });
