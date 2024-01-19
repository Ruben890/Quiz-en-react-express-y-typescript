import { useState, useEffect } from "react";
import { getOptionsByQuestionId } from "../api/options";
import { Option } from "../interface/interfaces";
import { AxiosError } from "axios";

const useFetchOption = (id: number | undefined) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getOptionsByQuestionId(id);
        setOptions(response);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setMessage(error.response?.data || "Error fatal");
        } else {
          setMessage("Error al obtener datos");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { options, loading, message };
};

export default useFetchOption;
