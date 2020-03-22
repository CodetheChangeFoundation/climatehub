import * as React from 'react';

export class MapNode {
  postType: string;
  postId: number;
  color: string;
  label: string;
  constructor(postType: string, postId: number, color: string, label: string) {
    this.postType = postType;
    this.postId = postId;
    this.color = color;
    this.label = label;
  }

  draw() {

    const nodeStyle = {
      '--node-color': this.color,    
      backgroundColor: this.color + '44'
    }

    return <div key={this.postId} className="mapNode">
      <span className="nodeCircle" style={nodeStyle}/>
        {/* <circle fill={this.color + '44'} cx="10" cy="10" r="10" /> */}
        {/* <p>{this.postId}</p> */}
        <p>{this.label}</p>
      </div>;
  }
}
