import * as d3 from 'd3';
import * as React from 'react';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';
import SearchForm from './components/SearchForm';

interface MyState {
  error: any,
  isLoaded: boolean,
  items: any
};

class Assetmap extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [["1", "2", "3"],["1", "2", "3"],["1", "2", "3"]]
    };
  }
  
  componentDidMount() {
    // Make API Call
    // Change state based on response
    this.setState({isLoaded: true});
  }

  public render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Assetmap">
          <SearchForm categories={["Communities", "Groups", "Individuals", "Projects"]} columns={["1", "2", "3"]} data={items}/>
        </div>
      );
    }
  }
}

export default Assetmap;
