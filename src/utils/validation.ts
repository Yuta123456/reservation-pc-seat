export const validateStudentId = (studentIds: string[]): boolean => {
  return studentIds.every((id) => {
    const isValidLength = id.length === 16;
    return isValidLength;
  });
};
