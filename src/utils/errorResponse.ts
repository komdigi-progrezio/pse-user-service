export const errorResponse = (error: any) => {
  return {
    status: 500,
    message: 'Error : ' + error,
  };
};
