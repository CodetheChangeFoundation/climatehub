import * as React from 'react';
import { MapNode } from './MapNode';

interface MyProps {
  maxNodes: number,
  postType: string,
  selectedPost: number,
  selectedTags: Array<number>,
  getPostById: (postType: string, ID: number) => object|undefined,
  handlePostQuery: (postType: string, postsToRender: Array<number>, currPostType: string) => Promise<void>, 
  setSelectedPost: (selectedPost: number) => Promise<void>
  setMaxNodes: (maxNodes: number) => Promise<void>
  handleBack: () => Promise<void>,
  scrollToSearchForm: () => void,
  getMapPostType: () => string,
  setMapPostType: (mapPostType: string) => Promise<void>,
  appendToSelectedTags: (tagId: number) => Promise<void>,
}

interface MyState {
  boundary: number,
  color: string,
  containerHeight: number,
  containerWidth: number,
  homePost: any,
  post: any,
  postInfo: any,
  relatedPostsBottom: any,
  relatedPostsTop: any, 
}

const postTypeColors = {
  // CH Colors
  groups: "#83D335",
  individuals: "#41D3BD",
  projects: "#F18F01",
  // // Random Colors
  // groups: "#2EC2A8",
  // individuals: "#2DB3C7",
  // projects: "#2D88CD",
}

const postTypeBackgroundColors = {
  // groups: "#D6EAC2",
  // individuals: "#C5EAE4",
  // projects: "#F1D9B5"
  groups: "#F2F2F2",
  individuals: "#F2F2F2",
  projects: "#F2F2F2",
}

const defaultMessage = <div className="d-flex h-100 align-items-center justify-content-center"><h5>Please select a row from the table</h5></div>

export default class Map extends React.Component<MyProps, MyState> {  
  constructor(props: MyProps) {
    super(props);

    this.state = {
      boundary: 400,
      color: '#444444',
      containerHeight: 0,
      containerWidth: 0,
      homePost: undefined,
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
    let mapPostType = this.props.getMapPostType();
    if (mapPostType === "") {
      mapPostType = postType;
      this.props.setMapPostType(postType);
    }
    let post: any;
    if (selectedPost) {
      post = this.props.getPostById(mapPostType, selectedPost);
    }  
    this.setState({post}, () => {
      this.setPostInfo(post);
      this.setRelatedPosts(post);
    })
  }
  
  componentDidUpdate(prevProps:MyProps) {
    const {maxNodes, postType, selectedPost, selectedTags} = this.props;
    if (selectedPost !== prevProps.selectedPost) {
      let post: any;
      if (selectedPost) {
        post = this.props.getPostById(postType, selectedPost);
      }  
      this.setState({post}, () => {
        this.props.setMapPostType(postType)
        .then(() => {
          this.setPostInfo(post);
          this.setRelatedPosts(post);
        })
      })
    } else if (maxNodes !== prevProps.maxNodes) {
      let post: any;
      if (selectedPost) {
        post = this.props.getPostById(this.props.getMapPostType(), selectedPost);
      }  
      this.setRelatedPosts(post);
    } else if (selectedTags !== prevProps.selectedTags) {
      console.log("Changed selectedTags");
      this.setPostInfo(this.state.post);
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
    details = (
      <>
        {(post.position? this.renderText(post.position, false, false, (post.position.length < 100)? "h5 mb-4": "h6 mb-4"): "")}
        {(post.phone? this.renderText(post.phone, false, false, "mb-2"): "")}
        {(post.email? this.renderText(post.email, false, true, ""): "")}
        {(post.website? this.renderText(post.website, true, false, ""): "")}
        {(post.tags? this.renderTags(post.tags): "")}
      </>
    )

    let name = (post.name)? <h4>{post.name}</h4> : "";
    let description;
    
    if (post.description) {
      description = <p style={{fontSize: "14px"}}>{post.description}</p>
      if (post.description.length > 470) {
        description = <p style={{fontSize: "12px"}}>{post.description}</p>
        name = <h5>{post.name}</h5>
      } else if (post.name.length > 45) {
        name = <h5>{post.name}</h5>
      }
    }

    return <div className="text-center m-auto" style={{lineHeight: 1}}> 
      {name}
      {description}
      {details}
    </div>
  }

  renderText(text: string, isWebsite: boolean = false, isEmail: boolean = false, classes: string): any {
    let output;
    if (text !== "") {
      if (isWebsite || isEmail) {
        output = 
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-truncate d-block mb-2" 
          href={(isEmail? "mailto:" + text : text)}>
            {(isWebsite)? "Visit Website" : text}
        </a>
      } else {
        output = <p>{text}</p>
      }
    }
    if (output !== undefined) {
      output = <div className={classes}>{output}</div>
    }
    return output
  }

  renderTags(tagIds: Array<number>) {
    // Max Height will be 80 px (2 rows of tags)
    const tags: any = [];
 
    if (tagIds.length > 0 && tagIds[0] !== null) {
      tagIds.forEach((tag: number) => {
        const post: any = this.props.getPostById("tags", tag)
        if (post) {
          const typePost: any = this.props.getPostById("tag_types", post.type)
          const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            this.handleTagClick(tag);
          }
          const tagStyle = {
            '--map-tag-color': "#" + typePost.colour,
            backgroundColor: this.getBackgroundColour(tag, typePost.colour),
            border: "2px solid #" + typePost.colour,
            fontSize: "0.75rem",
          }
          console.log(tagStyle);
          tags.push(<div className="map-tag d-inline-block m-1 p-2" style={tagStyle} key={tag} onClick={handleClick}>{"#" + post.name}</div>)
        }
      })
    }
    return <div>{tags}</div>
  }

  getBackgroundColour(id: number, colour: string): string {
    let backgroundColor = "none !important";
    if (this.props.selectedTags !== null && this.props.selectedTags !== []) {     
      this.props.selectedTags.forEach((tag: any) => {
        if (tag.id === id) {
          backgroundColor = "#" + colour + '44';
        }
      })
    }    
    return backgroundColor;
  }

  handleTagClick(tagId: number): void {
    this.props.appendToSelectedTags(tagId);
  }

  setRelatedPosts(post: any) {
    const mapPostType = this.props.getMapPostType();
    let relatedPostsTop = [];
    let relatedPostsBottom = [];
    let homePost;
    let topPostType = "";
    let bottomPostType = "";
    const nodeStyle = {    
      backgroundColor: postTypeColors[mapPostType.toLowerCase()],
      borderColor: postTypeColors[mapPostType.toLowerCase()],
    }
    if (post) {
      switch (mapPostType) {
        case "groups": {
          topPostType = "projects";
          bottomPostType = "individuals";
          relatedPostsTop = this.createMapNodes("projects", post.projects);
          relatedPostsBottom = this.createMapNodes("individuals", post.individuals, true);
          break;
        } case "individuals": {
          topPostType = "projects";
          bottomPostType = "groups";
          relatedPostsTop = this.createMapNodes("projects", post.projects);
          relatedPostsBottom = this.createMapNodes("groups", post.groups, true);
          break;
        } case "projects": {
          topPostType = "groups";
          bottomPostType = "individuals";
          relatedPostsTop = this.createMapNodes("groups", post.groups);
          relatedPostsBottom = this.createMapNodes("individuals", post.director, true);
        }
      }

      homePost = (
        <div style={{height: "65px", width: "65px"}}>
          {relatedPostsTop.length !== 0 &&
            <span className="transit-line-home-node-top position-absolute" style={{backgroundColor: postTypeColors[topPostType]}}/>
          }
          <span className="home-node" style={nodeStyle}/>
          {relatedPostsBottom.length !== 0 &&
            <span className="transit-line-home-node-bottom position-absolute" style={{backgroundColor: postTypeColors[bottomPostType]}}/>
          }
        </div>
      )
    }

    this.setState({
      homePost,
      relatedPostsBottom,
      relatedPostsTop,
    })
  }

  createMapNodes(postType: string, postArray: [number], textAboveNode: boolean = false) {
    const {maxNodes} = this.props;
    const nodeArray: Array<any> = [];
    if (!postArray || postArray[0] === 0) {
      return nodeArray
    }
    let overflow = false;
    let count: number = postArray.length;
    if (count >= maxNodes) {
      count = maxNodes - 1;
      overflow = true;
    }
    for (let i = 0; i < count; i++) {
      const postId = postArray[i];
      const post: object | undefined = this.props.getPostById(postType, postId);
      if (post) {
        const node = new MapNode({
          backgroundColor: postTypeBackgroundColors[postType],
          color: postTypeColors[postType],
          handleNodeClick: this.handleNodeClick,
          overflowBtn: overflow,
          post,
          postId, 
          postType,
          textAboveNode
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
        const mapPostType = this.props.getMapPostType();
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
    const border = '3px solid ' + color;
    const btnStyle = {
      '--overflow-btn-color': color,
      backgroundColor: 'none !important',
      border,
    }
    return(
      <div className="overflow-btn font-italic d-inline-block p-2 text-nowrap" style={btnStyle} onClick={handleOverflowClick} key={clickedPostType + " overflow"}>
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
      const mapPostType = this.props.getMapPostType();
      // Handle case where object property is not equal to postType 
      if ((mapPostType === "projects")
        && (nextPostType === "individuals")) {
        fieldName = "director";
      }
      const postsToRender: Array<number> = this.state.post[fieldName];
      this.props.handlePostQuery(nextPostType, (postsToRender? postsToRender : []), mapPostType)
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
      const mapNodeWidth: number = 83;
      const homeNodeWidth: number = 65;
      const mapVisualPadding: number = 16;
      if (mapWidth) {
        maxNodes = Math.floor((mapWidth - mapVisualPadding - homeNodeWidth)/mapNodeWidth);
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
    const mapPostType = this.props.getMapPostType()
    for (const [postType, color] of Object.entries(postTypeColors)) {
      // const backgroundColor: string = postType === this.state.mapPostType ? color : color + "44";
      const backgroundColor: string = postType === mapPostType ? color : "#F2F2F2";
      let label: string = postType;
      if (postType === "individuals" && mapPostType === "projects") {
        label = "director";
      }
      const border: string = "3px solid " + color;
      legend.push(
        <div key={postType} className="d-flex flex-column align-items-center py-1">
          <span className="legendCircle" style={{backgroundColor, border}}/>
          <p className="mt-1 m-0 small text-grey">{label}</p>
        </div>
      )
    }
    return legend;
  }

  public render() {
    const {homePost, postInfo, relatedPostsBottom, relatedPostsTop} = this.state;
    return (
      <div className="container border border-dark border-bottom-0 h-100">
        <div className="row h-100 py-3">
          <div id="mapInfo" className="col-12 col-md-6 col-lg-5 col-xl-4 border-right border-grey d-flex justify-content-between flex-column">
            {postInfo}
          </div>
          <div id="mapVisual" className="col-12 col-md-6 col-lg-7 col-xl-8 px-2 d-flex justify-content-between position-relative">
            <div className="d-flex align-items-center position-relative">
              {homePost}
            </div>
            <div className="h-100 w-100 d-flex flex-column justify-content-between">
              <div className="d-flex align-items-start">
                {relatedPostsTop}
              </div>
              <div className="d-flex align-items-end">
                {relatedPostsBottom}
              </div>
            </div>
            <div className="legend d-flex flex-column justify-content-center position-absolute h-100">
              {this.props.selectedPost > 0 && 
                <div className="border-left border-grey px-2 text-capitalize">
                  {this.renderLegend()}
                </div>
              } 
            </div>
          </div>
        </div>
      </div>
    )
  }
}