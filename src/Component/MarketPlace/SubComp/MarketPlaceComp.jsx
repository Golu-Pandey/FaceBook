import React from "react";
import MarketplaceData from "../../../ConstDataObject/MarketPlacePage/MarketPlaceComp/MarketPlaceComp.json";
import "../Style/MarketPlaceComp.css";
import MarketPlaceSubComp from "./MarketPlaceSubComp";
export default function MarketPlacePage({
  marketplaceTopPartTotalData,
  marketplaceMiddlePartTotalData,
  marketplaceBottomPartTotalData,
  dataNotFound }) {

  if (marketplaceTopPartTotalData.length == 0 &&
    marketplaceMiddlePartTotalData.length == 0 &&
    marketplaceBottomPartTotalData.length == 0) {
    return (
      <div className="right-page-marketplace">
        <div className="Section_Box">
          {/* Right Page Header */}
          <div className="right-page-header">
            {dataNotFound}
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="right-page-marketplace">
      <div className="Section_Box">
        {/* Right Page Header */}
        <div className="right-page-header">
          <div className="element-picks-location">
            {/* iske niche k sara array ko access krne ka  fomate chnge kro, jaise yha change kiye hai */}
            <span className="right-page-heading">
              {MarketplaceData.Top_Part.heading}
            </span>
            <div className="icon-location">
              <a className="location-logo-icon" href="#">
                <i className="fa-solid fa-location-dot"></i>
              </a>
              <span className="right-location-name">
                {MarketplaceData.Top_Part.right_location_name}
              </span>
            </div>
          </div>
        </div>
        {/* Market Shop */}
        <div className="market-shop">
          <MarketPlaceSubComp data={marketplaceTopPartTotalData} />
        </div>
      </div>

      {/* Sponsored - Mobile Phones */}
      <div className="Section_Box">
        <div className="section-header">
          <div className="left"><span className="market-shop-box-content">{MarketplaceData.Middale_part.leftHeading}</span></div>
          <div className="middle"><span className="market-shop-box-content">
            {marketplaceMiddlePartTotalData.length != 1 ? MarketplaceData.Middale_part.middleHeading : <></>}
          </span></div>
          <div className="right">
            <a className="right-menu-icon" href="#"><i className="fa-solid fa-ellipsis"></i></a>
          </div>
        </div>
        <MarketPlaceSubComp data={marketplaceMiddlePartTotalData} />
      </div>

      {/* Sponsored - Jewellery */}
      <div className="Section_Box">
        <div className="section-header">
          <div className="left"><span className="market-shop-box-content">{MarketplaceData.Bottom_part.leftHeading}</span></div>
          <div className="middle"><span className="market-shop-box-content">
            {marketplaceBottomPartTotalData.length != 1 ? MarketplaceData.Bottom_part.middleHeading : <></>}
          </span></div>
          <div className="right">
            <a className="right-menu-icon" href="#"><i className="fa-solid fa-ellipsis"></i></a>
          </div>
        </div>
        <MarketPlaceSubComp data={marketplaceBottomPartTotalData} />
      </div>
    </div>
  );
}
