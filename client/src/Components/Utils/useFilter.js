import { useEffect } from "react";

import url from "./api";

import useErrorHandler from "./useErrorHandler";

import { useDispatch, useSelector } from "react-redux";
import { handleClientList } from "../Redux/Slices/profileSclice";

import { useParams } from "react-router-dom";

const useFilter = (props) => {
  const { isInitialState, type, search } = props;
  const { min, max } = props.score;
  const { from, to } = props.date;

  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const username = useSelector((state) => state.profile.profileFields.username);
  const { name } = useParams();

  const reqeusetFilteredList = async (signal) => {
    try {
      const request = await fetch(`${url}/api/list`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `username=${name || username}&animeType=${type}&animeName=${search}&minScore=${min}&maxScore=${max}&startWatching=${new Date(from).getTime()}&endWatching=${new Date(to).getTime()}`,
        signal: signal,
      });

      const response = await request.json();

      // console.log(response);
      errorHandler(response);

      if (!response.error) {
        dispatch(handleClientList({ data: response.list }));
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
