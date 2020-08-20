import React from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className='App'>
        <SortingVisualizer />
      </div>
    </AppProvider>
  );
}

export default App;
