import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//ye Array me See More / See Less functionality k liye custom hook implement kiye hai;
export const useGlobleFun = (originalArray = [], index) => {

  // Array.slice(n, m)-> yha "n", "m" array k index ko dikha rha hu aur iska mtlb hai ki Array ko alag ya split kr rha hu from index "n" se "m-1"
  const arrayBeforeIndex = originalArray.slice(0, index + 1);
  // console.log("beforeEvents =", arrayBeforeIndex)

  // jb sirf ek index ki value slice me rakha hu example-> Array.slice(n) to iska mtlb hai ki Array ko alag ya split kr rha hu from index "n-1" se  le kr last index tak;
  const arrayAfterIndex = originalArray.slice(index + 1);
  // console.log("afterEvents = ", arrayAfterIndex);

  return { arrayBeforeIndex, arrayAfterIndex }
};





//ye string me See More / See Less functionality k liye custom hook implement kiye hai;
export const useGlobalSeeMoreSeeLessString = (originalString = "", index) => {

// String.slice(n, m)-> yha "n", "m" string k index ko dikha rha hu aur iska mtlb hai ki string ko alag ya split kr rha hu from index "n" se "m-1"
  const stringBeforeIndex = originalString.slice(0, index + 1);
  // console.log("stringBeforeIndex =", stringBeforeIndex)

  // jb sirf ek index ki value slice me rakha hu example-> String.slice(n) to iska mtlb hai ki String ko alag ya split kr rha hu from index "n-1" se  le kr last index tak;
  const stringAfterIndex = originalString.slice(index + 1);
  // console.log("stringAfterIndex = ", stringAfterIndex);

   return { stringBeforeIndex, stringAfterIndex };
};








export const useGlobalHideMethod = () => {
  const containerRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isShowComp, setIsShowComp] = useState(false);
  const [isShowSearchComp, setIsSearchShowComp] = useState(false);

  const hideSearchComp = () => {
    setIsSearchShowComp(false);
  }

  const isShowHideSearchComp = () => {
    setIsSearchShowComp(!isShowSearchComp);
  }

  const isShowHideComp = () => {
    setIsShowComp(!isShowComp);
    // ! sirf boolean dataType me use hoga;
    // ! agr kisi bhi variable k aage lga hai to iska mtlb hai ki us variable ki value ko just opposite kr deta hai
    // example.... true ho to false kr dega ya false hoga to true kr dega.


    // if(isShowComp==true){
    //   setIsShowComp(false);
    // }
    // else{
    //   setIsShowComp(true);
    // }

    // user wala if else same kaam krega jaise niche hm !(NOT) ka use kr k isShowComp ki value set kr rhe hai. 


    // dusra example short cut ka ;
    // if(isShowComp==5){
    //   setIsShowComp(5+1);
    // }
    // else if(isShowComp==6){
    //   setIsShowComp(6+1);
    // }
    // else if(isShowComp==7){
    //   setIsShowComp(7+1);
    // }
    // else if(isShowComp==8){
    //   setIsShowComp(9+1);
    // }
    // ...
    // ..
    // ..

    // user wala if else same kaam krega jaise niche hm  +1 ka use kr k isShowComp ki value set kr rhe hai. 
    // setIsShowComp(isShowComp+1);

    //  number k liye -1 ka use kr k shortcut likh sakte hai;
  }




  // Detect clicks outside the image
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsShowComp(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchShowComp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return { isShowSearchComp, isShowHideSearchComp, isShowComp, isShowHideComp, containerRef, searchContainerRef, hideSearchComp }
}






export const useGlobalProfilePageNavigator = () => {
  const loggedUserId = 2;
  const navigate = useNavigate();

  // write the code of navigation to navigate to /user-profile and pass props userId and use the userId in state 
  const onNavigate = (userId) => {
    // console.log({userId}, "onNavigate");
    if (userId > 0) {
      navigate("/user-profile", { state: { userId } });
    }
  };

  // write the code of navigation to navigate to /userMessanger-profile and pass props userId and use the userId in state 
  const onNavigateToMessangerProfile = (userId) => {
    // console.log({userId}, "onNavigateToMessangerProfile");
    if (userId > 0) {
      navigate("/messenger", { state: { userId } });
    }
  }

  return { loggedUserId, onNavigate, onNavigateToMessangerProfile };
}
