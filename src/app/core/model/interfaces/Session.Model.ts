export interface ISession {
  sessionId: number
  batchId: number
  topicName: string
  topicDescription: string
  youtubeVideoId: string
  durationInMinutes: string
  sessionDate: string
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}
