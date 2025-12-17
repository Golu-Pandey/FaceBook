

import React, { useState } from 'react';
import './SearchMethod.css';

const SearchMethod = ({dataNotFound, isShowHideSearchComp, fun, data = [] , handleChangeInput, searchedUserInput}) => {

  return (
    <div className="profile_posts">

      <div className="Icon_Input">
        <div className="Search-Box_arrow" onClick={isShowHideSearchComp}>
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div className="search_box_card" >
          <input type="text" placeholder="Search Facebook" value={searchedUserInput} onChange={(e)=> handleChangeInput(e.target.value)} />
        </div>
      </div>
      <div className="dataList">
        {data.length ?
          <>{data.map((user, index) => (
            <div key={index} className="user_post_container" onClick={() => fun(user.userId)}>
              <img className="user_post" src={user.profilePic} alt="Profile" />
              <span className="user_post_name">{user.profileName}</span>
            </div>
          ))}</>
          :
          <div className="user_not_found">
            <span>{dataNotFound}</span>
          </div>
        }
      </div>
    </div>
  );
};

export default SearchMethod;
