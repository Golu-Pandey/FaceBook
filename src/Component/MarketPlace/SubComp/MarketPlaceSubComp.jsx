import React, { useState } from "react";
import "../Style/MarketPlaceComp.css";
import { useGlobleFun } from "../../../Hooks/useGlobleFun";
export default function MarketPlaceSubComp({ data }) {

  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { arrayBeforeIndex, arrayAfterIndex } = useGlobleFun(data, 2);

  //ye state defined isliye kiye hai , qki seeMore k basis pe data ko pura display kr rhe hai ya kuchh hi data display kr rhe hai
  const [seeMore, setSeeMore] = useState(true);
  //ye function defined kiye hai taki SeeMore ya SeeLess pe onClick kr seeMore k value ko update kr rhe hai
  const isHideShow = () => {
    setSeeMore(!seeMore);
  }

  console.log("data = ", {data});

  return (
    <div className="market-shop">
      {/* beforeEvents ka ara elemnt return krna hai */}
      {arrayBeforeIndex.map((item, index) =>
        // agr item.path me koi value nhi aa rha hai ya phir undefined aa rha hai to item.path ka value false hoga or
        //  agr kuchh value aa rha hai lekin 0 ko chhod kar to item.path ka value true hoga;.... is operation ko ternary operation;
        <div className="market-shop-box-content" key={index}>
          <div className="market-material-photo">
            <img className="material-photo" src={item.material_photo} alt={item.name} />
          </div>
          <span className="market-shop-box-content">{item.price}</span>
          <span className="market-shop-box-content">{item.name}</span>
          <span className="location-city-state">{item.location_city_state ? item.location_city_state : item.description}</span>
        </div>
      )
      }
      {
        seeMore && arrayAfterIndex.length ?
          <a href="#" className="sidebar-item seeMoreMarketPlace" onClick={() => isHideShow()}>
            <i className="fa-solid fa-angles-down"></i>
            <span>see more</span>
          </a>
          : <>
            {arrayAfterIndex.map((item, index) =>
              // agr item.path me koi value nhi aa rha hai ya phir undefined aa rha hai to item.path ka value false hoga or
              //  agr kuchh value aa rha hai lekin 0 ko chhod kar to item.path ka value true hoga;.... is operation ko ternary operation;
              <div className="market-shop-box-content" key={index}>
                <div className="market-material-photo">
                  <img className="material-photo" src={item.material_photo} alt={item.name} />
                </div>
                <span className="market-shop-box-content">{item.price}</span>
                <span className="market-shop-box-content">{item.name}</span>
                <span className="location-city-state">{item.location_city_state ? item.location_city_state : item.description}</span>
              </div>
            )}
            <>{arrayAfterIndex.length ?
              <a href="#" className="sidebar-item seeLessMarketPlace" onClick={() => isHideShow()}>
                <i className="fa-solid fa-angles-up"></i>
                <span> see less</span>
              </a>
              :
              <></>
            }</>

          </>
      }
    </div>

  );
}
