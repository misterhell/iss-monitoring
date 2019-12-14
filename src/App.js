import React from 'react';
import './App.css';
import { YMaps, Map, Placemark, FullscreenControl } from 'react-yandex-maps';


class App extends React.Component {

  state = {
    iss: {
      latitude: 0,
      longitude: 0
    },

    map: {
      center: [0, 0],
      zoom: 1,
    }
  }


  fetchPosition() {
    fetch('http://api.open-notify.org/iss-now.json', { mode: 'cors' })
      .then(response => response.text())
      .then(json => JSON.parse(json))
      .then(({ iss_position }) => this.setState(state => (
        {
          ...state,
          iss: { ...iss_position },
          map: {
            center: [iss_position.latitude, iss_position.longitude],
            zoom: 3
          }
        })
      ))
  }

  startFetchingPosition() {
    this.fetchPosition()
    setInterval(() => {
      this.fetchPosition()
    }, 5500)
  }

  componentDidMount() {
    console.log(Map.behaviors)
    this.startFetchingPosition()
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h3>
            ISS current position
        </h3>
          <YMaps style={{ width: `400px`, height: `400px` }}>
            <Map height={500} width={800}
              state={{ ...this.state.map }}

            >
              <Placemark
                geometry={[this.state.iss.latitude, this.state.iss.longitude]}
                defaultOptions={{
                  iconLayout: 'default#image',
                  iconImageHref: '/iss-station-2-512.png',
                  iconImageSize: [50, 50],
                }}
              />
              <FullscreenControl />
            </Map>
          </YMaps>
        </header>
      </div>
    );
  }
}

export default App;
