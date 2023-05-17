import { useContext } from "react";

import { BookContext } from "../context/book.context";

const useAuth = () => {
  const context = useContext(BookContext);

  if (!context)
    throw new Error("BookContext must be placed within CompanyProvider.");
  return context;
};

export default useAuth;
