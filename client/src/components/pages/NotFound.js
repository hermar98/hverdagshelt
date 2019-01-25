// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

export class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="notfound-container">
          <div className="card">
            <div className="card-body issue-large-card">
              <h1>
                <b>Oops!</b>
              </h1>
              <h1>Vi fant ikke siden du lette etter!</h1>
              <p>
                Det kan hende du ikke skrev inn riktig i adressefeltet, eller så kan det hende saken er slettet.
                <br />
                Hvis du følger denne linken tar vi deg til forsiden hvor du kan navigere deg videre på nettsiden.
              </p>
              <a href="/">
                <h1>TIL FORSIDEN!</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {}
}
