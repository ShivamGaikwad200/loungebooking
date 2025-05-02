import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/lounges");

  return (
    <div className="fp">
      {loading ? "Loading" : (
        <>
          {data.map((lounge) => (
            <div className="fpItem" key={lounge._id}>
              <img src={lounge.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{lounge.name}</span>
              <span className="fpCity">{lounge.location}</span>
              <span className="fpPrice">Starting from ₹{lounge.cheapestPrice}</span>
              {lounge.rating && (
                <div className="fpRating">
                  <button>{lounge.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );

};

export default FeaturedProperties;
