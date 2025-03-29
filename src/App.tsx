import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";
const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />

        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
