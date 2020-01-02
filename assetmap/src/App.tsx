// import * as d3 from 'd3';
import * as React from 'react';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';
import SearchForm from './components/SearchForm';

interface MyState {
  cities: any,
  communities: any,
  error: any,
  groups: any,
  individuals: any,
  isLoaded: boolean
  projects: any,
};

class Assetmap extends React.Component<{}, MyState> {
  categories: Array<string>;
  
  constructor(props: any) {
    super(props);
    this.categories = ["Groups", "Projects", "Individuals"];
    this.state = {
      cities: [{"cityId": 1, "name": "Vancouver", "location": "Vancouver, BC", "communities": [1]}],
      communities: [{"communityId": 1, "name": "University of British Columbia", "code": "UBC", "location": "2329 West Mall", "city": 1}],
      error: null,
      groups: [],
      individuals: [],
      isLoaded: false,
      projects: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true
          });
        }, (error) => {
          this.setState({
            error,
            isLoaded: true
          });
        }
      )
  }

  public render() {
    const { cities, communities, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="asset-map">
          <SearchForm 
            categories={this.categories}
            cities={cities}
            communities={communities}
            // groups={groups}
            // individuals={individuals}
            // projects={projects}
          />
        </div>
      );
    }
  }
}

export default Assetmap;
