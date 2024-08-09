"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FilterClient = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    const params = new URLSearchParams(window.location.search);
    params.set("search", newSearch);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <input
      placeholder="Search"
      value={search}
      onChange={handleChange}
      className="bg-[#F5F6F8] rounded-[8px] relative w-full p-[8px] placeholder:text-[#83899F] placeholder:leading-[20px] outline-accentColor pl-[40px]"
      type="text"
    />
  );
};

export default FilterClient;
