"use client";

import { useState, useEffect } from "react";
import Preloader from "./PreLoader"; // Adjust the import path as necessary

const ClientWrapper = ({ children }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <Preloader /> : children}</>;
};

export default ClientWrapper;
