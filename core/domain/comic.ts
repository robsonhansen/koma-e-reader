export type ComicFormat = 'cbz' | 'cbr' | 'pdf' | 'epub'
export type ReadingStatus = 'unread' | 'reading' | 'read'

export interface Comic {
  id: number
  filePath: string
  title: string
  series?: string
  volume?: string
  issueNumber: number | null
  format: ComicFormat
  pageCount: number
  coverPath: string | null
  status: ReadingStatus
  currentPage: number
  dateAdded: string
  lastReadAt: string | null
}

export type CreateComicData = Omit<Comic, 'id' | 'dateAdded'>
export type UpdateComicData = Partial<Omit<Comic, 'id' | 'filePath' | 'format' | 'dateAdded'>>
