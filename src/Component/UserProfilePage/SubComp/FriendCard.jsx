import React from "react";
import "../Style/FriendCard.css";

const FriendCard = ({navigateToProfile, data }) => {
  return (
    <a href="" onClick={()=>navigateToProfile(data.userId)} className="aTag_Style">
    <div className="friend-card">
      <img className="singleProfilefrendPhotos-card" src={data.userProfile} alt={data.userName} />
      <span className="friendNameInProfile">{data.userName}</span>
    </div>
    </a>
  );
};

export default FriendCard;

