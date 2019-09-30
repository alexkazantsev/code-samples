export interface BaseService<T> {
  getAll(): Promise<T[]>;

  getById(id: string): Promise<T>;

  create(data: Partial<T>): Promise<T>;

  update(id: string, data: Partial<T>): Promise<T>;

  deleteById(id: string): Promise<void>;
}
