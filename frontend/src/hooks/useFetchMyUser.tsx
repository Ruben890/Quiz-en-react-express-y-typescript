import { getMyUser } from "../api/auth";
import { useState, useEffect } from "react";
import { setAuthUser, setMyUser } from "../redux/authUser.redux";
import { useDispatch } from "react-redux";

const useFetchMyUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyUser();
        dispatch(setMyUser(response.user));
        dispatch(setAuthUser(response.isLogin));
      } catch (error) {
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
        setInitialLoadComplete(true);
      }
    };

    fetchData();
  }, [dispatch]); 

  return { loading, error, initialLoadComplete };
};

export default useFetchMyUser;
