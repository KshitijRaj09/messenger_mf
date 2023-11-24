import React, { useEffect, useState } from 'react';

type apiMethodType = (value: string) => Promise<any>;

export const useFetchData = <Type,>(apiMethod: apiMethodType, value: string, initialState: Type) => {

   const [data, setData] = useState<Type>(initialState);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isError, setIsError] = useState<boolean>(false);

   const apiMethodHandler = async () => {
      const response = await apiMethod(value);
      if (response) {
         setData(response);
      }
      else {
         setIsError(true);
      }
      setIsLoading(false);
   }
   useEffect(() => {
      if (!value)
         return;
      setIsLoading(true);
      apiMethodHandler();
   }, [value]);

   return { data, isLoading, isError, setData };
}