export type InventoryStatus = 'in stock' | 'low stock' | 'ordered' | 'discontinued'

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  category: string
  status: InventoryStatus
  created_at?: string
  updated_at?: string
}