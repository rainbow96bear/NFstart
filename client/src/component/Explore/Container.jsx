import axios from "axios";
import { useState } from "react";

import ExploreComp from "./Component";

const ExploreCont = () => {
  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { searchResult } = (
      await axios.get(`/api/nft/explore?keyword=${keyword}`)
    ).data;
    setSearchData(searchResult);
    console.log(searchResult);
  };
  return (
    <ExploreComp
      setKeyword={setKeyword}
      handleSubmit={handleSubmit}
      searchData={searchData}></ExploreComp>
  );
};

export default ExploreCont;
