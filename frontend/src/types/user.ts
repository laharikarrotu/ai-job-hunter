export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  location?: string
  role?: 'user' | 'admin'
  createdAt?: Date
  updatedAt?: Date
} 