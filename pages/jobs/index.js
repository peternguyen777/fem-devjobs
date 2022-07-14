import { useEffect } from "react";
import { useRouter } from "next/router";

const jobsIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
};

export default jobsIndex;
