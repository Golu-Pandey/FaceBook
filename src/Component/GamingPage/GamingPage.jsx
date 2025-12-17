import NavBarComp from "../NavBar/NavBarComp";
import { useGlobalProfilePageNavigator } from "../../Hooks/useGlobleFun";
import postData from "../../ConstDataObject/HomePage/PostComp/PostComp.json"

export default function GamingPage() {

  const { loggedUserId, onNavigate } = useGlobalProfilePageNavigator();

  return (
    <>
      <NavBarComp navigateToProfile={onNavigate}
        loggedUserId={loggedUserId}
        totalFbUsers={postData}
      />
      <h1>Gaming Page</h1>
    </>
  );
}
