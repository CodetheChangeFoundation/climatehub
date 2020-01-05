// import * as d3 from 'd3';
import * as React from 'react';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';
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
};

const fieldTypes = {
  'cities': ['city_id', 'name', 'location', 'communities'],
  'communities': ['community_id', 'name', 'code', 'location', 'city', 'groups'],
  'groups': ['group_id', 'name', 'description', 'website', 'tag_a', 'tag_b', 'tag_c', 'community', 
    'parent_group', 'child_groups', 'projects', 'individuals'],
  'individuals': ['individual_id', 'name', 'description', 'website', 'position', 'email', 'phone', 
    'survey_info', 'tag_a', 'tag_b', 'tag_c', 'projects', 'groups'],
  'projects': ['project_id', 'name', 'description', 'website', 'blog_post', 'tag_a', 'tag_b', 
    'tag_c', 'groups', 'director'],
  'tag_a': ['groups', 'projects', 'individuals'],
  'tag_b': ['groups', 'projects', 'individuals'],
  'tag_c': ['groups', 'projects', 'individuals']
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
    };
    
    this.getAllPostsByType = this.getAllPostsByType.bind(this);
    this.getPostsFromCache = this.getPostsFromCache.bind(this);
    this.filterPostsByCommunity = this.filterPostsByCommunity.bind(this);
    this.getPostbyId = this.getPostbyId.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
  }


  componentDidMount() {
    this.getAllPostsByType('cities')
    .then(() => 
      this.getAllPostsByType('communities')
    ).then(() => 
      this.getAllPostsByType('groups')
    ).then(() => {
      this.setLoadedState();
    })
  }

  // changeLevel() {
  //   this.setState({
  //     columns: [],
  //     items: []
  //   });
  // }

  getAllPostsByType(postType: string): Promise<any> {
    return new Promise((resolve) => {
      console.log("Querying WP for : " + postType);
      const requestUrl = "http://climatehub.local/wp-json/wp/v2/" + postType;
      fetch(requestUrl)
      .then(res => res.json())
      .then((result) => {
        const updatedPosts = new Array;
        result.forEach((post: any) =>  {
          const postObject = {
            id: post.id,
          };
          fieldTypes[postType].forEach((field: string) => {
            postObject[field] = post[field];
          });
          updatedPosts.push(postObject);
          this.cachePost(postType, post.id, postObject);
        });
        this.updatePostTypeState(postType, updatedPosts);
        resolve();
      });  
    }) 
  }

  filterPostsByCommunity(postType: string, selectedCommunities: Array<number>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.filterPosts('groups', selectedCommunities, 'communities', 'groups')
      .then(() => {
        if (postType === 'groups') {
          console.log("Filtered Groups by Community");
          resolve();
        } else if (postType === 'individuals') {
          // this.state.groups is an object, not an array
          this.filterPosts(postType, this.state.groups, 'groups', 'individuals')
          .then(() => {
            console.log("Filtered individuals by Community");
            resolve();
          })
        } else if (postType === 'projects') {
          console.log(this.state.groups);
          this.filterPosts(postType, this.state.groups, 'groups', 'projects')
          .then(() => {
            console.log("Filtered projects by Community");
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
        const allPosts = this.cache[filterPostType];
        const filteredPosts = new Set; 
        if (selectedPosts === [] || selectedPosts === null) {
          this.updatePostTypeState(filterPostType, allPosts);
          resolve();
        } else {
          selectedPosts.forEach((post: any) => {
            const postObject = this.getPostbyId(relatedPostType, post.id);
            const relatedPostIds = postObject[relatedFieldName];
            if (relatedPostIds) {
              relatedPostIds.forEach((relatedPostId: number) => {
                filteredPosts.add(allPosts[relatedPostId]);
              });
            }
          });
          this.updatePostTypeState(filterPostType, Array.from(filteredPosts));
          resolve();
        }
      })
    });
  }


  getPostbyId (postType: string, ID: number) {
    if (this.cache[postType]) {
      const post = this.cache[postType][ID];
      if (post) {
        return post;
      }
      else {
        console.log("Post does not exist");
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

  updatePostTypeState (postType: string, posts: Array<any>) {
    const updatedState = {};
    updatedState[postType] = posts;
    this.setState(updatedState);
    console.log(this.state[postType]);
  }

  cachePost(postType: string, postId: any, postData: any) {
    if (!this.cache[postType]) {
      this.cache[postType] = {};
    }
    this.cache[postType][postId] = postData;
  }

  setLoadedState () {
    this.setState({
      isLoaded: true,
    })
  }

  public render() {
    const { cities, communities, error, groups, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="asset-map">
          <SearchForm 
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
            getPostbyId = {this.getPostbyId}
            filterPosts = {this.filterPosts}
          />
        </div>
      );
    }
  }
}

export default Assetmap;
