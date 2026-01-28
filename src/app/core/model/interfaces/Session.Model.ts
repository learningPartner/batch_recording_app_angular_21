export interface ISession {
  sessionId: number
  batchId: string
  topicName: string
  topicDescription: string
  youtubeVideoId: string
  durationInMinutes: string
  sessionDate: string
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface ISessionRecording {
  sessionId: number
  durationInMinutes: number
  displayOrder: number
  topicName: string
  sessionDate: string
  batchName: string
  youtubeVideoId: string
}

