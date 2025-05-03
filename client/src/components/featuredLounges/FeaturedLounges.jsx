import "./featuredLounges.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const FeaturedLounges = () => {
  const { data, loading, error } = useFetch("/lounges?featured=true&limit=3");
  // console.log(data);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/lounges/${id}`);
  };

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
  
    const handlePrev = () => {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    };
  
    const handleNext = () => {
      setCurrentIndex(prev => Math.min(prev + 1, data.length - 3)); 
    };
  
    
  return (
    <div className="featuredLounges">
      {loading ? (
        "Loading featured lounges..."
      ) : (
        <>
        <div className="carouselHeader">
          <h2>Featured Lounges</h2>
          <div className="carouselControls">
            <button 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
              className="carouselButton"
            >
              &lt;
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentIndex >= data.length - 3}
              className="carouselButton"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="featuredLoungesContainer" ref={carouselRef}>
          {data.map((lounge) => (
            <div
              className="featuredLoungesItem"
              key={lounge._id}
              onClick={() => handleClick(lounge._id)}
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                flex: `0 0 calc(100% / 3 - 14px)`
              }}
            >
              <img
                src={"https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="}
                alt={lounge.name}
                className="featuredLoungesImg"
              />
              <div className="featuredLoungesTitles">
                <h1>{lounge.name}</h1>
                <h2>{lounge.city}</h2>
              </div>
            </div>
          ))}
        </div></>
      )}
    </div>
  );
};

export default FeaturedLounges;
