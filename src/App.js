import React from 'react';
import { Carousel, Tabs } from './component';

function App() {
  return (
    <div className="App">
      <Tabs>
        <div name="tab-1" style={{ width: '100%' }}>content-1</div>
        <div name="tab-2">content-2</div>
      </Tabs>
      <Carousel>
        <div style={{ width: 200, height: 150, background: 'red' }} />
        <div style={{ width: 200, height: 150, background: 'blue' }} />
        <div style={{ width: 200, height: 150, background: 'green' }} />
      </Carousel>
    </div>
  );
}

export default App;
