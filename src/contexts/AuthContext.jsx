import { useState, createContext, useEffect } from "react";

//1) הגדרת טיפוסים למצב התחלתי
const initialState = {
  isLoggedIn: false,
  login: (username, token) => {},
  logout: () => {},
};

//2) create the context:
const AuthContext = createContext(initialState);

//3)  create the wrapper:
const AuthContextProvider = (props) => {
  //קוד שרץ כשהאפליקציה עולה ובכל פעם שאיבר במערך משתנה
  //בגלל שהמערך ריק - הקוד ירוץ כשהאפליקציה עולה פעם אחד בלבד
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const {username, token} = JSON.parse(userData);

      login(username, token);
    }
  }, []);
  //state:
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(undefined);
  const [username, setUsername] = useState(undefined);

  //actions/methods:
  //called after successful login:
  const login = (username, token) => {
    setUsername(username);
    setToken(token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
    setUsername(undefined);
  };

  return (
    <>
      <AuthContext.Provider
        //   value = {all props, all methods}
        value={{ isLoggedIn, token, username, login, logout }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContextProvider, AuthContext };
//provider is only used in index!
//context is used elseware
export default AuthContext;
