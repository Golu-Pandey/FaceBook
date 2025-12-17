
import React, { useRef } from "react";
import storiesData from "../../../ConstDataObject/HomePage/StoryComp/StoryComp.json";
import "../Style/StoryComp.css";


const StoryComp = ({loggedUserId, totalFbUsers}) => {
  const scrollRef = useRef(null);

  // Left scroll
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -180, behavior:"smooth" });
  };

  // Right scroll
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 180, behavior: "smooth" });
  };



    const loggedUserDetails = totalFbUsers.filter((singleUser) => singleUser.userId == loggedUserId)?.[0]


  return (
    <div className="story-container" >
      {/* Left Arrow */}
      <button className="scroll-btn left" onClick={scrollLeft}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Stories Scroll Area */}
      <div className="box-shadow1" ref={scrollRef}>
        {storiesData.map((story, index) => {
          if (story.type == "create" && loggedUserDetails != undefined) {
            return (
              <div className="create-story" key={index}>
                <img src={loggedUserDetails.profilePic} alt="Create Story" />
                <div className="create-story-inner">
                  <a className="plus-icon" href="#">
                    <i className={story.icon}></i>
                  </a>
                  <p className="creat">{story.userName}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="create-story-1" key={index}>
                <img src={story.bgImage} alt={story.userName} />
                <div>
                  <a className="plus-icon" href="#">
                    <img
                      className="profile-logo-story"
                      src={story.profileLogo}
                      alt={`${story.userName} Logo`}
                    />
                  </a>
                  <p className="creat-1">{story.userName}</p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Right Arrow */}
      <button className="scroll-btn right" onClick={scrollRight}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default StoryComp;
