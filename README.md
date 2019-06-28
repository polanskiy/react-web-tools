## Installation

npm i react-web-tools --save-dev

## Tabs

```
import React from 'react';
import { Tabs } from 'react-web-tools';

const App = () => {

  const options = {
    tabsBoxClass: 'myTabs',
  }

  return (
    <div className="App">
      <Tabs {...options}>
        <div name="tab-1" style={{ width: '100%' }}>
          content-1
        </div>
        <div name="tab-2">
          content-2
        </div>
      </Tabs>
    </div>
  );
}

export default App;

```

# Tabs Options

  tabsBoxClass: 'tabsBox',
  tabHeaderClass: 'tabHeader',
  tabHeaderBoxClass: 'tabHeaderBox',
  activeColor: 'red',

## Carousel

```
import Carousel from 'react-infinity-carousel';

class App extends Component {
  render() {
    const options = {
      autoPlayInterval: 1000
    }
    return (
      <div className="App">
        <header className="App-header">
          <Carousel {...options}>
            <div style={{width: 200, height: 150, background: 'red'}}></div>
            <div style={{width: 200, height: 150, background: 'blue'}}></div>
            <div style={{width: 200, height: 150, background: 'green'}}></div>
          </Carousel>
        </header>
      </div>
    );
  }
}
```

## Carousel Options

```
const options = {
  autoPlayInterval: 1000, // default value: 3000
  arrows: false, // default value: true
  dots: false, // default value: true
  transitionDuration: 0.9, // default value: 0.5
  initialSlide: 2, // default value: 1
  carouselClass: 'yourClassName', // default value: 'carousel'
  dotsBoxClass: 'yourClassName'', // default value: 'dotsBox'
  arrowsBoxClass: 'yourClassName'', // default value: 'arrsBox'
  nextArrClass: 'yourClassName'', // default value: 'nextArr'
  prevArrClass: 'yourClassName'', // default value: 'prevArr'
}
```
