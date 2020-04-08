import * as React from 'react';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';
import Map from './components/Map';
import SearchForm from './components/SearchForm';

interface MyState {
  cities: any,
  communities: any,
  error: any,
  filterStack: Array<any>,
  groups: any,
  individuals: any,
  isLoaded: boolean,
  maxNodes: number,
  postQueries: Array<any>,
  postType: string,
  projects: any,
  searchTerm: string,
  selectedPost: number,
  selectedTags: any,
  tag_types: any,
  tags: any,
  windowSize: number,
};

const fieldTypes = {
  'cities': ['city_id', 'name', 'location', 'communities'],
  'communities': ['community_id', 'name', 'code', 'location', 'city', 'groups'],
  'groups': ['group_id', 'name', 'description', 'website', 'tags', 'community', 
    'parent_group', 'child_groups', 'projects', 'individuals'],
  'individuals': ['individual_id', 'name', 'description', 'website', 'position', 'email', 'phone', 
    'survey_info', 'tags', 'projects', 'groups'],
  'projects': ['project_id', 'name', 'description', 'website', 'blog_post', 'tags', 'groups', 'director'],
  'tag_types': ['type_id', 'name', 'colour'],
  'tags': ['name', 'type', 'groups', 'projects', 'individuals'],
}

class Assetmap extends React.Component<{}, MyState> {
  categories: Array<string>;
  cache: {};
  searchFormRef: any;
  
  constructor(props: any) {
    super(props);
    this.categories = ["Groups", "Projects", "Individuals"];
    this.cache = {};
    // this.searchFormRef = null;
    
    this.state = {
      cities: [],
      communities: [],
      error: null,
      filterStack: [],
      groups: [],
      individuals: [],
      isLoaded: false,
      maxNodes: 0,
      postQueries: [],
      postType: this.categories[0],
      projects: [],
      searchTerm: "",
      selectedPost: 0,
      selectedTags: null,
      tag_types: [],
      tags: [],
      windowSize: 0,
    };
    
    this.getPostbyId = this.getPostbyId.bind(this);
    this.updatePostTypeState = this.updatePostTypeState.bind(this);
    this.getPostType = this.getPostType.bind(this);
    this.setPostType = this.setPostType.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
    this.setSelectedPost = this.setSelectedPost.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.resetSearchState = this.resetSearchState.bind(this);
    this.handlePostQuery = this.handlePostQuery.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.appendToSelectedTags = this.appendToSelectedTags.bind(this);
    this.handleTagFilterChange = this.handleTagFilterChange.bind(this);
    this.getRenderState = this.getRenderState.bind(this);
    this.setMaxNodes = this.setMaxNodes.bind(this);
    this.scrollToSearchForm = this.scrollToSearchForm.bind(this);
  }
  // ----
  // Load and cache data
  // ----
  componentDidMount() {
    const postTypes = ['tags', 'tag_types', 'cities', 'communities', 'groups', 'individuals', 'projects'];
    const onLoad = new Array<Promise<void>>();
    postTypes.forEach((type: string) => {
      onLoad.push(this.getPostsOnLoad(type));
    })
    onLoad.push(this.setWindowSize());
    Promise.all(onLoad).then(() => {
      this.setLoadedState();
      window.addEventListener("resize",() => {
        this.setWindowSize();
      })
    }).then(() => {
      console.log(this.cache)
    });
  }

  getPostsOnLoad(postType: string): Promise<void> {
    return new Promise((resolve) => {
      this.getAllPostsByType(postType).then(() => {
        this.appendToPostTypeState(postType, this.cache[postType])
        .then(() => resolve());
      })
    })
  }

  setWindowSize(): Promise<void>{
    return new Promise((resolve) => {
      this.setState({windowSize: window.innerWidth}, () => resolve());
    })
  }

  getAllPostsByType(postType: string): Promise<any> {
    return new Promise((resolve) => {
      console.log("Querying WP for : " + postType);
      const baseUrl = "http://climatehub.local/wp-json/wp/v2/" + postType + '?per_page=100';
      // Fetch first page
      const requestUrl = baseUrl + '&page=' + 1;
      fetch(requestUrl)
      .then((res) => {
        const dataResponses = new Array<any>();
        res.json()
        .then((resJSON) => {
          dataResponses.push(this.cacheAllPosts(resJSON, postType)); 
          // If there are more than 1 pages to fetch: 
          const numPages = Number(res.headers.get('X-WP-TotalPages'));
          for (let pageNum = 2; pageNum<=numPages ; pageNum++) {
            dataResponses.push(
              this.fetchNextPage(baseUrl, pageNum, dataResponses, postType)
            )
          }
          Promise.all(dataResponses).then(() => {
            resolve();
          })
        })
      });  
    })
  }

  private fetchNextPage(baseUrl: string, pageNum: number, dataResponses: Array<any>, postType: string): Promise<void> {
    return new Promise((resolve) => {
      const newUrl = baseUrl + '&page=' + pageNum;
      fetch(newUrl)
        .then((response) => {
          response.json()
            .then((posts) => {
              dataResponses.push(this.cacheAllPosts(posts, postType));
              resolve();
            });
        });
    });
  }

  cacheAllPosts(posts: any, postType: string): Promise<any> {
    return new Promise((resolve) => {
      const pageUpdatedPosts = Array<any>();
      const promiseArray = new Array<Promise<any>>();
      posts.forEach((post: any) => {
        promiseArray.push(
          new Promise((res) => {
            const postObject = {
              id: post.id
            };
            fieldTypes[postType].forEach((field: string) => {
              postObject[field] = post[field];
            });
            pageUpdatedPosts[postObject.id] = (postObject);
            this.cachePost(postType, post.id, postObject)
            .then(() => res());
          })
        )
      })
      Promise.all(promiseArray).then(() => {
        resolve();
      })
    })
  }

  getPostbyId (postType: string, ID: number): object|undefined {
    if (this.cache[postType]) {
      const post = this.cache[postType][ID];
      if (post) {
        return post;
      }
      else {
        console.log("Post does not exist");
        return undefined;
      }
    } else {
      this.getAllPostsByType(postType)
      .then(() => {
        this.getPostbyId(postType, ID)
      });
    }
    return;
  }

  getPostsFromCache(postType: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.cache[postType]) {
        this.getAllPostsByType(postType).then(() => resolve());
      } else {
        resolve();
      }
    });
  }

  appendToPostTypeState (postType: string, posts: Array<any>): Promise<void> {
    return new Promise((resolve) => {
      const updatedState = {};
      updatedState[postType] = this.state[postType];
      Object.values(posts).forEach((post: any) => {
        updatedState[postType][post.id] = post;
      })
      this.setState(updatedState, () => resolve());
    });
  }

  updatePostTypeState (postType: string, posts: Array<any>): Promise<void> {
    return new Promise((resolve) => {
      const updatedState = {};
      updatedState[postType] = {};
      posts.forEach((post: any) => {
        updatedState[postType][post.id] = post;
      })
      this.setState(updatedState, () => resolve());
    })
  }

  cachePost(postType: string, postId: any, postData: any): Promise<void> {
    return new Promise((resolve) => {
      if (!this.cache[postType]) {
        this.cache[postType] = {};
      }
      this.cache[postType][postId] = postData;
      resolve();
    })
  }

  setLoadedState () {
    this.setState({
      isLoaded: true,
    })
  }

  // ----
  // Handle form and map events
  // ----
  handlePostQuery(postType: string, postsToRender: Array<number>, currPostType = this.state.postType.toLowerCase()): Promise<void> {
    return new Promise((resolve) => {
      const {filterStack, postQueries, selectedPost, searchTerm, selectedTags} = this.state;
      const currPost = this.state[currPostType][selectedPost];
      postQueries.push([currPostType, selectedPost, currPost.name]);
      this.setState({
        postQueries, 
      }, () => {
        const filterState = {
          postQueries: this.state.postQueries,
          postType: currPostType,
          renderedPosts: this.state[currPostType],
          searchTerm,
          selectedTags,
        }
        filterStack.push(filterState);
        this.setState({
          filterStack,
        }, () => {
          const posts = Array<any>();
          postsToRender.forEach((postId: number) => {
            const post = this.getPostbyId(postType.toLowerCase(), postId);
            if (post) {
              posts.push(post);
            };
          })
          this.updatePostTypeState(postType.toLowerCase(), posts)
          .then(() => {
            this.setState({
              postType: postType.charAt(0).toUpperCase() + postType.slice(1),
              searchTerm: "",
              selectedTags: null,
            }, () => resolve())
          });
        });
      })
    })
  }

  resetSearchState (): Promise<void> {
    return new Promise((resolve) => {
      this.setState({
        postQueries: [],
        searchTerm: "",
        selectedPost: 0,
        selectedTags: null,
      }, () => resolve())
    })
  }

  handleBack(): Promise<void> {
    return new Promise((resolve) => {
      const prevState = this.state.filterStack.pop();
      const postQuery = this.state.postQueries.pop();
      const postsToRender = prevState.renderedPosts;
      this.setState({
        postType: prevState.postType.charAt(0).toUpperCase() + prevState.postType.slice(1),
        searchTerm: prevState.searchTerm,
        selectedPost: postQuery[1],
        selectedTags: prevState.selectedTags,
      }, () => {
        this.updatePostTypeState(prevState.postType, Object.values(postsToRender))
        .then(() => resolve())
      })
    })
  }

  appendToSelectedTags(tagId: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.state.tags[tagId]) {
        const newTag = this.state.tags[tagId];
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
            this.handleTagFilterChange(newTags)
            .then(() => resolve());
          }
        } else {
          this.handleTagFilterChange(newTags)
          .then(() => resolve());
        }
      }
    })
  }
    
  handleTagFilterChange(tags: any): Promise<void> {
    return new Promise((resolve) => {
      let selectedTags = tags;
      if (tags!== null && tags.length === 0) {
        selectedTags = null;
      }
      this.setState({selectedTags}, 
        () => resolve());
    })
  }

  getPostType(): string {
    return this.state.postType;
  }

  setPostType(postType: string): Promise<void> {
    return new Promise((resolve) => {
      this.setState({postType}, 
        () => resolve());
    })
  }

  getSelectedPost(): number {
    return this.state.selectedPost;
  }

  setSelectedPost(selectedPost: number): Promise<void> {
    return new Promise((resolve) => {
      this.setState({selectedPost}, () => {
        resolve();
      })
    })
  }

  setSearchTerm(searchTerm: string): Promise<void> {
    return new Promise((resolve) => {
      this.setState({searchTerm}, 
        () => resolve());
    })
  }

  setMaxNodes(maxNodes: number): Promise<void> {
    return new Promise((resolve) => {
      this.setState({maxNodes}, 
        () => resolve());
    })
  }

  getRenderState(): any {
    const { postQueries, postType , searchTerm , selectedTags } = this.state
    return {
      postQueries,
      postType,
      searchTerm,
      selectedTags,
    }
  }

  scrollToSearchForm(): void {
    window.scrollTo({
      behavior: "smooth",
      left: 0, 
      top: this.searchFormRef.offsetTop,
    })
  }

  public render() {
    const { cities, communities, error, groups, isLoaded, maxNodes, postType, selectedPost, tags, tag_types, windowSize} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="asset-map">
          {(windowSize > 768) && 
            <div id="mapParent" className="container">
              <div className="row h-100">
                <div className='col'>
                  <Map
                    maxNodes={maxNodes}
                    selectedPost={selectedPost}
                    setMaxNodes={this.setMaxNodes}
                    setSelectedPost={this.setSelectedPost}
                    postType={postType}
                    getPostById={this.getPostbyId}
                    handlePostQuery={this.handlePostQuery}
                    handleBack={this.handleBack}
                    scrollToSearchForm={this.scrollToSearchForm}
                  />
                </div>
              </div>
            </div> 
          }
          <div ref={(ref) => this.searchFormRef = ref}>
            <SearchForm 
              cache={this.cache}
              categories={this.categories}
              cities={cities}
              communities={communities}
              groups={groups}
              individuals={this.state.individuals}
              projects={this.state.projects}
              tags={tags}
              tag_types={tag_types}
              updatePostTypeState={this.updatePostTypeState}
              getPostType={this.getPostType}
              setPostType={this.setPostType}
              getSelectedPost={this.getSelectedPost}
              setSelectedPost={this.setSelectedPost}
              setSearchTerm={this.setSearchTerm}
              resetSearchState={this.resetSearchState}
              handlePostQuery={this.handlePostQuery}
              handleBack={this.handleBack}
              appendToSelectedTags={this.appendToSelectedTags}
              handleTagFilterChange={this.handleTagFilterChange}
              getRenderState={this.getRenderState}
            />
          </div>
        </div>
      );
    }
  }
}

export default Assetmap;
