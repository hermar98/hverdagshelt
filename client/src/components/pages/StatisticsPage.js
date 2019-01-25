import { Component } from 'react-simplified';
import { User } from '../../models/User';
import RegistrationForm from '../forms/RegistrationForm';
import { statistics } from '../../statistics';
import { Alert } from '../../widgets.js';
import { issueService } from '../../services/IssueService.js';
import { municipalService } from '../../services/MunicipalService.js';
import * as React from 'react';

export class StatisticsPage extends Component {
  stats = [];

  years = [];
  municipals = [];
  munId = null;
  year = 2018;

  lineChart = null;

  render() {
    return (
      <div>
        <div className="mt-3" align="center">
          <h1>Statistikk</h1>
          <p>Antall registrerte saker per måned i en kommune</p>
          <div className="d-flex justify-content-center">
            <div className="col-sm-3">
              <select className="form-control" onChange={this.changeMunicipality}>
                {this.municipals.map(municipal => (
                  <option value={municipal.munId}>{municipal.name}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-3">
              <select className="form-control" onChange={this.changeYear}>
                {this.years.map(year => (
                  <option>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            {this.lineChart ? (
              this.lineChart
            ) : (
              <div className="mt-5">Ingen saker registrert i gjeldende kommune dette årstallet.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    let year;
    let end = new Date().getFullYear();
    for (year = this.year; year <= end; year++) {
      this.years.push(year);
    }

    municipalService
      .getMunicipals()
      .then(municipals => {
        this.municipals = municipals;
        this.munId = this.municipals[0].munId;
        this.updateChart();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  changeYear(event) {
    this.year = event.target.value;
    this.updateChart();
  }

  changeMunicipality(event) {
    this.munId = event.target.value;
    this.updateChart();
  }

  updateChart() {
    this.stats = [
      { x: 'Januar', y: 0 },
      { x: 'Februar', y: 0 },
      { x: 'Mars', y: 0 },
      { x: 'April', y: 0 },
      { x: 'Mai', y: 0 },
      { x: 'Juni', y: 0 },
      { x: 'Juli', y: 0 },
      { x: 'August', y: 0 },
      { x: 'September', y: 0 },
      { x: 'Oktober', y: 0 },
      { x: 'November', y: 0 },
      { x: 'Desember', y: 0 }
    ];

    issueService
      .getNumberOfIssues(this.munId, this.year)
      .then(stats => {
        if (stats.length > 0) {
          stats.map(stat => {
            this.stats[stat.month - 1].y = stat.numberOfIssues;
          });
          this.lineChart = statistics.getLineChart('Måned', 'Antall saker registrert', this.stats);
        } else {
          this.lineChart = null;
        }
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
