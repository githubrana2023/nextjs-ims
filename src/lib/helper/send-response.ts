
export const _log = (...params: unknown[]) => {
    console.log(...params);
  };
  
  export const sendResponse = <TData,>(
    succes: boolean,
    data: TData,
    message: string,
    error?: unknown,
  ) => ({
    succes,
    data,
    message,
    error,
  });
  