import React from 'react';
import ImageLoader from 'react-imageloader';
import axios from 'axios';
import '../styles/Home.scss';

export default class EventsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: null
    };
  }

  componentDidMount() {
    axios.get('https://i.sif.moe/ur/list.json')
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          return response.data;
        }
        throw new Error('fetch failed');
      })
      .then((data) => {
        this.setState({
          rawData: data
        })
      })
      .catch((ex) => {
        document.write(ex.toString());
      });
  }

  renderImage = (image) => {
    return <ImageLoader
             src={ image }
             wrapper={ React.DOM.div }
             preloader={ () => <img src={ require('../images/blank.gif') } /> }>
             <img src={ require('../images/blank.gif') } />
           </ImageLoader>;
  }

  renderContent = () => {
    return this.state.rawData.map((elem) => {
      return (
        <div className={ 'pair' }>
          <div className={ 'header' }>
            <div className={ 'in' }>
              { elem.title }
            </div>
          </div>
          <div className={ 'content' }>
            <div className={ 'in' }>
              <table
                cellSpacing={ 0 }
                cellPadding={ 0 }>
                <tbody>
                  <tr>
                    { elem.images.map((image, index) => {
                        if (index < 2) {
                          return (
                            <td>
                              { this.renderImage(image) }
                            </td>
                            );
                        }
                      }) }
                  </tr>
                  <tr height={ 5 }></tr>
                  <tr>
                    { elem.images.map((image, index) => {
                        if (index > 1) {
                          return (
                            <td>
                              { this.renderImage(image) }
                            </td>
                            );
                        }
                      }) }
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        );
    });
  }

  render() {
    return (
      <div>
        { this.state.rawData === null
          ?
          <div className={ 'loading' }>
            Loading...
          </div>
          :
          this.renderContent() }
      </div> );
  }
}