import React, { useState } from "react";
import sidebarData from "../../../ConstDataObject/VideoPage/LeftSidebarComp/LeftSidebarComp.json";
import "../Style/LeftSidebarComp.css";
import { useGlobleFun } from "../../../Hooks/useGlobleFun";

const LeftSidebarComp = () => {

  //yhaa object destructuring kiye hai;
  const { navbarIcon, homePhotos } = sidebarData;
  // yaha pr sidebarItem ko Array ki value ki tarah pass kr rhe hai or eventIndex ko index ki value ki tarah pass kr rhe hai 
  const { arrayBeforeIndex, arrayAfterIndex } = useGlobleFun(homePhotos, 2);

  //ye state defined isliye kiye hai , qki seeMore k basis pe data ko pura display kr rhe hai ya kuchh hi data display kr rhe hai
  const [seeMore, setSeeMore] = useState(true);
  //ye function defined kiye hai taki SeeMore ya SeeLess pe onClick kr seeMore k value ko update kr rhe hai
  const isHideShow = () => {
    setSeeMore(!seeMore);
  }

  return (
    <div className="left-video-page">
      <div className="content-icon">
        <div className="navbar-icon">
          <div className="video-setting">
            <span className="video-tittle">{navbarIcon.videoSetting.title}</span>
            <a href={navbarIcon.videoSetting.settingLink}>
              <img
                className="setting"
                src={navbarIcon.videoSetting.settingIcon}
                alt="Setting"
              />
            </a>
          </div>

          <div className="search-box-1">
            <a className="search-link-1" href={navbarIcon.searchBox.searchLink}>
              <i className={navbarIcon.searchBox.searchIconClass}></i>
            </a>
            <input
              className={navbarIcon.searchBox.inputClass}
              type="text"
              placeholder={navbarIcon.searchBox.inputPlaceholder}
            />
          </div>
        </div>

        {arrayBeforeIndex.map((item, index) => (
          <div className="home-photo" key={index}>
            <a className="image_control" href={item.link}>
              {item.iconType === "image" ? (
                <img className={item.className} src={item.iconSrc} alt={item.title} />
              ) : (
                <i className={item.className + " " + item.iconClass}></i>
              )}
            </a>
            <span className="home-tittle">{item.title}</span>
          </div>
        ))}

        {
          seeMore ?
            <a href="#" className="sidebar_item_2" onClick={() => isHideShow()}>
              <i className="fa-solid fa-angles-down"></i>
              <span className="sidebar_item_2">see more</span>
            </a>

            : <>

              {arrayAfterIndex.map((item, index) => (
                <div className="home-photo" key={index}>
                  <a className="image_control" href={item.link}>
                    {item.iconType === "image" ? (
                      <img className={item.className} src={item.iconSrc} alt={item.title} />
                    ) : (
                      <i className={item.className + " " + item.iconClass}></i>
                    )}
                  </a>
                  <span className="home-tittle">{item.title}</span>
                </div>
              ))}
              <a href="#" className="sidebar_item_2" onClick={() => isHideShow()}>
                <i className="fa-solid fa-angles-up"></i>
                <span className="sidebar_item_2">see less</span>
              </a>
            </>
        }

      </div>
    </div>
  );
};

export default LeftSidebarComp;
