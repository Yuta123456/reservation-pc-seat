export const validateStudentId = (studentIds: string[]): boolean => {
  return studentIds.every((id) => {
    const isValidLength = id.length === 12;
    return isValidLength;
  });
};
