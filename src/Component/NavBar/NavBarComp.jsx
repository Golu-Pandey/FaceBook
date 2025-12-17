import "./Style/NavBarComp.css";
import { NavLink } from "react-router-dom";
import navBarData from "../../ConstDataObject/NavBarComp/NavBarComp.json";
import { useGlobalHideMethod } from "../../Hooks/useGlobleFun";
import UserMenu from "../GlobalUse/UserMenu";
import SearchMethod from "../GlobalUse/SearchMethod/SearchMethod";
import { useState } from "react";

export default function NavBarComp({ navigateToProfile, loggedUserId, totalFbUsers }) {

  // containerRef-> ye jsx ya contaoner pe ref ko initialise karne k liye use hoga jis container pe onClick lgaye huye hai,
  // containerRef wale container k bahar kahi bhi click krenge to isShowComp k value ko false kr dega;
  // isShowComp-> use for apply ternory condition to show or hide the component;
  // isShowHideComp-> ek function hai jo onClick pe isShowComp k value ko true ya false karega;
  // containerRef isko use krne ka tarika.... ref={containerRef} ye bs likh dena hai container me jaha onclick lgaye hai.
  const { containerRef, searchContainerRef, isShowComp, isShowSearchComp, isShowHideSearchComp, isShowHideComp } = useGlobalHideMethod();

  //yhaa pr object destructuring method use hua hai;
  const { centerHeader, rightHeader } = navBarData;

  //navbar me logged user k profile pic ko display karne k liye ye use hua hai;
  const loggedUserDetails = totalFbUsers.filter((singleUser) => singleUser.userId == loggedUserId)?.[0]



  //yhaa se fb user ko search karne k liye seach input me type kiye gye text ko 
  // store karne k liye state defined kiye hai; 
  const [searchedUserInput, setSearchedUserInput] = useState('');

    //yhaa se fb user ko search karne k liye seach input me type kiye gye text ko
    //  searchedUserInput me update karne k liye function defined kiye hai; 
  const handleChangeInput = (value) => {
    setSearchedUserInput(value);
  }

  //yhaa search input me type kiye gye text k according search karne k baad
  // search kiye huye fb users ko store karne liye variavle defined kiye hai;
  const searchedFaceBookUsers = totalFbUsers.filter((user) =>
    user.profileName.toLocaleLowerCase().includes(searchedUserInput.toLocaleLowerCase())
  );

//yhaa search input me type kiye gye text k according search karne k baad
  // agar koi fb users nhi milta hai to "user not found" dikhane k liye variavle defined kiye hai;
  const dataNotFound = 'FaceBook user not found'

  return (
    <header>
      <div className="container" >
        <div className="main-header">

          {/* LEFT HEADER */}
          <div className="left-header">
            <a href="">
              <div className="facebook-logo-box">
                <img
                  className="facebook-logo"
                  src="/Image/HomePage/NavBar/Facebook_Logo_img.png"
                  alt="Facebook Logo"
                />
              </div>
            </a>
            <div className="search-box" >
              <a href="" className="search-link">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>

              <div ref={searchContainerRef}>
                <input type="text" placeholder="Search Facebook" onClick={isShowHideSearchComp} />
                {isShowSearchComp ? <div className="Search_card_box" >
                  <SearchMethod
                    dataNotFound={dataNotFound}
                    data={searchedFaceBookUsers}
                    fun={navigateToProfile}
                    isShowHideSearchComp={isShowHideSearchComp}
                    handleChangeInput={handleChangeInput}
                    searchedUserInput={searchedUserInput} />
                </div> : <></>}
              </div>
            </div>
          </div>

          {/* CENTER HEADER */}
          <div className="center-header">
            {centerHeader.map((item, index) => (
              <div className={`navbar-Icon ${item.wrapperClass}`} key={index}>
                <NavLink to={item.to} end={item.end || false}>
                  <i className={item.iconClass}></i>
                </NavLink>
              </div>
            ))}
          </div>

          {/* NavLink ki jagah simple <a> tag q ki NavLink rakhne se condition apply ho rha tha active ka */}
          {/* RIGHT HEADER */}
          <div className="right-header">
            {rightHeader.map((item, index) => (
              <div className={`navbar-Icon ${item.wrapperClass}`} key={index}>
                <span >
                  {item.imgSrc ? (
                    <div ref={containerRef}>
                      <img
                        src={item.wrapperClass == "account-page" && loggedUserDetails != undefined ? loggedUserDetails.profilePic : item.imgSrc}
                        alt="profile" onClick={isShowHideComp} />
                      {isShowComp ? <div className="component_parent">
                        <UserMenu
                          navigateToProfile={navigateToProfile}
                          loggedUserId={loggedUserId}
                          loggedUserDetails={loggedUserDetails}
                        /></div> : <></>}
                    </div>) : (
                    <div className="search_user">
                      <a href={item.to}><i className={item.iconClass}></i> </a>
                    </div>

                  )}

                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
}
