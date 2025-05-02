import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch("/lounges");

  return (
    <div className="featured">
      {loading ? "Loading please wait" : (
        <>
          {data.map((lounge) => (
            <div className="featuredItem" key={lounge._id}>
              <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>{lounge.name}</h1>
                <h2>{lounge.location}</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );

};

export default Featured;