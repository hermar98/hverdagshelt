import Sequelize from 'sequelize';
import type { Model } from 'sequelize';
require('dotenv').config({ path: 'C:\\hverdagshelt_Team_3\\.env' });

let sequelize = new Sequelize(
  process.env.CI ? 'database' : 'hverdagshelt',
  process.env.CI ? 'root' : 'user',
  process.env.CI ? '' : 'password',
  // process.env.CI ? 'database' : 'sebasman',
  // process.env.CI ? 'root' : 'sebasman',
  // process.env.CI ? '' : 'GSBLuzbB',
  {
    host: process.env.CI ? 'mysql' : 'localhost',
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
  content: Sequelize.STRING,
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
  content: Sequelize.STRING,
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
    resetPasswordExpires?: Date
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
  resetPasswordExpires: { type: Sequelize.DATE, notNull: false }
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
export let sync = sequelize.sync({ force: production ? false : true }).then(() => {
  if (!production)
    return County.bulkCreate([
      {
        countyId: 1,
        name: 'Østfold'
      },
      {
        countyId: 2,
        name: 'Akershus'
      },
      {
        countyId: 3,
        name: 'Oslo'
      },
      {
        countyId: 4,
        name: 'Hedmark'
      },
      {
        countyId: 5,
        name: 'Oppland'
      },
      {
        countyId: 6,
        name: 'Buskerud'
      },
      {
        countyId: 7,
        name: 'Vestfold'
      },
      {
        countyId: 8,
        name: 'Telemark'
      },
      {
        countyId: 9,
        name: 'Aust-Agder'
      },
      {
        countyId: 10,
        name: 'Vest-Agder'
      },
      {
        countyId: 11,
        name: 'Rogaland'
      },
      {
        countyId: 12,
        name: 'Hordaland'
      },
      {
        countyId: 14,
        name: 'Sogn og Fjordane'
      },
      {
        countyId: 15,
        name: 'Møre og Romsdal'
      },
      {
        countyId: 50,
        name: 'Trøndelag'
      },
      {
        countyId: 18,
        name: 'Nordland'
      },
      {
        countyId: 19,
        name: 'Troms'
      },
      {
        countyId: 20,
        name: 'Finnmark'
      }
    ])
      .then(() =>
        Municipal.bulkCreate([
          { munId: 5016, name: 'Agdenes', countyId: 50 },
          { munId: 1820, name: 'Alstahaug', countyId: 18 },
          { munId: 2012, name: 'Alta', countyId: 20 },
          { munId: 1418, name: 'Balestrand', countyId: 14 },
          { munId: 1854, name: 'Ballangen', countyId: 18 },
          { munId: 1933, name: 'Balsfjord', countyId: 19 },
          { munId: 511, name: 'Dovre', countyId: 5 },
          { munId: 602, name: 'Drammen', countyId: 6 },
          { munId: 817, name: 'Drangedal', countyId: 8 },
          { munId: 427, name: 'Elverum', countyId: 4 },
          { munId: 237, name: 'Eidsvoll', countyId: 2 },
          { munId: 229, name: 'Enebakk', countyId: 2 },
          { munId: 1003, name: 'Farsund', countyId: 10 },
          { munId: 5036, name: 'Frosta', countyId: 50 },
          { munId: 1432, name: 'Førde', countyId: 14 },
          { munId: 502, name: 'Gjøvik', countyId: 5 },
          { munId: 617, name: 'Gol', countyId: 6 },
          { munId: 5045, name: 'Grong', countyId: 50 },
          { munId: 101, name: 'Halden', countyId: 1 },
          { munId: 1903, name: 'Harstad', countyId: 19 },
          { munId: 1826, name: 'Hattfjelldal', countyId: 18 },
          { munId: 5053, name: 'Inderøy', countyId: 50 },
          { munId: 5054, name: 'Indre Fosen', countyId: 50 },
          { munId: 935, name: 'Iveland', countyId: 9 },
          { munId: 532, name: 'Jevnaker', countyId: 5 },
          { munId: 1227, name: 'Jondal', countyId: 12 },
          { munId: 1431, name: 'Jølster', countyId: 14 },
          { munId: 2021, name: 'Karasjok', countyId: 20 },
          { munId: 1120, name: 'Klepp', countyId: 11 },
          { munId: 5030, name: 'Klæbu', countyId: 50 },
          { munId: 5037, name: 'Levanger', countyId: 50 },
          { munId: 514, name: 'Lom', countyId: 5 },
          { munId: 1422, name: 'Lærdal', countyId: 14 },
          { munId: 1002, name: 'Mandal', countyId: 10 },
          { munId: 5034, name: 'Meråker', countyId: 50 },
          { munId: 1502, name: 'Molde', countyId: 15 },
          { munId: 5005, name: 'Namsos', countyId: 50 },
          { munId: 216, name: 'Nesodden', countyId: 2 },
          { munId: 807, name: 'Notodden', countyId: 8 },
          { munId: 1228, name: 'Odda', countyId: 12 },
          { munId: 5021, name: 'Oppdal', countyId: 50 },
          { munId: 1243, name: 'Os', countyId: 12 },
          { munId: 2020, name: 'Porsanger', countyId: 20 },
          { munId: 805, name: 'Porsgrunn', countyId: 8 },
          { munId: 5043, name: 'Røyrvik', countyId: 50 },
          { munId: 1127, name: 'Randaberg', countyId: 11 },
          { munId: 432, name: 'Rendalen', countyId: 4 },
          { munId: 1840, name: 'Saltdal', countyId: 18 },
          { munId: 710, name: 'Sandefjord', countyId: 7 },
          { munId: 1573, name: 'Smøla', countyId: 15 },
          { munId: 1560, name: 'Tingvoll', countyId: 15 },
          { munId: 5001, name: 'Trondheim', countyId: 50 },
          { munId: 1835, name: 'Træna', countyId: 18 },
          { munId: 235, name: 'Ullensaker', countyId: 2 },
          { munId: 1231, name: 'Ullensvang', countyId: 12 },
          { munId: 1516, name: 'Ulstein', countyId: 15 },
          { munId: 2003, name: 'Vadsø', countyId: 20 },
          { munId: 5038, name: 'Verdal', countyId: 50 },
          { munId: 529, name: 'Vestre Toten', countyId: 5 },
          { munId: 1868, name: 'Øksnes', countyId: 18 },
          { munId: 5015, name: 'Ørland', countyId: 50 },
          { munId: 528, name: 'Østre Toten', countyId: 5 },
          { munId: 5018, name: 'Åfjord', countyId: 50 },
          { munId: 1503, name: 'Ålesund', countyId: 15 },
          { munId: 1424, name: 'Årdal', countyId: 14 }
        ])
      )
      .then(() =>
        User.bulkCreate(
          [
            {
              firstName: 'Vegard',
              lastName: 'Andersson',
              email: 'test@test.no',
              rank: 2,
              salt: 'a83f4da094cc247b',
              hashStr:
                '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722',
              munId: 5016,
              profilePicture: '',
              Municipal: [{ munId: 528 }, { munId: 5027 }]
            },
            {
              firstName: 'Christian',
              lastName: 'Axell',
              email: 'cdaxell@stud.ntnu.no',
              rank: 3,
              salt: 'a83f4da094cc247b',
              hashStr:
                '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722',
              munId: 528,
              profilePicture:
                'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
            },
            {
              firstName: 'Sebastian',
              lastName: 'Andresen',
              email: 'sebasman@stud.ntnu.no',
              rank: 3,
              salt: 'b79ryp98',
              hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
              munId: 1503,
              profilePicture:
                'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
            },
            {
              firstName: 'Trond Jacob',
              lastName: 'Rondestvedt',
              email: 'trondjro@stud.ntnu.no',
              rank: 1,
              salt: 'b79ryp98',
              hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
              munId: 528,
              profilePicture:
                'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
            },
            {
              firstName: 'Sander',
              lastName: 'Nicolausson',
              email: 'sandern@stud.ntnu.no',
              rank: 1,
              salt: 'b79ryp98',
              hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
              munId: 528,
              profilePicture:
                'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
            },
            {
              firstName: 'Jørgen',
              lastName: 'Aasvestad',
              email: 'jorgaas@stud.ntnu.no',
              rank: 1,
              salt: 'b79ryp98',
              hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
              munId: 528,
              profilePicture:
                'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
            },
            {
              firstName: 'Herman Ryen',
              lastName: 'Martinsen',
              email: 'HermanRM@stud.ntnu.no',
              rank: 1,
              salt: 'b79ryp98',
              hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
              munId: 528,
              profilePicture:
                'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
            },
            {
              firstName: 'Herman',
              lastName: 'Christiansen',
              email: 'hermanc@stud.ntnu.no',
              rank: 1,
              salt: 'b79ryp98',
              hashStr: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
              munId: 528,
              profilePicture:
                'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
            }
          ],
          {
            include: [
              {
                model: Municipal,
                as: 'munId'
              }
            ]
          }
        )
      )
      .then(() =>
        Status.bulkCreate([
          {
            statusId: 6,
            name: 'Ikke Behandlet'
          },
          {
            statusId: 2,
            name: 'Under Behandling'
          },
          {
            statusId: 3,
            name: 'Saken er fikset!'
          },
          {
            statusId: 4,
            name: 'Saken ble forlatt'
          },
          {
            statusId: 5,
            name: 'Saken er slettet'
          },
          {
            statusId: 1,
            name: 'Situation Normal, All fucked upp'
          }
        ])
      )
      .then(() =>
        IssueCategory.bulkCreate([
          { name: 'Fyllikere på gata som ødeleger lamper' },
          { name: 'En veilys er ødelagt' },
          { name: 'Et veihul på gata' },
          { name: 'Grafitti på offentlig bygning' },
          { name: 'Sømpel dumpet' },
          { name: 'Forlatt Sykkel' }
        ])
      )
      .then(() =>
        Issue.bulkCreate([
          {
            issueId: 1,
            title: 'Dumme folk ødeleger lømp',
            content: 'Disse dumme folka som komemr rett fra byen ødeleger lamper kvelden til midtnatt',
            image:
              'https://www.thesun.co.uk/wp-content/uploads/2018/07/AF-COMPOSITE-FIGHT.jpg?strip=all&quality=100&w=750&h=500&crop=1',
            longitude: 60.656877,
            latitude: 10.824107,
            date: new Date(Date.now()),
            munId: 528,
            userId: 1,
            categoryId: 1,
            statusId: 1
          },

          {
            issueId: 2,
            title: 'Veilys på gata hjemme er ødelagt',
            content: 'Et veilys på gata har blitt ødelagt',
            image: 'http://www.otera.no/image/20111206015-kopi.jpeg?w=1200',
            longitude: 60.661293,
            latitude: 10.828996,
            date: new Date(Date.now()),
            munId: 528,
            userId: 3,
            categoryId: 2,
            statusId: 2
          },

          {
            issueId: 3,
            title: 'Dårlig grafitti på skole veggen',
            content: 'Det er dårlig grafitti på skole veggen',
            image: 'http://i.imgur.com/so8Ea.jpg',
            longitude: 60.684721,
            latitude: 10.841522,
            date: new Date(Date.now()),
            munId: 528,
            userId: 2,
            categoryId: 4,
            statusId: 6
          },

          {
            issueId: 4,
            title: 'Veilys ødelagt på 33',
            content: 'I have a question for god. WHYYYYYYYYYYY. Is this light broken',
            image: 'https://i.ytimg.com/vi/MPNN_nVwG5w/maxresdefault.jpg',
            longitude: 60.68273,
            latitude: 10.831514,
            date: new Date(Date.now()),
            munId: 528,
            userId: 6,
            categoryId: 2,
            statusId: 3
          }
        ])
      )
      .then(() =>
        Feedback.bulkCreate([
          {
            name: 'Dumme folk er dumme',
            content: 'Vi skal fikse dette!',
            date: new Date(Date.now()),
            userId: '2',
            issueId: '1'
          },
          {
            name: 'Veilyset på 33 er fisket!',
            content: 'Veilyset er fikset!',
            date: new Date(Date.now()),
            userId: '2',
            issueId: '4'
          }
        ])
      )
      .then(() =>
        EventCategory.bulkCreate([
          {
            name: 'PARTY'
          },
          {
            name: 'Konsert'
          },
          {
            name: 'Galleri'
          }
        ])
      )
      .then(() =>
        Event.bulkCreate([
          {
            title: 'party at the house man!',
            content: 'Det skal være party at the house!',
            image: 'notin',
            longitude: 60.652168,
            latitude: 10.822102,
            timeStart: new Date(Date.now()),
            timeEnd: new Date(Date.now()),
            userId: '1',
            categoryId: 1
          },
          {
            title: 'PARTIET FORSETTER!',
            content: 'DET FORRIGE PARTY FORSETTER HOS ANDERS!',
            image: 'notin',
            longitude: 60.655754,
            latitude: 10.817339,
            timeStart: new Date(Date.now()),
            timeEnd: new Date(Date.now()),
            userId: '2',
            categoryId: 1
          }
        ])
      )
      .then(() =>
        UserMunicipal.bulkCreate([
          {
            munId: 101,
            userId: 1
          },
          {
            munId: 514,
            userId: 1
          }
        ])
      );
});
