// @flow

import Sequelize from 'sequelize';
import type { Model } from 'sequelize';
require('dotenv').config();

let sequelize = new Sequelize(
  process.env.CI ? 'database' : 'testdb',
  process.env.CI ? 'root' : 'user',
  process.env.CI ? '' : 'password',
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

export let Feedback: Class<
    Model<{ feedback_id?: number, name: string, content: string, date: Date }>
    > = sequelize.define('Feedback', {
    feedback_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    content: Sequelize.STRING,
    date: Sequelize.DATE
});

export let Issue: Class<
    Model<{
        issue_id?: number,
        title: string,
        content: string,
        image: string,
        longitude: number,
        latitude: number,
        date: Date,
        status_id: number
    }>
    > = sequelize.define('Issue', {
    issue_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    image: Sequelize.STRING,
    longitude: Sequelize.DOUBLE,
    latitude: Sequelize.DOUBLE,
    date: Sequelize.DATE,
    status_id: { type: Sequelize.INTEGER, defaultValue: 1 }
});

export let IssuePicture: Class<
    Model<{
        picture_id?: number,
        title: string,
        imageSource: string
    }>
    > = sequelize.define('IssuePicture', {
    picture_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    imageSource: Sequelize.STRING
});

export let Event: Class<
    Model<{
        event_id?: number,
        title: string,
        content: string,
        image: string,
        longitude: number,
        latitude: number,
        time_start: Date,
        time_end: Date
    }>
    > = sequelize.define('Event', {
    event_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    image: Sequelize.STRING,
    longitude: Sequelize.DOUBLE,
    latitude: Sequelize.DOUBLE,
    time_start: Sequelize.DATE,
    time_end: Sequelize.DATE
});

export let User: Class<
    Model<{
        user_id?: number,
        firstName: string,
        lastName: string,
        email: string,
        rank: number,
        salt?: string,
        hash_str?: string,
        mun_id: number,
        profilePicture?: string,
        resetPasswordToken?: string,
        resetPasswordExpires?: Date
    }>
    > = sequelize.define('User', {
    user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: { type: Sequelize.STRING, unique: true },
    rank: Sequelize.INTEGER,
    salt: Sequelize.STRING,
    hash_str: Sequelize.STRING,
    profilePicture: Sequelize.STRING,
    resetPasswordToken: { type: Sequelize.STRING, notNull: false },
    resetPasswordExpires: { type: Sequelize.DATE, notNull: false }
});

export let Municipal: Class<Model<{ mun_id?: number, name: string , municipalShield?: string}>> = sequelize.define('Municipal', {
    mun_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    municipalShield: Sequelize.STRING,
});

export let County: Class<Model<{ county_id?: number, name: string, countyShield?: string}>> = sequelize.define('County', {
    county_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    countyShield: Sequelize.STRING
});

export let Status: Class<Model<{ status_id?: number, name: string }>> = sequelize.define('Status', {
    status_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

export let Issue_category: Class<Model<{ category_id?: number, name: string }>> = sequelize.define('Issue_category', {
    category_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

export let Event_category: Class<Model<{ event_id?: number, name: string }>> = sequelize.define('Event_category', {
    event_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING
});

County.hasMany(Municipal, { foreignKey: 'county_id' });
Municipal.hasMany(User, { foreignKey: 'mun_id' });
Municipal.hasMany(Issue, { foreignKey: 'mun_id' });

Municipal.belongsToMany(User, { through: 'User_municipal', foreignKey: 'mun_id' });
User.belongsToMany(Municipal, { through: 'User_municipal', foreignKey: 'user_id' });

User.belongsToMany(Issue, { through: 'User_issue', foreignKey: 'user_id' });
Issue.belongsToMany(User, { through: 'User_issue', foreignKey: 'issue_id' });

Issue.belongsTo(Issue_category, { foreignKey: 'category_id' });
Issue.belongsTo(Status, { foreignKey: 'status_id' });
Issue.hasMany(Feedback, { foreignKey: 'issue_id' });
Issue.hasMany(IssuePicture, { foreignKey: 'issue_id' });

User.hasMany(Issue, { foreignKey: 'user_id' });
User.hasMany(Event, { foreignKey: 'user_id' });
User.hasMany(Feedback, { foreignKey: 'user_id' });

Event.belongsTo(Event_category, { foreignKey: 'category_id' });

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
                county_id: 1,
                name: 'Østfold'
            },
            {
                county_id: 2,
                name: 'Akershus'
            },
            {
                county_id: 3,
                name: 'Oslo'
            },
            {
                county_id: 4,
                name: 'Hedmark'
            },
            {
                county_id: 5,
                name: 'Oppland'
            },
            {
                county_id: 6,
                name: 'Buskerud'
            },
            {
                county_id: 7,
                name: 'Vestfold'
            },
            {
                county_id: 8,
                name: 'Telemark'
            },
            {
                county_id: 9,
                name: 'Aust-Agder'
            },
            {
                county_id: 10,
                name: 'Vest-Agder'
            },
            {
                county_id: 11,
                name: 'Rogaland'
            },
            {
                county_id: 12,
                name: 'Hordaland'
            },
            {
                county_id: 14,
                name: 'Sogn og Fjordane'
            },
            {
                county_id: 15,
                name: 'Møre og Romsdal'
            },
            {
                county_id: 50,
                name: 'Trøndelag'
            },
            {
                county_id: 18,
                name: 'Nordland'
            },
            {
                county_id: 19,
                name: 'Troms'
            },
            {
                county_id: 20,
                name: 'Finnmark'
            }
        ])
            .then(() =>
                Municipal.bulkCreate([
                    { mun_id: 5016, name: 'Agdenes', county_id: 50 },
                    { mun_id: 1820, name: 'Alstahaug', county_id: 18 },
                    { mun_id: 2012, name: 'Alta', county_id: 20 },
                    { mun_id: 1418, name: 'Balestrand', county_id: 14 },
                    { mun_id: 1854, name: 'Ballangen', county_id: 18 },
                    { mun_id: 1933, name: 'Balsfjord', county_id: 19 },
                    { mun_id: 511, name: 'Dovre', county_id: 5 },
                    { mun_id: 602, name: 'Drammen', county_id: 6 },
                    { mun_id: 817, name: 'Drangedal', county_id: 8 },
                    { mun_id: 427, name: 'Elverum', county_id: 4 },
                    { mun_id: 237, name: 'Eidsvoll', county_id: 2 },
                    { mun_id: 229, name: 'Enebakk', county_id: 2 },
                    { mun_id: 1003, name: 'Farsund', county_id: 10 },
                    { mun_id: 5036, name: 'Frosta', county_id: 50 },
                    { mun_id: 1432, name: 'Førde', county_id: 14 },
                    { mun_id: 502, name: 'Gjøvik', county_id: 5 },
                    { mun_id: 617, name: 'Gol', county_id: 6 },
                    { mun_id: 5045, name: 'Grong', county_id: 50 },
                    { mun_id: 101, name: 'Halden', county_id: 1 },
                    { mun_id: 1903, name: 'Harstad', county_id: 19 },
                    { mun_id: 1826, name: 'Hattfjelldal', county_id: 18 },
                    { mun_id: 5053, name: 'Inderøy', county_id: 50 },
                    { mun_id: 5054, name: 'Indre Fosen', county_id: 50 },
                    { mun_id: 935, name: 'Iveland', county_id: 9 },
                    { mun_id: 532, name: 'Jevnaker', county_id: 5 },
                    { mun_id: 1227, name: 'Jondal', county_id: 12 },
                    { mun_id: 1431, name: 'Jølster', county_id: 14 },
                    { mun_id: 2021, name: 'Karasjok', county_id: 20 },
                    { mun_id: 1120, name: 'Klepp', county_id: 11 },
                    { mun_id: 5030, name: 'Klæbu', county_id: 50 },
                    { mun_id: 5037, name: 'Levanger', county_id: 50 },
                    { mun_id: 514, name: 'Lom', county_id: 5 },
                    { mun_id: 1422, name: 'Lærdal', county_id: 14 },
                    { mun_id: 1002, name: 'Mandal', county_id: 10 },
                    { mun_id: 5034, name: 'Meråker', county_id: 50 },
                    { mun_id: 1502, name: 'Molde', county_id: 15 },
                    { mun_id: 5005, name: 'Namsos', county_id: 50 },
                    { mun_id: 216, name: 'Nesodden', county_id: 2 },
                    { mun_id: 807, name: 'Notodden', county_id: 8 },
                    { mun_id: 1228, name: 'Odda', county_id: 12 },
                    { mun_id: 5021, name: 'Oppdal', county_id: 50 },
                    { mun_id: 1243, name: 'Os', county_id: 12 },
                    { mun_id: 2020, name: 'Porsanger', county_id: 20 },
                    { mun_id: 805, name: 'Porsgrunn', county_id: 8 },
                    { mun_id: 5043, name: 'Røyrvik', county_id: 50 },
                    { mun_id: 1127, name: 'Randaberg', county_id: 11 },
                    { mun_id: 432, name: 'Rendalen', county_id: 4 },
                    { mun_id: 1840, name: 'Saltdal', county_id: 18 },
                    { mun_id: 710, name: 'Sandefjord', county_id: 7 },
                    { mun_id: 1573, name: 'Smøla', county_id: 15 },
                    { mun_id: 1560, name: 'Tingvoll', county_id: 15 },
                    { mun_id: 5001, name: 'Trondheim', county_id: 50 },
                    { mun_id: 1835, name: 'Træna', county_id: 18 },
                    { mun_id: 235, name: 'Ullensaker', county_id: 2 },
                    { mun_id: 1231, name: 'Ullensvang', county_id: 12 },
                    { mun_id: 1516, name: 'Ulstein', county_id: 15 },
                    { mun_id: 2003, name: 'Vadsø', county_id: 20 },
                    { mun_id: 5038, name: 'Verdal', county_id: 50 },
                    { mun_id: 529, name: 'Vestre Toten', county_id: 5 },
                    { mun_id: 1868, name: 'Øksnes', county_id: 18 },
                    { mun_id: 5015, name: 'Ørland', county_id: 50 },
                    { mun_id: 528, name: 'Østre Toten', county_id: 5 },
                    { mun_id: 5018, name: 'Åfjord', county_id: 50 },
                    { mun_id: 1503, name: 'Ålesund', county_id: 15 },
                    { mun_id: 1424, name: 'Årdal', county_id: 14 }
                ])
            )
            .then(() =>
                User.bulkCreate([{
                    firstName: 'Vegard',
                    lastName: 'Andersson',
                    email: 'test@test.no',
                    rank: 1,
                    salt: 'a83f4da094cc247b',
                    hash_str:
                        '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722',
                    mun_id: '5016',
                    profilePicture: ''
                }, {
                    firstName: 'Christian',
                    lastName: 'Axell',
                    email: 'cdaxell@stud.ntnu.no',
                    rank: 3,
                    salt: 'b79ryp98',
                    hash_str: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    mun_id: '528',
                    profilePicture: 'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }, {
                    firstName: 'Sebastian',
                    lastName: 'Andresen',
                    email: 'sebasman@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hash_str: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    mun_id: '1503',
                    profilePicture: 'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }, {
                    firstName: 'Trond Jacob',
                    lastName: 'Rondestvedt',
                    email: 'trondjro@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hash_str: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    mun_id: '528',
                    profilePicture: 'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }, {
                    firstName: 'Sander',
                    lastName: 'Nicolausson',
                    email: 'sandern@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hash_str: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    mun_id: '528',
                    profilePicture: 'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }, {
                    firstName: 'Jørgen',
                    lastName: 'Aasvestad',
                    email: 'jorgaas@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hash_str: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    mun_id: '528',
                    profilePicture: 'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }, {
                    firstName: 'Herman Ryen',
                    lastName: 'Martinsen',
                    email: 'HermanRM@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hash_str: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    mun_id: '528',
                    profilePicture: 'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }, {
                    firstName: 'Herman',
                    lastName: 'Christiansen',
                    email: 'hermanc@stud.ntnu.no',
                    rank: 1,
                    salt: 'b79ryp98',
                    hash_str: '897dfjsodif5vxd4c5vsldfskdclz97cyw7e3o2inJKHaospk902',
                    mun_id: '528',
                    profilePicture: 'https://pbs.twimg.com/profile_images/3304502717/94414e5d246ae893f1080cdc10e0d245_400x400.jpeg'
                }
                ])
            ).then(() =>
                Status.bulkCreate([{
                    status_id: 6,
                    name: 'Ikke Behandlet'
                }, {
                    status_id: 2,
                    name: 'Under Behandling'
                },{
                    status_id: 3,
                    name: 'Saken er fikset!'
                },{
                    status_id: 4,
                    name: 'Saken ble forlatt'
                },{
                    status_id: 5,
                    name: 'Saken er slettet'
                },{
                    status_id: 1,
                    name: 'Situation Normal, All fucked upp'
                }])
            )
            .then(() =>
                Issue_category.bulkCreate([
                    {name: 'Fyllikere på gata som ødeleger lamper'},
                    {name: 'En veilys er ødelagt'},
                    {name: 'Et veihul på gata'},
                    {name: 'Grafitti på offentlig bygning'},
                    {name: 'Sømpel dumpet'},
                    {name: 'Forlatt Sykkel'}])
            )
            .then(() =>
                Issue.bulkCreate([{  issue_id: 1,
                    title: 'Dumme folk ødeleger lømp',
                    content: 'Disse dumme folka som komemr rett fra byen ødeleger lamper kvelden til midtnatt',
                    image: 'null',
                    longitude: 60.656877,
                    latitude: 10.824107,
                    date: new Date(Date.now()),
                    mun_id: 528,
                    user_id: 1,
                    category_id: 1,
                    status_id: 1  },

                    { issue_id: 2, title: 'Veilys på gata hjemme er ødelagt',
                        content: 'Et veilys på gata har blitt ødelagt',
                        image: 'http://www.otera.no/image/20111206015-kopi.jpeg?w=1200',
                        longitude: 60.661293,
                        latitude: 10.828996,
                        date: new Date(Date.now()),
                        mun_id: 528,
                        user_id: 3,
                        category_id: 2,
                        status_id: 2    },

                    { issue_id: 3, title: 'Dårlig grafitti på skole veggen',
                        content: 'Det er dårlig grafitti på skole veggen',
                        image: 'http://i.imgur.com/so8Ea.jpg',
                        longitude: 60.684721,
                        latitude: 10.841522,
                        date: new Date(Date.now()),
                        mun_id: 528,
                        user_id: 2,
                        category_id: 4,
                        status_id: 6    },

                    { issue_id: 4, title: 'Veilys ødelagt på 33',
                        content: 'Kjørte ned 33 søndag og så et ødelagt veylys. Dere burte fixe det',
                        image: '',
                        longitude: 60.682730,
                        latitude: 10.831514,
                        date: new Date(Date.now()),
                        mun_id: 528,
                        user_id: 6,
                        category_id: 2,
                        status_id: 3    },


                ]))
            .then(() =>
                Feedback.bulkCreate([{
                    name: 'Dumme folk er dumme',
                    content: 'Vi skal fikse dette!',
                    date: new Date(Date.now()),
                    user_id: '2',
                    issue_id: '1'
                },
                    {
                        name: 'Veilyset på 33 er fisket!',
                        content: 'Veilyset er fikset!',
                        date: new Date(Date.now()),
                        user_id: '2',
                        issue_id: '4'
                    }])
            )
            .then(() =>
                Event_category.bulkCreate([{
                    category_id: 1,
                    name: 'PARTY'
                },
                    {
                        category_id: 2,
                        name: 'Konsert'
                    },
                    {
                        category_id: 1,
                        name: 'Galleri'
                    }])
            )
            .then(() =>
                Event.bulkCreate([{
                    title: 'party at the house man!',
                    content: 'Det skal være party at the house!',
                    image: 'notin',
                    longitude: 60.652168,
                    latitude: 10.822102,
                    time_start: new Date(Date.now()),
                    time_end: new Date(Date.now()),
                    user_id: '1',
                    category_id: 1
                },
                    {
                        title: 'PARTIET FORSETTER!',
                        content: 'DET FORRIGE PARTY FORSETTER HOS ANDERS!',
                        image: 'notin',
                        longitude: 60.655754,
                        latitude: 10.817339,
                        time_start: new Date(Date.now()),
                        time_end: new Date(Date.now()),
                        user_id: '2',
                        category_id: 1
                    }])
            );
});
