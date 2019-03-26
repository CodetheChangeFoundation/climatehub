// import * as d3 from 'd3';
import * as React from 'react';
// import { connect } from 'react-redux';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';
import SearchForm from './components/SearchForm';

interface MyState {
  columns: any,
  error: any,
  isLoaded: boolean,
  items: any
};

class Assetmap extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      columns: null,
      error: null,
      isLoaded: false,
      items: null
    };

    this.changeLevel = this.changeLevel.bind(this);
  }

  componentDidMount() {
    fetch("https://jbjskvmpv3.execute-api.us-east-1.amazonaws.com/Production/university")
      .then(res => res.json())
      .then(
        (result) => {
          const universities:Array<any> = [];
          result.forEach((university: { UID: any; UCode: any; Name: any; Address: any }) => {
            universities.push([university.UID, university.UCode, university.Name])
          });
          this.setState({
            columns: Object.keys(result[0]).splice(0,3),
            isLoaded: true,
            items: universities
          });
        }, (error) => {
          this.setState({
            error,
            isLoaded: true
          });
        }
      )
  }

  changeLevel() {
    this.setState({
      columns: [],
      items: []
    });
  }

  public render() {
    const { columns, error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="asset-map">
          <SearchForm categories={["Communities", "Groups", "Individuals", "Projects"]} columns={columns} data={items} onChange={this.changeLevel}/>
        </div>
      );
    }
  }
}

export default Assetmap;
