import * as React from 'react';
import { MapNode } from './MapNode';
import { Tags } from './Tags';


interface MyProps {
  maxNodes: number,
  modalDisabled: boolean,
  modalOpen: boolean,
  postType: string,
  selectedPost: number,
  selectedTags: Array<number>,
  tags: any,
  tag_types: any,
  openModal: () => Promise<void>,
  closeModal: () => Promise<void>,
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
  groups: "#83D335",
  individuals: "#41D3BD",
  projects: "#F18F01",
}

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
      postInfo: undefined,
      relatedPostsBottom: undefined,
      relatedPostsTop: undefined,
    };

    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.setFrameDimensions = this.setFrameDimensions.bind(this);
    this.getTagColor = this.getTagColor.bind(this);
    this.getTagName = this.getTagName.bind(this);
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
      this.setPostInfo(this.state.post);
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.setFrameDimensions)
  }

  setPostInfo(post: any): Promise<void> {
    return new Promise((resolve) => {
      const postInfo = (post? this.populatePostInfo(post):undefined);
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
    const selectedTags: any = this.props.selectedTags;
    return (<Tags
      getTagColor={this.getTagColor}
      getTagName={this.getTagName}
      tags={tagIds}
      selectedTags={selectedTags}
      appendToSelectedTags={this.props.appendToSelectedTags}
      textScaleFactor="0.75rem"
      tagClasses="tag d-inline-block m-1 p-2"
      key={selectedTags}
    />)
  }

  getTagName(id: number): string {
    if (this.props.tags[id]) {
      return this.props.tags[id].name;
    }
    return '';
  }

  getTagColor(id: number): string {
    if (this.props.tags[id]) {
      const typeId = this.props.tags[id].type;
      const color = this.props.tag_types[typeId].colour;
      return '#' + color;
    }
    return '#123456';
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
        <div style={{height: "45px", width: "45px"}}>
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
          backgroundColor: '#FFFFFF',
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
      border,
    }
    return(
      <div className="overflow-btn bg-white font-italic d-inline-block p-2 mx-0 text-nowrap" style={btnStyle} onClick={handleOverflowClick} key={clickedPostType + " overflow"}>
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
      const mapNodeWidth: number = 82;
      const homeNodeWidth: number = 45;
      const mapVisualPadding: number = 8;
      const actionButtonPadding: number = 40;
      if (mapWidth) {
        maxNodes = Math.floor((mapWidth - mapVisualPadding - homeNodeWidth - actionButtonPadding)/mapNodeWidth);
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
      const backgroundColor: string = postType === mapPostType ? color : "#FFFFFF";
      let label: string = postType;
      if (postType === "individuals" && mapPostType === "projects") {
        label = "director";
      }
      const border: string = "3px solid " + color;
      legend.push(
        <div key={postType} className="d-flex flex-row align-items-center justify-content-end py-1">
          <p className="d-inline-block pr-2 m-0 small text-grey">{label}</p>
          <span className="legendCircle" style={{backgroundColor, border}}/>
        </div>
      )
    }
    return legend;
  }

  public render() {
    const {homePost, postInfo, relatedPostsBottom, relatedPostsTop} = this.state;
    const {modalDisabled, modalOpen, openModal, closeModal} = this.props;
    return (
      <div id="map-container" className="container bg-white h-100">
        <div className="row h-100 py-3">
          {!postInfo && <div id="defaultMessage" className="text-muted"
            ><h5>Please select a row from the table</h5>
          </div> }
          <div id="mapInfo" className="col-12 col-md-6 col-lg-5 col-xl-4 d-flex justify-content-between flex-column">
            {postInfo}
          </div>
          <div id="mapVisual" className="col-12 col-md-6 col-lg-7 col-xl-8 pl-0 pr-1 d-flex justify-content-between position-relative">
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
                <div className="px-2 text-capitalize">
                  {this.renderLegend()}
                </div>
              } 
            </div>
            {!modalDisabled && 
              <button onClick={modalOpen? closeModal : openModal} className="btn btn-outline-primary map-action-button">
                ?
              </button>
            }
          </div>
        </div>
      </div>
    )
  }
}