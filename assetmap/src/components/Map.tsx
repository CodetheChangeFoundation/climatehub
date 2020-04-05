import * as React from 'react';
import { MapNode } from './MapNode';

interface MyProps {
  postType: string,
  selectedPost: number,
  getPostById: (postType: string, ID: number) => object|undefined,
  handlePostQuery: (postType: string, postsToRender: Array<number>, currPostType: string) => Promise<void>, 
  setSelectedPost: (selectedPost: number) => Promise<void>
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
  groups: "#219653",
  individuals: "#3591D3",
  projects: "#D38135",
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
  
  componentDidUpdate(nextProps:any) {
    const {postType, selectedPost} = this.props;
    if (selectedPost !== nextProps.selectedPost) {
      let post: any;
      if (selectedPost) {
        post = this.props.getPostById(postType.toLowerCase(), selectedPost);
      }  
      this.setState({post, mapPostType: postType.toLowerCase()}, () => {
        this.setPostInfo(post);
        this.setRelatedPosts(post);
      })
    }
  }
  
  setPostInfo(post: any) {
    let postInfo;
    if (post) {
      postInfo = 
      <div style={{margin: "auto", textAlign: "center"}}> 
        <h4>{post.name}</h4> 
        <p style={{lineHeight: 1}}>{post.description}</p>
      </div>
    }
    this.setState({postInfo})
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
    const nodeArray: Array<any> = [];
    if (!postArray || postArray[0] === 0) {
      return nodeArray
    }
    postArray.forEach((postId) => {
      const post: any = this.props.getPostById(postType, postId);
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
    })
    return nodeArray;
  }

  handleNodeClick(nextPostType: string, postId: number): Promise<void> {
    return new Promise((resolve) => {
      this.nodePostQuery(nextPostType)
      .then(() => {
        this.props.setSelectedPost(postId)
        .then(() => resolve())
      })
    })
  }

  private nodePostQuery(nextPostType: string): Promise<void> {
    return new Promise((resolve) => {
      let fieldName = nextPostType;
      // Handle case where object property isn't === postType 
      if ((this.state.mapPostType === "projects")
        && (nextPostType === "individuals")) {
        fieldName = "director";
      }
      const postsToRender = this.state.post[fieldName];
      this.props.handlePostQuery(nextPostType, (postsToRender? postsToRender : []), this.state.mapPostType)
      .then(() => resolve());
    })
  }

  setFrameDimensions() {
    const parent = document.getElementById("mapParent");
    let containerHeight = parent?.clientHeight;
    let containerWidth = parent?.clientWidth;
    if (!containerHeight || !containerWidth) {
      containerHeight = containerWidth = 0;
    } 
    this.setState({
      containerHeight,
      containerWidth,
    })    
  }

  public render() {
    const {boundary, containerWidth, postInfo, relatedPostsBottom, relatedPostsTop} = this.state;
    return (
      <>
        <div style={{
          margin: "20px", 
        }}> 
          <div style={{
            display: "inline-block",
            float: "left",
            width: boundary,
          }}>
            {postInfo}
          </div>
          <div style={{
            display: "inline-block",
            float: "right",
            width: containerWidth - boundary - 40,
          }}>
            {relatedPostsBottom}
            {relatedPostsTop}
          </div>
        </div>
        <div id="legend" style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          zIndex: 2,
        }}>
          {this.props.selectedPost > 0 && 
            <div>
              <div className="legendNode">
                <span className="legendCircle" style={{backgroundColor: "#21965344", border: "3px solid #219653"}}/>
                <p>Groups</p>
              </div>
              <div className="legendNode">
                <span className="legendCircle" style={{backgroundColor: "#3591D344", border: "3px solid #3591D3"}}/>
                <p>Individuals</p>
              </div>
              <div className="legendNode">
                <span className="legendCircle" style={{backgroundColor: "#D3813544", border: "3px solid #D38135"}}/>
                <p>Projects</p>
              </div>
            </div>
          } 
        </div>
      </>
    )
  }
}