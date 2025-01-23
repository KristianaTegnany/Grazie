import AsyncStorage from "@react-native-async-storage/async-storage";
import useAppNavigator from "hooks/useAppNavigator";
import {useEffect, useRef, useState} from "react";
import {GestureResponderEvent} from "react-native";
import {Animated, Dimensions} from "react-native";
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import routeName from "routes/routeName";
import Apollo from "services/utils/apollo";
import {query_stories} from "services/utils/apollo/query";
import {rootState} from "store/reducer";
import {
  updateFirstBiblio,
  updateFirstCasa,
  updateFirstFriend,
  updateFirstPepite,
} from "store/slice/mag/magSlice";
import {ICategory} from "store/slice/mag/type";

let timerId: NodeJS.Timer, start: number, remaining: number;

const {width: screenWidth} = Dimensions.get("window");

const TEMP5 = "temp_5";

export default function useStoryCtr() {
  const navigator = useAppNavigator();
  const {
    id,
    index,
    isFirst,
    showTuto: tuto,
  } = navigator.getParams<{
    id: number;
    index: number;
    isFirst: boolean;
    showTuto: boolean;
    isFirstStory: boolean[];
  }>();

  const {noStoryYet} = useSelector(
    (state: rootState) => state.magReducer.magDatas.translation,
  );

  const dispatch = useDispatch();

  const widthAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [stories, setStories] = useState<any>([]);
  const [total, setTotal] = useState();
  const [showTuto, setShowTuto] = useState(tuto);

  const goBack = async (_?: any) => {
    const isVideo = stories[currentIndex].media?.type === "video";
    const shouldStart = stories[currentIndex].template === TEMP5;
    AsyncStorage.setItem(
      "lastStoryState" + index,
      JSON.stringify({
        currentIndex,
        isVideo,
        remaining,
        shouldStart,
        widthAnim,
      }),
    );
    navigator.navigateScreen(routeName.tab.mag.base);
  };

  useEffect(() => {
    AsyncStorage.getItem("lastStoryState" + index).then(res => {
      if (res) {
        const lastStoryState: {
          currentIndex: number;
          isVideo: boolean;
          remaining: number;
          shouldStart: boolean;
          widthAnim: number;
        } = JSON.parse(res);
        setCurrentIndex(lastStoryState.currentIndex);
        if (!lastStoryState.isVideo) {
          remaining = lastStoryState.remaining;
          widthAnim.setValue(lastStoryState.widthAnim);
        }
        if (lastStoryState.shouldStart) {
          resume(next);
        }
        AsyncStorage.removeItem("lastStoryState" + index);
      }
    });
    Apollo.query(query_stories, {
      id,
    }).then(response => {
      if (response?.data?.stories?.items) {
        setTotal(response.data.stories.total);
        setStories(response.data.stories.items);
      }
    });
  }, [id]);

  useEffect(() => {
    if (total !== undefined) {
      if (total < 1) {
        Toast.show({text2: noStoryYet, type: "error"});
        goBack();
      } else if (isFirst) {
        switch (index) {
          case 0:
            dispatch(updateFirstPepite());
            break;
          case 1:
            dispatch(updateFirstFriend());
            break;
          case 2:
            dispatch(updateFirstBiblio());
            break;
          case 3:
            dispatch(updateFirstCasa());
            break;
        }
      }
    }
  }, [total]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  const onPressIn = (evt: GestureResponderEvent) => {
    const x = evt.nativeEvent.locationX;
    if (x <= screenWidth / 4) {
      stop();
      if (currentIndex === 0) {
        widthAnim.setValue(0);
        resume(next);
      } else {
        prev();
      }
    } else if (x >= (3 * screenWidth) / 4) {
      stop();
      next();
    } else {
      pause();
    }
  };

  const onPressOut = (evt: GestureResponderEvent) => {
    const x = evt.nativeEvent.locationX;
    if (x > screenWidth / 4 && x < (3 * screenWidth) / 4) {
      resume(next);
    }
  };

  const next = () => {
    widthAnim.setValue(0);
    if (currentIndex === stories.length - 1) {
      goBack();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prev = () => {
    widthAnim.setValue(0);
    if (currentIndex > 0) {
      setCurrentIndex(prev => {
        const nextIndex = prev - 1;
        return nextIndex;
      });
    }
  };

  function pause() {
    const duration = new Date().getTime() - start;
    widthAnim.stopAnimation();
    clearTimeout(timerId);
    remaining -= duration;
  }

  function resume(callback: () => void, duration?: number) {
    start = new Date().getTime();
    remaining = duration || remaining || 5000;
    Animated.timing(widthAnim, {
      toValue: 100,
      duration: remaining,
      useNativeDriver: false,
    }).start();
    timerId = setTimeout(function () {
      stop(duration);
      callback();
    }, remaining);
  }

  function stop(duration?: number) {
    widthAnim.stopAnimation();
    clearTimeout(timerId);
    remaining = duration || 5000;
  }

  return {
    index,
    currentIndex,
    showTuto,
    stories,
    TEMP5,
    total,
    widthAnim,
    goBack,
    next,
    onPressIn,
    onPressOut,
    resume,
    setShowTuto,
  };
}
