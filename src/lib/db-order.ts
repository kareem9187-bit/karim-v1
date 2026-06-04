import { sql, type SQLWrapper } from 'drizzle-orm/sql';

export function asc<T extends SQLWrapper>(column: T): T {
  return column;
}

export function desc(column: SQLWrapper) {
  return sql`${column} desc`;
}

