import React from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import { AppProvider } from "./context/AppContext";
import './App.scss';

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
