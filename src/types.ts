export type Fields<T, keys extends keyof T> = {
  [key in keys]: T[key]
}

export type Query<T> = {
  [key in keyof T]?: T[key]
}

export type Projection<T> = {
  [key in keyof T]?: boolean
}
