
export interface DuelRoom {
  id: number;
  roomName: string;
  type: string;
  playersJoined: number;
  maxPlayers: number;
  roomCreatedBy: string;
  duelDateCreated: string;
  status: string;
}