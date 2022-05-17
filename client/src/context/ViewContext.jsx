import React, {useContext, useEffect, useState} from 'react';
export const ViewContext = React.createContext();
import axios from 'axios';


export const ViewProvider = ({children}) => {
  const [view, setView] = useState("Homepage")
  


  return (
    <ViewContext.Provider value={{view}}>
      {children}
    </ViewContext.Provider>
  )


}
