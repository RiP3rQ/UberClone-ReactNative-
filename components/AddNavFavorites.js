import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const AddNavFavorites = forwardRef(
  ({ activeHeight, backDropColor, backgroundColor, children }, ref) => {
    const height = useWindowDimensions().height + 50;
    const newActiveHeight = height - activeHeight;
    const topAnimation = useSharedValue(height);
    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(
        topAnimation.value,
        [height, newActiveHeight],
        [0, 0.5]
      );

      const display = opacity === 0 ? "none" : "flex";
      return {
        opacity,
        display,
      };
    });

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startY = topAnimation.value;
      },
      onActive: (event, ctx) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(ctx.startY + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
      onEnd: () => {
        if (topAnimation.value > newActiveHeight + 50) {
          topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
    });

    const expand = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(newActiveHeight, {
        damping: 100,
        stiffness: 400,
      });
    }, []);

    const close = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(height, {
        damping: 100,
        stiffness: 400,
      });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close]
    );

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            close();
            Keyboard.dismiss();
          }}
        >
          <Animated.View
            className="absolute top-0 right-0 bottom-0 left-0"
            style={[
              backDropAnimation,
              {
                backgroundColor: backDropColor,
              },
            ]}
          />
        </TouchableWithoutFeedback>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            className="absolute top-0 right-0 bottom-0 left-0 rounded-t-xl"
            style={[
              animationStyle,
              {
                height: activeHeight,
                backgroundColor: backgroundColor,
              },
            ]}
          >
            <View className="items-center my-2">
              <View className="w-14 h-1 bg-black rounded-full" />
            </View>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
);

export default AddNavFavorites;
