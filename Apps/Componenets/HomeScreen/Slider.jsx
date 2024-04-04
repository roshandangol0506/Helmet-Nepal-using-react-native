import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const Slider = ({ sliderList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the next index for the slider
      const nextIndex = (currentIndex + 1) % sliderList.length;
      // Update the current index state
      setCurrentIndex(nextIndex);
      // Scroll to the next image in the slider
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    }, 3000); // Change slide every 3 seconds

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [currentIndex, sliderList.length]);

  return (
    <View style={{ marginTop: 30 }}>
      <FlatList
        ref={flatListRef}
        data={sliderList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.image }}
            style={{ height: 200, width: 440, marginRight: 3, borderRadius: 10 }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: 435,
          offset: 435 * index,
          index,
        })}
        pagingEnabled
        snapToInterval={435}
        decelerationRate="fast"
      />
    </View>
  );
};

export default Slider;
