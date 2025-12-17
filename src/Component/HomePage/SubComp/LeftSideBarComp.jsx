
import { NavLink } from "react-router-dom";
import sidebarItems from "../../../ConstDataObject/HomePage/LeftSideBarComp/LeftSidebarComp.json";
// import "./Style/LeftSideBarrComp.css";
import "../Style/LeftSideBarComp.css";
import { useState } from "react";
import LeftSideBarSubComp from "./LeftSideBarSubComp";
import { useGlobleFun } from "../../../Hooks/useGlobleFun";

export default function LeftSideBarComp({ navigateToProfile, loggedUserId,
  totalFbUsers }) {

  const [seeMore, setSeeMore] = useState(true);

  //yha pr mai array k kisi element ka index find kr rha hu;
  const eventsIndex = sidebarItems.findIndex(item => item.name == "Chat with AIs");
  // console.log("index = ", eventsIndex);

  //ye custom hook ek array and ek index ko props ki tarh le rha hai aur mujhe index k basis pe array ko cur kr 2 array return kr rha hai;
  const { arrayBeforeIndex, arrayAfterIndex } = useGlobleFun(sidebarItems, eventsIndex);
  // console.log({ arrayBeforeIndex, arrayAfterIndex })

  //ye see less and see more pe onClick karne pe ye function call kr rha hu;
  const isHideShow = () => {
    setSeeMore(!seeMore)
  }


  const loggedUserDetails = totalFbUsers.filter((singleUser) => singleUser.userId == loggedUserId)?.[0]

  return (
    <div className="left-sidebar">

      {arrayBeforeIndex.map((item, index) =>
        <LeftSideBarSubComp
          navigateToProfile={navigateToProfile} index={index} item={item}
          loggedUserDetails={loggedUserDetails}
          loggedUserId={loggedUserId}
        />
      )
      }
      {seeMore ?
        <a href="" className="sidebar_item_1" onClick={isHideShow}>
          <i className="fa-solid fa-angles-down"></i>
          <span className="sidebar_item_1">see more</span>
        </a>
        :
        <>
          {arrayAfterIndex.map((item, index) =>
            <LeftSideBarSubComp
              navigateToProfile={navigateToProfile} index={index} item={item}
              loggedUserDetails={loggedUserDetails}
              loggedUserId={loggedUserId}
            />
          )
          }
          <a href="" className="sidebar_item_1" onClick={isHideShow}>
            <i className="fa-solid fa-angles-up"></i>
            <span className="sidebar_item_1">see less</span>
          </a>
        </>
      }

    </div>
  );
}



