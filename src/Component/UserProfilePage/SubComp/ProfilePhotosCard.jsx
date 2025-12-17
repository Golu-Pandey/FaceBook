import React from "react";
import "../Style/ProfilePhotosCard.css"

const ProfilePhotosCard = ({ singlePhotoPath }) => {
    // console.log({singlePhotoPath})
    
  return (
    <div className="ProfilePhotos-card">
      <img className="singleProfilePhotos-card" src={singlePhotoPath} alt="singlePhotoPath" />
    </div>
  );
};

export default ProfilePhotosCard;

