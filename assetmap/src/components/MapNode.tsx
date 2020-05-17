import * as React from 'react';

interface MyProps {
  backgroundColor: string,
  color: string, 
  overflowBtn: boolean,
  post: any,
  postId: number, 
  postType: string, 
  textAboveNode: boolean,
  handleNodeClick: (postType: string, postId: number) => Promise<void>,
}

interface MyState {
  label: string,
}

export class MapNode extends React.Component<MyProps, MyState>{

  constructor(props: MyProps) {
    super(props)
    
    this.state = {
      label: this.props.post.name,
    }
    this.handleClick = this.handleClick.bind(this);
    this.draw = this.draw.bind(this);
  }

  handleClick(): Promise<void> {
    return new Promise((resolve) => {
      this.props.handleNodeClick(this.props.postType.toLowerCase(), this.props.postId)
      .then(() => resolve())
    })
  }

  draw() {
    const nodeStyle = {
      '--node-color': this.props.color,    
      backgroundColor: this.props.backgroundColor
    }

    const lineStyle = {
      backgroundColor: this.props.color,
      borderRadius: this.props.overflowBtn ? "5px 0 0 5px" : "5px",
      bottom: this.props.textAboveNode ? "27.5px" : "",
      top: !this.props.textAboveNode ? "27.5px" : "",
    }
    return (
      <div key={this.props.postId} className="mapNode position-relative mx-2 text-center d-flex flex-column">
        {this.state.label && this.props.textAboveNode && <p className="mb-0 block-with-text">{this.state.label}</p>}
        <span className="transit-line position-absolute" style={lineStyle}/>
        <span className="nodeCircle" style={nodeStyle} onClick={this.handleClick}/>
        {this.state.label && !this.props.textAboveNode && <p className="mb-0 block-with-text">{this.state.label}</p>}
      </div>
    );
  }
}
