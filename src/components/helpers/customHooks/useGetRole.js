import { useEffect, useState } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import db from "../../../firebase";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../redux/common/auth/selectors";

export function useGetRole() {
  const [role, setRole] = useState({});
  const loggedUser = useSelector(selectLoggedInUser);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setRole(
        snapshot?.docs
          .map((doc) => doc.data())
          .find(
            (user) => user?.email === loggedUser?.email && loggedUser?.isAdmin
          )
      );
    });
    return () => {
      setRole({});
    };
  }, [loggedUser]);
  return role?.isAdmin;
}
