import { useDispatch } from "react-redux";
import { handleError } from "../Redux/Slices/statusSlice";
import { handleAuthentication } from "../Redux/Slices/profileSclice";

const useErrorHandler = () => {
  const dispatch = useDispatch();

  return (response) => {
    const isAuthenticationResponse = response.isAuthenticated !== undefined;

    if (isAuthenticationResponse) {
      dispatch(
        handleError({
          refreshError: response.error,
          errorMessage: response.status,
        })
      );
      dispatch(handleAuthentication(response.isAuthenticated));
    } else {
      dispatch(
        handleError({
          error: response.error,
          errorMessage: response.status,
        })
      );
    }
  };
};

export default useErrorHandler;
