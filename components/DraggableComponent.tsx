import React, { useRef, useState } from 'react';
import {
  View, Button, Animated, Dimensions, PanResponder, PanResponderInstance,
  GestureResponderEvent, PanResponderGestureState, Text
} from 'react-native';

export default function DraggableComponent(): React.JSX.Element {
  const windowHeight: number = Dimensions.get('window').height;
  const maxViewHeight: number = windowHeight / 3;
  const animationValue: Animated.Value = useRef(new Animated.Value(-maxViewHeight)).current;

  // eslint-disable-next-line @typescript-eslint/typedef
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: animationValue }], { useNativeDriver: false }),
    onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (gestureState.dy > 50) {
        setIsOpen(true);
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }).start();
      } else {
        setIsOpen(false);
        Animated.timing(animationValue, {
          toValue: -maxViewHeight,
          duration: 300,
          useNativeDriver: false
        }).start();
      }
    }
  });

  function openWithButton(): void {
    setIsOpen(true);
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open View" onPress={openWithButton} />

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          height: maxViewHeight,
          width: '100%',
          backgroundColor: 'lightblue',
          position: 'absolute',
          top: animationValue
        }}
        pointerEvents={isOpen ? 'auto' : 'none'}  // This line was added
      >
        <View
          style={{
            height: 40,
            backgroundColor: 'darkblue',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button title="Close" onPress={(): void => {
            setIsOpen(false);
            Animated.timing(animationValue, {
              toValue: -maxViewHeight,
              duration: 300,
              useNativeDriver: false
            }).start();
          }} />
        </View>
        <Text>testing</Text>
      </Animated.View>
    </View>
  );
}
