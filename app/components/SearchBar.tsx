"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../lib/store";
import { keywordOnChange } from "@/lib/features/keyword/keywordSlice";
const SearchBar = () => {
  const keyword = useSelector((state: RootState) => state.keyword.value);
  const dispatch = useDispatch();
  return (
    <div>
      {keyword}
      <input
        type="text"
        onChange={(e) => {
          dispatch(keywordOnChange(e.target.value));
        }}
      />
    </div>
  );
};

export default SearchBar;
