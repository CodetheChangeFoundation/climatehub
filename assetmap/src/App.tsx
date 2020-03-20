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
  postType: any,
  projects: any,
  selectedCommunities: Array<any>,
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
      postType: 'groups',
      projects: [],
      selectedCommunities: [],
      tag_types: [],
      tags: [],
    };
    
    this.getAllPostsByType = this.getAllPostsByType.bind(this);
    this.getPostsFromCache = this.getPostsFromCache.bind(this);
    this.filterPostsByCommunity = this.filterPostsByCommunity.bind(this);
    this.getPostbyId = this.getPostbyId.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.updatePostTypeState = this.updatePostTypeState.bind(this);
  }

  componentDidMount() {
    const postTypes = ['tags', 'tag_types', 'cities', 'communities', 'groups'];
    const onLoad = new Array<Promise<any>>();
    postTypes.forEach((type: string) => {
      onLoad.push(this.getPostsOnLoad(type));
    })
    Promise.all(onLoad).then(() => {
      this.setLoadedState();
      this.getAllPostsByType('individuals');
      this.getAllPostsByType('projects');
    }).then(() => {
      console.log(this.cache)
    });
  }

  getPostsOnLoad(postType: string): Promise<any> {
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
      const currentPage = 1;
      const baseUrl = "http://climatehub.local/wp-json/wp/v2/" + postType + '?per_page=100';
      const requestUrl = baseUrl + '&page=' + currentPage;
      fetch(requestUrl)
      .then((res) => {
        const numPages = Number(res.headers.get('X-WP-TotalPages'));
        const dataResponses = new Array<any>();
        res.json()
        .then((resJSON) => {
          dataResponses.push(this.cacheAllPosts(resJSON, postType));
          
          for (let i = currentPage + 1; i<=numPages ; i++) {
            dataResponses.push(
              new Promise((res4) => {
                const newUrl = baseUrl + '&page=' + i;
                fetch(newUrl)
                .then((response) => {
                  response.json()
                  .then((res2) => {
                    dataResponses.push(this.cacheAllPosts(res2, postType));
                    res4();
                  })
                })
              })
            )
          }
          Promise.all(dataResponses).then(() => {
            resolve();
          })
        })
      });  
    })
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

  filterPostsByCommunity(postType: string, selectedCommunities: Array<number>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.filterPosts('groups', selectedCommunities, 'communities', 'groups')
      .then(() => {
        let filterParameter = selectedCommunities;
        if (selectedCommunities !== [] && selectedCommunities !== null) {
          filterParameter = this.state.groups;
        }
        if (postType === 'groups') {
          resolve();
        } else if (postType === 'individuals') {
          this.filterPosts(postType, filterParameter, 'groups', 'individuals')
          .then(() => {
            resolve();
          })
        } else if (postType === 'projects') {
          this.filterPosts(postType, filterParameter, 'groups', 'projects')
          .then(() => {
            resolve();
          })
        } else {
          reject();
        }
      })
      .catch(() => {
        console.log("Invalid post type");
      })
    })
  }

  filterPosts(filterPostType: string, selectedPosts: Array<any>, relatedPostType: string, relatedFieldName: string) {
    return new Promise((resolve) => {
      this.getPostsFromCache(filterPostType)
      .then(() => {
        let allPosts = this.cache[filterPostType];
        if (relatedPostType === 'tags') {
          allPosts = this.state[filterPostType];
        }
        const filteredPosts = new Set; 
        const updatedPosts = new Array;
        if (selectedPosts === [] || selectedPosts === null) {
          Object.keys(allPosts).forEach((postId: any) => {
            updatedPosts[postId] = allPosts[postId];
          });
          this.updatePostTypeState(filterPostType, updatedPosts);
          resolve();
        } else {
          Object.keys(selectedPosts).forEach((post: any) => {
            const postObject = this.getPostbyId(relatedPostType, post);
            const relatedPostIds = postObject[relatedFieldName];
            if (relatedPostIds) {
              relatedPostIds.forEach((relatedPostId: number) => {
                if(allPosts[relatedPostId] !== undefined) {
                  filteredPosts.add(allPosts[relatedPostId]);
                }
              });
            }
          });
          if (filteredPosts.size > 0) {
            Array.from(filteredPosts).forEach((post: any) => {
              updatedPosts[post.id] = post;
            });
          }
          this.updatePostTypeState(filterPostType, updatedPosts);
          resolve();
        }
      })
    });
  }

  //
  getPostbyId (postType: string, ID: number) {
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
  }

  getPostsFromCache(postType: string): Promise<any> {
    return new Promise((resolve) => {
      if (!this.cache[postType]) {
        this.getAllPostsByType(postType).then(() => resolve());
      } else {
        resolve();
      }
    });
  }

  appendToPostTypeState (postType: string, posts: Array<any>) {
    const updatedState = {};
    updatedState[postType] = this.state[postType];
    Object.values(posts).forEach((post: any) => {
      updatedState[postType][post.id] = post;
    })
    this.setState(updatedState);
  }

  // Should return promise
  updatePostTypeState (postType: string, posts: Array<any>) {
    const updatedState = {};
    updatedState[postType] = {};
    posts.forEach((post: any) => {
      updatedState[postType][post.id] = post;
    })
    this.setState(updatedState);
  }

  cachePost(postType: string, postId: any, postData: any): Promise<any> {
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

  public render() {
    const { cities, communities, error, groups, isLoaded, tags, tag_types} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="asset-map">
          <div className="container row" style={{margin: 'auto'}}>
            <div className='col-12 border-dark justify-content-center'
                  id="mapParent"
                  style={{
                    border: '2px solid',
                    borderBottom: 'none',
                    margin: 'auto',
                    maxHeight: '400px',
                    minHeight: '350px',
                    width: '100%',
                  }}
                >
                  <Map/>
              </div>
            </div>
          <SearchForm 
            tags={tags}
            tag_types={tag_types}
            categories={this.categories}
            cities={cities}
            communities={communities}
            groups={groups}
            individuals={this.state.individuals}
            projects={this.state.projects}
            cache={this.cache}
            getAllPostsByType={this.getAllPostsByType}
            filterPostsByCommunity={this.filterPostsByCommunity}
            getPostsFromCache={this.getPostsFromCache}
            updatePostTypeState={this.updatePostTypeState}
            getPostbyId = {this.getPostbyId}
            filterPosts = {this.filterPosts}
          />
        </div>
      );
    }
  }
}

export default Assetmap;
