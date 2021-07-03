import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAth = () => {
    const value = useContext(AuthContext)

    return value
}