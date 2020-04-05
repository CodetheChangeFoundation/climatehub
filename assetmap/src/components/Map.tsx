import * as React from 'react';
import { MapNode } from './MapNode';

interface MyProps {
  maxNodes: number,
  postType: string,
  selectedPost: number,
  getPostById: (postType: string, ID: number) => object|undefined,
  handlePostQuery: (postType: string, postsToRender: Array<number>, currPostType: string) => Promise<void>, 
  setSelectedPost: (selectedPost: number) => Promise<void>
  setMaxNodes: (maxNodes: number) => Promise<void>
  handleBack: () => Promise<void>,
  scrollToSearchForm: () => void,
}

interface MyState {
  boundary: number,
  color: string,
  containerHeight: number,
  containerWidth: number, 
  mapPostType: string,
  post: any,
  postInfo: any,
  relatedPostsBottom: any,
  relatedPostsTop: any, 
}

const postTypeColors = {
  // CH Colors
  // groups: "#219653",
  // individuals: "#3591D3",
  // projects: "#D38135",
  // Random Colors
  groups: "#2EC2A8",
  individuals: "#2DB3C7",
  projects: "#2D88CD",
}
export default class Map extends React.Component<MyProps, MyState> {  
  constructor(props: MyProps) {
    super(props);

    this.state = {
      boundary: 400,
      color: '#444444',
      containerHeight: 0,
      containerWidth: 0,
      mapPostType: "",
      post: undefined,
      postInfo: undefined,
      relatedPostsBottom: undefined,
      relatedPostsTop: undefined,
    };

    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount() {
    this.setFrameDimensions();
    window.addEventListener("resize",() => {
      this.setFrameDimensions();
    })
  }
  
  componentDidUpdate(nextProps:MyProps) {
    const {maxNodes, postType, selectedPost} = this.props;
    if (selectedPost !== nextProps.selectedPost) {
      let post: any;
      if (selectedPost) {
        post = this.props.getPostById(postType.toLowerCase(), selectedPost);
      }  
      this.setState({post, mapPostType: postType.toLowerCase()}, () => {
        this.setPostInfo(post);
        this.setRelatedPosts(post);
      })
    } else if (maxNodes !== nextProps.maxNodes) {
      let post: any;
      if (selectedPost) {
        post = this.props.getPostById(postType.toLowerCase(), selectedPost);
      }  
      this.setRelatedPosts(post);
    }
  }
  
  setPostInfo(post: any): Promise<void> {
    return new Promise((resolve) => {
      let postInfo;
      if (post) {
        postInfo = 
        <div style={{margin: "auto", textAlign: "center"}}> 
          <h4>{post.name}</h4> 
          <p style={{lineHeight: 1}}>{post.description}</p>
        </div>
      }
      this.setState({postInfo}, () => resolve())
    })
  }

  setRelatedPosts(post: any) {
    const {postType} = this.props;
    let relatedPostsTop;
    let relatedPostsBottom;
    if (post) {
      if (postType === "Groups") {
        relatedPostsTop = this.createMapNodes("individuals", post.individuals);
        relatedPostsBottom = this.createMapNodes("projects", post.projects);
      } else if (postType === "Individuals") {
        relatedPostsTop = this.createMapNodes("groups", post.groups);
        relatedPostsBottom = this.createMapNodes("projects", post.projects);
      } else if (postType === "Projects") {
        relatedPostsTop = this.createMapNodes("individuals", post.director);
        relatedPostsBottom = this.createMapNodes("groups", post.groups);
      }
    }
    this.setState({
      relatedPostsBottom,
      relatedPostsTop,
    })
  }

  createMapNodes(postType: string, postArray: [number]) {
    const {maxNodes} = this.props;
    const nodeArray: Array<any> = [];
    if (!postArray || postArray[0] === 0) {
      return nodeArray
    }
    let overflow = false;
    let count: number = postArray.length;
    if (count > maxNodes) {
      count = maxNodes - 1;
      console.log(postType + " nodes overflow...");
      overflow = true;
    }
    for (let i = 0; i < count; i++) {
      const postId = postArray[i];
      const post: object | undefined = this.props.getPostById(postType, postId);
      if (post) {
        const node = new MapNode({
          color: postTypeColors[postType], 
          handleNodeClick: this.handleNodeClick,
          post,
          postId, 
          postType, 
        })
        nodeArray.push(node.draw());
      }
    }
    if (overflow) {
      nodeArray.push(this.handleOverflowButton(postType));
    }
    return nodeArray;
  }

  handleOverflowButton(clickedPostType: string) {
    const mapPostType = this.state.mapPostType.toLowerCase();
    const formPostType = this.props.postType.toLowerCase();
    const handleOverflowClick = (): Promise<void> =>  {
      return new Promise((resolve) => {
        if (clickedPostType === formPostType) {
          resolve();
        } else if (formPostType === mapPostType) {
          this.nodePostQuery(clickedPostType)
          .then(() => { 
            this.props.scrollToSearchForm();
            resolve()
          });
        } else {
          this.props.handleBack()
          .then(() => {
            this.nodePostQuery(clickedPostType)
            .then(() => { 
              this.props.scrollToSearchForm();
              resolve()
            });          
          }) 
        }
      })
    }
    const color: string = postTypeColors[clickedPostType];
    const backgroundColor: string = color + "44";
    const border = '2px solid ' + color;
    const btnStyle = {
      '--overflow-btn-color': color,
      backgroundColor: 'none !important',
      border,
    }
    if (clickedPostType === formPostType) {
      btnStyle.backgroundColor = backgroundColor;
    }
    return(
      <div className="overflow-btn font-italic d-inline-block p-1 " style={btnStyle} onClick={handleOverflowClick} key={clickedPostType + " overflow"}>
        See More
      </div>
    )
  }

  handleNodeClick(nextPostType: string, postId: number): Promise<void> {
    return new Promise((resolve) => {
      this.nodePostQuery(nextPostType)
      .then((response) => {
        console.log(response);
        this.props.setSelectedPost(postId)
        .then(() => resolve())
      })
    })
  }

  private nodePostQuery(nextPostType: string): Promise<any> {
    return new Promise((resolve) => {
      let fieldName: string = nextPostType;
      // Handle case where object property is not equal to postType 
      if ((this.state.mapPostType === "projects")
        && (nextPostType === "individuals")) {
        fieldName = "director";
      }
      const postsToRender: Array<number> = this.state.post[fieldName];
      this.props.handlePostQuery(nextPostType, (postsToRender? postsToRender : []), this.state.mapPostType)
      .then(() => resolve("Pushed to Post Query: " + nextPostType));
    })
  }

  setFrameDimensions(): Promise<void>{
    return new Promise((resolve) => {
    // Container dimensions
      const parent: HTMLElement | null = document.getElementById("mapParent");
      let containerHeight: number | undefined = parent?.clientHeight;
      let containerWidth: number | undefined = parent?.clientWidth;
      if (!containerHeight || !containerWidth) {
        containerHeight = containerWidth = 0;
      } 

      // Max nodes per row
      const mapVisual: HTMLElement | null = document.getElementById("mapVisual");
      const mapWidth: number | undefined = mapVisual?.clientWidth;
      let maxNodes: number = 0;
      if (mapWidth) {
        // Account for padding of 30px and mapNode width of 100px
        maxNodes = Math.floor((mapWidth - 30)/100);
        // console.log(mapWidth - 30, maxNodes);
      }

      this.setState({
        containerHeight,
        containerWidth,
      }, () => {
        this.props.setMaxNodes(maxNodes)
        .then(() => resolve());
      })   
    }) 
  }

  private renderLegend() {
    const legend: Array<any> = [];
    for (const [postType, color] of Object.entries(postTypeColors)) {
      const backgroundColor: string = color + "44";
      let label: string = postType.charAt(0).toUpperCase() + postType.slice(1);
      if (postType === "individuals" && this.state.mapPostType === "projects") {
        label = "Director";
      }
      const border: string = "3px solid " + color;
      legend.push(
        <div key={postType} className="legendNode">
          <span className="legendCircle" style={{backgroundColor, border}}/>
          <p>{label}</p>
        </div>
      )
    }
    return legend;
  }

  public render() {
    const {containerHeight, postInfo, relatedPostsBottom, relatedPostsTop} = this.state;
    return (
      <div className="row" style={{margin: "20px 0"}}> 
        <div id="mapInfo" className="col-12 col-md-6 col-lg-5" style={{
          display: "inline-block",
          float: "left",
          height: containerHeight - 40,
        }}>
          {postInfo}
          {this.props.selectedPost > 0 && <div id="legend" style={{bottom: 0}}>
            {this.renderLegend()}
          </div>} 
        </div>
        <div id="mapVisual" className="col-12 col-md-6 col-lg-7" style={{
          display: "inline-block",
          float: "right",
          height: containerHeight - 40,
        }}>
          <div className="nodeRow">
            {relatedPostsBottom}
          </div>
          <br />
          <div className="nodeRow">
            {relatedPostsTop}
          </div>
        </div>
      </div>
    )
  }
}