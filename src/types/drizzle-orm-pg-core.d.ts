declare module 'drizzle-orm/pg-core' {
  interface ColumnBuilder {
    $type<T>(): ColumnBuilder;
    default(value: any): ColumnBuilder;
    defaultNow(): ColumnBuilder;
    defaultRandom(): ColumnBuilder;
    notNull(): ColumnBuilder;
    primaryKey(): ColumnBuilder;
    references(ref: any, actions?: any): ColumnBuilder;
    unique(name?: string, config?: any): ColumnBuilder;
  }

  export function pgTable(
    name: string,
    columns: Record<string, ColumnBuilder>,
    extraConfig?: any,
  ): any;

  export function text(name: string, config?: any): ColumnBuilder;
  export function integer(name: string, config?: any): ColumnBuilder;
  export function boolean(name: string, config?: any): ColumnBuilder;
  export function timestamp(name: string, config?: any): ColumnBuilder;
  export function json(name: string, config?: any): ColumnBuilder;
  export function decimal(name: string, config?: any): ColumnBuilder;
  export function date(name: string, config?: any): ColumnBuilder;
  export function time(name: string, config?: any): ColumnBuilder;
  export function uuid(name: string, config?: any): ColumnBuilder;
}
