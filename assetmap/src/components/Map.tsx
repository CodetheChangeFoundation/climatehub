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
  groups: "#219653",
  individuals: "#3591D3",
  projects: "#D38135",
  // // Random Colors
  // groups: "#2EC2A8",
  // individuals: "#2DB3C7",
  // projects: "#2D88CD",
}

const defaultMessage = <span className="d-block text-center align-middle"> 
    <p style={{fontSize: "20px"}}>Please select a row from the table</p>
  </span>

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
      postInfo: defaultMessage,
      relatedPostsBottom: undefined,
      relatedPostsTop: undefined,
    };

    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.setFrameDimensions = this.setFrameDimensions.bind(this);
  }

  componentDidMount() {
    this.setFrameDimensions();
    window.addEventListener("resize", this.setFrameDimensions);
    const {postType, selectedPost} = this.props;
    let post: any;
    if (selectedPost) {
      post = this.props.getPostById(postType, selectedPost);
    }  
    this.setState({post, mapPostType: postType}, () => {
      this.setPostInfo(post);
      this.setRelatedPosts(post);
    })
  }
  
  componentDidUpdate(prevProps:MyProps) {
    const {maxNodes, postType, selectedPost} = this.props;
    if (selectedPost !== prevProps.selectedPost) {
      let post: any;
      if (selectedPost) {
        post = this.props.getPostById(postType, selectedPost);
      }  
      this.setState({post, mapPostType: postType}, () => {
        this.setPostInfo(post);
        this.setRelatedPosts(post);
      })
    } else if (maxNodes !== prevProps.maxNodes) {
      let post: any;
      if (selectedPost) {
        post = this.props.getPostById(postType, selectedPost);
      }  
      this.setRelatedPosts(post);
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.setFrameDimensions)
  }

  setPostInfo(post: any): Promise<void> {
    return new Promise((resolve) => {
      const postInfo = (post? this.populatePostInfo(post):defaultMessage);
      this.setState({postInfo}, () => resolve())
    })
  }

  populatePostInfo(post: any): any {
    let details;
    console.log(post);
    details = (
      <>
        {(post.position? this.renderText(post.position, false, false): "")}
        {(post.email? this.renderText(post.email, false, true): "")}
        {(post.phone? this.renderText(post.phone, false, false): "")}
        {(post.website? this.renderText(post.website, true, false): "")}
        {(post.tags? this.renderTags(post.tags): "")}
      </>
    )

    let name = <h5>{post.name}</h5>
    let description = <p style={{fontSize: "14px"}}>{post.description}</p>

    if (post.description.length > 470) {
      description = <p style={{fontSize: "12px"}}>{post.description}</p>
    } else if (post.name.length < 45) {
      name = <h4>{post.name}</h4>
    }

    return <div style={{margin: "auto", textAlign: "center", lineHeight: 1}}> 
      {name}
      {description}
      {details}
    </div>
  }

  renderText(text: string, isWebsite: boolean = false, isEmail: boolean = false): any {
    let output;
    if (text !== "") {
      if (isWebsite || isEmail) {
        output = 
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-truncate d-block mb-1" 
          href={(isEmail? "mailto:" + text : text)}>
            {(isWebsite)? "Visit Website" : text}
        </a>
      } else {
        output = <p className="mb-2" >{text}</p>
      }
    }
    if (output !== undefined) {
      output = <div>{output}</div>
    }
    return output
  }

  renderTags(tagIds: Array<number>) {
    // Max Height will be 80 px (2 rows of tags)
    const tags: any = [];
    tagIds.forEach((tag: number) => {
      const post: any = this.props.getPostById("tags", tag)
      if (post) {
        const typePost: any = this.props.getPostById("tag_types", post.type)
        const tagStyle = {
          border: "2px solid #" + typePost.colour,
          fontSize: "0.75rem"
        }
        tags.push(<div className="d-inline-block m-1 p-2" style={tagStyle} key={post.id}>{"#" + post.name}</div>)
      }
    })
    return <div>{tags}</div>
  }

  setRelatedPosts(post: any) {
    const {postType} = this.props;
    let relatedPostsTop;
    let relatedPostsBottom;
    if (post) {
      switch (postType) {
        case "groups": {
          relatedPostsTop = this.createMapNodes("individuals", post.individuals);
          relatedPostsBottom = this.createMapNodes("projects", post.projects);
          break;
        } case "individuals": {
          relatedPostsTop = this.createMapNodes("groups", post.groups);
          relatedPostsBottom = this.createMapNodes("projects", post.projects);
          break;
        } case "projects": {
          relatedPostsTop = this.createMapNodes("individuals", post.director);
          relatedPostsBottom = this.createMapNodes("groups", post.groups);
        }
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
    const handleOverflowClick = (): Promise<void> =>  {
      return new Promise((resolve) => {
        const mapPostType = this.state.mapPostType;
        const formPostType = this.props.postType;
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
    return this.renderOverflowBtn(clickedPostType, handleOverflowClick);
  }

  private renderOverflowBtn(clickedPostType: string, handleOverflowClick: () => Promise<void>) {
    const color: string = postTypeColors[clickedPostType];
    const border = '2px solid ' + color;
    const btnStyle = {
      '--overflow-btn-color': color,
      backgroundColor: 'none !important',
      border,
    };
    return (
      <div className="overflow-btn font-italic d-inline-block p-1 " style={btnStyle} onClick={handleOverflowClick} key={clickedPostType + " overflow"}>
          See More
      </div>
    );
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
      .then(() => {
        resolve();
      });
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
      const mapNodeWidth: number = 100;
      if (mapWidth) {
        // Account for padding of 30px and mapNode width of 100px
        maxNodes = Math.floor((mapWidth - 30)/mapNodeWidth);
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

  // private renderLegend() {
  //   const legend: Array<any> = [];
  //   for (const [postType, color] of Object.entries(postTypeColors)) {
  //     const backgroundColor: string = color + "44";
  //     let label: string = postType;
  //     if (postType === "individuals" && this.state.mapPostType === "projects") {
  //       label = "director";
  //     }
  //     const border: string = "3px solid " + color;
  //     legend.push(
  //       <div key={postType} className="legendNode text-capitalize">
  //         <span className="legendCircle" style={{backgroundColor, border}}/>
  //         <p>{label}</p>
  //       </div>
  //     )
  //   }
  //   return legend;
  // }

  public render() {
    const {containerHeight, postInfo, relatedPostsBottom, relatedPostsTop} = this.state;
        return (
          <div className="row" style={{margin: "20px 0"}}> 
          <div id="mapInfo" className="col-12 col-md-6 col-lg-5 col-xl-4 justify-content-between flex-direction-column" style={{
            display: "inline-block",
            float: "left",
            height: containerHeight - 40,
          }}>
            {postInfo}
            {/* {this.props.selectedPost > 0 && <div id="legend">
              {this.renderLegend()}
            </div>}  */}
          </div>
          <div id="mapVisual" className="col-12 col-md-6 col-lg-7 col-xl-8" style={{
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