/* eslint-disable react/prefer-stateless-function */
// "https://muhna-api.herokuapp.com/file/video?filename=42b787cd912302a5b2997e5d7262927f.mp4"

import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

import Icon from 'react-native-vector-icons/AntDesign';

// import { Container } from './styles';

const dm = {
  height: Dimensions.get('window').height * 0.4,
  width: Dimensions.get('window').width
};

// {
// 	uri:
// 		'https://muhna-api.herokuapp.com/filePost/video?filename=7ed14ef173dcbcb78aeffc02f8078450.mp4',
// 	_id: '1'
// },
// {
// 	uri:
// 		'https://muhna-api.herokuapp.com/filePost/video?filename=f68b3ec4d803ef94b1068de8d669f4ba.mp4',
// 	_id: '2'
// }

const flatList = [];
const MeuVideo = () => {
  const state = {
    url: [],
    max: 0,
    pos: 0
  };
  const multipleVideo = (item) => {
    const videos = [];
    if (item != (undefined || null) && item.length > 0) {
      const contador = 1;
      item.forEach((element) => {
        videos.push(
          <View
            style={{
						  height: dm.height,
						  width: dm.width,
						  alignItems: 'center',
						  alignContent: 'center'
            }}
          >
            <VideoPlayer
              source={{
							  uri: element.uri
              }}
              navigator={() => {}}
              disableVolume
              disableBack
            />
          </View>
        );
      });
      return videos;
    }
    return null;
  };

  const renderItem = ({ item }) => (
    <VideoPlayer
      style={{ height: dm.height * 0.99, width: dm.width }}
      source={{
			  uri: item.url
      }}
      navigator={() => {}}
      disableVolume
      disableBack
      paused
      onPlay={() => console.warn('pla')}
      onPause={() => console.warn('pause')}
      onPress={() => console.warn('Aeo')}
    />
  );
  // _flatList = () => {};
  const componentDidMount = () => {
    if (props.urlVideos != (undefined || null)) {
      const item = props.urlVideos;
      state({ pos: 0, max: props.urlVideos.length - 1 });
      state({ url: item });
    }
  };

  const proximo = () => {
    if (flatList != (undefined || null)) {
      if (state.pos === state.max) {
        state({ pos: 0 });
      } else {
        state({ pos: state.pos + 1 });
      }

      flatList.scrollToIndex({ animated: true, index: state.pos });
    }
  };

  const anterior = () => {
    if (flatList != (undefined || null)) {
      if (state.pos === 0) {
        state.pos = state.max;
      } else {
        state.pos -= 1;
      }

      flatList.scrollToIndex({ animated: true, index: state.pos });
    }
  };

  render = () => (
    <View style={{ flex: 1, paddingVertical: 50 }}>
      <View style={{ height: dm.height, alignContent: 'center', alignItems: 'center' }}>
        <FlatList
          horizontal
          ref={(ref) => {
					  flatList = ref;
          }}
          showsHorizontalScrollIndicator
          data={state.url}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
      <View
        style={{
				  flex: 1,
				  justifyContent: 'center',
				  alignItems: 'center'
        }}
      >
        {state.url != (undefined || null) && state.url.length > 1 ? (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => anterior()} style={{ width: 50 }}>
              <Icon name="left" color="#000" size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => proximo()}>
              <Icon name="right" color="#000" size={40} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default MeuVideo;
