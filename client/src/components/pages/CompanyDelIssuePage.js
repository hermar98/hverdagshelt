// @flow

import * as React from 'react';
import {Component, sharedComponentData} from 'react-simplified';
import {userIssueService} from "../../services/UserIssues";
// import {userService} from "../../services/UserService";
import { history } from '../../index';
import {User} from "../../models/User.js"
import {Issue} from "../../models/Issue.js"
import {issueCategoryService} from "../../services/IssueCategoryService";

let sharedIssues = sharedComponentData({issues: []});
let sharedComp = sharedComponentData({companies: []});

let shared = sharedComponentData({chosenIssues: []});

let formatDate = function (date: Date) {
    if(date != null) {
        let str: string = date;
        str = str.substring(0, str.length - 8)
        str = str.replace("T", " KL. ")
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
                <div>
                    <div>
                        <h1>Unassigned Issues</h1>
                        {(sharedIssues.issues).map(function (e, i) {
                            console.log("BOYYYY1 i: " + i);
                            if (e) {
                                return (
                                    <div>
                                        <IssueCard key={i} munId={munId} issue={e} companyQ={false}/>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                    <div>
                        <h1>Assigned Issues</h1>
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
        userIssueService.getAllFreeUserIssues(2).then(e=>{
            e.map(f=>{
                sharedIssues.issues.push(f);
            });
        }).catch(error => console.error("Error: ", error));

        userIssueService.getAllUserIssues(3, 2).then(e=>{
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

    johnny: User = null;
    johnnyIssues: Issue[] = null;

    state = {
        boi: false,
    };

    jason(){
        Array.from(shared.chosenIssues).map(e => {
            userIssueService.addUserIssue(this.props.user.userId, e.issueId).then(
                shared.chosenIssues.filter(() => true)
            );
        });

    }
    
    render() {
        let mons = this.johnny;
        if(this.state.boi == false){
            return null;
        } else {
            return (
                <div style={{height: '200px', width: '600px', backgroundColor: "yellow"}}>
                    <div>
                        <h1>{this.johnny.firstName}</h1>
                        <p>{this.johnny.email}</p>
                        <p>{this.munId}</p>
                    </div>
                    <div>
                    {this.johnnyIssues.map(function (e, i) {
                        console.log(e);
                        if (e) {
                            return (
                                <div>
                                    <IssueCard key={i} munId={2} issue={e} companyQ={true} user={mons}/>
                                </div>
                                )
                            }
                        })
                    }
                    (<button style={{width: 50, height: 50}} className={"btn"} type={"button"} onClick={this.jason}>Submit to this company</button>);
                    </div>
                </div>
            );
        }
    }

    mounted(){
        console.log(this.props.user);
        this.johnny = this.props.user;
        this.johnnyIssues = this.johnny.Issues;
        console.log(this.johnny);
        this.setState({
            boi: true
        })
    }

    unmount(){
        console.log("heyComp: " + 2)
    }
}

class IssueCard extends Component<{issue: Issue, munId: number, companyQ: boolean}> {
    render() {
        return (
            <div style={{height: '200px', width: '600px', backgroundColor: "red"}}>
                <div>
                    <IssueView style={{height: '200px', width: '200px'}} companyQ={this.props.companyQ} issue={this.props.issue} munId={this.props.munId}/>
                </div>
                <div>
                    <h1>ISSUE</h1>
                </div>
            </div>
        );
    }

    mounted(){
        console.log("heyIssue ")
    }

    unmount(){
        console.log("heyIssue " + 2)
    }
}

class IssueView extends Component<{issue: Issue, munId: number, companyQ: boolean, user?: User}> {

    categoryName: string = '';

    styleWhite = {backgroundColor: "grey", width: 100, height: 100};
    styleNormal = {backgroundColor: "blue", width: 100, height: 100};
    theStyle = this.styleWhite;

    state = {
        boi: false,
    };

    cohnJena(){
        console.log("LETS GO");
        if(this.state.boi==false){
            console.log("HEY");
            this.setState({boi: true});
            this.theStyle = this.styleWhite;
            shared.chosenIssues.push(this.props.issue);
        } else{
            this.setState({boi: false});
            this.theStyle = this.styleNormal;
            console.log("HO");
            shared.chosenIssues.filter(e => {e.issueId==this.props.issue.issueId});
        }
    }

    jasonStatham(){
        userIssueService.deleteUserIssue(this.props.user.userId, this.props.issue.issueId);

    }

    johnCena(){
        if(this.props.companyQ==false){
            return (<button style={this.theStyle} className={"btn"} type={"button"} onClick={
                    this.cohnJena
            }>:O</button>);
        } else{
            return (<button style={this.styleNOrmal} className={"btn"} type={"button"} onClick={
                this.jasonStatham
            }>:O</button>);
        }
    }

    render() {
        return (
            <div className="issue-small issue-hover" issue={this.props.issue}>
                <div>
                    <div className="d-flex flex-row issue-flex justify-content-between">
                        <div className="view-text">
                            <p className="date">{formatDate(this.props.issue.createdAt)}</p>
                            <h5>
                                {this.categoryName}
                            </h5>
                        </div>
                        <div>
                            {this.johnCena()}
                        </div>
                        <button className={"btn"} type={"button"} onClick={event => {history.push("/#/saker/" + this.props.issue.issueId)}}>Go to issue</button>
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

