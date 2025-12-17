
import React from "react";
import "../Style/LeftSidebarComp.css";
import LeftSideBarCategoryComp from "./LeftSideBarCategoryComp";
import LeftSideBarIconTopComp from "./LeftSideBarIconTopComp";


export default function LeftSidebarSubComp({ data,
  searchedMarketplaceInput, handleChangeInput,
  searchBasedOnSelection,
  handleSearchBasedOnSelection
}) {

  return (
    <div className="left-page-marketplace">
      {/* Top Header */}
      <div className="top-header">
        <div className="hading-setting">
          <h1>{data.topHeader.headingSetting.title}</h1>
          <a href={data.topHeader.headingSetting.settingLogo.link}>
            <img
              className="setting-logo"
              src={data.topHeader.headingSetting.settingLogo.src}
              alt={data.topHeader.headingSetting.settingLogo.alt}
            />
          </a>
        </div>

        <div className="searchBoxMarket_and_BasedOn">
          <div className="search-box-market">
            
            <input
              className="market-seach"
              type={searchBasedOnSelection == 'minPrice' || searchBasedOnSelection == 'maxPrice' ? "number" : "text"}

              placeholder={data.topHeader.searchBox.inputPlaceholder}
              value={searchedMarketplaceInput}
              onChange={(e) => handleChangeInput(e.target.value)}
            />
          </div>
        <div className="dropdown-wrapper">
          <select className="custom-select" value={searchBasedOnSelection}
            onChange={(e) => handleSearchBasedOnSelection(e.target.value)}>
            <option value="name">Name</option>
            <option value="minPrice">Min. Price</option>
            <option value="maxPrice">Max. Price</option>
            <option value="location_city_state">Location</option>
          </select>
        </div>
        </div>

      </div>

      {/* Icons */}
      <div className="icon-img">
        {/* data.icons   ye array de rha hai */}
        <LeftSideBarIconTopComp dataArray={data.icons} />
      </div>

      {/* Create Media */}
      <div className="create-media">
        <div className="creat-new-listing">
          <a className="bottom-content-add" href={data.createMedia.link}>
            <i className={data.createMedia.iconClass}></i>
          </a>
          <span>{data.createMedia.text}</span>
        </div>
      </div>

      {/* Location */}
      <div className="location">
        <div className="location-name">
          <div className="heding-loaction">
            <span>{data.location.title}</span>
          </div>
          <div className="location-address">
            <span>{data.location.address}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories">
        <LeftSideBarCategoryComp data={data.categories} />
      </div>
    </div>
  );
}
