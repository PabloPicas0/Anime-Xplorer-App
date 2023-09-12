import { useMemo, useState } from "react";

const useSorting = (list) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedGroupList = useMemo(() => {
    const sortMethods = {
      ascending: (a, b) => {
        const nameA = a.animeName.toUpperCase();
        const nameB = b.animeName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      descending: (a, b) => {
        const nameA = a.animeName.toUpperCase();
        const nameB = b.animeName.toUpperCase();

        return nameA > nameB ? -1 : 1;
      },
    };

    const groupList = list.reduce(
      (acc, currentList) => {
        const currentStatus = currentList.animeStatus
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, "");

        acc[`${currentStatus}`].push(currentList);

        return acc;
      },
      {
        "currentlyWatching": [],
        "planToWatch": [],
        "completed": [],
      }
    );

    const ascending = {};
    const descending = {};
    const keys = Object.keys(groupList);

    for (const key of keys) {
      ascending[key] = groupList[key].toSorted(sortMethods.ascending);
      descending[key] = groupList[key].toSorted(sortMethods.descending);
    }

    const order = {
      asc: ascending,
      desc: descending,
      default: groupList,
    };

    return order;
  }, [list]);

  console.log(sortedGroupList);

  return {
    groupList: sortedGroupList[sortOrder],
    setSortOrder
  };
};

export default useSorting;
