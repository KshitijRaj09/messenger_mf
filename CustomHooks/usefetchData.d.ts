import React from 'react';
type apiMethodType = (value: string) => Promise<any>;
export declare const useFetchData: <Type>(apiMethod: apiMethodType, value: string, initialState: Type) => {
    data: Type;
    isLoading: boolean;
    isError: boolean;
    setData: React.Dispatch<React.SetStateAction<Type>>;
};
export {};
