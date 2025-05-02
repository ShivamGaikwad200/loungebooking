import Featured from "../../components/featured/Featured";
import FeaturedLounges from "../../components/featuredLounges/FeaturedLounges"; // Updated component for lounges
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
// import LoungeList from "../loungeList/LoungeList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        {/* <Featured />
        <h1 className="homeTitle">Browse by lounge type</h1> */}
        {/* <LoungeList />  {/*Updated component*/ }
        {/* <h1 className="homeTitle">Lounge spaces guests love</h1> */}
        <FeaturedLounges /> {/**Updated component */}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
