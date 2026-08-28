export interface Shelf {
  id: number
  name: string
  position: number
}

export interface ShelfItem {
  shelfId: number
  comicId: number
  position: number
}

export type CreateShelfInput = Omit<Shelf, 'id'>
