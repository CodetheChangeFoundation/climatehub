import * as React from 'react';

interface MyProps {
  categories: Array<string>,
  columns: Array<string>,
  data: Array<Array<string>>
};

interface MyState {
  filterParameter: string,
  searchTerm: string
};

class SearchForm extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      filterParameter: props.categories[0],
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
    const dropdown = [];
    const tableColumns = [];
    const tableRows = [];
    const table = [];

    for (const category of this.props.categories) {
      dropdown.push(<option key={this.props.categories.indexOf(category)}>{category}</option>);
    }

    for (const column of this.props.columns) {
      tableColumns.push(<th className="border-top-0" key={this.props.columns.indexOf(column)} scope="col">{column}</th>);
    }

    for (const row of this.props.data) {
      const cells = []
      for (const cell of row) {
        cells.push(<td key={row.indexOf(cell)}>{cell}</td>);
      }
      tableRows.push(<tr key={this.props.data.indexOf(row)}>{cells}</tr>);
    }

    table.push(<table key="0" className="mb-0 table text-center"><thead><tr>{tableColumns}</tr></thead><tbody>{tableRows}</tbody></table>);

    return (
      <form id="SearchForm" className="container mt-5 pt-5">
        <div className="mt-5 pt-5 row">
          <div className="border border-bottom-0 border-dark col-12 col-sm-3 form-group m-0 p-0">
            <span className="align-items-center d-inline-flex h-100 pl-3 position-absolute">
              <svg fill="none" height="20" width="15" viewBox="0 0 15 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fill="#888888" fillRule="evenodd" d="M11.1189 6.55945C11.1189 9.07756 9.07756 11.1189 6.55945 11.1189C4.04133 11.1189 2 9.07756 2 6.55945C2 4.04133 4.04133 2 6.55945 2C9.07756 2 11.1189 4.04133 11.1189 6.55945ZM8.62627 12.7866C7.97647 13.0022 7.28159 13.1189 6.55945 13.1189C2.93676 13.1189 0 10.1821 0 6.55945C0 2.93676 2.93676 0 6.55945 0C10.1821 0 13.1189 2.93676 13.1189 6.55945C13.1189 8.74448 12.0505 10.68 10.4076 11.8721L14.523 19L12.7909 20L8.62627 12.7866Z"/>
              </svg>
            </span>
            <select className="bg-light border-0 custom-select my-2 pl-5 py-1 shadow-none" onChange={this.handleFilter} value={this.state.filterParameter}>
              {dropdown}
            </select>
          </div>
          <div className="border border-bottom-0 border-dark border-left-0 col-12 col-sm-9 form-group m-0 p-0">
            <input className="border-0 bg-light form-control my-2 py-1" onChange={this.handleSearch} placeholder="Search" type="text" value={this.state.searchTerm}/>
          </div>
          <div className="border border-dark col-12">
            <div className="mx-4 overflow-hidden">
              {table}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;