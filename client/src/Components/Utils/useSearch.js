import { useEffect, useState } from "react";
import useErrorHandler from "./useErrorHandler";

import url from "./api";
import { useSelector } from "react-redux";

const useSearch = (userName) => {
  const username = useSelector((state) => state.profile.profileFields.username);
  const isUserAccount = userName === username;

  const [users, setUsers] = useState(null);

  const errorHandler = useErrorHandler();

  const requestUser = async (signal) => {
    try {
      const request = await fetch(`${url}/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `user=${userName}`,
        signal: signal,
      });

      const response = await request.json();

      errorHandler(response);

      if (!response.error) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userName === "" || isUserAccount) {
      setUsers(null);
      return;
    }

    const controller = new AbortController();
    requestUser(controller.signal);

    return () => controller.abort();
  }, [userName]);

  return users;
};

export default useSearch;
