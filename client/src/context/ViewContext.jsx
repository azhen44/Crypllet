import React, {useState} from 'react';
export const ViewContext = React.createContext({view:"Send Crypto"});

export const ViewProvider = ({children}) => {
  const [view, setView] = useState("Send Crypto")
  const changeView = (view) => {
    setView(view)
  }
  return (
    <ViewContext.Provider value={{view, changeView}}>
      {children}
    </ViewContext.Provider>
  )
}

