export interface Library {
  id: number
  folderPath: string
  name: string
  dateAdded: string
}

export type CreateLibraryInput = Omit<Library, 'id' | 'dateAdded'>
