import React from "react";
import { Navigation } from "./navigator/Navigation";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

export default App;
