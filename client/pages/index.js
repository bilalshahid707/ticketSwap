import { useEffect } from "react";
import { useSelector } from "react-redux";
export const Home = ({data:currentUser}) => {
  const isLoggedIn = useSelector((state) => state.User.LoggedIn);
  // const currentUser = useSelector((state) => state.User.User);
  return isLoggedIn ? <h1>You are logged in</h1> : <h1>Please log in</h1>;
};


export default Home;
