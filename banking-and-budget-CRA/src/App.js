import "./styles/base.scss";
import React, { useState, useEffect } from "react";
import { MainPage } from "./pages/MainPage";
import { LoadingPage } from "./pages/LoadingPage";

function App() {  
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {setShowLoading(false)},3000);
  
    return () => {
      
    }
  }, [])
  
  return (
    <div className="App">
      {showLoading && <LoadingPage />}
      <MainPage />    
    </div>
  );
}

export default App;
