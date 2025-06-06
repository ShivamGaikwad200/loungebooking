import "./longe.css"; // Updated file for lounges
// import "../hotel/hotel.css"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Reserve from "../../components/reserve/Reserve";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Lounge = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/lounges/${id}`);
  // console.log(data);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dates?.length > 0 ? dayDifference(dates[0].endDate, dates[0].startDate) : 1;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      console.log("User is logged in:", user);
      console.log("Lounge ID:", id);
      navigate("/booking", {
        state: {
          loungeId: id,
          totalPrice: days * (data?.cost || 0) * (options?.room || 1),
        },
      });
    } else {
      navigate("/login");
    }
  };
  

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "loading" : (
        <div className="loungeContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow left" onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img src={photos[slideNumber].src} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow right" onClick={() => handleMove("r")} />
            </div>
          )}
          <div className="loungeWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve Now!</button>
            <h1 className="loungeTitle">{data.name}</h1>
            <div className="loungeAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.location}</span>
            </div>
            <span className="loungeDistance">Excellent location – {data.distance} from center</span>
            <span className="loungePriceHighlight">
              Book a stay over ${data.cost} at this lounge and get a free drink
            </span>
            <div className="loungeImages">
              {photos.map((photo, i) => (
                <div className="loungeImgWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo.src} alt="" className="loungeImg" />
                </div>
              ))}
            </div>
            <div className="loungeDetails">
              <div className="loungeDetailsTexts">
                <h1 className="loungeTitle">{data.title}</h1>
                <p className="loungeDesc">{data.description}</p>
              </div>
              <div className="loungeDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>Located in the heart of the city, this lounge has an excellent location score of 9.8!</span>
                <h2>
                  <b>${days * (data?.cost || 0) * (options?.room || 1)}</b>
                </h2>
                <button onClick={handleClick}>Reserve Now!</button>
              </div>
            </div>
          </div>

          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} loungeId={id} />}
    </div>
  );
};

export default Lounge;
