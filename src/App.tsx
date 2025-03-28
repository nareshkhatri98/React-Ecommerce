import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/SideBar";
const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />
      </div>
    </Router>
  );
};
export default App;
