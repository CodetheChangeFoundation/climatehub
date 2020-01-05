import * as React from 'react';
import Select from 'react-select';

interface MyProps {
  categories: Array<string>
  cities: any
  communities: any
  groups: any
  getAllPostsByType: any
  filterPostsByCommunity: any
  getPostsFromCache: any
  cache: any
  getPostbyId: any
  filterPosts: any
  individuals: any
  projects: any
};

interface MyState {
  postType: string,
  searchTerm: string,
  selectedCommunities: any,
};

class SearchForm extends React.Component<MyProps, MyState> {
  communityOptions: any;

  constructor(props: MyProps) {
    super(props);

    this.communityOptions = []
    if (this.props.cities !== []) { 
      this.props.cities.map((city: { id: number; name: string; }) => this.communityOptions[city.id] = ({label: city.name, options: []}));
    }
    if (this.props.communities !== []) {
      this.props.communities.map((community: { id: number, name: string, city: number; }) => this.communityOptions[community.city[0]].options.push({id: community.id, value: community.id, label: community.name}))

    }
    
    this.state = {
      postType: props.categories[0],
      searchTerm: "",
      selectedCommunities: null
    };
    this.handleCommunityChange = this.handleCommunityChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleCommunityChange(selectedCommunities: any) {
    this.setState(
      { selectedCommunities },
      () => {
        this.props.filterPostsByCommunity(this.state.postType.toLowerCase(), selectedCommunities)
        .then(() => {
          console.log(this.props[this.state.postType.toLowerCase()]);
        })
      }
    );
  }

  handleSearch(event: any) {
    this.setState({searchTerm: event.target.value});
  }

  handleFilter(event: any) {
    this.setState({
      postType: event.target.value
    }, 
      () => {
      const postType = this.state.postType.toLowerCase();
      console.log(postType);
      this.props.getAllPostsByType(postType)
      .then(() => {
        this.props.filterPostsByCommunity(postType, this.state.selectedCommunities)
        .then(() => {
          console.log(this.props[postType]);
        });
      })
    });
  }
  // Search for keyword in 'name' field of selected level
  searchByKeyword(keyword: string, level: any) {
    return '';
  }

  public render() {
    const dropdown = [];

    for (const category of this.props.categories) {
      dropdown.push(<option key={this.props.categories.indexOf(category)}>{category}</option>);
    }

    return (
      <form id="SearchForm" className="container mt-5 pt-5">
        <div className="mt-5 pt-5 row">
          <div className="col-12 form-group">
            <Select
              value={this.state.selectedCommunities}
              onChange={this.handleCommunityChange}
              options={this.communityOptions}
              isMulti={true}
            />
          </div>
          <div className="border border-bottom-0 border-dark col-12 col-sm-3 form-group m-0 p-0">
            <span className="align-items-center d-inline-flex h-100 pl-3 position-absolute">
              <svg fill="none" height="20" width="15" viewBox="0 0 15 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fill="#888888" fillRule="evenodd" d="M11.1189 6.55945C11.1189 9.07756 9.07756 11.1189 6.55945 11.1189C4.04133 11.1189 2 9.07756 2 6.55945C2 4.04133 4.04133 2 6.55945 2C9.07756 2 11.1189 4.04133 11.1189 6.55945ZM8.62627 12.7866C7.97647 13.0022 7.28159 13.1189 6.55945 13.1189C2.93676 13.1189 0 10.1821 0 6.55945C0 2.93676 2.93676 0 6.55945 0C10.1821 0 13.1189 2.93676 13.1189 6.55945C13.1189 8.74448 12.0505 10.68 10.4076 11.8721L14.523 19L12.7909 20L8.62627 12.7866Z"/>
              </svg>
            </span>
            <select className="bg-light border-0 custom-select my-2 pl-5 py-1 shadow-none" onChange={this.handleFilter} value={this.state.postType}>
              {dropdown}
            </select>
          </div>
          <div className="border border-bottom-0 border-dark border-left-0 col-12 col-sm-9 form-group m-0 p-0">
            <input className="border-0 bg-light form-control my-2 py-1" onChange={this.handleSearch} placeholder="Search" type="text" value={this.state.searchTerm}/>
          </div>
          <div className="border border-dark col-12">
            <div className="mx-4 overflow-hidden">
              {/* {table} */}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;