import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/auth";

const usePrivate = (isLogin) => {
  const auth = useAuth();
  const history = useHistory();
  const { user } = auth;
  useEffect(() => {
    if (isLogin && user) history.replace("/admin");
    if (!isLogin && !user) history.replace("/login");
  }, [user, history, isLogin]);
  return auth;
};
export default usePrivate;
