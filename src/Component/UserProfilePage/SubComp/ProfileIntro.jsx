import React from "react";
import "../Style/ProfileIntro.css";

const ProfileIntro = ({ data, userId }) => {
  return (
    <div className="profile-intro">
      <h3 className="intro_Style">Intro </h3>
      <div className="userBioEdit">
        <span className="userBioTop">{data.bio}</span>
        {userId==1 ? <span className="EditBioOption"> Edit Bio</span> : <></>}
      </div>

      <div className="IntroRow IntroFirstRow">
        <img className="bioIcon" src="/Image///UserProfilePage//Profile_Intro//Profile_icon.png" alt="ProfileIcon" />
        <span className="bold_Style">Profile · </span>
        <span className="normal_Style">{data.profile}</span>
      </div>
      <div className="IntroRow">
        <img className="bioIcon" src="/Image///UserProfilePage//Profile_Intro//Profession_icon.png" alt="ProfessionIcon" />
        <span className="normal_Style">{data.profession}</span>
      </div>
      <div className="IntroRow">
        <img className="bioIcon" src="/Image//UserProfilePage//Profile_Intro//Greaduated_icon.png" alt="From"></img>
        <span className="normal_Style">Went to </span>
        <span className="bold_Style">{data.graduated}</span>
      </div>
      <div className="IntroRow">
        <img className="bioIcon" src="/Image///UserProfilePage//Profile_Intro//Live_in_icon.png" alt="LiveInIcon" />
        <span className="normal_Style">Live in </span>
        <span className="bold_Style">{data.liveIn}</span>
      </div>
      <div className="IntroRow">
        <img className="bioIcon" src="/Image///UserProfilePage//Profile_Intro//Location_icon.png" alt="FromIcon" />
        <span className="normal_Style">From </span>
        <span className="bold_Style">{data.from}</span>
      </div>
      <div className="IntroRow">
        <img className="bioIcon" src="/Image///UserProfilePage//Profile_Intro//Love_icon.png" alt="FromIcon" />
        <span className="normal_Style">{data.martiaStatus}</span>
      </div>
        {userId==1 ? <span className="EditBioOption"> Edit Details</span> : <></>}
        {userId==1 ? <span className="EditBioOption"> Add Featured</span> : <></>}

    </div>
  );
};

export default ProfileIntro;
