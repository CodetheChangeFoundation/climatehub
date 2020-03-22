import * as React from 'react';
import { 
  // Layer, 
  // Rect, 
  // Stage, 
  // Text 
} from 'react-konva';
import { MapNode } from './MapNode';

interface MyProps {
  postType: string,
  selectedPost: number,
  getPostById: (postType: string, ID: number) => object|undefined,
}

interface MyState {
  boundary: number,
  color: string,
  containerHeight: number,
  containerWidth: number, 
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
      postInfo: undefined,
      relatedPostsBottom: undefined,
      relatedPostsTop: undefined,
    };
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
      this.setPostInfo(post);
      this.setRelatedPosts(post);
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
    if (postArray && postArray[0] === 0) {
      return nodeArray
    }
    postArray.forEach((postId) => {
      const post: any = this.props.getPostById(postType, postId);
      let label: string = "Node: " + postId;
      if (post) {
        label = post.name;
      }
      const node = new MapNode(postType, postId, postTypeColors[postType], label)
      nodeArray.push(node.draw());
    })
    return nodeArray;
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
    const {postInfo, relatedPostsBottom, relatedPostsTop} = this.state;
    return (
        <div style={{
          margin: "20px", 
        }}> 
          {postInfo}
          {relatedPostsBottom}
          {relatedPostsTop}
        </div>
    )
  }
}