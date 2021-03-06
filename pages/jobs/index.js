import { useEffect } from "react";
import { useRouter } from "next/router";

const JobsIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);
};

export default JobsIndex;
