import * as React from 'react';
import Select, {components} from 'react-select';
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
  getPostType: () => string,
  setPostType: (postType: string) => Promise<void>,
  setSearchTerm: (searchTerm: string) => Promise<void>,
  resetSearchState: () => Promise<void>,
  getRenderState: () => any,
  updatePostTypeState: (postType: string, posts: Array<any>) => Promise<void>,
  handleBack: () => Promise<void>,
  handleTagFilterChange: (tags: any) => void,
  // Props for Table Component : 
  getSelectedPost: () => number, 
  setSelectedPost: (selectedPost: number) => Promise<void>, 
  appendToSelectedTags: (tagId: number) => Promise<void>, 
  handlePostQuery: (postType: string, postsToRender: Array<number>) => Promise<void>, 
};

interface MyState {
  selectedCommunities: any,
};

class SearchForm extends React.Component<MyProps, MyState> {
  communityOptions: any;
  tagOptions: any;

  constructor(props: MyProps) {
    super(props);
    this.populateSelects();

    this.state = {
      selectedCommunities: null,
    };
    this.handleCommunityChange = this.handleCommunityChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
    this.getTagName = this.getTagName.bind(this);
    this.getTagColor = this.getTagColor.bind(this);
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
      }) => {
        if (community.city)  {
          this.communityOptions[community.city[0]].options.push({ id: community.id, value: community.id, label: community.name })
        }
      });
    };
    // Tags
    this.tagOptions = [];
    if (this.props.tag_types !== []) {
      Object.values(this.props.tag_types).map((tagType: {
        id: number;
        name: string;
        colour: string;
      }) => this.tagOptions[tagType.id] = ({ label: tagType.name, colour: tagType.colour, options: [] }));
    };
    if (this.props.tags !== []) {
      Object.values(this.props.tags).map((tag: {
        id: number;
        name: string;
        type: string;
      }) => {
        if (tag.type) {
          this.tagOptions[tag.type[0]].options.push({ id: tag.id, label: tag.name, value: tag.name, colour: this.getTagColor(tag.id)})
        }
      });
    };
  }

  handleCommunityChange(communities: any): void {
    let selectedCommunities = communities;
    if (communities!== null && communities.length === 0) {
      selectedCommunities = null;
    }
    this.setState({ 
        selectedCommunities,
      }, () => {
        this.props.resetSearchState()
        .then(() => {
          this.communityFilter(communities, this.props.getPostType());
        })
      }
    );
  }

  handleSearch(event: any): void {
    this.props.setSearchTerm(event.target.value);
  }

  handlePostTypeChange(postType: any): void {
    this.props.resetSearchState() 
    .then(() => {
      this.props.setPostType(postType.label)
    }).then(() => {
      this.communityFilter(this.state.selectedCommunities,postType.label);
    });
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

  private communityFilter(selectedCommunities: Array<object>, postType: string): void {
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
    const { selectedCommunities } = this.state;
    const { postQueries , postType , searchTerm , selectedTags } = this.props.getRenderState();
    const categories: Array<object> = [];
    this.props.categories.map(category => categories.push({ value: category, label: category }))
    
    let currPosts = this.props[postType];
    currPosts = this.searchFilter(searchTerm, currPosts);
    currPosts = this.tagsFilter(selectedTags, currPosts);
    const numResults = Object.keys(currPosts).length;

    return (
        <div id="SearchForm" className="container">
          <div className="row mt-4">
          {Object.values(this.props.communities).length > 1 && (
              <div className="col-12">
                <Select
                  styles={this.selectStyles}
                  value={selectedCommunities}
                  onChange={this.handleCommunityChange}
                  options={this.communityOptions}
                  isMulti={true}
                  placeholder={"Filter by community"}
                  className={"bg-grey border-bottom-0 z-index-130 "}
                />
              </div>
          )}
            <div className="col-12">
              <div className="d-flex flex-column flex-sm-row  0  border-bottom-0">
                <div className="bg-grey order-1 col-12 col-sm-4 col-lg-2 px-0">
                  <Select
                    styles={this.selectStyles}
                    value={{value: postType, label: postType}}
                    onChange={this.handlePostTypeChange}
                    options={categories}
                    className={"h-100 m-0 p-0 z-index-120 d-flex flex-column justify-content-center text-capitalize"}
                  />
                </div>
                <div className="order-3 order-sm-2 col-12 col-sm-4 col-lg-5 px-0">
                  <div className="border-left-0 border-right-0 bg-white h-100 m-0 p-0">
                    <input
                      className="border-0 form-control h-100 px-2 py-11px"
                      onChange={this.handleSearch}
                      placeholder="Search by name"
                      type="text"
                      value={searchTerm}
                    />
                  </div>
                </div>
                <div className="bg-grey order-2 order-sm-3 col-12 col-sm-4 col-lg-5 px-0">
                  <Select
                    components={{DropdownIndicator}}
                    styles={this.tagSelectStyles}
                    value={selectedTags}
                    onChange={this.props.handleTagFilterChange}
                    options={this.tagOptions}
                    isMulti={true}
                    placeholder={"Filter by tag"}
                    className={"h-100 m-0 p-0 z-index-110 "}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3 col-md-2 pr-0">
              <div className="bg-white h-100">
                {postQueries.length !== 0 && 
                <div className="h-100 d-flex align-items-center">
                  <a role="button" className="btn btn-outline-primary d-flex align-items-center back-button h-100 py-0 pl-2 pr-3" onClick={this.props.handleBack}>
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" style={{transform: "rotate(90deg)"}}>
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                    </svg>
                    <p className="mb-0 mt-1 d-inline-block">Back</p>
                  </a>
                </div>}
              </div>
            </div>
            <div className="col-6 col-md-8 px-0">
              <div className="py-2 bg-white">
                <div className="text-center">
                  <p className="mb-0 mt-1">
                    {numResults + " " + (numResults === 1? postType.substring(0, 1).toUpperCase() + postType.substring(1, postType.length - 1): postType.substring(0, 1).toUpperCase() + postType.substring(1)) + 
                      (postQueries.length !== 0? " in " + postQueries[postQueries.length-1][2] : "")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3 col-md-2 pl-0">
              <div className="bg-white h-100 pr-2" />
            </div>
          </div>
        <div className="row">
          <div className="col-12">
            <div className="table-container bg-white">
              <Table
                data={currPosts}
                postType={postType}
                handlePostQuery={this.props.handlePostQuery}
                getTagColor={this.getTagColor}
                getTagName={this.getTagName}
                selectedTags={selectedTags}
                setSelectedPost={this.props.setSelectedPost}
                getSelectedPost={this.props.getSelectedPost}
                appendToSelectedTags={this.props.appendToSelectedTags}
                />
              </div>
            </div>
          </div>
        </div>
    );
  }

  selectStyles = {
    control: (provided: any, state: any) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      backgroundColor: 'bg-light',
      border: 0,
      boxShadow: 0,
      height: '100%',
      outline: 0,
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    option: (provided: any) => ({
      ...provided,
      cursor: 'pointer',
    }),
  }

  tagSelectStyles = {
    control: (provided: any, state: any) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      backgroundColor: 'bg-light',
      border: 0,
      boxShadow: 0,
      height: '100%',
      outline: 0,
    }),
    multiValue: (provided: any, {data}: any) => ({
      ...provided,
      backgroundColor: this.getTagColor(data.id) + '44',
      border: '2px solid' + this.getTagColor(data.id),
      borderRadius: 0,
    }),
    option: (provided: any, {data, isFocused}: any) => ({
      ...provided,
      color: data.colour,
      cursor: 'pointer',
    }),
  }
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <div className="dropdown-caret d-inline-block h-100 w-100">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true" focusable="false">
            <path d="M9 12L0.339745 0.75L17.6603 0.75L9 12Z" fill="#888888"/>
          </svg>            
        </div>
      </components.DropdownIndicator>
    )
  );
};

export default SearchForm;
