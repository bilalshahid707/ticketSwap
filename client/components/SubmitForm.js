import { useFormStatus } from "react-dom";

export default () => {
  const data = useFormStatus();
  console.log(data.data);
};
