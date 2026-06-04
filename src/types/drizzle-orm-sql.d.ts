declare module 'drizzle-orm/sql' {
  export interface SQLWrapper {
    getSQL(): SQL;
    shouldOmitSQLParens?(): boolean;
  }

  export class SQL<T = unknown> implements SQLWrapper {
    readonly _: {
      brand: 'SQL';
      type: T;
    };

    getSQL(): SQL;
    as(alias: string): SQL.Aliased<T>;
  }

  export namespace SQL {
    class Aliased<T = unknown> implements SQLWrapper {
      readonly sql: SQL;
      readonly fieldAlias: string;
      getSQL(): SQL;
    }
  }

  export function sql<T = unknown>(
    strings: TemplateStringsArray,
    ...params: any[]
  ): SQL<T>;
}
