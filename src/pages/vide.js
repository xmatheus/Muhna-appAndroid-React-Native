// import React, { Component } from "react";

// import { View, StyleSheet } from "react-native";

// // import Video from 'react-native-video';

// // import Video from 'react-native-af-video-player'
// // import VideoPlayer from "react-native-video-controls";

// import JWPlayer from "react-native-jwplayer";

// // import { Container } from './styles';

// export default class pages extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <JWPlayer
//           style={styles.player}
//           autostart={false}
//           file={
//             "https://muhna-api.herokuapp.com/file/video?filename=42b787cd912302a5b2997e5d7262927f.mp4"
//           }
//           onBeforePlay={() => this.onBeforePlay()}
//           onPlay={() => this.onPlay()}
//           onPlayerError={e => this.onPlayerError(e)}
//           onBuffer={() => this.onBuffer()}
//           onTime={time => this.onTime(time)}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   player: {
//     flex: 1
//   }
// });

import React, { Component } from "react";

import { View, Text } from "react-native";

// import { Container } from './styles';

export default class pages extends Component {
  render() {
    return (
      <View>
        <Text style={{ textAlign: "center" }}>Em desenvolvimento</Text>
      </View>
    );
  }
}
