"use client";

import { useEffect, useState } from "react";

export const useComments = (id) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem(id));
    if (data?.length) {
      setComments(data);
    }
  }, [id]);

  const updateComments = (id, comment) => {
    if (comment.name && comment.text) {
      const dataToSet = JSON.stringify([...comments, comment]);
      window.localStorage.setItem(id, dataToSet);
      setComments(JSON.parse(dataToSet));
    }
  };

  return { comments, updateComments };
};
