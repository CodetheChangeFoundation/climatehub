// import * as d3 from 'd3';
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
  groups: any,
  individuals: any,
  isLoaded: boolean
  postType: string,
  projects: any,
  searchTerm: string,
  selectedPost: number,
  selectedTags: any,
  tag_types: any,
  tags: any,
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
  
  constructor(props: any) {
    super(props);
    this.categories = ["Groups", "Projects", "Individuals"];
    this.cache = {};
    
    this.state = {
      cities: [],
      communities: [],
      error: null,
      groups: [],
      individuals: [],
      isLoaded: false,
      postType: this.categories[0],
      projects: [],
      searchTerm: "",
      selectedPost: 0,
      selectedTags: null,
      tag_types: [],
      tags: [],
    };
    
    this.getAllPostsByType = this.getAllPostsByType.bind(this);
    this.getPostsFromCache = this.getPostsFromCache.bind(this);
    this.getPostbyId = this.getPostbyId.bind(this);
    this.updatePostTypeState = this.updatePostTypeState.bind(this);
    this.getPostType = this.getPostType.bind(this);
    this.setPostType = this.setPostType.bind(this);
    this.getSelectedPost = this.getSelectedPost.bind(this);
    this.setSelectedPost = this.setSelectedPost.bind(this);
    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.getSelectedTags = this.getSelectedTags.bind(this);
    this.setSelectedTags = this.setSelectedTags.bind(this);
  }

  componentDidMount() {
    const postTypes = ['tags', 'tag_types', 'cities', 'communities', 'groups'];
    const onLoad = new Array<Promise<any>>();
    postTypes.forEach((type: string) => {
      onLoad.push(this.getPostsOnLoad(type));
    })
    Promise.all(onLoad).then(() => {
      this.setLoadedState();
      this.getPostsOnLoad('individuals');
      this.getPostsOnLoad('projects');
    }).then(() => {
      console.log(this.cache)
    });
  }

  getPostsOnLoad(postType: string): Promise<void> {
    return new Promise((resolve) => {
      this.getAllPostsByType(postType).then(() => {
        console.log(this.cache[postType]);
        this.appendToPostTypeState(postType, this.cache[postType])
        resolve();
      })
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

  appendToPostTypeState (postType: string, posts: Array<any>): void {
    const updatedState = {};
    updatedState[postType] = this.state[postType];
    Object.values(posts).forEach((post: any) => {
      updatedState[postType][post.id] = post;
    })
    this.setState(updatedState);
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

  getSearchTerm(): string {
    return this.state.searchTerm;
  }

  setSearchTerm(searchTerm: string): Promise<void> {
    return new Promise((resolve) => {
      this.setState({searchTerm}, 
        () => resolve());
    })
  }

  getSelectedTags(): any {
    return this.state.selectedTags;
  }

  setSelectedTags(selectedTags: any): Promise<void> {
    return new Promise((resolve) => {
      this.setState({selectedTags}, 
        () => resolve());
    })
  }

  public render() {
    const { cities, communities, error, groups, isLoaded, postType, selectedPost, tags, tag_types} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="asset-map">
          <div className="container row" style={{margin: 'auto'}}>
            <div className='col-12 border-dark'
                  id="mapParent"
                  style={{
                    border: '2px solid',
                    borderBottom: 'none',
                    height: '400px',
                    margin: 'auto',
                    padding: '0',
                    width: '100%',
                  }}
                  >
                  <Map
                    selectedPost={selectedPost}
                    postType={postType}
                    getPostById={this.getPostbyId}
                  />
              </div>
            </div>
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
            getPostbyId={this.getPostbyId}
            updatePostTypeState={this.updatePostTypeState}
            getPostType={this.getPostType}
            setPostType={this.setPostType}
            getSelectedPost={this.getSelectedPost}
            setSelectedPost={this.setSelectedPost}
            getSearchTerm={this.getSearchTerm}
            setSearchTerm={this.setSearchTerm}
            getSelectedTags={this.getSelectedTags}
            setSelectedTags={this.setSelectedTags}
          />
        </div>
      );
    }
  }
}

export default Assetmap;
