import * as React from 'react';

interface MyProps {
  color: string, 
  post: any,
  postId: number, 
  postType: string, 
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
      backgroundColor: this.props.color + '44'
    }
    return <div key={this.props.postId} className="mapNode">
      <span className="nodeCircle" style={nodeStyle} onClick={this.handleClick}/>
        {/* <circle fill={this.color + '44'} cx="10" cy="10" r="10" /> */}
        {/* <p>{this.postId}</p> */}
        <p>{this.state.label}</p>
      </div>;
  }
}
