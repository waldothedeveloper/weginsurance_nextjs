import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

import { useRouter } from "next/router";

type Data = {
  status: number;
  message: string;
  error: any;
};

type Inputs = {
  fullname: string;
  phone: string | undefined;
  consent: boolean;
};

export const useUserConsent = () => {
  const router = useRouter();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [userInfo, setUserInfo] = useState<Inputs | null>(null);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    return () => {
      setShouldFetch(false);
      setUserInfo(null);
    };
  }, []);

  const fetcher: Fetcher<Data, string> = async (url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    return response.json();
  };

  //
  const {
    data,
    error: campaignError,
    isLoading,
  } = useSWR(
    shouldFetch ? "/api/notifications/add_user_to_sms_notifications" : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (data?.status === 200) {
        setShouldFetch(false);
        setUserInfo(null);
        reset();
        router.push("/sms-campaign/success");
      }
    }
  }, [data, router, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setUserInfo(data);
    setShouldFetch(true);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    campaignError,
    isLoading,
  };
};
