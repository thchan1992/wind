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
    const localData = localStorage.getItem("seasoningList");
    if (localData) {
      const seasonings: string[] = JSON.parse(localData);
      seasonings.forEach((seasoning) => {
        dispatch(setSeasonings(seasoning));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("seasoningList", JSON.stringify(seasoningList));
  }, [seasoningList]);
  return seasoningList;
};

export default useSeasoningList;
