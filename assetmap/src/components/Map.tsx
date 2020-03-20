import * as React from 'react';
import { Circle, Layer, Stage } from 'react-konva';

// interface MyProps {
//   postType: string,
//   selectedPost: number,
// }

export default class Map extends React.Component {
  // constructor(props: MyProps) {
  //   super(props)
  // }

  state = {
    boundary: 150,
    color: '#444444',
    containerHeight: 0,
    containerWidth: 0,
  }

  componentDidMount() {
    this.getDimensions();
    window.addEventListener("resize",() => {
      this.getDimensions();
    })
  }
  
  getDimensions() {
    const parent = document.getElementById("mapParent");
    const height = parent?.offsetHeight;
    const width = parent?.offsetWidth;
    console.log(height, width);
    this.setState({
      containerHeight: height,
      containerWidth: width,
    })
  }

  public render() {
    return (
      <Stage width={this.state.containerWidth} height={this.state.containerHeight}>
        <Layer>
          <Circle
            radius={50}
            x={this.state.boundary}
            y={200}
            fill={this.state.color + '44'}
            stroke={this.state.color}
          />
        </Layer>
      </Stage>
    )
  }
}