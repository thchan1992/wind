import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { setSeasonings } from "@/lib/features/seasoningList/seasoningListSlice";

const useSeasoningList = () => {
  const dispatch = useDispatch();
  const seasoningList = useSelector(
    (state: RootState) => state.seasoningList.value
  );
  useEffect(() => {
    try {
      const localData = localStorage.getItem("seasoningList");
      if (localData) {
        const seasonings: string[] = JSON.parse(localData);

        if (seasoningList.length === 0) {
          seasonings.forEach((seasoning) => {
            dispatch(setSeasonings(seasoning));
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem("seasoningList", JSON.stringify(seasoningList));
    } catch (e) {
      console.error(e);
    }
  }, [seasoningList]);
  return seasoningList;
};

export default useSeasoningList;
