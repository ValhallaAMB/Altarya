export const getRoomId = (userID: string, myID: string) => {
  const sortIds = [userID, myID].sort();
  const roomId = sortIds.join("-");
  return roomId;
};
