import { createContext } from "react";

const VoteContext = createContext({
  userSelectedYes: false,
  setUserSelectedYes: () => {},
  selectedImage: null,
  setSelectedImage: () => {}
});

export default VoteContext;