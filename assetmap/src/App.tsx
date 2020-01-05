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
  projects: any,
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
      cities: [{"cityId": 1, "name": "Vancouver", "location": "Vancouver, BC", "communities": [1]}],
      communities: [{"communityId": 1, "name": "University of British Columbia", "code": "UBC", "location": "2329 West Mall", "city": 1}],
      error: null,
      groups: [],
      individuals: [],
      isLoaded: false,
      projects: [],
    };
  }


  componentDidMount() {
    this.get_all_posts_by_type('cities');
    this.get_all_posts_by_type('communities');
    this.get_all_posts_by_type('groups');    
    this.get_all_posts_by_type('projects');
    this.get_all_posts_by_type('individuals');
    // this.setState({
    //   isLoaded: true,
    // })
  }

  // changeLevel() {
  //   this.setState({
  //     columns: [],
  //     items: []
  //   });
  // }

  get_all_posts_by_type(postType: string, filter: Array<any> = []) {
    const requestUrl = "http://climatehub.local/wp-json/wp/v2/" + postType;
    fetch(requestUrl)
    .then(res => res.json())
    .then((result) => {
      if (filter !== []) {
        // Filter results 
      };
      const updatedPosts = new Array;
      result.forEach((post: any) =>  {
        const postObject = {
          id: post.id,
        };
        fieldTypes[postType].forEach((field: string) => {
          postObject[field] = post[field];
        });
        updatedPosts.push(postObject);
        this.cache_post(postType, post.id, postObject);
      });
      this.updatePostTypeState(postType, updatedPosts);
      if (postType === 'individuals') {
        this.setState({
          isLoaded: true,
        });
      };
    });     
  }

  updatePostTypeState (postType: string, posts: Array<object>) {
    const updatedState = {};
    updatedState[postType] = posts;
    this.setState(updatedState);
    console.log(this.state[postType]);
  }

  cache_post(postType: string, postId: any, postData: any) {
    if (!this.cache[postType]) {
      this.cache[postType] = {};
    }
    this.cache[postType][postId] = postData;
  }

  public render() {
    const { cities, communities, error, isLoaded } = this.state;
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
            // groups={groups}
            // individuals={individuals}
            // projects={projects}
          />
        </div>
      );
    }
  }
}

export default Assetmap;
