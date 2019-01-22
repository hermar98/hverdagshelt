// import {
//     County,
//     Event,
//     EventCategory,
//     Feedback,
//     Issue,
//     IssueCategory,
//     Municipal,
//     Status,
//     User,
//     UserMunicipal,
//     UserIssue
// } from "./models";
//
// class ModelsTestDataSmall {
//
//     createAll(){
//         return this.createCounties().then(()=>
//         this.createMunicipals()).then(()=>
//         this.createUsers()).then(()=>
//         this.createStatuses()).then(()=>
//         this.createIssueCategory()).then(()=>
//         this.createIssues()).then(()=>
//         this.createFeedback()).then(()=>
//         this.createEventCategory()).then(()=>
//         this.crateEvent()).then(()=>
//         this.createUserMunicipal()).then(()=>
//         this.createUserIssue());
//
//     }
//
//     createCounties() {
//         return County.bulkCreate([
//             {
//                 countyId: 1,
//                 name: 'countyA'
//             },
//             {
//                 countyId: 2,
//                 name: 'countyB'
//             },
//             {
//                 countyId: 3,
//                 name: 'countyC'
//             }
//         ])
//     }
//
//     createMunicipals(){
//         return Municipal.bulkCreate([
//             { munId: 1, name: 'munA', countyId: 1},
//             { munId: 2, name: 'munB', countyId: 2},
//             { munId: 3, name: 'munC', countyId: 3}
//         ]);
//     }
//
//     createUsers() {
//         return User.bulkCreate(
//             [
//                 {
//                     firstName: 'TEST',
//                     lastName: 'PERSON',
//                     email: 'test@test.no',
//                     rank: 1,
//                     salt: 'a83f4da094cc247b',
//                     hashStr:
//                         '30fed7291ca557c9296862fa62267295708deebf0fa553d17efcf0ea1049965b3175b20cf9b18d18e0249f73cd3e25b9c3ec4413cb35353516731257d2735722',
//                     munId: 1,
//                     profilePicture: 'PICTURE1',
//                     Municipal: [{ munId: 2 }, { munId: 3 }]
//                 },
//                 {
//                     firstName: 'TEST2',
//                     lastName: 'PERSON',
//                     email: 'test2@test.no',
//                     rank: 2,
//                     salt: 'SALT',
//                     hashStr: 'HASHSTR',
//                     munId: 2,
//                     profilePicture:
//                         'PICTURE2'
//                 }
//             ],
//             {
//                 include: [
//                     {
//                         model: Municipal,
//                         as: 'munId'
//                     }
//                 ]
//             }
//         )
//     }
//
//     createStatuses() {
//         return Status.bulkCreate([
//             {
//                 statusId: 1,
//                 name: 'STATUS1'
//             },
//             {
//                 statusId: 2,
//                 name: 'STATUS2'
//             }
//         ])
//     }
//
//     createIssueCategory() {
//         return IssueCategory.bulkCreate([
//             { name: 'ISSUECATEGORY1' },
//             { name: 'ISSUECATEGORY2' }
//         ])
//     }
//
//     createIssues() {
//         return Issue.bulkCreate([
//             {
//                 issueId: 1,
//                 title: 'TITLE1',
//                 content: 'CONTENT1',
//                 image:
//                     'IMAGE1',
//                 longitude: 1.23,
//                 latitude: 3.21,
//                 date: new Date(Date.now()),
//                 munId: 1,
//                 userId: 1,
//                 categoryId: 1,
//                 statusId: 1
//             },
//
//             {
//                 issueId: 2,
//                 title: 'TITLE2',
//                 content: 'CONTENT2',
//                 image: 'IMAGE2',
//                 longitude: 2.34,
//                 latitude: 4.32,
//                 date: new Date(Date.now()),
//                 munId: 2,
//                 userId: 2,
//                 categoryId: 2,
//                 statusId: 2
//             }
//         ])
//     }
//
//     createFeedback() {
//         return Feedback.bulkCreate([
//             {
//                 name: 'FEEDBACK1',
//                 content: 'FCONTENT1',
//                 date: new Date(Date.now()),
//                 userId: '2',
//                 issueId: '1'
//             },
//             {
//                 name: 'FEEDBACK2',
//                 content: 'FCONTENT2',
//                 date: new Date(Date.now()),
//                 userId: '1',
//                 issueId: '2'
//             }
//         ])
//     }
//
//     createEventCategory() {
//         return EventCategory.bulkCreate([
//             {
//                 name: 'EVENTCATEGORY1'
//             },
//             {
//                 name: 'EVENTCATEGORY2'
//             },
//             {
//                 name: 'EVENTCATEGORY3'
//             }
//         ])
//     }
//
//     crateEvent() {
//         return Event.bulkCreate([
//             {
//                 title: 'ETITLE',
//                 content: 'ECONTENT',
//                 image: 'EIMAGE',
//                 longitude: 3.45,
//                 latitude: 5.43,
//                 timeStart: new Date(Date.now()),
//                 timeEnd: new Date(Date.now()),
//                 userId: 1,
//                 categoryId: 1
//             }
//         ])
//     }
//
//     createUserMunicipal() {
//         return UserMunicipal.bulkCreate([
//             {
//                 munId: 1,
//                 userId: 1
//             },
//             {
//                 munId: 2,
//                 userId: 1
//             }
//         ])
//     }
//
//     createUserIssue() {
//         return UserIssue.bulkCreate([
//             {
//                 issueId: 2,
//                 userId: 2
//             },
//             {
//                 issueId: 1,
//                 userId: 2
//             }
//         ])
//     }
// }
//
// export let modelsTestDataSmall = new ModelsTestDataSmall();