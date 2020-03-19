import * as React from 'react';
import { Circle, Layer, Stage } from 'react-konva';

interface MyProps {
  postType: string,
  selectedPost: number,
}

export default class Map extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props)
  }

  state = {
    boundary: 150,
    color: '#444444',
    containerHeight: 0,
    containerWidth: 0,
  }
  onclick() {
    console.log("clicked");
  }
  public render() {
    return (
      <Stage width={parent.innerWidth*0.8} height={400}
        style={{
        border: '2px solid',
        borderBottom: 'none',
        height: "60%",
        margin: 'auto',
        // maxHeight: '500px',
        // minHeight: '400px',
      }}
      >
        <Layer>
          <Circle
            radius={50}
            x={this.state.boundary}
            y={200}
            fill={this.state.color + '44'}
            stroke={this.state.color}
            onClick={this.onclick}
          />
        </Layer>
      </Stage>
    )
  }
}