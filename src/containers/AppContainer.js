import React from 'react';
import ReactGA from 'react-ga';
import { Locations, Location } from 'react-router-component';
import '../styles/Base.scss';
import { HomeContainer } from '.';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    ReactGA.initialize('UA-70944432-8');
    this.onNavigation();
  }

  onNavigation = () => {
    const pageLink = window.location.pathname + (window.location.hash === '#/' ? '' : window.location.hash);
    ReactGA.set({
      page: pageLink
    });
    ReactGA.pageview(pageLink);
  }

  render() {
    return (
      <Locations
        hash
        onNavigation={ this.onNavigation }>
        <Location
          path={ '/' }
          handler={ HomeContainer } />
      </Locations>
      );
  }

}