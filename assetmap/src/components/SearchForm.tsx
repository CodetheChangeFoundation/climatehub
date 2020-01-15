import * as React from 'react';
import Select from 'react-select';
import { Dropdown } from './Dropdown';
import Table from './Table';

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
      Object.values(this.props.cities).map((city: { id: number; name: string; }) => this.communityOptions[city.id] = ({label: city.name, options: []}));
    }
    if (this.props.communities !== []) {
      Object.values(this.props.communities).map((community: { id: number, name: string, city: number; }) => this.communityOptions[community.city[0]].options.push({id: community.id, value: community.id, label: community.name}));
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
        this.getPostsByCommunity();
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
        this.getPostsByCommunity();
    });
  }

  getPostsByCommunity(selectedPosts: any = this.state.selectedCommunities): Promise<any> {
    return new Promise((resolve) => {
      let selection: any;
      if (selectedPosts !== null) {
        selection = {};
        selectedPosts.forEach((post: any) => {
          selection[post.id] = post;
        });
      } else {
        selection = null;
      }
      this.props.filterPostsByCommunity(this.state.postType.toLowerCase(), selection)
      .then(() => {
        console.log(this.props[this.state.postType.toLowerCase()]);
        resolve();
      })
    });
  }

  public render() {
    const { postType, searchTerm, selectedCommunities } = this.state;
    let currPosts = this.props[postType.toLowerCase()];
    
    // Search
    const searchTermFormatted = searchTerm.toLowerCase();
    if (searchTermFormatted !== "") {
      const updatedPosts = {};
      Object.keys(currPosts).forEach((postId) => {
        if (currPosts[postId].name.toLowerCase().includes(searchTermFormatted)) {
          updatedPosts[postId] = currPosts[postId];
        }
      })
      currPosts = updatedPosts;
    }

    return (
      <div id="SearchForm" className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <Select
              styles={customStyles}
              value={selectedCommunities}
              onChange={this.handleCommunityChange}
              options={this.communityOptions}
              isMulti={true}
              placeholder={"Community"}
              className={"border border-dark "}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-4 col-md-3 pr-sm-0">
            <Dropdown
              handleFilter={this.handleFilter}
              postType={postType}
              categories={this.props.categories}
            />
          </div>
          <div className="col-12 col-sm-8 col-md-9 pl-sm-0">
            <div className="border border-bottom-0 border-dark border-left-0 h-100 m-0 p-0">
              <input
                className="border-0 bg-light form-control h-100"
                onChange={this.handleSearch}
                placeholder="Search"
                type="text"
                value={searchTerm}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="border border-dark table-container">
              <Table
                data={currPosts}
                postType={postType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const customStyles = {
  control: (provided: any, state: any) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    backgroundColor: 'bg-light',
    border: 0,
    boxShadow: 0,
    outline: 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
  }),
  singleValue: (provided: any, state: any) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    return { ...provided };
  }
}

export default SearchForm;