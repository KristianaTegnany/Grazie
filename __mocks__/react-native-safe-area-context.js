const inset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  
  export const SafeAreaProvider = ({ children }) => children
  
  export const SafeAreaConsumer = ({ children }) => children(inset)
  
  export const useSafeAreaInsets = () => inset