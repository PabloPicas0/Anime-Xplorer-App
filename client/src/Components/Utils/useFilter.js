import { useEffect } from "react";

import url from "./api";

import { useDispatch } from "react-redux";
import { handleClientList } from "../Redux/Slices/profileSclice";

// TODO: Add error handling. //
const useFilter = (props) => {
  const { isInitialState, type, search } = props;
  const { min, max } = props.score;
  const { from, to } = props.date;

  if (isInitialState) return;

  const dispatch = useDispatch();

  const reqeusetFilteredList = async (signal) => {
    try {
      const request = await fetch(`${url}/api/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `type=${type}&search=${search}&min=${min}&max=${max}&fromDate=${from}&toDate=${to}`,
        signal: signal,
      });

      const response = await request.json();

      console.log(response);

      dispatch(handleClientList(response.list));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    reqeusetFilteredList(controller.signal);

    return () => controller.abort();
  }, [props]);
};

export default useFilter;
