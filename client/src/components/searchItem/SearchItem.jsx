import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=" alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">Max Persons allowed:{item.maxPersons}</span>
        <span className="siTaxiOp">Free Wines</span>
        <span className="siSubtitle">
          {/* Lounge with Air conditioning */}
        </span>
        <span className="siFeatures">{item.description}</span>
        {/* <span className="siCancelOp">Free cancellation </span> */}
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">₹{item.cost}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/lounges/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
