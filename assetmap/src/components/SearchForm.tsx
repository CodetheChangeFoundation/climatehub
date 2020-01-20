import * as React from 'react';
import Select from 'react-select';
import Table from './Table';

interface MyProps {
  categories: Array<string>
  cities: any
  communities: any
  groups: any
  getAllPostsByType: any
  filterPostsByCommunity: any
  filterPostsByTag: any
  getPostsFromCache: any
  cache: any
  getPostbyId: any
  filterPosts: any
  individuals: any
  projects: any
  tags: any
  tag_types: any
};

interface MyState {
  filterIds: Array<number>,
  postType: string,
  searchTerm: string,
  selectedCommunities: any,
  selectedTags: any,
};

class SearchForm extends React.Component<MyProps, MyState> {
  communityOptions: any;
  tagOptions: any;

  constructor(props: MyProps) {
    super(props);
    this.communityOptions = [];
    if (this.props.cities !== []) { 
      Object.values(this.props.cities).map((city: { id: number; name: string; }) => this.communityOptions[city.id] = ({label: city.name, options: []}));
    };
    if (this.props.communities !== []) {
      Object.values(this.props.communities).map((community: { id: number, name: string, city: number; }) => this.communityOptions[community.city[0]].options.push({id: community.id, value: community.id, label: community.name}));
    };
    
    this.tagOptions = [];
    if (this.props.tag_types !== []) {
      Object.values(this.props.tag_types).map((tagType: {id: number, name: string, color: string}) => this.tagOptions[tagType.id] = ({label: tagType.name, options: []}))
    };
    if (this.props.tags !== []) {
      Object.values(this.props.tags).map((tag: {id: number, name: string, type: string}) => this.tagOptions[tag.type[0]].options.push({id: tag.id, label: tag.name, value: tag.name}));
    };

    this.state = {
      filterIds: [],
      postType: props.categories[0],
      searchTerm: "",
      selectedCommunities: null,
      selectedTags: null
    };
    this.handleCommunityChange = this.handleCommunityChange.bind(this);
    this.handleFilterIds = this.handleFilterIds.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
    this.handleTagFilterChange = this.handleTagFilterChange.bind(this);
    this.getTagName = this.getTagName.bind(this);
    this.getTagColor = this.getTagColor.bind(this);
  }

  handleCommunityChange(communities: any) {
    let selectedCommunities = communities;
    if (communities!== null && communities.length === 0) {
      selectedCommunities = null;
    }
    this.setState(
      { selectedCommunities },
      () => {
        this.getPostsByCommunity()
        .then(() => {
          this.getPostsByTag();
        })
      }
    );
  }

  handleSearch(event: any) {
    this.setState({searchTerm: event.target.value});
  }

  handleTagFilterChange(tags: any) {
    let selectedTags = tags;
    if (tags!== null && tags.length === 0) {
      selectedTags = null;
    }
    this.setState(
      { selectedTags },
      () => {
        console.log(this.state.selectedTags);
        this.getPostsByCommunity()
        .then(() => {
          this.getPostsByTag(selectedTags);
        })
      }
    );
  }

  handlePostTypeChange(postType: any) {
    this.setState({
      filterIds: [],
      postType: postType.label
    }, 
      () => {
        this.getPostsByCommunity()
        .then(() => {
          this.getPostsByTag();
        })
    });
  }

  handleFilterIds(postType: string, filterIds: Array<number>) {
    this.setState({
      postType
    },
      () => {
        this.getPostsByCommunity()
        .then(() => {
          this.setState({filterIds});
        })
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

  getPostsByTag(selectedTags: any = this.state.selectedTags): Promise<any> {
    return new Promise((resolve) => {
      let selection: any;
      if (selectedTags !== null) {
        selection = {};
        selectedTags.forEach((post:any) => {
          selection[post.id] = post;
        });
      } else {
        selection = null;
      }
      this.props.filterPostsByTag(this.state.postType.toLowerCase(), selection)
      .then(() => {
        console.log(this.props[this.state.postType.toLowerCase()]);
        resolve();
      })
    })
  }

  getTagName(tagGroup: string, id: number): string {
    if (this.props[tagGroup][id]) {
      return this.props[tagGroup][id].name;
    }
    return '';
  }

  // TODO
  getTagColor(tagGroup: string, id: number): string {
    if (tagGroup === 'tags') {
      if (this.props.tags[id]) {
        const typeId = this.props.tags[id].type;
        const color = this.props.tag_types[typeId].colour;
        return '#' + color;
      }
    }
    return '#123456';
  }

  public render() {
    const { filterIds, postType, searchTerm, selectedCommunities, selectedTags } = this.state;
    
    const categories: Array<object> = [];
    this.props.categories.map(category => categories.push({ value: category.toLowerCase(), label: category }))
    
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

    // Filter Ids
    if (filterIds.length !== 0) {
      currPosts = Object.keys(currPosts)
      .filter(key => filterIds.includes(parseInt(key, 10)))
      .reduce((obj, key) => {
        obj[key] = currPosts[key];
        return obj;
      }, {});
    }

    const clearFilter = () => this.setState({ filterIds: [] })

    return (
      <div id="SearchForm" className="container">
        <div className="row">
          <div className="col-12">
            <Select
              styles={customStyles}
              value={selectedCommunities}
              onChange={this.handleCommunityChange}
              options={this.communityOptions}
              isMulti={true}
              placeholder={"Filter by community"}
              className={"border border-bottom-0 border-dark z-index-130 "}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row border 0 border-dark">
              <div className="order-1 col-12 col-sm-4 col-lg-2 px-0">
                <Select
                  styles={customStyles}
                  value={{value: postType.toLowerCase(), label: postType}}
                  onChange={this.handlePostTypeChange}
                  options={categories}
                  className={"h-100 m-0 p-0 z-index-120 d-flex flex-column justify-content-center "}
                />
              </div>
              <div className="order-3 order-sm-2 col-12 col-sm-4 col-lg-5 px-0">
                <div className="border-left-0 border-right-0 border-sm-left border-sm-right border-dark h-100 m-0 p-0">
                  <input
                    className="border-0 bg-light form-control h-100 px-2 py-11px"
                    onChange={this.handleSearch}
                    placeholder="Search by name"
                    type="text"
                    value={searchTerm}
                  />
                </div>
              </div>
              <div className="order-2 order-sm-3 col-12 col-sm-4 col-lg-5 px-0">
                <Select
                  styles={customStyles}
                  value={selectedTags}
                  onChange={this.handleTagFilterChange}
                  options={this.tagOptions}
                  isMulti={true}
                  placeholder={"Filter by tag"}
                  className={"border-top border-bottom border-top-sm-0 border-bottom-sm-0 border-dark h-100 m-0 p-0 z-index-110 "}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 pr-0">
            <div className="py-2 border-top border-left border-dark h-100">
              {filterIds.length !== 0 && 
              <div className="pl-2 ml-1" onClick={clearFilter}>
                <p className="cursor-pointer mb-0 d-inline">Remove filter</p>
              </div>}
            </div>
          </div>
          <div className="col-6 pl-0">
            <div className="py-2 border-top border-right border-dark">
              <div className="text-right pr-2">{Object.keys(currPosts).length} results</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="border border-dark table-container">
              <Table
                data={currPosts}
                postType={postType}
                handleFilterIds={this.handleFilterIds}
                getTagColor={this.getTagColor}
                getTagName={this.getTagName}
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
    height: '100%',
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