import "../App.css";
import FeaturedTop from "./FeaturedTop";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./NavBar";

function App() {
  return (
    <div className="inline">
      <div className="block">
        <Navbar />
      </div>

      <div className="inline">
        <Home />
      </div>
      <div>
        <FeaturedTop />
      </div>

      <Footer />
    </div>
  );
}

export default App;
