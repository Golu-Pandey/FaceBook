import React, { useState } from "react";
import NavBarComp from "../NavBar/NavBarComp";
import MarketPlaceComp from "./SubComp/MarketPlaceComp"; // Add the full marketplace component
import "./MarketPlacePage.css"; // optional main page styles
import { useGlobalProfilePageNavigator } from "../../Hooks/useGlobleFun";
import postData from "../../ConstDataObject/HomePage/PostComp/PostComp.json"
import LeftSidebarData from "../../ConstDataObject/MarketPlacePage/LeftSidebarComp/LeftSidebarComp.json";
import MarketplaceData from "../../ConstDataObject/MarketPlacePage/MarketPlaceComp/MarketPlaceComp.json";
import LeftSidebarSubComp from "./SubComp/LeftSidebarSubComp";


export default function MarketPlacePage() {

  //ye ek custom hook aur is custom hook jo yha import karne k baad mai custom hook k return element ko yha extract ya get kr rha hu;
  const { loggedUserId, onNavigate } = useGlobalProfilePageNavigator();

  //ye marketPlace k leftSideBar me dikh rhe list ka data;
  const leftSideBarTotalData = LeftSidebarData.leftSidebar;

  //ye marketPlace k top part me dikh rhe list ka data;
  const marketplaceTopPartTotalData = MarketplaceData.Top_Part.data;

  //ye marketPlace k middle part me dikh rhe list ka data;
  const marketplaceMiddlePartTotalData = MarketplaceData.Middale_part.data;


  //ye marketPlace k bottom part me dikh rhe list ka data;
  const marketplaceBottomPartTotalData = MarketplaceData.Bottom_part.data;



  // yhaa se Marketplace me item ko search karne k liye seach input me type kiye gye text ko 
  // store karne k liye state defined kiye hai; 
  const [searchedMarketplaceInput, setSearchedMarketplaceInput] = useState('');

  // yhaa se Marketplace me item ko search karne k liye seach input me type kiye gye text ko
  //  searchedMarketplaceInput me update karne k liye function defined kiye hai; 
  const handleChangeInput = (value) => {
    setSearchedMarketplaceInput(value);
  } 

  // yhaa se Marketplace me item ko jis basis pe search krenge, us basis k value ko store karne k liye
  //yhaa location_city_state, name, minPrice, maxPrice total 4 type k basis pe hi search kr rhe hai
  const [searchBasedOnSelection, setSearchBasedOnSelection] = useState('name');

  // yhaa se Marketplace me item ko kis basis pe search kr rhe hai ye btane k liye
  //selection k basis pe searchBasedOnSelection ko update karne rahenge 
  const handleSearchBasedOnSelection = (value) => {
    setSearchBasedOnSelection(value);
    setSearchedMarketplaceInput('');
  }


  // yhaa search input me type kiye gye text aur selecet kiye gye basis(location_city_state, name, minPrice, maxPrice) 
  // k according search karne k baad search kiye huye Marketplace k koi bhi section k item ko store karne k liye aur phir
  // store kiye gye items ko return karne k liye common function bnanye hai 
  // jo top, middle, bottom tino section k liye ye common function applicable hai liye variavle defined kiye hai;
  // niche common function jiska naam commonFunToReturnSearchedMarketPlaceData hai , 
  // ye search kisi bhi ek section (top, middle, bottom) me kiye huye data ko searchedMarketplaceOneSectionTotalData me store kr rha hai aur
  //  phir searchedMarketplaceOneSectionTotalData ko finally return kr de rha hai
  const commonFunToReturnSearchedMarketPlaceData = (
    marketplaceOnSectionTotalData,
    searchedMarketplaceInput,
    searchBasedOnSelection
  ) => {

    const searchedMarketplaceOneSectionTotalData = marketplaceOnSectionTotalData.filter((item) => {

      if (!searchedMarketplaceInput) return true;

      if (searchBasedOnSelection === "minPrice") {
        return item.priceValue > parseInt(searchedMarketplaceInput) || item.priceValue == parseInt(searchedMarketplaceInput) || item.priceValue==0;
      }

      if (searchBasedOnSelection === "maxPrice") {
        return item.priceValue < parseInt(searchedMarketplaceInput) || item.priceValue == parseInt(searchedMarketplaceInput) || item.priceValue==0;
      }

      return item[searchBasedOnSelection]?.toLocaleLowerCase().includes(searchedMarketplaceInput.toLocaleLowerCase()) || item.priceValue==0;
    });

    return searchedMarketplaceOneSectionTotalData;
  };


  // yhaa search input me type kiye gye text k according search karne k baad
  // search kiye huye Marketplace k top section k item ko store karne liye variavle defined kiye hai;
  const searchedMarketplaceTopPartTotalData = commonFunToReturnSearchedMarketPlaceData(marketplaceTopPartTotalData,
    searchedMarketplaceInput, searchBasedOnSelection);


  // yhaa search input me type kiye gye text k according search karne k baad
  // search kiye huye Marketplace k middle section k item ko store karne liye variavle defined kiye hai;
  const searchedMarketplaceMiddlePartTotalData = commonFunToReturnSearchedMarketPlaceData(marketplaceMiddlePartTotalData,
    searchedMarketplaceInput, searchBasedOnSelection);


  // yhaa search input me type kiye gye text k according search karne k baad
  // search kiye huye Marketplace k middle section k item ko store karne liye variavle defined kiye hai;
  const searchedMarketplaceBottomPartTotalData = commonFunToReturnSearchedMarketPlaceData(marketplaceBottomPartTotalData,
    searchedMarketplaceInput, searchBasedOnSelection);

  //yhaa search input me type kiye gye text k according search karne k baad
  // agar koi Marketplace me item nhi milta hai to "item not found" dikhane k liye variavle defined kiye hai;
  const dataNotFound = 'This item  with price is not found in Marketplace data.';

  return (
    <div className="marketplace-page-container">
      {/* Top Navbar */}
      <NavBarComp navigateToProfile={onNavigate}
        loggedUserId={loggedUserId}
        totalFbUsers={postData}
      />

      <div className="marketplace-page-content">
        {/* Left Sidebar */}
        <LeftSidebarSubComp
          data={leftSideBarTotalData}
          searchedMarketplaceInput={searchedMarketplaceInput}
          handleChangeInput={handleChangeInput}
          searchBasedOnSelection={searchBasedOnSelection}
          handleSearchBasedOnSelection={handleSearchBasedOnSelection}
        />

        {/* Main Marketplace Content */}
        <div className="marketplace-main-section">
          {/* Marketplace feed from JSON */}
          <MarketPlaceComp
            marketplaceTopPartTotalData={searchedMarketplaceTopPartTotalData}
            marketplaceMiddlePartTotalData={searchedMarketplaceMiddlePartTotalData}
            marketplaceBottomPartTotalData={searchedMarketplaceBottomPartTotalData}
            dataNotFound={dataNotFound}
          />
        </div>
      </div>
    </div>
  );
}
