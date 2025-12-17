// import React, { useState } from "react";
// import "../Style/ProfileMenu.css";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// const ProfileMenu = () => {
//   const tabs = ["Posts", "About", "Reels", "Photos", "Groups", "Events", "More"];
//   const [activeTab, setActiveTab] = useState("Posts");

//   return (
//     <div className="space_conatiner">
//     <div className="profile-menu">
//       {/* Tabs group (left) */}
//       <div className="tabs-container">
//         {tabs.map((tab) => (
//           <div
//             key={tab}
//             className={`tab ${activeTab === tab ? "active_tab" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//                {/* Only for "More" tab */}
//     {tab == "More" ? (
//       <div className="more-tab">
//         {tab}
//         <ArrowDropDownIcon fontSize="small" />
//       </div>
//     ) : (
//       tab
//     )}
//   </div>
//         ))}
//       </div>

      
//       <div className="menu_font">
//         <i className="fa-solid fa-ellipsis"></i>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ProfileMenu;



import React, { useState } from "react";
import "../Style/ProfileMenu.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ProfileMenu = () => {
  const tabs = ["Posts", "About", "Reels", "Photos", "Groups", "Events", "More"];
  const [activeTab, setActiveTab] = useState("Posts");

  const handleClick = (tab) => {
    if (tab === "Posts") {
      setActiveTab("Posts"); // sirf Posts active hoga
     }  // else {
    //   setActiveTab(""); // dusra click hone pe Posts ka active hat jayega
    // }
  };

  return (
    <div className="space_conatiner">
      <div className="profile-menu">
        {/* Tabs group (left) */}
        <div className="tabs-container">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active_tab" : ""}`}
              onClick={() => handleClick(tab)}
            >
              {/* Only for "More" tab */}
              {tab === "More" ? (
                <div className="more-tab">
                  {tab}
                  <ArrowDropDownIcon fontSize="small" />
                </div>
              ) : (
                tab
              )}
            </div>
          ))}
        </div>

        <div className="menu_font">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
