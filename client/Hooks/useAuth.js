import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAuth = ({ endpoint,url }) => {

  const mutation = useMutation({
    mutationFn: async (body) => {
      const response = await axios.post(
        `/api/v1/users/${endpoint}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  return  mutation ;
};

export default useAuth;