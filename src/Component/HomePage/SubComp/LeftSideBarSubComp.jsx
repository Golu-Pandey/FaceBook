


import { NavLink, useNavigate } from "react-router-dom";
import "../Style/LeftSideBarComp.css";

export default function LeftSideBarSubComp({ navigateToProfile, index, item, loggedUserDetails,
  loggedUserId }) {

  return (<>
    {item.path ? (
      <NavLink
        key={index}
        to={item.path}
        className="sidebar-item"
      >
        <img src={item.icon} alt={item.name} className="sidebar-icon" />
        <span>{item.name}</span>
      </NavLink>
    ) :
      <>{item.userId == 1 ?
        <div
          key={index}
          className="sidebar-item"
          onClick={() => navigateToProfile(loggedUserId)}
        >
          <img src={loggedUserDetails.profilePic} alt={loggedUserDetails.profileName} className="sidebar-icon" />
          <span>{loggedUserDetails.profileName}</span>
        </div>
        :
        <div
          key={index}
          className="sidebar-item"
          onClick={() => navigateToProfile(item.userId)}
        >
          <img src={item.icon} alt={item.name} className="sidebar-icon" />
          <span>{item.name}</span>
        </div>
    }</>
    }
  </>);
}

