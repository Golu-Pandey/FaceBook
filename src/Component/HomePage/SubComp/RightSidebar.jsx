import React from "react";
import rightSidedata from "../../../ConstDataObject/HomePage/RightSidebarComp/RightSidebar.json";
import "../Style/RightSidebar.css";

const RightSidebarComp = ({ navigateToMessangerProfile }) => {
  return (
    <div className="main-page-right">
      <div className="main-page-right-inner">

        {/* Sponsored Section */}
        <div className="first-heading">
          <span className="text-2">Sponsored</span>
        </div>
        {rightSidedata.sponsored.map((item, index) => (
          <div key={index} className={`sponsored-img-text sponsored-img-text${index + 1}`}>
            <div className="sponsored-img">
              <a href=""><img className="sponsored-img-right" src={item.image} alt="ai-product" /></a>
            </div>
            <div className="right-text-sponsored">
              <div className="text"><span>{item.title}</span></div>
              <div className="text1"><span>{item.website}</span></div>
            </div>
          </div>
        ))}

        {/* Friend Requests */}
        <div className="headline-frend-req">
          <span className="text-2">Friend requests</span>
        </div>
        {rightSidedata.friendRequests.map((req, idx) => (
          <div key={idx} className="profile-request">
            <div className="profile-logo-img">
              <img className="profile-logo-photo" src={req.profileImage} alt="profile-logo" />
            </div>
            <div className="profile-info">
              <span className="profile-name">{req.name}</span>
              <div className="mutual-friends">
                {req.mutualFriends.map((img, i) => (
                  <img key={i} className="mutual" src={img} alt="mutual-friend" />
                ))}
                <span className="mutual-text">{req.mutualCount} mutual friends</span>
              </div>
              <div className="action-buttons">
                <a href=""><button className="confirm-btn">{req.actions.confirm}</button></a>
                <a href=""><button className="delete-btn">{req.actions.delete}</button></a>
              </div>
            </div>
          </div>
        ))}

        {/* Birthdays */}
        <div className="birthddays-box">
          <span className="text-2">Birthdays</span>
          {rightSidedata.birthdays.map((bday, i) => (
            <div key={i} className="birthdays-img-text">
              <a href=""><img src={bday.image} alt="" /></a>
              <span>
                <b>{bday.names[0]}</b> and <b>{bday.names[1]}</b> have their birthdays today.
              </span>
            </div>
          ))}
        </div>

        {/* Contacts */}
        <div className="right-element">
          <div className="contacts">
            <span className="text-2">{rightSidedata.contacts.header}</span>
            <div className="icon-search-menu">
              <a className="search-link" href="#"><i className={rightSidedata.contacts.icons.search}></i></a>
              <a className="menu-3" href=""><i className={rightSidedata.contacts.icons.menu}></i></a>
            </div>
          </div>

          {/* Meta AI */}
          <div className="meta-ai-element">
            <div className="meta-img">
              <a href=""><img className="Meta-Ai" src={rightSidedata.contacts.metaAI.image} alt="AI-logo" /></a>
            </div>
            <div className="content-ai">
              <span className="Ai">{rightSidedata.contacts.metaAI.name}</span>
              <a className="verified-tick-icon" href="#"><img src={rightSidedata.contacts.metaAI.verified} alt="" /></a>
            </div>
          </div>

          {/* Active People */}
          <div className="left-pepole">
            {rightSidedata.contacts.activePeople.map((person, idx) => (
              <div onClick={()=> navigateToMessangerProfile(person.userId)}>
                <div key={idx} className="left-active">
                  <a href="" className={person.storyActive ? "story-active" : ""} >
                    <img className="active-photo" src={person.image} alt="active-img" />
                  </a>
                  <span className="active-name">{person.name}</span>
                </div>
                {person.statusActive ? <a className="Active_Symbol" href=""><i className="fa-solid fa-dot"></i></a> : <></>}
              </div>
            ))}
          </div>

          {/* Group Chats */}
          <div className="hading-name">
            <span className="text-2">Group chats</span>
          </div>
          <div className="left-groups">
            {rightSidedata.groupChats.map((group, idx) => (
              <div key={idx} className="group-chats">
                <div className={group.images.length > 1 ? "group-chat-inner" : ""}>
                  {group.images.map((img, i) => (
                    <a key={i} href=""><img className={`group-photo ${i === 1 ? "uppre-img" : ""}`} src={img} alt="groups-img" /></a>
                  ))}
                </div>
                <div className="groups-name">
                  <span>{group.names}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightSidebarComp;
