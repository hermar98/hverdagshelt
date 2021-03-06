// @flow

import * as React from 'react';
import {Component, sharedComponentData} from 'react-simplified';
import {userIssueService} from "../../services/UserIssues";
// import {userService} from "../../services/UserService";
import { history } from '../../index';
import {User} from "../../models/User.js"
import {Issue} from "../../models/Issue.js"
import {issueCategoryService} from "../../services/IssueCategoryService";
import {HoverButton, StatusImage} from "../issueViews/issueViews";

let sharedIssues = sharedComponentData({issues: []});
let sharedComp = sharedComponentData({companies: []});

let shared = sharedComponentData({chosenIssues: []});

let formatDate = function (date: Date) {
    if(date != null) {
        let str: string = date;
        str = str.substring(0, str.length - 8);
        str = str.replace("T", " KL. ");
        return str;
    }
};

export class CompanyDelIssuePage extends Component<{munId: number}> {
    state = {
        updatedQuestion: false,
    };

    render() {
        if(this.state.updatedQuestion==false){
            return null;
        } else {
            let munId = 10;
            return (
                <div className="d-flex flex-row justify-content-between comp-container" id='delMainBox'>
                    <div className="comp-left">
                        <h2>Udelegerte saker</h2>
                        <br />
                        {(sharedIssues.issues).map(function (e, i) {
                            console.log("BOYYYY1 i: " + i);
                            if (e) {
                                return (
                                    <IssueCard key={i} munId={munId} issue={e} companyQ={false}/>
                                )
                            }
                        })
                        }
                    </div>
                    <div className="comp-right">
                        <h2>Delegerte saker</h2>
                        <br />
                        {console.log(sharedComp.companies)}
                        {(sharedComp.companies).map(function (e, i) {
                            console.log("BOYYYY2 i: " + i);
                            if (e) {
                                return (
                                    <div>
                                        <CompanyCard key={i} munId={munId} user={e}/>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                </div>
            );
        }
    }

    mounted(){
        sharedIssues.issues = [];
        sharedComp.companies = [];
        shared.chosenIssues = [];
        userIssueService.getAllFreeUserIssues(2).then(e=>{
            e.map(f=>{
                sharedIssues.issues.push(f);
            });
        }).catch(error => console.error("Error: ", error));

        userIssueService.getAllUserIssues(2, 2).then(e=>{
            e.map(f=>{
                sharedComp.companies.push(f);
            });
        }).catch(error => console.error("Error: ", error));
        this.setState({
            updatedQuestion: true
        })
    }

    unmount(){
        console.log("hey " + 2)
    }
}

class CompanyCard extends Component<{user: User, munId: number}> {

    curCompany: User = null;
    compIssues: Issue[] = null;

    state = {
        loaded: false,
    };
///////////////////////////////////////////////////////////////////////////////////////////////////
    jason(){
        Array.from(shared.chosenIssues).map(e => {
            userIssueService.addUserIssue(this.props.user.userId, e.issueId)
        });

        sharedIssues.issues = [];
        sharedComp.companies = [];
        shared.chosenIssues = [];


        setTimeout(() => {userIssueService.getAllFreeUserIssues(2).then(e=>{
                e.map(f=>{
                    sharedIssues.issues.push(f);
                });
            }).catch(error => console.error("Error: ", error));

            userIssueService.getAllUserIssues(2, 2).then(e=>{
                e.map(f=>{
                    sharedComp.companies.push(f);
                });
            }).catch(error => console.error("Error: ", error));}, 400)

    }
    
    render() {
        let mons = this.curCompany;
        if(this.state.loaded == false){
            return null;
        } else {
            return (
                <div className="card comp-card">
                    <div>
                        <h3>{this.curCompany.firstName}</h3>
                        <p>{this.curCompany.email}</p>
                        <p>{this.munId}</p>
                        <div className="d-flex flex-row justify-content-center submit-comp-button">
                            <HoverButton type="button" onclick={this.jason} text="Deleger hit"/>
                        </div>
                    </div>
                    <div>
                    {this.compIssues.map(function (e, i) {
                        console.log(e);
                        if (e) {
                            return (
                                <div>
                                    <IssueView key={i} munId={2} issue={e} companyQ={true} user={mons}/>
                                </div>
                                )
                            }
                        })
                    }
                    </div>
                </div>
            );
        }
    }

    mounted(){
        console.log(this.props.user);
        this.curCompany = this.props.user;
        this.compIssues = this.curCompany.Issues;
        console.log(this.curCompany);
        this.setState({
            loaded: true
        })
    }

    unmount(){
        console.log("heyComp: " + 2)
    }
}

class IssueCard extends Component<{issue: Issue, munId: number, companyQ: boolean}> {
    render() {
        return (
            <div>
                <IssueView style={{paddingColor: 'black', padding: "5px"}} companyQ={this.props.companyQ} issue={this.props.issue} munId={this.props.munId}/>
            </div>
        );
    }
}

class IssueView extends Component<{issue: Issue, munId: number, companyQ: boolean, user: User}> {

    categoryName: string = '';

    styleWhite = {backgroundColor: "lightgrey"};
    styleNormal = {backgroundColor: "#192f42"};
    theStyle = this.styleNormal;
    joIssue = this.props.issue;

    state = {
        loaded: false
    }

    filterFilter(issue: Issue){
        let a = (issue.issueId != this.props.issue.issueId);
        return a;
    }

    selectedQ(){
        if(this.state.loaded==false){
            this.setState({loaded: true});
            this.theStyle = this.styleWhite;
            shared.chosenIssues.push(this.props.issue);
        } else{
            this.setState({loaded: false});
            this.theStyle = this.styleNormal;
            let a = shared.chosenIssues.filter(issue => this.filterFilter(issue));
            shared.chosenIssues = a;
        }
    }
//////////////////////////////////////////////////////////////////////////
    deleteUserIssue(){
        if(!this.props.user){
            console.log("Deleting Issue doesn't work")
        } else {
            userIssueService.deleteUserIssue(this.props.user.userId, this.props.issue.issueId).then(()=> {
                    sharedIssues.issues = [];
                    sharedComp.companies = [];
                    shared.chosenIssues = [];
                }).then(() =>{
                    userIssueService.getAllFreeUserIssues(2).then(e=>{
                        e.map(f=>{
                            sharedIssues.issues.push(f);
                        });
                    }).catch(error => console.error("Error: ", error));

                    userIssueService.getAllUserIssues(2, 2).then(e=>{
                        e.map(f=>{
                            sharedComp.companies.push(f);
                        });
                    }).catch(error => console.error("Error: ", error));
                }
            );
        }

    }

    buttonChoise(){
        if(this.props.companyQ==false){
            return (<button style={this.theStyle} className="btn comp-button" type="button" onClick={this.selectedQ}>Velg</button>)
        } else{
            return (<HoverButton type="button" onclick={this.deleteUserIssue} text="Fjern"/>);
        }
    }

    render() {
        return (
            <div className="issue-small issue-hover card issue-view-comp" issue={this.props.issue}>
                <div>
                    <a id="a-hover" href={"/#/saker/" + this.props.issue.issueId}>
                        <img src="../../images/arrowRightTrans.png" />
                    </a>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="date">{formatDate(this.props.issue.createdAt)}</p>
                        <p>Status:&nbsp; &nbsp; </p>
                        <StatusImage status={this.props.issue.statusId} />
                    </div>
                    <div className="d-flex flex-row issue-flex justify-content-between">
                        <div className="view-text">
                            <h5>
                                {this.categoryName}
                            </h5>
                            <br />
                        </div>
                        <div id="velg-button">
                            {this.buttonChoise()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    mounted () {
        issueCategoryService.getCategory(this.props.issue.categoryId)
            .then(category => {
                this.categoryName = category.name
            })
            .catch(error => console.error("Error: ", error))
    }


}

