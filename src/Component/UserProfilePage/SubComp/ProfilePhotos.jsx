import React, { useState } from "react";
import "../Style/ProfilePhotos.css";
import ProfilePhotosCard from "./ProfilePhotosCard";
import { useGlobleFun } from "../../../Hooks/useGlobleFun";

const ProfilePhotos = ({ data }) => {
  const [seeMore, setSeeMore] = useState(true);
  console.log({ data })
  const filteredPhotoPathData = data.filter((singlePhotoPath) => singlePhotoPath.image)
  const { arrayAfterIndex, arrayBeforeIndex } = useGlobleFun(filteredPhotoPathData, 3);

  const isHideShow = () => {
    setSeeMore(!seeMore);
  }

  return (
    <div className="photos">
      <h3 className="photos_text">Photos</h3>
      {arrayBeforeIndex.length==0 && arrayAfterIndex.length == 0 ? <>No photo available.</> : <></>}
      <div className="total_photos">
        {
          arrayBeforeIndex.map((photoPath, index) => {
            return (<>{photoPath.image ? <ProfilePhotosCard key={index} singlePhotoPath={photoPath.image} /> : <></>}</>)
          })
        }
        {
          seeMore && arrayAfterIndex.length != 0 ?
            <div className="seeMoreLessInProfile" onClick={isHideShow}>
              <i className="fa-solid fa-angles-down seeMoreLessIconInProfile"></i>
              <span className="seeMoreLessOptionInProfile">see more</span>
            </div>
            : <>
              {arrayAfterIndex.map((photoPath, index) => {
                return (<>{photoPath.image ? <ProfilePhotosCard key={index} singlePhotoPath={photoPath.image} /> : <></>}</>)
              })}
              {arrayAfterIndex.length != 0 ?
                <div className="seeMoreLessInProfile" onClick={isHideShow}>
                  <i className="fa-solid fa-angles-up seeMoreLessIconInProfile"></i>
                  <span className="seeMoreLessOptionInProfile">see less</span>
                </div> : <></>}
            </>
        }
      </div>
    </div>
  );
};

export default ProfilePhotos;

