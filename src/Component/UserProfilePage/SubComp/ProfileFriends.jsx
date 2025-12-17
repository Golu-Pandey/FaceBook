import React, { useState } from "react";
import FriendCard from "./FriendCard";
import "../Style/ProfileFriends.css";
import { useGlobleFun } from "../../../Hooks/useGlobleFun";

const ProfileFriends = ({ navigateToProfile, data, totalFriends }) => {

  const [seeMore, setSeeMore] = useState(true);
  console.log({ data })
  const { arrayAfterIndex, arrayBeforeIndex } = useGlobleFun(data, 3);

  const isHideShow = () => {
    setSeeMore(!seeMore);
  }

  return (
    <div className="profile-friends">
      <h3 className="Friends_text">Friends</h3>

      <span>{totalFriends} friends</span>

      <div className="friends-list">
        {
          arrayBeforeIndex.map((friend, index) => <FriendCard navigateToProfile={navigateToProfile} key={friend.userId} data={friend} />)
        }
        {
        seeMore ?
          <div  className="seeMoreLessInProfile" onClick={ isHideShow }>
            <i className="fa-solid fa-angles-down seeMoreLessIconInProfile"></i>
            <span className="seeMoreLessOptionInProfile">see more</span>
          </div>
          : <>
            { arrayAfterIndex.map((friend, index) =>
              
            <FriendCard navigateToProfile={navigateToProfile} key={friend.userId} data={friend} />
            ) }
            <div className="seeMoreLessInProfile" onClick={ isHideShow }>
              <i className="fa-solid fa-angles-up seeMoreLessIconInProfile"></i>
              <span className="seeMoreLessOptionInProfile">see less</span>
            </div>
          </>
      }
      </div>
    </div>
  );
};

export default ProfileFriends;

