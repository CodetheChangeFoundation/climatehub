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
  updatePostTypeState: (postType: string, posts: Array<any>) => void;
};

interface MyState {
  filterStack: Array<any>,
  postQueries: Array<any>,
  postType: string,
  searchTerm: string,
  selectedCommunities: any,
  selectedPost: number,
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
      filterStack: [],
      postQueries: [],
      postType: props.categories[0],
      searchTerm: "",
      selectedCommunities: null,
      selectedPost: 0,
      selectedTags: null
    };
    this.handleCommunityChange = this.handleCommunityChange.bind(this);
    this.handlePostQuery = this.handlePostQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
    this.handleTagFilterChange = this.handleTagFilterChange.bind(this);
    this.getTagName = this.getTagName.bind(this);
    this.getTagColor = this.getTagColor.bind(this);
    this.setSelectedPost = this.setSelectedPost.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  setSelectedPost(selectedPost: number) {
    this.setState({selectedPost});
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
      postQueries: [],
      postType: postType.label
    }, 
      () => {
        this.getPostsByCommunity()
        .then(() => {
          this.getPostsByTag();
        })
    });
  }

  handlePostQuery(postType: string, postsToRender: Array<number>) {
    const {filterStack, postQueries, selectedPost} = this.state;
    const currPost = this.props[this.state.postType.toLowerCase()][selectedPost];
    postQueries.push([this.state.postType.toLowerCase(), selectedPost, currPost.name]);
    console.log(postQueries);
    this.setState({
      postQueries, 
    }, () => {
      const filterState = {
        postQueries: this.state.postQueries,
        postType: this.state.postType.toLowerCase(),
        searchTerm: this.state.searchTerm,
        selectedTags: this.state.selectedTags,
      }
      filterStack.push(filterState);
      this.setState({
        filterStack,
      }, () => {
        const posts = Array<any>();
        postsToRender.forEach((postId: number) => {
          posts.push(this.props.getPostbyId(postType.toLowerCase(), postId));
        })
        this.props.updatePostTypeState(postType.toLowerCase(), posts);
        this.setState({
          postType,
          searchTerm: '',
          selectedTags: null,
        });
        console.log(this.state.filterStack);
        console.log(this.state.postQueries);
      });
    })
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

  handleBack() {
    const prevState = this.state.filterStack.pop();
    const postQuery = this.state.postQueries.pop();
    console.log(prevState);
    console.log(postQuery);
    this.setState ({
      postType: prevState.postType.charAt(0).toUpperCase() + prevState.postType.slice(1),
      searchTerm: prevState.searchTerm,
      selectedPost: postQuery[1],
      selectedTags: prevState.selectedTags,
    }, () => {
      this.getPostsByCommunity()
      .then(() => {
        this.getPostsByTag();
      })
    });
  }

  public render() {
    const { postQueries, postType, searchTerm, selectedCommunities, selectedTags, selectedPost } = this.state;
    
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
            <div className="border-top border-left border-dark h-100">
              {postQueries.length !== 0 && 
              <div className="pl-2 ml-1 h-100 d-flex align-items-center">
                <a role="button" className="d-flex align-items-center back-button" onClick={this.handleBack}>
                  <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" transform="rotate(90)">
                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                  </svg>
                  <p className="mb-0 mt-1 d-inline-block">Back to {postQueries[postQueries.length-1][2]}</p>
                </a>
              </div>}
            </div>
          </div>
          <div className="col-6 pl-0">
            <div className="py-2 border-top border-right border-dark">
              <div className="text-right pr-2">
                <p className="mb-0 mt-1">{Object.keys(currPosts).length} results</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="border border-dark table-container">
              <Table
                data={currPosts}
                postType={postType}
                handlePostQuery={this.handlePostQuery}
                getTagColor={this.getTagColor}
                getTagName={this.getTagName}
                selectedPost={selectedPost}
                setSelectedPost={this.setSelectedPost}
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