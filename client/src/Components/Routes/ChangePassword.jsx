import { useParams } from "react-router-dom";

const ChangePassowrd = () => {
  const { userId } = useParams();

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h1>User id is {userId}</h1>
    </div>
  );
};

export default ChangePassowrd;
