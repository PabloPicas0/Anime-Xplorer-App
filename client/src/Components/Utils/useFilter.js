import { useEffect } from "react";

import url from "./api";

import useErrorHandler from "./useErrorHandler";

import { useDispatch } from "react-redux";
import { handleClientList } from "../Redux/Slices/profileSclice";

const useFilter = (props) => {
  const { isInitialState, type, search } = props;
  const { min, max } = props.score;
  const { from, to } = props.date;

  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const reqeusetFilteredList = async (signal) => {
    try {
      const request = await fetch(`${url}/api/list`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `animeType=${type}&animeName=${search}&minScore=${min}&maxScore=${max}&startWatching=${new Date(from).getTime()}&endWatching=${new Date(to).getTime()}`,
        signal: signal,
      });

      const response = await request.json();

      console.log(response);
      errorHandler(response);

      if (!response.error) {
        dispatch(handleClientList(response.list));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    if (!isInitialState) reqeusetFilteredList(controller.signal);

    return () => controller.abort();
  }, [props]);
};

export default useFilter;
