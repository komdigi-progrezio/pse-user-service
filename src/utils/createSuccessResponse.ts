export const createSuccessResponse = (id: number = 0) => {
  return {
    status: 200,
    message: 'Data Berhasil di Tambahkan',
    id: id,
  };
};
