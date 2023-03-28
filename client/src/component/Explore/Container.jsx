import axios from "axios";
import { useEffect, useState } from "react";

import ExploreComp from "./Component";

const ExploreCont = () => {
  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const searchFunc = async () => {
    const { searchResult } = (await axios.post(`/api/nft/explore`, { keyword }))
      .data;
    setSearchData(searchResult);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    searchFunc();
  };
  useEffect(() => {
    searchFunc();
  }, []);
  return (
    <ExploreComp
      setKeyword={setKeyword}
      handleSubmit={handleSubmit}
      searchData={searchData}
    ></ExploreComp>
  );
};

export default ExploreCont;
