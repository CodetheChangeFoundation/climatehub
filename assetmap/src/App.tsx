// import * as d3 from 'd3';
import * as React from 'react';
import '../../assets/css/bootstrap/bootstrap-grid.min.css';
import '../../assets/css/bootstrap/bootstrap-reboot.min.css';
import '../../assets/css/bootstrap/bootstrap.css';
import '../../assets/css/climatehub.css';
// import SearchForm from './components/SearchForm';

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
  'cities': ['CITY_ID', 'NAME', 'LOCATION'],
  'communities': ['COMMUNITY_ID', 'NAME', 'CODE', 'LOCATION', 'CITY'],
  'groups': ['GROUP_ID', 'NAME', 'DESCRIPTION', 'WEBSITE', 'TAG_A', 'TAG_B', 'TAG_C', 'COMMUNITY', 
    'PARENT_GROUP', 'PROJECTS', 'INDIVIDUALS'],
  'individuals': ['INDIVIDUAL_ID', 'NAME', 'DESCRIPTION', 'WEBSITE', 'POSITION', 'EMAIL', 'PHONE', 
    'SURVEY_INFO', 'TAG_A', 'TAG_B', 'TAG_C'],
  'projects': ['PROJECT_ID', 'NAME', 'DESCRIPTION', 'WEBSITE', 'BLOG_POST', 'PROJECT_ID', 'NAME', 
    'DESCRIPTION', 'WEBSITE', 'BLOG_POST'],
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
      cities: [],
      communities: [],
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
          result.forEach((city: {id: any; city_id: any; name: any; location: any; communities: any;}) =>  {
            const cityObject = {
              communities: city.communities,
              location: city.location,
              name: city.name,
              post_id: city.id,
            }
            this.cache_post('cities',city.city_id, cityObject);
            this.setState({
              cities: this.state.cities + city,
            })
          });

          // Test function
          this.get_all_posts_by_type('communities', []);
          this.get_all_posts_by_type('projects', []);
          this.get_all_posts_by_type('individuals', []);

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

  get_all_posts_by_type(postType: string, fields: []) {
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
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="asset-map">
          {/* <SearchForm categories={["Communities", "Groups", "Individuals", "Projects"]} columns={columns} data={items} onChange={this.changeLevel}/> */}
        </div>
      );
    }
  }
}

export default Assetmap;
