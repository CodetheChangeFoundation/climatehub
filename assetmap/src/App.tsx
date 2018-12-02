import * as d3 from 'd3';
import * as React from 'react';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';

class App extends React.Component {
  public test() {
    const test = [1,2,3];
    console.log(d3.max(test));
  }
  public render() {
    this.test();
    return (
      <div className="App">
        <header className="bg-dark text-white text-center">
          <h1>Welcome to React</h1>
          <h5>To get started, edit src/App.tsx and save to reload.</h5>
        </header>
      </div>
    );
  }
}

export default App;
