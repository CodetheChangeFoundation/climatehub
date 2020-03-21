import * as React from 'react';
import Select from 'react-select';
import Table from './Table';

interface MyProps {
  cache: any
  categories: Array<string>
  cities: any
  communities: any
  groups: any
  individuals: any
  projects: any
  tags: any
  tag_types: any
  getPostbyId: (postType: string, ID: number) => object|undefined,
  updatePostTypeState: (postType: string, posts: Array<any>) => void,
  getPostType: () => string,
  setPostType: (postType: string) => Promise<void>,
  getSelectedPost: () => number,
  setSelectedPost: (selectedPost: number) => Promise<void>,
};

interface MyState {
  filterStack: Array<any>,
  postQueries: Array<any>,
  searchTerm: string,
  selectedCommunities: any,
  selectedTags: any,
};

class SearchForm extends React.Component<MyProps, MyState> {
  communityOptions: any;
  tagOptions: any;

  constructor(props: MyProps) {
    super(props);
    this.populateSelects();

    this.state = {
      filterStack: [],
      postQueries: [],
      searchTerm: "",
      selectedCommunities: null,
      selectedTags: null
    };
    this.handleCommunityChange = this.handleCommunityChange.bind(this);
    this.handlePostQuery = this.handlePostQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
    this.handleTagFilterChange = this.handleTagFilterChange.bind(this);
    this.getTagName = this.getTagName.bind(this);
    this.getTagColor = this.getTagColor.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.appendToSelectedTags = this.appendToSelectedTags.bind(this);
    this.communityFilter = this.communityFilter.bind(this);
  }

  private populateSelects(): void {
    // Communities
    this.communityOptions = [];
    if (this.props.cities !== []) {
      Object.values(this.props.cities).map((city: {
        id: number;
        name: string;
      }) => this.communityOptions[city.id] = ({ label: city.name, options: [] }));
    };
    if (this.props.communities !== []) {
      Object.values(this.props.communities).map((community: {
        id: number;
        name: string;
        city: number;
      }) => this.communityOptions[community.city[0]].options.push({ id: community.id, value: community.id, label: community.name }));
    };
    // Tags
    this.tagOptions = [];
    if (this.props.tag_types !== []) {
      Object.values(this.props.tag_types).map((tagType: {
        id: number;
        name: string;
        color: string;
      }) => this.tagOptions[tagType.id] = ({ label: tagType.name, options: [] }));
    };
    if (this.props.tags !== []) {
      Object.values(this.props.tags).map((tag: {
        id: number;
        name: string;
        type: string;
      }) => this.tagOptions[tag.type[0]].options.push({ id: tag.id, label: tag.name, value: tag.name }));
    };
  }

  handleCommunityChange(communities: any): void {
    let selectedCommunities = communities;
    if (communities!== null && communities.length === 0) {
      selectedCommunities = null;
    }
    this.setState({ 
        postQueries: [],
        searchTerm: "",
        selectedCommunities,
        selectedTags: null 
      }, () => {
        this.props.setSelectedPost(0)
        .then(() => {
          this.communityFilter(communities, this.props.getPostType());
        })
      }
    );
  }

  handleSearch(event: any): void {
    this.setState({searchTerm: event.target.value});
  }

  handleTagFilterChange(tags: any): void {
    let selectedTags = tags;
    if (tags!== null && tags.length === 0) {
      selectedTags = null;
    }
    this.setState(
      { selectedTags }
    );
  }

  handlePostTypeChange(postType: any): void {
    this.setState({
      postQueries: [],
      searchTerm: "",
      selectedTags: null
    }, () => {
      this.props.setSelectedPost(0)
      .then(() => {
        this.props.setPostType(postType.label)
      })
      .then(() => {
        this.communityFilter(this.state.selectedCommunities,postType.label);
      });
    });
  }

  appendToSelectedTags(tagId: number): void {
    if (this.props.tags[tagId]) {
      const newTag = this.props.tags[tagId];
      const currSelectedTags = this.state.selectedTags;
      const selectedTag = {
        id: newTag.id,
        label: newTag.name,
        value: newTag.name,
      }
      let newTags = [selectedTag];
      if (currSelectedTags !== null && currSelectedTags !== []) {     
        let unique = true;
        currSelectedTags.forEach((tag: any) => {
          if (tag.id === newTag.id) {
            unique = false;
          }
        })
        if (unique) {
          newTags =  currSelectedTags.concat(selectedTag);
          this.handleTagFilterChange(newTags);
        }
      } else {
        this.handleTagFilterChange(newTags);
      }
    }
  }

  handlePostQuery(postType: string, postsToRender: Array<number>): void {
    const {filterStack, postQueries} = this.state;
    const selectedPost = this.props.getSelectedPost();
    const currPostType = this.props.getPostType().toLowerCase();
    const currPost = this.props[currPostType][selectedPost];
    postQueries.push([currPostType, selectedPost, currPost.name]);
    this.setState({
      postQueries, 
    }, () => {
      const filterState = {
        postQueries: this.state.postQueries,
        postType: currPostType,
        renderedPosts: this.props[currPostType],
        searchTerm: this.state.searchTerm,
        selectedTags: this.state.selectedTags,
      }
      filterStack.push(filterState);
      this.setState({
        filterStack,
      }, () => {
        const posts = Array<any>();
        postsToRender.forEach((postId: number) => {
          const post = this.props.getPostbyId(postType.toLowerCase(), postId);
          if (post) {
            posts.push(post);
          };
        })
        this.props.updatePostTypeState(postType.toLowerCase(), posts);
        this.setState({
          searchTerm: '',
          selectedTags: null,
        }, () => {
          this.props.setPostType(postType);
        });
      });
    })
  }

  getTagName(id: number): string {
    if (this.props.tags[id]) {
      return this.props.tags[id].name;
    }
    return '';
  }

  getTagColor(id: number): string {
    if (this.props.tags[id]) {
      const typeId = this.props.tags[id].type;
      const color = this.props.tag_types[typeId].colour;
      return '#' + color;
    }
    return '#123456';
  }

  handleBack() {
    const prevState = this.state.filterStack.pop();
    const postQuery = this.state.postQueries.pop();
    const postsToRender = prevState.renderedPosts;
    this.setState ({
      searchTerm: prevState.searchTerm,
      selectedTags: prevState.selectedTags,
    }, () => {
      this.props.setSelectedPost(postQuery[1])
      .then(() => {
      this.props.setPostType(prevState.postType.charAt(0).toUpperCase() + prevState.postType.slice(1))
      }).then(() => {
        this.props.updatePostTypeState(prevState.postType, Object.values(postsToRender));
      })
    })
  }

  private searchFilter(searchTerm: string, currPosts: object): object {
    const searchTermFormatted = searchTerm.toLowerCase();
    if (searchTermFormatted !== "") {
      const updatedPosts = {};
      Object.keys(currPosts).forEach((postId) => {
        if (currPosts[postId].name.toLowerCase().includes(searchTermFormatted)) {
          updatedPosts[postId] = currPosts[postId];
        }
      });
      currPosts = updatedPosts;
    }
    return currPosts;
  }
  
  private tagsFilter(selectedTags: Array<object>, currPosts: object): object {
    if (selectedTags !== null && selectedTags !== []) {
      const property = 'tagsCount';
      const updatedPosts = {};
      Object.keys(currPosts).forEach((postId: any) => {
        currPosts[postId][property] = 0;
        selectedTags.forEach((tag: any) => {
          if (currPosts[postId].tags.length > 0 && currPosts[postId].tags.includes(tag.id)) {
            currPosts[postId][property] += 1;
          }
        });
        if (currPosts[postId][property] > 0) {
          updatedPosts[postId] = currPosts[postId];
        }
      });
      currPosts = updatedPosts;
    }
    return currPosts;
  }

  private communityFilter(selectedCommunities: Array<object>, postTypeLabel: string): void {
    const postType = postTypeLabel.toLowerCase();
    let currPosts = this.props.cache[postType];
    if (selectedCommunities !== null && Object.values(selectedCommunities).length > 0) {
      const communityIds = selectedCommunities.map((community: {id: number}) => {
        return community.id;
      })
      const filteredGroups: any = {};
      const groupsCache = this.props.cache.groups;
      Object.keys(groupsCache).forEach((groupId: any) => {
        const post = groupsCache[groupId];
        if (post.community && communityIds.indexOf(post.community[0]) >= 0) {
          filteredGroups[groupId] = post;
        }
      })
      if (postType === "groups") {
        currPosts = filteredGroups;
      } 
      if (postType === "projects" || postType === "individuals") {
        const filteredPosts: any = {};
        Object.keys(currPosts).forEach((postId: any) => {
          const post = currPosts[postId];
          if (post.groups && post.groups.some((group: any) =>
            Object.keys(filteredGroups).indexOf("" + group + "") >= 0)) {
            filteredPosts[postId] = post;
          }
        })
        currPosts = filteredPosts;
      }
    }
    this.props.updatePostTypeState(postType, Object.values(currPosts));
  }

  public render() {
    const { postQueries, searchTerm, selectedCommunities, selectedTags } = this.state;
    const postType = this.props.getPostType();
    const categories: Array<object> = [];
    this.props.categories.map(category => categories.push({ value: category.toLowerCase(), label: category }))
    
    let currPosts = this.props[postType.toLowerCase()];
    currPosts = this.searchFilter(searchTerm, currPosts);
    currPosts = this.tagsFilter(selectedTags, currPosts);
    const numResults = Object.keys(currPosts).length;

    return (
        <div id="SearchForm" className="container">
          {Object.values(this.props.communities).length > 1 && (
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
          )}
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
            <div className="col-3 pr-0">
              <div className="border-top border-left border-dark h-100">
                {postQueries.length !== 0 && 
                <div className="pl-2 ml-1 h-100 d-flex align-items-center">
                  <a role="button" className="d-flex align-items-center back-button" onClick={this.handleBack}>
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" transform="rotate(90)">
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                    </svg>
                    <p className="mb-0 mt-1 d-inline-block">Back</p>
                  </a>
                </div>}
              </div>
            </div>
            <div className="col-9 pl-0">
              <div className="py-2 border-top border-right border-dark">
                <div className="text-right pr-2">
                  <p className="mb-0 mt-1">
                    {numResults + " " + (numResults === 1? postType.substring(0, postType.length - 1): postType) + 
                      (postQueries.length !== 0? " in " + postQueries[postQueries.length-1][2] : "")}
                  </p>
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
                selectedTags={selectedTags}
                setSelectedPost={this.props.setSelectedPost}
                getSelectedPost={this.props.getSelectedPost}
                appendToSelectedTags={this.appendToSelectedTags}
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