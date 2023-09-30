import { useParams } from "react-router-dom";
import Home from "./Home";

const OtherUserHome = () => {
  const user = useParams();
  console.log(user);
  return (
    <Home>
      Hi {user.name}
    </Home>
  );
};

export default OtherUserHome;
