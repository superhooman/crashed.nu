import React from "react";

export const isMobileContext = React.createContext(false);

export const useIsMobile = () => React.useContext(isMobileContext);