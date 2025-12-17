import React from "react";
import "../Style/LeftSidebarComp.css";
import JoinedGroupsProfiles from "./JoinedGroupsProfiles";

export default function LeftSidebarSubComp({ data }) {

  if (!data) return <div>Sidebar data not found</div>;

  return (
    <div className="group-left-page">
      <div className="group-content-left">
        {/* Top Sticky Section */}
        <div className="top-stiicky">
          <div className="groups-setting-icon">
            <h1 className="head-line">
              {data?.["top-stiicky"]?.["groups-setting-icon"]?.["head-line"]}
            </h1>
            <a href="">
              <img
                className="setting-logo-group"
                src={data?.["top-stiicky"]?.["groups-setting-icon"]?.["setting-logo-group"]}
                alt="settings"
              />
            </a>
          </div>

          <div className="search-box-left">
            <a className="search-group" href="">
              {/* replace variable to json value */}
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <input
              className="groups-search"
              type="text"
              placeholder={data?.["top-stiicky"]?.["search-box-left"]?.["placeholder"]}
            />
          </div>
        </div>

        {/* Left Menu */}
        {data?.["left-menu"]?.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];

          return (
            <div className={key} key={index}>
              {value?.["icon-feed"] && (
                <>
                  <a href="">
                    <img className="icon-feed" src={value["icon-feed"]} alt={value["logo-icon-name"]} />
                  </a>
                  <span className="logo-icon-name">{value["logo-icon-name"]}</span>
                </>
              )}

              {value?.["compass-icon"] && (
                <>
                  <a className="compass-icon" href="">
                    <i className={value["compass-icon"]}></i>
                  </a>
                  <span className="logo-icon-name">{value["logo-icon-name"]}</span>
                </>
              )}

              {value?.["pepole-groups"] && (
                <>
                  <a className="pepole-groups" href="">
                    <i className={value["pepole-groups"]}></i>
                  </a>
                  <span className="logo-icon-name">{value["logo-icon-name"]}</span>
                </>
              )}

              {value?.["plus-group"] && (
                <>
                  <a className="plus-group" href="">
                    <i className={value["plus-group"]}></i>
                  </a>
                  <span className="new-group">{value["new-group"]}</span>
                </>
              )}
            </div>
          );
        })}

        {/* Border */}
        {data?.["border"] && <div className="border"></div>}

        {/* Groups Joined */}
        <div className="left-groups-joined">
          <div className="joined-all">
            <span>{data?.["left-groups-joined"]?.["joined-all"]?.["title"]}</span>
            <a className="tap-all" href="">
              {data?.["left-groups-joined"]?.["joined-all"]?.["tap-all"]}
            </a>
          </div>
        </div>

        {/* Joined Groups Profiles */}
        <JoinedGroupsProfiles data={data} />
      </div>
    </div>
  );
}
