import {Component} from "react-simplified";
import {User} from "../../models";
import Menu from "../menu/Menu";
import RegistrationForm from "../forms/RegistrationForm";
import {statistics} from "../../statistics";
import * as React from "react";

export class StatisticsPage extends Component {

    render() {
        return (
            <div>
                {statistics.getLineChart('x-axis', 'y-axis', [{x: 'Januar', y: 2}, {x: 'Februar', y: 6}, {x: 'Mars', y: 4}, {x: 'April', y: 10}, {x: 'Mai', y: 5}, {x: 'Juni', y: 1}, {x: 'Juli', y: 3}])}
            </div>
        );
    }
}