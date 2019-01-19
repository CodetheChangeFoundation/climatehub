import * as React from 'react';

interface MyProps {};

interface MyState {
  filterParameter: string,
  searchTerm: string
};

class SearchForm extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterParameter: "Groups",
      searchTerm: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleSearch(event: any) {
    this.setState({searchTerm: event.target.value});
  }
  handleFilter(event: any) {
    this.setState({filterParameter: event.target.value});
  }

  public render() {
    return (
      <form id="SearchForm" className="container mt-5 pt-5">
        <div className="row mt-5 pt-5">
          <div className="col-12 col-sm-3 form-group m-0 p-0 border border-dark border-bottom-0">
            <span className="d-inline-flex position-absolute h-100 align-items-center pl-3">
              <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.1189 6.55945C11.1189 9.07756 9.07756 11.1189 6.55945 11.1189C4.04133 11.1189 2 9.07756 2 6.55945C2 4.04133 4.04133 2 6.55945 2C9.07756 2 11.1189 4.04133 11.1189 6.55945ZM8.62627 12.7866C7.97647 13.0022 7.28159 13.1189 6.55945 13.1189C2.93676 13.1189 0 10.1821 0 6.55945C0 2.93676 2.93676 0 6.55945 0C10.1821 0 13.1189 2.93676 13.1189 6.55945C13.1189 8.74448 12.0505 10.68 10.4076 11.8721L14.523 19L12.7909 20L8.62627 12.7866Z" fill="#888888"/>
              </svg>
            </span>
            <select className="custom-select bg-light border-0 py-1 pl-5 my-2" value={this.state.filterParameter} onChange={this.handleFilter}>
              <option>Groups</option>
              <option>Projects</option>
              <option>Individuals</option>
            </select>
          </div>
          <div className="col-12 col-sm-9 form-group m-0 p-0 border border-dark border-bottom-0 border-left-0">
            <input className="form-control bg-light border-0 py-1 my-2" type="text" placeholder="Search" value={this.state.searchTerm} onChange={this.handleSearch}/>
          </div>
          <div className="col-12 border border-dark">
            <div className="mx-4 border-bottom overflow-hidden"><h6 className="my-3">If groups is selected, display groups that are part of UBC or CoV.</h6></div>
            <div className="mx-4 border-bottom overflow-hidden"><h6 className="my-3">If projects is selected, display projects that are taken on by any group in UBC or CoV.</h6></div>
            <div className="mx-4 border-bottom overflow-hidden"><h6 className="my-3">If individuals is selected, display individuals that belong to any group in UBC or CoV.</h6></div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;
