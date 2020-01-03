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
  'cities': ['city_id', 'name', 'location'],
  'communities': ['community_id', 'name', 'code', 'location', 'city'],
  'groups': ['group_id', 'name', 'description', 'website', 'tag_a', 'tag_b', 'tag_c', 'community', 
    'parent_group', 'projects', 'individuals'],
  'individuals': ['individual_id', 'name', 'description', 'website', 'position', 'email', 'phone', 
    'survey_info', 'tag_a', 'tag_b', 'tag_c'],
  'projects': ['project_id', 'name', 'description', 'website', 'blog_post', 'project_id', 'name', 
    'description', 'website', 'blog_post'],
  'tag_a': [],
  'tag_b': [],
  'tag_c': []
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
    fetch("http://climatehub.local/wp-json/wp/v2/cities")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // const postType = 'cities';
          result.forEach((city: any) =>  {
            const cityObject = {};
            
            this.cache_post('cities',city.city_id, cityObject);
            this.setState({
              cities: this.state.cities + city,
            })
          });

          // Test function
          this.get_all_posts_by_type('communities');
          this.get_all_posts_by_type('projects');
          this.get_all_posts_by_type('individuals');

          console.log(this.cache);
          // this.setState({
          //   // columns: ["ID", "City_ID", "Name", "location", "Communities"],
          //   isLoaded: true,
          // });
        //   cities = [];
        // }, (error) => {
        //   this.setState({
        //     error,
        //     isLoaded: true
        //   });
        }
      )
  }

  // changeLevel() {
  //   this.setState({
  //     columns: [],
  //     items: []
  //   });
  // }

  get_all_posts_by_type(postType: string) {
    const requestUrl = "http://climatehub.local/wp-json/wp/v2/" + postType;
    fetch(requestUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // const postType = 'cities';
          // result.forEach((postType: {name: any}) =>  {
          //   const object = {};
          //   this.cache_post('cities',postType.name, object);
            // this.setState({
            //   cities: this.state.cities + city,
            // })
          // })
        })     
  }

  cache_post(postType: string, postId: any, postData: any) {
    this.cache[postType] = {}
    this.cache[postType][postId] = postData;
  }

  // Search for keyword in 'name' field of selected level
  search_by_keyword(keyword: string, level: any) {
    console.log(fieldTypes);
    return '';
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
