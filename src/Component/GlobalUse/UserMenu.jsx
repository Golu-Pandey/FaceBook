import "./UserMenu.css"
import PeopleIcon from '@mui/icons-material/People';
import FeedbackIcon from '@mui/icons-material/Feedback';
const UserMenu = ({ navigateToProfile, loggedUserId, loggedUserDetails}) => {
  
  return (
    <div className="profile-card">
      <div className="profile-header">
        <a className="aTag_Style" href="" onClick={() => navigateToProfile(loggedUserId)}>
        <div className="Top_header" >
          <img src={loggedUserDetails.profilePic} alt="Profile" className="profile_img" />
          <h3 className="profile-name">{loggedUserDetails.profileName}</h3>
        </div>
        </a>

        <div className="All_profile">
          <PeopleIcon />
          <span className="Account_material_name">See all profiles</span>
        </div>
      </div>

      <div className="account_container">
        <div className="menu_material">
          <div className="menu_item">
            <img className="setting_img" src="/Image/Video/LeftSidebar_Video_Post/Setting.jpg" alt="" />
            <span className="Account_material_name">Settings & privacy</span>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div className="menu_material">
          <div className="menu_item">
            <span className="Menu_icon"> <i class="fa-solid fa-circle-question"></i></span>
            <span className="Account_material_name">Help & support</span>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div className="menu_material">
          <div className="menu_item">
            <span className="Menu_icon"><i class="fa-solid fa-moon"></i></span>
            <span className="Account_material_name">Display & accessibility</span>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div className="feedback_material">
          <div className="feedback_icon_container">
            <FeedbackIcon className="feedback_icon" />
          </div>
          <div className="feedback">
            <span className="Account_material_name"> Give feedback</span>
            <span className="shortcut">CTRL B</span>
          </div>
        </div>
        <div className="Logout_item">
          <span className="Menu_icon"><i class="fa-solid fa-right-from-bracket"></i></span>
          <span className="Account_material_name"> Log out</span>
        </div>

      </div>

      <div className="footer-links">
        <a href="">Privacy</a> · <a href="">Terms</a> · <a href="">Advertising</a> · <a href="">Ad choices</a> · <a href="">Cookies</a> · <a href="">More</a>
      </div>
    </div>
  )

}

export default UserMenu;

