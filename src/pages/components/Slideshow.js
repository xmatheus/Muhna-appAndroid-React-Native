import Slideshow from 'react-native-image-slider-show';
import React, { Component} from 'react';

// slide de varias imagens

export default class SlideshowTest extends Component {
    constructor(props) {
      super(props);
      this.overlay = true;
   
      this.state = {
        position: 1,
        interval: null,
        dataSource:props.dataSource
      };
    }
   
    componentWillMount() {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
          });
        }, 4000)
      });
    }
   
    componentWillUnmount() {
      clearInterval(this.state.interval);
    }
   
    render() {
      return (
      <Slideshow 
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })} />
      );
    }
  }