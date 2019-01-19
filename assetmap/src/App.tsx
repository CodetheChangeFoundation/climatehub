// import * as d3 from 'd3';
import * as React from 'react';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';
import SearchForm from './components/SearchForm';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <SearchForm categories={["Communities", "Groups", "Individuals", "Projects"]} columns={["1", "2", "3"]} data={[["a", "b", "c"], ["a", "b", "c"], ["a", "b", "c"]]}/>
      </div>
    );
  }
}

export default App;
