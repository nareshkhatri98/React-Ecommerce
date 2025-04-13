import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import PopularBlog from "./components/PopularBlog";
import ProductPage from "./components/ProductPage";
import SideBar from "./components/SideBar";
import TopSeller from "./components/TopSeller";
const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />

        <div className="rounded w-full flex justify-center flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent/>} />
            <Route path="/product/:id" element={<ProductPage/>}/>
          </Routes>

          <div>
            <TopSeller/>
            <PopularBlog/>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default App;
