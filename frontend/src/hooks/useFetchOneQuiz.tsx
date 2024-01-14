import { useState, useEffect } from "react";
import { getOneQuiz } from "../api/quiz";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";


const useFetchOneQuiz = (id: number) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneQuiz(id);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setMessage(error.response?.data || "fatal error");
        } else {
          setMessage("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]);

  // Return any state or functions that you want to expose
  return { message, loading };
};

export default useFetchOneQuiz;
