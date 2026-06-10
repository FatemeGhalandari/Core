
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model CaseCategory
 * 
 */
export type CaseCategory = $Result.DefaultSelection<Prisma.$CaseCategoryPayload>
/**
 * Model WorkflowStatus
 * 
 */
export type WorkflowStatus = $Result.DefaultSelection<Prisma.$WorkflowStatusPayload>
/**
 * Model Case
 * 
 */
export type Case = $Result.DefaultSelection<Prisma.$CasePayload>
/**
 * Model CaseComment
 * 
 */
export type CaseComment = $Result.DefaultSelection<Prisma.$CaseCommentPayload>
/**
 * Model CaseAttachment
 * 
 */
export type CaseAttachment = $Result.DefaultSelection<Prisma.$CaseAttachmentPayload>
/**
 * Model CaseActivityEvent
 * 
 */
export type CaseActivityEvent = $Result.DefaultSelection<Prisma.$CaseActivityEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  owner: 'owner',
  admin: 'admin',
  staff: 'staff'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Priority: {
  low: 'low',
  normal: 'normal',
  high: 'high',
  urgent: 'urgent'
};

export type Priority = (typeof Priority)[keyof typeof Priority]


export const Source: {
  staff_created: 'staff_created',
  customer_portal: 'customer_portal'
};

export type Source = (typeof Source)[keyof typeof Source]


export const Visibility: {
  public: 'public',
  internal: 'internal'
};

export type Visibility = (typeof Visibility)[keyof typeof Visibility]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

export type Source = $Enums.Source

export const Source: typeof $Enums.Source

export type Visibility = $Enums.Visibility

export const Visibility: typeof $Enums.Visibility

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseCategory`: Exposes CRUD operations for the **CaseCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseCategories
    * const caseCategories = await prisma.caseCategory.findMany()
    * ```
    */
  get caseCategory(): Prisma.CaseCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowStatus`: Exposes CRUD operations for the **WorkflowStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowStatuses
    * const workflowStatuses = await prisma.workflowStatus.findMany()
    * ```
    */
  get workflowStatus(): Prisma.WorkflowStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.case`: Exposes CRUD operations for the **Case** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cases
    * const cases = await prisma.case.findMany()
    * ```
    */
  get case(): Prisma.CaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseComment`: Exposes CRUD operations for the **CaseComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseComments
    * const caseComments = await prisma.caseComment.findMany()
    * ```
    */
  get caseComment(): Prisma.CaseCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseAttachment`: Exposes CRUD operations for the **CaseAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseAttachments
    * const caseAttachments = await prisma.caseAttachment.findMany()
    * ```
    */
  get caseAttachment(): Prisma.CaseAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseActivityEvent`: Exposes CRUD operations for the **CaseActivityEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseActivityEvents
    * const caseActivityEvents = await prisma.caseActivityEvent.findMany()
    * ```
    */
  get caseActivityEvent(): Prisma.CaseActivityEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organization: 'Organization',
    User: 'User',
    Customer: 'Customer',
    CaseCategory: 'CaseCategory',
    WorkflowStatus: 'WorkflowStatus',
    Case: 'Case',
    CaseComment: 'CaseComment',
    CaseAttachment: 'CaseAttachment',
    CaseActivityEvent: 'CaseActivityEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organization" | "user" | "customer" | "caseCategory" | "workflowStatus" | "case" | "caseComment" | "caseAttachment" | "caseActivityEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      CaseCategory: {
        payload: Prisma.$CaseCategoryPayload<ExtArgs>
        fields: Prisma.CaseCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>
          }
          findFirst: {
            args: Prisma.CaseCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>
          }
          findMany: {
            args: Prisma.CaseCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>[]
          }
          create: {
            args: Prisma.CaseCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>
          }
          createMany: {
            args: Prisma.CaseCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>[]
          }
          delete: {
            args: Prisma.CaseCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>
          }
          update: {
            args: Prisma.CaseCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>
          }
          deleteMany: {
            args: Prisma.CaseCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>[]
          }
          upsert: {
            args: Prisma.CaseCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCategoryPayload>
          }
          aggregate: {
            args: Prisma.CaseCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseCategory>
          }
          groupBy: {
            args: Prisma.CaseCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CaseCategoryCountAggregateOutputType> | number
          }
        }
      }
      WorkflowStatus: {
        payload: Prisma.$WorkflowStatusPayload<ExtArgs>
        fields: Prisma.WorkflowStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>
          }
          findFirst: {
            args: Prisma.WorkflowStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>
          }
          findMany: {
            args: Prisma.WorkflowStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>[]
          }
          create: {
            args: Prisma.WorkflowStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>
          }
          createMany: {
            args: Prisma.WorkflowStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>[]
          }
          delete: {
            args: Prisma.WorkflowStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>
          }
          update: {
            args: Prisma.WorkflowStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowStatusPayload>
          }
          aggregate: {
            args: Prisma.WorkflowStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowStatus>
          }
          groupBy: {
            args: Prisma.WorkflowStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowStatusCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowStatusCountAggregateOutputType> | number
          }
        }
      }
      Case: {
        payload: Prisma.$CasePayload<ExtArgs>
        fields: Prisma.CaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          findFirst: {
            args: Prisma.CaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          findMany: {
            args: Prisma.CaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          create: {
            args: Prisma.CaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          createMany: {
            args: Prisma.CaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          delete: {
            args: Prisma.CaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          update: {
            args: Prisma.CaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          deleteMany: {
            args: Prisma.CaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          upsert: {
            args: Prisma.CaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          aggregate: {
            args: Prisma.CaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCase>
          }
          groupBy: {
            args: Prisma.CaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseCountArgs<ExtArgs>
            result: $Utils.Optional<CaseCountAggregateOutputType> | number
          }
        }
      }
      CaseComment: {
        payload: Prisma.$CaseCommentPayload<ExtArgs>
        fields: Prisma.CaseCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>
          }
          findFirst: {
            args: Prisma.CaseCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>
          }
          findMany: {
            args: Prisma.CaseCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>[]
          }
          create: {
            args: Prisma.CaseCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>
          }
          createMany: {
            args: Prisma.CaseCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>[]
          }
          delete: {
            args: Prisma.CaseCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>
          }
          update: {
            args: Prisma.CaseCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>
          }
          deleteMany: {
            args: Prisma.CaseCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>[]
          }
          upsert: {
            args: Prisma.CaseCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseCommentPayload>
          }
          aggregate: {
            args: Prisma.CaseCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseComment>
          }
          groupBy: {
            args: Prisma.CaseCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseCommentCountArgs<ExtArgs>
            result: $Utils.Optional<CaseCommentCountAggregateOutputType> | number
          }
        }
      }
      CaseAttachment: {
        payload: Prisma.$CaseAttachmentPayload<ExtArgs>
        fields: Prisma.CaseAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>
          }
          findFirst: {
            args: Prisma.CaseAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>
          }
          findMany: {
            args: Prisma.CaseAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>[]
          }
          create: {
            args: Prisma.CaseAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>
          }
          createMany: {
            args: Prisma.CaseAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>[]
          }
          delete: {
            args: Prisma.CaseAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>
          }
          update: {
            args: Prisma.CaseAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.CaseAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.CaseAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAttachmentPayload>
          }
          aggregate: {
            args: Prisma.CaseAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseAttachment>
          }
          groupBy: {
            args: Prisma.CaseAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<CaseAttachmentCountAggregateOutputType> | number
          }
        }
      }
      CaseActivityEvent: {
        payload: Prisma.$CaseActivityEventPayload<ExtArgs>
        fields: Prisma.CaseActivityEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseActivityEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseActivityEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>
          }
          findFirst: {
            args: Prisma.CaseActivityEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseActivityEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>
          }
          findMany: {
            args: Prisma.CaseActivityEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>[]
          }
          create: {
            args: Prisma.CaseActivityEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>
          }
          createMany: {
            args: Prisma.CaseActivityEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseActivityEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>[]
          }
          delete: {
            args: Prisma.CaseActivityEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>
          }
          update: {
            args: Prisma.CaseActivityEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>
          }
          deleteMany: {
            args: Prisma.CaseActivityEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseActivityEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseActivityEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>[]
          }
          upsert: {
            args: Prisma.CaseActivityEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseActivityEventPayload>
          }
          aggregate: {
            args: Prisma.CaseActivityEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseActivityEvent>
          }
          groupBy: {
            args: Prisma.CaseActivityEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseActivityEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseActivityEventCountArgs<ExtArgs>
            result: $Utils.Optional<CaseActivityEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    organization?: OrganizationOmit
    user?: UserOmit
    customer?: CustomerOmit
    caseCategory?: CaseCategoryOmit
    workflowStatus?: WorkflowStatusOmit
    case?: CaseOmit
    caseComment?: CaseCommentOmit
    caseAttachment?: CaseAttachmentOmit
    caseActivityEvent?: CaseActivityEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    users: number
    customers: number
    cases: number
    categories: number
    statuses: number
    comments: number
    attachments: number
    activityEvents: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs
    customers?: boolean | OrganizationCountOutputTypeCountCustomersArgs
    cases?: boolean | OrganizationCountOutputTypeCountCasesArgs
    categories?: boolean | OrganizationCountOutputTypeCountCategoriesArgs
    statuses?: boolean | OrganizationCountOutputTypeCountStatusesArgs
    comments?: boolean | OrganizationCountOutputTypeCountCommentsArgs
    attachments?: boolean | OrganizationCountOutputTypeCountAttachmentsArgs
    activityEvents?: boolean | OrganizationCountOutputTypeCountActivityEventsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountCustomersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseCategoryWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowStatusWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseCommentWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAttachmentWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountActivityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseActivityEventWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    assignedCases: number
    authoredComments: number
    uploadedAttachments: number
    activityEvents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedCases?: boolean | UserCountOutputTypeCountAssignedCasesArgs
    authoredComments?: boolean | UserCountOutputTypeCountAuthoredCommentsArgs
    uploadedAttachments?: boolean | UserCountOutputTypeCountUploadedAttachmentsArgs
    activityEvents?: boolean | UserCountOutputTypeCountActivityEventsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthoredCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseCommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAttachmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseActivityEventWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    cases: number
    authoredComments: number
    uploadedAttachments: number
    activityEvents: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cases?: boolean | CustomerCountOutputTypeCountCasesArgs
    authoredComments?: boolean | CustomerCountOutputTypeCountAuthoredCommentsArgs
    uploadedAttachments?: boolean | CustomerCountOutputTypeCountUploadedAttachmentsArgs
    activityEvents?: boolean | CustomerCountOutputTypeCountActivityEventsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountAuthoredCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseCommentWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountUploadedAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAttachmentWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountActivityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseActivityEventWhereInput
  }


  /**
   * Count Type CaseCategoryCountOutputType
   */

  export type CaseCategoryCountOutputType = {
    cases: number
  }

  export type CaseCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cases?: boolean | CaseCategoryCountOutputTypeCountCasesArgs
  }

  // Custom InputTypes
  /**
   * CaseCategoryCountOutputType without action
   */
  export type CaseCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategoryCountOutputType
     */
    select?: CaseCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CaseCategoryCountOutputType without action
   */
  export type CaseCategoryCountOutputTypeCountCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
  }


  /**
   * Count Type WorkflowStatusCountOutputType
   */

  export type WorkflowStatusCountOutputType = {
    cases: number
  }

  export type WorkflowStatusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cases?: boolean | WorkflowStatusCountOutputTypeCountCasesArgs
  }

  // Custom InputTypes
  /**
   * WorkflowStatusCountOutputType without action
   */
  export type WorkflowStatusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatusCountOutputType
     */
    select?: WorkflowStatusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkflowStatusCountOutputType without action
   */
  export type WorkflowStatusCountOutputTypeCountCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
  }


  /**
   * Count Type CaseCountOutputType
   */

  export type CaseCountOutputType = {
    comments: number
    attachments: number
    activityEvents: number
  }

  export type CaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | CaseCountOutputTypeCountCommentsArgs
    attachments?: boolean | CaseCountOutputTypeCountAttachmentsArgs
    activityEvents?: boolean | CaseCountOutputTypeCountActivityEventsArgs
  }

  // Custom InputTypes
  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCountOutputType
     */
    select?: CaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseCommentWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAttachmentWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountActivityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseActivityEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    industry: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    industry: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    industry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    industry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    industry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    industry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    slug: string
    industry: string
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    industry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Organization$usersArgs<ExtArgs>
    customers?: boolean | Organization$customersArgs<ExtArgs>
    cases?: boolean | Organization$casesArgs<ExtArgs>
    categories?: boolean | Organization$categoriesArgs<ExtArgs>
    statuses?: boolean | Organization$statusesArgs<ExtArgs>
    comments?: boolean | Organization$commentsArgs<ExtArgs>
    attachments?: boolean | Organization$attachmentsArgs<ExtArgs>
    activityEvents?: boolean | Organization$activityEventsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    industry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    industry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    industry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "industry" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Organization$usersArgs<ExtArgs>
    customers?: boolean | Organization$customersArgs<ExtArgs>
    cases?: boolean | Organization$casesArgs<ExtArgs>
    categories?: boolean | Organization$categoriesArgs<ExtArgs>
    statuses?: boolean | Organization$statusesArgs<ExtArgs>
    comments?: boolean | Organization$commentsArgs<ExtArgs>
    attachments?: boolean | Organization$attachmentsArgs<ExtArgs>
    activityEvents?: boolean | Organization$activityEventsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      customers: Prisma.$CustomerPayload<ExtArgs>[]
      cases: Prisma.$CasePayload<ExtArgs>[]
      categories: Prisma.$CaseCategoryPayload<ExtArgs>[]
      statuses: Prisma.$WorkflowStatusPayload<ExtArgs>[]
      comments: Prisma.$CaseCommentPayload<ExtArgs>[]
      attachments: Prisma.$CaseAttachmentPayload<ExtArgs>[]
      activityEvents: Prisma.$CaseActivityEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      industry: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Organization$usersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    customers<T extends Organization$customersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$customersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cases<T extends Organization$casesArgs<ExtArgs> = {}>(args?: Subset<T, Organization$casesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Organization$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Organization$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statuses<T extends Organization$statusesArgs<ExtArgs> = {}>(args?: Subset<T, Organization$statusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Organization$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends Organization$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityEvents<T extends Organization$activityEventsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$activityEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly slug: FieldRef<"Organization", 'String'>
    readonly industry: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.users
   */
  export type Organization$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization.customers
   */
  export type Organization$customersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    cursor?: CustomerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Organization.cases
   */
  export type Organization$casesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    cursor?: CaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Organization.categories
   */
  export type Organization$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    where?: CaseCategoryWhereInput
    orderBy?: CaseCategoryOrderByWithRelationInput | CaseCategoryOrderByWithRelationInput[]
    cursor?: CaseCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseCategoryScalarFieldEnum | CaseCategoryScalarFieldEnum[]
  }

  /**
   * Organization.statuses
   */
  export type Organization$statusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    where?: WorkflowStatusWhereInput
    orderBy?: WorkflowStatusOrderByWithRelationInput | WorkflowStatusOrderByWithRelationInput[]
    cursor?: WorkflowStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowStatusScalarFieldEnum | WorkflowStatusScalarFieldEnum[]
  }

  /**
   * Organization.comments
   */
  export type Organization$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    where?: CaseCommentWhereInput
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    cursor?: CaseCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseCommentScalarFieldEnum | CaseCommentScalarFieldEnum[]
  }

  /**
   * Organization.attachments
   */
  export type Organization$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    where?: CaseAttachmentWhereInput
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    cursor?: CaseAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseAttachmentScalarFieldEnum | CaseAttachmentScalarFieldEnum[]
  }

  /**
   * Organization.activityEvents
   */
  export type Organization$activityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    where?: CaseActivityEventWhereInput
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    cursor?: CaseActivityEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseActivityEventScalarFieldEnum | CaseActivityEventScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    organizationId: number
    name: number
    email: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    organizationId: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    assignedCases?: boolean | User$assignedCasesArgs<ExtArgs>
    authoredComments?: boolean | User$authoredCommentsArgs<ExtArgs>
    uploadedAttachments?: boolean | User$uploadedAttachmentsArgs<ExtArgs>
    activityEvents?: boolean | User$activityEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "name" | "email" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    assignedCases?: boolean | User$assignedCasesArgs<ExtArgs>
    authoredComments?: boolean | User$authoredCommentsArgs<ExtArgs>
    uploadedAttachments?: boolean | User$uploadedAttachmentsArgs<ExtArgs>
    activityEvents?: boolean | User$activityEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      assignedCases: Prisma.$CasePayload<ExtArgs>[]
      authoredComments: Prisma.$CaseCommentPayload<ExtArgs>[]
      uploadedAttachments: Prisma.$CaseAttachmentPayload<ExtArgs>[]
      activityEvents: Prisma.$CaseActivityEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      name: string
      email: string
      passwordHash: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedCases<T extends User$assignedCasesArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedCasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authoredComments<T extends User$authoredCommentsArgs<ExtArgs> = {}>(args?: Subset<T, User$authoredCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploadedAttachments<T extends User$uploadedAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityEvents<T extends User$activityEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$activityEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly organizationId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.assignedCases
   */
  export type User$assignedCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    cursor?: CaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * User.authoredComments
   */
  export type User$authoredCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    where?: CaseCommentWhereInput
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    cursor?: CaseCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseCommentScalarFieldEnum | CaseCommentScalarFieldEnum[]
  }

  /**
   * User.uploadedAttachments
   */
  export type User$uploadedAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    where?: CaseAttachmentWhereInput
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    cursor?: CaseAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseAttachmentScalarFieldEnum | CaseAttachmentScalarFieldEnum[]
  }

  /**
   * User.activityEvents
   */
  export type User$activityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    where?: CaseActivityEventWhereInput
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    cursor?: CaseActivityEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseActivityEventScalarFieldEnum | CaseActivityEventScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    email: string | null
    phone: string | null
    externalReference: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    email: string | null
    phone: string | null
    externalReference: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    organizationId: number
    name: number
    email: number
    phone: number
    externalReference: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    phone?: true
    externalReference?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    phone?: true
    externalReference?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    phone?: true
    externalReference?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    organizationId: string
    name: string
    email: string | null
    phone: string | null
    externalReference: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    externalReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    cases?: boolean | Customer$casesArgs<ExtArgs>
    authoredComments?: boolean | Customer$authoredCommentsArgs<ExtArgs>
    uploadedAttachments?: boolean | Customer$uploadedAttachmentsArgs<ExtArgs>
    activityEvents?: boolean | Customer$activityEventsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    externalReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    externalReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    externalReference?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "name" | "email" | "phone" | "externalReference" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    cases?: boolean | Customer$casesArgs<ExtArgs>
    authoredComments?: boolean | Customer$authoredCommentsArgs<ExtArgs>
    uploadedAttachments?: boolean | Customer$uploadedAttachmentsArgs<ExtArgs>
    activityEvents?: boolean | Customer$activityEventsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      cases: Prisma.$CasePayload<ExtArgs>[]
      authoredComments: Prisma.$CaseCommentPayload<ExtArgs>[]
      uploadedAttachments: Prisma.$CaseAttachmentPayload<ExtArgs>[]
      activityEvents: Prisma.$CaseActivityEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      name: string
      email: string | null
      phone: string | null
      externalReference: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cases<T extends Customer$casesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$casesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authoredComments<T extends Customer$authoredCommentsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$authoredCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploadedAttachments<T extends Customer$uploadedAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$uploadedAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityEvents<T extends Customer$activityEventsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$activityEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly organizationId: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly externalReference: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.cases
   */
  export type Customer$casesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    cursor?: CaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Customer.authoredComments
   */
  export type Customer$authoredCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    where?: CaseCommentWhereInput
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    cursor?: CaseCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseCommentScalarFieldEnum | CaseCommentScalarFieldEnum[]
  }

  /**
   * Customer.uploadedAttachments
   */
  export type Customer$uploadedAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    where?: CaseAttachmentWhereInput
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    cursor?: CaseAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseAttachmentScalarFieldEnum | CaseAttachmentScalarFieldEnum[]
  }

  /**
   * Customer.activityEvents
   */
  export type Customer$activityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    where?: CaseActivityEventWhereInput
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    cursor?: CaseActivityEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseActivityEventScalarFieldEnum | CaseActivityEventScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model CaseCategory
   */

  export type AggregateCaseCategory = {
    _count: CaseCategoryCountAggregateOutputType | null
    _min: CaseCategoryMinAggregateOutputType | null
    _max: CaseCategoryMaxAggregateOutputType | null
  }

  export type CaseCategoryMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseCategoryMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseCategoryCountAggregateOutputType = {
    id: number
    organizationId: number
    name: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseCategoryMinAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseCategoryMaxAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseCategoryCountAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CaseCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseCategory to aggregate.
     */
    where?: CaseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseCategories to fetch.
     */
    orderBy?: CaseCategoryOrderByWithRelationInput | CaseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseCategories
    **/
    _count?: true | CaseCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseCategoryMaxAggregateInputType
  }

  export type GetCaseCategoryAggregateType<T extends CaseCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseCategory[P]>
      : GetScalarType<T[P], AggregateCaseCategory[P]>
  }




  export type CaseCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseCategoryWhereInput
    orderBy?: CaseCategoryOrderByWithAggregationInput | CaseCategoryOrderByWithAggregationInput[]
    by: CaseCategoryScalarFieldEnum[] | CaseCategoryScalarFieldEnum
    having?: CaseCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseCategoryCountAggregateInputType | true
    _min?: CaseCategoryMinAggregateInputType
    _max?: CaseCategoryMaxAggregateInputType
  }

  export type CaseCategoryGroupByOutputType = {
    id: string
    organizationId: string
    name: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: CaseCategoryCountAggregateOutputType | null
    _min: CaseCategoryMinAggregateOutputType | null
    _max: CaseCategoryMaxAggregateOutputType | null
  }

  type GetCaseCategoryGroupByPayload<T extends CaseCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CaseCategoryGroupByOutputType[P]>
        }
      >
    >


  export type CaseCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    cases?: boolean | CaseCategory$casesArgs<ExtArgs>
    _count?: boolean | CaseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseCategory"]>

  export type CaseCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseCategory"]>

  export type CaseCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseCategory"]>

  export type CaseCategorySelectScalar = {
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "name" | "slug" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["caseCategory"]>
  export type CaseCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    cases?: boolean | CaseCategory$casesArgs<ExtArgs>
    _count?: boolean | CaseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CaseCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type CaseCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $CaseCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseCategory"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      cases: Prisma.$CasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      name: string
      slug: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["caseCategory"]>
    composites: {}
  }

  type CaseCategoryGetPayload<S extends boolean | null | undefined | CaseCategoryDefaultArgs> = $Result.GetResult<Prisma.$CaseCategoryPayload, S>

  type CaseCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseCategoryCountAggregateInputType | true
    }

  export interface CaseCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseCategory'], meta: { name: 'CaseCategory' } }
    /**
     * Find zero or one CaseCategory that matches the filter.
     * @param {CaseCategoryFindUniqueArgs} args - Arguments to find a CaseCategory
     * @example
     * // Get one CaseCategory
     * const caseCategory = await prisma.caseCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseCategoryFindUniqueArgs>(args: SelectSubset<T, CaseCategoryFindUniqueArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseCategoryFindUniqueOrThrowArgs} args - Arguments to find a CaseCategory
     * @example
     * // Get one CaseCategory
     * const caseCategory = await prisma.caseCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCategoryFindFirstArgs} args - Arguments to find a CaseCategory
     * @example
     * // Get one CaseCategory
     * const caseCategory = await prisma.caseCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseCategoryFindFirstArgs>(args?: SelectSubset<T, CaseCategoryFindFirstArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCategoryFindFirstOrThrowArgs} args - Arguments to find a CaseCategory
     * @example
     * // Get one CaseCategory
     * const caseCategory = await prisma.caseCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseCategories
     * const caseCategories = await prisma.caseCategory.findMany()
     * 
     * // Get first 10 CaseCategories
     * const caseCategories = await prisma.caseCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseCategoryWithIdOnly = await prisma.caseCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseCategoryFindManyArgs>(args?: SelectSubset<T, CaseCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseCategory.
     * @param {CaseCategoryCreateArgs} args - Arguments to create a CaseCategory.
     * @example
     * // Create one CaseCategory
     * const CaseCategory = await prisma.caseCategory.create({
     *   data: {
     *     // ... data to create a CaseCategory
     *   }
     * })
     * 
     */
    create<T extends CaseCategoryCreateArgs>(args: SelectSubset<T, CaseCategoryCreateArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseCategories.
     * @param {CaseCategoryCreateManyArgs} args - Arguments to create many CaseCategories.
     * @example
     * // Create many CaseCategories
     * const caseCategory = await prisma.caseCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseCategoryCreateManyArgs>(args?: SelectSubset<T, CaseCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseCategories and returns the data saved in the database.
     * @param {CaseCategoryCreateManyAndReturnArgs} args - Arguments to create many CaseCategories.
     * @example
     * // Create many CaseCategories
     * const caseCategory = await prisma.caseCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseCategories and only return the `id`
     * const caseCategoryWithIdOnly = await prisma.caseCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseCategory.
     * @param {CaseCategoryDeleteArgs} args - Arguments to delete one CaseCategory.
     * @example
     * // Delete one CaseCategory
     * const CaseCategory = await prisma.caseCategory.delete({
     *   where: {
     *     // ... filter to delete one CaseCategory
     *   }
     * })
     * 
     */
    delete<T extends CaseCategoryDeleteArgs>(args: SelectSubset<T, CaseCategoryDeleteArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseCategory.
     * @param {CaseCategoryUpdateArgs} args - Arguments to update one CaseCategory.
     * @example
     * // Update one CaseCategory
     * const caseCategory = await prisma.caseCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseCategoryUpdateArgs>(args: SelectSubset<T, CaseCategoryUpdateArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseCategories.
     * @param {CaseCategoryDeleteManyArgs} args - Arguments to filter CaseCategories to delete.
     * @example
     * // Delete a few CaseCategories
     * const { count } = await prisma.caseCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseCategoryDeleteManyArgs>(args?: SelectSubset<T, CaseCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseCategories
     * const caseCategory = await prisma.caseCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseCategoryUpdateManyArgs>(args: SelectSubset<T, CaseCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseCategories and returns the data updated in the database.
     * @param {CaseCategoryUpdateManyAndReturnArgs} args - Arguments to update many CaseCategories.
     * @example
     * // Update many CaseCategories
     * const caseCategory = await prisma.caseCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseCategories and only return the `id`
     * const caseCategoryWithIdOnly = await prisma.caseCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseCategory.
     * @param {CaseCategoryUpsertArgs} args - Arguments to update or create a CaseCategory.
     * @example
     * // Update or create a CaseCategory
     * const caseCategory = await prisma.caseCategory.upsert({
     *   create: {
     *     // ... data to create a CaseCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseCategory we want to update
     *   }
     * })
     */
    upsert<T extends CaseCategoryUpsertArgs>(args: SelectSubset<T, CaseCategoryUpsertArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCategoryCountArgs} args - Arguments to filter CaseCategories to count.
     * @example
     * // Count the number of CaseCategories
     * const count = await prisma.caseCategory.count({
     *   where: {
     *     // ... the filter for the CaseCategories we want to count
     *   }
     * })
    **/
    count<T extends CaseCategoryCountArgs>(
      args?: Subset<T, CaseCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseCategoryAggregateArgs>(args: Subset<T, CaseCategoryAggregateArgs>): Prisma.PrismaPromise<GetCaseCategoryAggregateType<T>>

    /**
     * Group by CaseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseCategoryGroupByArgs['orderBy'] }
        : { orderBy?: CaseCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseCategory model
   */
  readonly fields: CaseCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cases<T extends CaseCategory$casesArgs<ExtArgs> = {}>(args?: Subset<T, CaseCategory$casesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CaseCategory model
   */
  interface CaseCategoryFieldRefs {
    readonly id: FieldRef<"CaseCategory", 'String'>
    readonly organizationId: FieldRef<"CaseCategory", 'String'>
    readonly name: FieldRef<"CaseCategory", 'String'>
    readonly slug: FieldRef<"CaseCategory", 'String'>
    readonly description: FieldRef<"CaseCategory", 'String'>
    readonly createdAt: FieldRef<"CaseCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"CaseCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseCategory findUnique
   */
  export type CaseCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseCategory to fetch.
     */
    where: CaseCategoryWhereUniqueInput
  }

  /**
   * CaseCategory findUniqueOrThrow
   */
  export type CaseCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseCategory to fetch.
     */
    where: CaseCategoryWhereUniqueInput
  }

  /**
   * CaseCategory findFirst
   */
  export type CaseCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseCategory to fetch.
     */
    where?: CaseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseCategories to fetch.
     */
    orderBy?: CaseCategoryOrderByWithRelationInput | CaseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseCategories.
     */
    cursor?: CaseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseCategories.
     */
    distinct?: CaseCategoryScalarFieldEnum | CaseCategoryScalarFieldEnum[]
  }

  /**
   * CaseCategory findFirstOrThrow
   */
  export type CaseCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseCategory to fetch.
     */
    where?: CaseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseCategories to fetch.
     */
    orderBy?: CaseCategoryOrderByWithRelationInput | CaseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseCategories.
     */
    cursor?: CaseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseCategories.
     */
    distinct?: CaseCategoryScalarFieldEnum | CaseCategoryScalarFieldEnum[]
  }

  /**
   * CaseCategory findMany
   */
  export type CaseCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseCategories to fetch.
     */
    where?: CaseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseCategories to fetch.
     */
    orderBy?: CaseCategoryOrderByWithRelationInput | CaseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseCategories.
     */
    cursor?: CaseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseCategories.
     */
    distinct?: CaseCategoryScalarFieldEnum | CaseCategoryScalarFieldEnum[]
  }

  /**
   * CaseCategory create
   */
  export type CaseCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseCategory.
     */
    data: XOR<CaseCategoryCreateInput, CaseCategoryUncheckedCreateInput>
  }

  /**
   * CaseCategory createMany
   */
  export type CaseCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseCategories.
     */
    data: CaseCategoryCreateManyInput | CaseCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseCategory createManyAndReturn
   */
  export type CaseCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many CaseCategories.
     */
    data: CaseCategoryCreateManyInput | CaseCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseCategory update
   */
  export type CaseCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseCategory.
     */
    data: XOR<CaseCategoryUpdateInput, CaseCategoryUncheckedUpdateInput>
    /**
     * Choose, which CaseCategory to update.
     */
    where: CaseCategoryWhereUniqueInput
  }

  /**
   * CaseCategory updateMany
   */
  export type CaseCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseCategories.
     */
    data: XOR<CaseCategoryUpdateManyMutationInput, CaseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which CaseCategories to update
     */
    where?: CaseCategoryWhereInput
    /**
     * Limit how many CaseCategories to update.
     */
    limit?: number
  }

  /**
   * CaseCategory updateManyAndReturn
   */
  export type CaseCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * The data used to update CaseCategories.
     */
    data: XOR<CaseCategoryUpdateManyMutationInput, CaseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which CaseCategories to update
     */
    where?: CaseCategoryWhereInput
    /**
     * Limit how many CaseCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseCategory upsert
   */
  export type CaseCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseCategory to update in case it exists.
     */
    where: CaseCategoryWhereUniqueInput
    /**
     * In case the CaseCategory found by the `where` argument doesn't exist, create a new CaseCategory with this data.
     */
    create: XOR<CaseCategoryCreateInput, CaseCategoryUncheckedCreateInput>
    /**
     * In case the CaseCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseCategoryUpdateInput, CaseCategoryUncheckedUpdateInput>
  }

  /**
   * CaseCategory delete
   */
  export type CaseCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    /**
     * Filter which CaseCategory to delete.
     */
    where: CaseCategoryWhereUniqueInput
  }

  /**
   * CaseCategory deleteMany
   */
  export type CaseCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseCategories to delete
     */
    where?: CaseCategoryWhereInput
    /**
     * Limit how many CaseCategories to delete.
     */
    limit?: number
  }

  /**
   * CaseCategory.cases
   */
  export type CaseCategory$casesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    cursor?: CaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * CaseCategory without action
   */
  export type CaseCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowStatus
   */

  export type AggregateWorkflowStatus = {
    _count: WorkflowStatusCountAggregateOutputType | null
    _avg: WorkflowStatusAvgAggregateOutputType | null
    _sum: WorkflowStatusSumAggregateOutputType | null
    _min: WorkflowStatusMinAggregateOutputType | null
    _max: WorkflowStatusMaxAggregateOutputType | null
  }

  export type WorkflowStatusAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type WorkflowStatusSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type WorkflowStatusMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    slug: string | null
    color: string | null
    sortOrder: number | null
    isDefault: boolean | null
    isClosed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowStatusMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    slug: string | null
    color: string | null
    sortOrder: number | null
    isDefault: boolean | null
    isClosed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowStatusCountAggregateOutputType = {
    id: number
    organizationId: number
    name: number
    slug: number
    color: number
    sortOrder: number
    isDefault: number
    isClosed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkflowStatusAvgAggregateInputType = {
    sortOrder?: true
  }

  export type WorkflowStatusSumAggregateInputType = {
    sortOrder?: true
  }

  export type WorkflowStatusMinAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    slug?: true
    color?: true
    sortOrder?: true
    isDefault?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowStatusMaxAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    slug?: true
    color?: true
    sortOrder?: true
    isDefault?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowStatusCountAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    slug?: true
    color?: true
    sortOrder?: true
    isDefault?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkflowStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowStatus to aggregate.
     */
    where?: WorkflowStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowStatuses to fetch.
     */
    orderBy?: WorkflowStatusOrderByWithRelationInput | WorkflowStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowStatuses
    **/
    _count?: true | WorkflowStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowStatusMaxAggregateInputType
  }

  export type GetWorkflowStatusAggregateType<T extends WorkflowStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowStatus[P]>
      : GetScalarType<T[P], AggregateWorkflowStatus[P]>
  }




  export type WorkflowStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowStatusWhereInput
    orderBy?: WorkflowStatusOrderByWithAggregationInput | WorkflowStatusOrderByWithAggregationInput[]
    by: WorkflowStatusScalarFieldEnum[] | WorkflowStatusScalarFieldEnum
    having?: WorkflowStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowStatusCountAggregateInputType | true
    _avg?: WorkflowStatusAvgAggregateInputType
    _sum?: WorkflowStatusSumAggregateInputType
    _min?: WorkflowStatusMinAggregateInputType
    _max?: WorkflowStatusMaxAggregateInputType
  }

  export type WorkflowStatusGroupByOutputType = {
    id: string
    organizationId: string
    name: string
    slug: string
    color: string | null
    sortOrder: number
    isDefault: boolean
    isClosed: boolean
    createdAt: Date
    updatedAt: Date
    _count: WorkflowStatusCountAggregateOutputType | null
    _avg: WorkflowStatusAvgAggregateOutputType | null
    _sum: WorkflowStatusSumAggregateOutputType | null
    _min: WorkflowStatusMinAggregateOutputType | null
    _max: WorkflowStatusMaxAggregateOutputType | null
  }

  type GetWorkflowStatusGroupByPayload<T extends WorkflowStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowStatusGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowStatusGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    color?: boolean
    sortOrder?: boolean
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    cases?: boolean | WorkflowStatus$casesArgs<ExtArgs>
    _count?: boolean | WorkflowStatusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStatus"]>

  export type WorkflowStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    color?: boolean
    sortOrder?: boolean
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStatus"]>

  export type WorkflowStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    color?: boolean
    sortOrder?: boolean
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowStatus"]>

  export type WorkflowStatusSelectScalar = {
    id?: boolean
    organizationId?: boolean
    name?: boolean
    slug?: boolean
    color?: boolean
    sortOrder?: boolean
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkflowStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "name" | "slug" | "color" | "sortOrder" | "isDefault" | "isClosed" | "createdAt" | "updatedAt", ExtArgs["result"]["workflowStatus"]>
  export type WorkflowStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    cases?: boolean | WorkflowStatus$casesArgs<ExtArgs>
    _count?: boolean | WorkflowStatusCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkflowStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type WorkflowStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $WorkflowStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowStatus"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      cases: Prisma.$CasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      name: string
      slug: string
      color: string | null
      sortOrder: number
      isDefault: boolean
      isClosed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workflowStatus"]>
    composites: {}
  }

  type WorkflowStatusGetPayload<S extends boolean | null | undefined | WorkflowStatusDefaultArgs> = $Result.GetResult<Prisma.$WorkflowStatusPayload, S>

  type WorkflowStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowStatusCountAggregateInputType | true
    }

  export interface WorkflowStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowStatus'], meta: { name: 'WorkflowStatus' } }
    /**
     * Find zero or one WorkflowStatus that matches the filter.
     * @param {WorkflowStatusFindUniqueArgs} args - Arguments to find a WorkflowStatus
     * @example
     * // Get one WorkflowStatus
     * const workflowStatus = await prisma.workflowStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowStatusFindUniqueArgs>(args: SelectSubset<T, WorkflowStatusFindUniqueArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowStatusFindUniqueOrThrowArgs} args - Arguments to find a WorkflowStatus
     * @example
     * // Get one WorkflowStatus
     * const workflowStatus = await prisma.workflowStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStatusFindFirstArgs} args - Arguments to find a WorkflowStatus
     * @example
     * // Get one WorkflowStatus
     * const workflowStatus = await prisma.workflowStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowStatusFindFirstArgs>(args?: SelectSubset<T, WorkflowStatusFindFirstArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStatusFindFirstOrThrowArgs} args - Arguments to find a WorkflowStatus
     * @example
     * // Get one WorkflowStatus
     * const workflowStatus = await prisma.workflowStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowStatuses
     * const workflowStatuses = await prisma.workflowStatus.findMany()
     * 
     * // Get first 10 WorkflowStatuses
     * const workflowStatuses = await prisma.workflowStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowStatusWithIdOnly = await prisma.workflowStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowStatusFindManyArgs>(args?: SelectSubset<T, WorkflowStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowStatus.
     * @param {WorkflowStatusCreateArgs} args - Arguments to create a WorkflowStatus.
     * @example
     * // Create one WorkflowStatus
     * const WorkflowStatus = await prisma.workflowStatus.create({
     *   data: {
     *     // ... data to create a WorkflowStatus
     *   }
     * })
     * 
     */
    create<T extends WorkflowStatusCreateArgs>(args: SelectSubset<T, WorkflowStatusCreateArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowStatuses.
     * @param {WorkflowStatusCreateManyArgs} args - Arguments to create many WorkflowStatuses.
     * @example
     * // Create many WorkflowStatuses
     * const workflowStatus = await prisma.workflowStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowStatusCreateManyArgs>(args?: SelectSubset<T, WorkflowStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowStatuses and returns the data saved in the database.
     * @param {WorkflowStatusCreateManyAndReturnArgs} args - Arguments to create many WorkflowStatuses.
     * @example
     * // Create many WorkflowStatuses
     * const workflowStatus = await prisma.workflowStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowStatuses and only return the `id`
     * const workflowStatusWithIdOnly = await prisma.workflowStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowStatus.
     * @param {WorkflowStatusDeleteArgs} args - Arguments to delete one WorkflowStatus.
     * @example
     * // Delete one WorkflowStatus
     * const WorkflowStatus = await prisma.workflowStatus.delete({
     *   where: {
     *     // ... filter to delete one WorkflowStatus
     *   }
     * })
     * 
     */
    delete<T extends WorkflowStatusDeleteArgs>(args: SelectSubset<T, WorkflowStatusDeleteArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowStatus.
     * @param {WorkflowStatusUpdateArgs} args - Arguments to update one WorkflowStatus.
     * @example
     * // Update one WorkflowStatus
     * const workflowStatus = await prisma.workflowStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowStatusUpdateArgs>(args: SelectSubset<T, WorkflowStatusUpdateArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowStatuses.
     * @param {WorkflowStatusDeleteManyArgs} args - Arguments to filter WorkflowStatuses to delete.
     * @example
     * // Delete a few WorkflowStatuses
     * const { count } = await prisma.workflowStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowStatusDeleteManyArgs>(args?: SelectSubset<T, WorkflowStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowStatuses
     * const workflowStatus = await prisma.workflowStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowStatusUpdateManyArgs>(args: SelectSubset<T, WorkflowStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowStatuses and returns the data updated in the database.
     * @param {WorkflowStatusUpdateManyAndReturnArgs} args - Arguments to update many WorkflowStatuses.
     * @example
     * // Update many WorkflowStatuses
     * const workflowStatus = await prisma.workflowStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowStatuses and only return the `id`
     * const workflowStatusWithIdOnly = await prisma.workflowStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkflowStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowStatus.
     * @param {WorkflowStatusUpsertArgs} args - Arguments to update or create a WorkflowStatus.
     * @example
     * // Update or create a WorkflowStatus
     * const workflowStatus = await prisma.workflowStatus.upsert({
     *   create: {
     *     // ... data to create a WorkflowStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowStatus we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowStatusUpsertArgs>(args: SelectSubset<T, WorkflowStatusUpsertArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStatusCountArgs} args - Arguments to filter WorkflowStatuses to count.
     * @example
     * // Count the number of WorkflowStatuses
     * const count = await prisma.workflowStatus.count({
     *   where: {
     *     // ... the filter for the WorkflowStatuses we want to count
     *   }
     * })
    **/
    count<T extends WorkflowStatusCountArgs>(
      args?: Subset<T, WorkflowStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkflowStatusAggregateArgs>(args: Subset<T, WorkflowStatusAggregateArgs>): Prisma.PrismaPromise<GetWorkflowStatusAggregateType<T>>

    /**
     * Group by WorkflowStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkflowStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowStatusGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkflowStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowStatus model
   */
  readonly fields: WorkflowStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cases<T extends WorkflowStatus$casesArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowStatus$casesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkflowStatus model
   */
  interface WorkflowStatusFieldRefs {
    readonly id: FieldRef<"WorkflowStatus", 'String'>
    readonly organizationId: FieldRef<"WorkflowStatus", 'String'>
    readonly name: FieldRef<"WorkflowStatus", 'String'>
    readonly slug: FieldRef<"WorkflowStatus", 'String'>
    readonly color: FieldRef<"WorkflowStatus", 'String'>
    readonly sortOrder: FieldRef<"WorkflowStatus", 'Int'>
    readonly isDefault: FieldRef<"WorkflowStatus", 'Boolean'>
    readonly isClosed: FieldRef<"WorkflowStatus", 'Boolean'>
    readonly createdAt: FieldRef<"WorkflowStatus", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkflowStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowStatus findUnique
   */
  export type WorkflowStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStatus to fetch.
     */
    where: WorkflowStatusWhereUniqueInput
  }

  /**
   * WorkflowStatus findUniqueOrThrow
   */
  export type WorkflowStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStatus to fetch.
     */
    where: WorkflowStatusWhereUniqueInput
  }

  /**
   * WorkflowStatus findFirst
   */
  export type WorkflowStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStatus to fetch.
     */
    where?: WorkflowStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowStatuses to fetch.
     */
    orderBy?: WorkflowStatusOrderByWithRelationInput | WorkflowStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowStatuses.
     */
    cursor?: WorkflowStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowStatuses.
     */
    distinct?: WorkflowStatusScalarFieldEnum | WorkflowStatusScalarFieldEnum[]
  }

  /**
   * WorkflowStatus findFirstOrThrow
   */
  export type WorkflowStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStatus to fetch.
     */
    where?: WorkflowStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowStatuses to fetch.
     */
    orderBy?: WorkflowStatusOrderByWithRelationInput | WorkflowStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowStatuses.
     */
    cursor?: WorkflowStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowStatuses.
     */
    distinct?: WorkflowStatusScalarFieldEnum | WorkflowStatusScalarFieldEnum[]
  }

  /**
   * WorkflowStatus findMany
   */
  export type WorkflowStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowStatuses to fetch.
     */
    where?: WorkflowStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowStatuses to fetch.
     */
    orderBy?: WorkflowStatusOrderByWithRelationInput | WorkflowStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowStatuses.
     */
    cursor?: WorkflowStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowStatuses.
     */
    distinct?: WorkflowStatusScalarFieldEnum | WorkflowStatusScalarFieldEnum[]
  }

  /**
   * WorkflowStatus create
   */
  export type WorkflowStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowStatus.
     */
    data: XOR<WorkflowStatusCreateInput, WorkflowStatusUncheckedCreateInput>
  }

  /**
   * WorkflowStatus createMany
   */
  export type WorkflowStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowStatuses.
     */
    data: WorkflowStatusCreateManyInput | WorkflowStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowStatus createManyAndReturn
   */
  export type WorkflowStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowStatuses.
     */
    data: WorkflowStatusCreateManyInput | WorkflowStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowStatus update
   */
  export type WorkflowStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowStatus.
     */
    data: XOR<WorkflowStatusUpdateInput, WorkflowStatusUncheckedUpdateInput>
    /**
     * Choose, which WorkflowStatus to update.
     */
    where: WorkflowStatusWhereUniqueInput
  }

  /**
   * WorkflowStatus updateMany
   */
  export type WorkflowStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowStatuses.
     */
    data: XOR<WorkflowStatusUpdateManyMutationInput, WorkflowStatusUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowStatuses to update
     */
    where?: WorkflowStatusWhereInput
    /**
     * Limit how many WorkflowStatuses to update.
     */
    limit?: number
  }

  /**
   * WorkflowStatus updateManyAndReturn
   */
  export type WorkflowStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowStatuses.
     */
    data: XOR<WorkflowStatusUpdateManyMutationInput, WorkflowStatusUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowStatuses to update
     */
    where?: WorkflowStatusWhereInput
    /**
     * Limit how many WorkflowStatuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowStatus upsert
   */
  export type WorkflowStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowStatus to update in case it exists.
     */
    where: WorkflowStatusWhereUniqueInput
    /**
     * In case the WorkflowStatus found by the `where` argument doesn't exist, create a new WorkflowStatus with this data.
     */
    create: XOR<WorkflowStatusCreateInput, WorkflowStatusUncheckedCreateInput>
    /**
     * In case the WorkflowStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowStatusUpdateInput, WorkflowStatusUncheckedUpdateInput>
  }

  /**
   * WorkflowStatus delete
   */
  export type WorkflowStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
    /**
     * Filter which WorkflowStatus to delete.
     */
    where: WorkflowStatusWhereUniqueInput
  }

  /**
   * WorkflowStatus deleteMany
   */
  export type WorkflowStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowStatuses to delete
     */
    where?: WorkflowStatusWhereInput
    /**
     * Limit how many WorkflowStatuses to delete.
     */
    limit?: number
  }

  /**
   * WorkflowStatus.cases
   */
  export type WorkflowStatus$casesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    cursor?: CaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * WorkflowStatus without action
   */
  export type WorkflowStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowStatus
     */
    select?: WorkflowStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowStatus
     */
    omit?: WorkflowStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowStatusInclude<ExtArgs> | null
  }


  /**
   * Model Case
   */

  export type AggregateCase = {
    _count: CaseCountAggregateOutputType | null
    _min: CaseMinAggregateOutputType | null
    _max: CaseMaxAggregateOutputType | null
  }

  export type CaseMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    customerId: string | null
    assignedUserId: string | null
    categoryId: string | null
    statusId: string | null
    title: string | null
    description: string | null
    priority: $Enums.Priority | null
    source: $Enums.Source | null
    dueAt: Date | null
    closedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    customerId: string | null
    assignedUserId: string | null
    categoryId: string | null
    statusId: string | null
    title: string | null
    description: string | null
    priority: $Enums.Priority | null
    source: $Enums.Source | null
    dueAt: Date | null
    closedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseCountAggregateOutputType = {
    id: number
    organizationId: number
    customerId: number
    assignedUserId: number
    categoryId: number
    statusId: number
    title: number
    description: number
    priority: number
    source: number
    intakeData: number
    dueAt: number
    closedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseMinAggregateInputType = {
    id?: true
    organizationId?: true
    customerId?: true
    assignedUserId?: true
    categoryId?: true
    statusId?: true
    title?: true
    description?: true
    priority?: true
    source?: true
    dueAt?: true
    closedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseMaxAggregateInputType = {
    id?: true
    organizationId?: true
    customerId?: true
    assignedUserId?: true
    categoryId?: true
    statusId?: true
    title?: true
    description?: true
    priority?: true
    source?: true
    dueAt?: true
    closedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseCountAggregateInputType = {
    id?: true
    organizationId?: true
    customerId?: true
    assignedUserId?: true
    categoryId?: true
    statusId?: true
    title?: true
    description?: true
    priority?: true
    source?: true
    intakeData?: true
    dueAt?: true
    closedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Case to aggregate.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cases
    **/
    _count?: true | CaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseMaxAggregateInputType
  }

  export type GetCaseAggregateType<T extends CaseAggregateArgs> = {
        [P in keyof T & keyof AggregateCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCase[P]>
      : GetScalarType<T[P], AggregateCase[P]>
  }




  export type CaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithAggregationInput | CaseOrderByWithAggregationInput[]
    by: CaseScalarFieldEnum[] | CaseScalarFieldEnum
    having?: CaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseCountAggregateInputType | true
    _min?: CaseMinAggregateInputType
    _max?: CaseMaxAggregateInputType
  }

  export type CaseGroupByOutputType = {
    id: string
    organizationId: string
    customerId: string
    assignedUserId: string | null
    categoryId: string | null
    statusId: string
    title: string
    description: string | null
    priority: $Enums.Priority
    source: $Enums.Source
    intakeData: JsonValue
    dueAt: Date | null
    closedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CaseCountAggregateOutputType | null
    _min: CaseMinAggregateOutputType | null
    _max: CaseMaxAggregateOutputType | null
  }

  type GetCaseGroupByPayload<T extends CaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseGroupByOutputType[P]>
            : GetScalarType<T[P], CaseGroupByOutputType[P]>
        }
      >
    >


  export type CaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    customerId?: boolean
    assignedUserId?: boolean
    categoryId?: boolean
    statusId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    source?: boolean
    intakeData?: boolean
    dueAt?: boolean
    closedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedUser?: boolean | Case$assignedUserArgs<ExtArgs>
    category?: boolean | Case$categoryArgs<ExtArgs>
    status?: boolean | WorkflowStatusDefaultArgs<ExtArgs>
    comments?: boolean | Case$commentsArgs<ExtArgs>
    attachments?: boolean | Case$attachmentsArgs<ExtArgs>
    activityEvents?: boolean | Case$activityEventsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    customerId?: boolean
    assignedUserId?: boolean
    categoryId?: boolean
    statusId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    source?: boolean
    intakeData?: boolean
    dueAt?: boolean
    closedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedUser?: boolean | Case$assignedUserArgs<ExtArgs>
    category?: boolean | Case$categoryArgs<ExtArgs>
    status?: boolean | WorkflowStatusDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    customerId?: boolean
    assignedUserId?: boolean
    categoryId?: boolean
    statusId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    source?: boolean
    intakeData?: boolean
    dueAt?: boolean
    closedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedUser?: boolean | Case$assignedUserArgs<ExtArgs>
    category?: boolean | Case$categoryArgs<ExtArgs>
    status?: boolean | WorkflowStatusDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectScalar = {
    id?: boolean
    organizationId?: boolean
    customerId?: boolean
    assignedUserId?: boolean
    categoryId?: boolean
    statusId?: boolean
    title?: boolean
    description?: boolean
    priority?: boolean
    source?: boolean
    intakeData?: boolean
    dueAt?: boolean
    closedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "customerId" | "assignedUserId" | "categoryId" | "statusId" | "title" | "description" | "priority" | "source" | "intakeData" | "dueAt" | "closedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["case"]>
  export type CaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedUser?: boolean | Case$assignedUserArgs<ExtArgs>
    category?: boolean | Case$categoryArgs<ExtArgs>
    status?: boolean | WorkflowStatusDefaultArgs<ExtArgs>
    comments?: boolean | Case$commentsArgs<ExtArgs>
    attachments?: boolean | Case$attachmentsArgs<ExtArgs>
    activityEvents?: boolean | Case$activityEventsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedUser?: boolean | Case$assignedUserArgs<ExtArgs>
    category?: boolean | Case$categoryArgs<ExtArgs>
    status?: boolean | WorkflowStatusDefaultArgs<ExtArgs>
  }
  export type CaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    assignedUser?: boolean | Case$assignedUserArgs<ExtArgs>
    category?: boolean | Case$categoryArgs<ExtArgs>
    status?: boolean | WorkflowStatusDefaultArgs<ExtArgs>
  }

  export type $CasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Case"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
      assignedUser: Prisma.$UserPayload<ExtArgs> | null
      category: Prisma.$CaseCategoryPayload<ExtArgs> | null
      status: Prisma.$WorkflowStatusPayload<ExtArgs>
      comments: Prisma.$CaseCommentPayload<ExtArgs>[]
      attachments: Prisma.$CaseAttachmentPayload<ExtArgs>[]
      activityEvents: Prisma.$CaseActivityEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      customerId: string
      assignedUserId: string | null
      categoryId: string | null
      statusId: string
      title: string
      description: string | null
      priority: $Enums.Priority
      source: $Enums.Source
      intakeData: Prisma.JsonValue
      dueAt: Date | null
      closedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["case"]>
    composites: {}
  }

  type CaseGetPayload<S extends boolean | null | undefined | CaseDefaultArgs> = $Result.GetResult<Prisma.$CasePayload, S>

  type CaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseCountAggregateInputType | true
    }

  export interface CaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Case'], meta: { name: 'Case' } }
    /**
     * Find zero or one Case that matches the filter.
     * @param {CaseFindUniqueArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseFindUniqueArgs>(args: SelectSubset<T, CaseFindUniqueArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Case that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseFindUniqueOrThrowArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Case that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindFirstArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseFindFirstArgs>(args?: SelectSubset<T, CaseFindFirstArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Case that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindFirstOrThrowArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cases
     * const cases = await prisma.case.findMany()
     * 
     * // Get first 10 Cases
     * const cases = await prisma.case.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseWithIdOnly = await prisma.case.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseFindManyArgs>(args?: SelectSubset<T, CaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Case.
     * @param {CaseCreateArgs} args - Arguments to create a Case.
     * @example
     * // Create one Case
     * const Case = await prisma.case.create({
     *   data: {
     *     // ... data to create a Case
     *   }
     * })
     * 
     */
    create<T extends CaseCreateArgs>(args: SelectSubset<T, CaseCreateArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cases.
     * @param {CaseCreateManyArgs} args - Arguments to create many Cases.
     * @example
     * // Create many Cases
     * const case = await prisma.case.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseCreateManyArgs>(args?: SelectSubset<T, CaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cases and returns the data saved in the database.
     * @param {CaseCreateManyAndReturnArgs} args - Arguments to create many Cases.
     * @example
     * // Create many Cases
     * const case = await prisma.case.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cases and only return the `id`
     * const caseWithIdOnly = await prisma.case.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Case.
     * @param {CaseDeleteArgs} args - Arguments to delete one Case.
     * @example
     * // Delete one Case
     * const Case = await prisma.case.delete({
     *   where: {
     *     // ... filter to delete one Case
     *   }
     * })
     * 
     */
    delete<T extends CaseDeleteArgs>(args: SelectSubset<T, CaseDeleteArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Case.
     * @param {CaseUpdateArgs} args - Arguments to update one Case.
     * @example
     * // Update one Case
     * const case = await prisma.case.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseUpdateArgs>(args: SelectSubset<T, CaseUpdateArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cases.
     * @param {CaseDeleteManyArgs} args - Arguments to filter Cases to delete.
     * @example
     * // Delete a few Cases
     * const { count } = await prisma.case.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseDeleteManyArgs>(args?: SelectSubset<T, CaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cases
     * const case = await prisma.case.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseUpdateManyArgs>(args: SelectSubset<T, CaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cases and returns the data updated in the database.
     * @param {CaseUpdateManyAndReturnArgs} args - Arguments to update many Cases.
     * @example
     * // Update many Cases
     * const case = await prisma.case.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cases and only return the `id`
     * const caseWithIdOnly = await prisma.case.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Case.
     * @param {CaseUpsertArgs} args - Arguments to update or create a Case.
     * @example
     * // Update or create a Case
     * const case = await prisma.case.upsert({
     *   create: {
     *     // ... data to create a Case
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Case we want to update
     *   }
     * })
     */
    upsert<T extends CaseUpsertArgs>(args: SelectSubset<T, CaseUpsertArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCountArgs} args - Arguments to filter Cases to count.
     * @example
     * // Count the number of Cases
     * const count = await prisma.case.count({
     *   where: {
     *     // ... the filter for the Cases we want to count
     *   }
     * })
    **/
    count<T extends CaseCountArgs>(
      args?: Subset<T, CaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Case.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseAggregateArgs>(args: Subset<T, CaseAggregateArgs>): Prisma.PrismaPromise<GetCaseAggregateType<T>>

    /**
     * Group by Case.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseGroupByArgs['orderBy'] }
        : { orderBy?: CaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Case model
   */
  readonly fields: CaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Case.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignedUser<T extends Case$assignedUserArgs<ExtArgs> = {}>(args?: Subset<T, Case$assignedUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    category<T extends Case$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Case$categoryArgs<ExtArgs>>): Prisma__CaseCategoryClient<$Result.GetResult<Prisma.$CaseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    status<T extends WorkflowStatusDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowStatusDefaultArgs<ExtArgs>>): Prisma__WorkflowStatusClient<$Result.GetResult<Prisma.$WorkflowStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends Case$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Case$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends Case$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Case$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityEvents<T extends Case$activityEventsArgs<ExtArgs> = {}>(args?: Subset<T, Case$activityEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Case model
   */
  interface CaseFieldRefs {
    readonly id: FieldRef<"Case", 'String'>
    readonly organizationId: FieldRef<"Case", 'String'>
    readonly customerId: FieldRef<"Case", 'String'>
    readonly assignedUserId: FieldRef<"Case", 'String'>
    readonly categoryId: FieldRef<"Case", 'String'>
    readonly statusId: FieldRef<"Case", 'String'>
    readonly title: FieldRef<"Case", 'String'>
    readonly description: FieldRef<"Case", 'String'>
    readonly priority: FieldRef<"Case", 'Priority'>
    readonly source: FieldRef<"Case", 'Source'>
    readonly intakeData: FieldRef<"Case", 'Json'>
    readonly dueAt: FieldRef<"Case", 'DateTime'>
    readonly closedAt: FieldRef<"Case", 'DateTime'>
    readonly createdAt: FieldRef<"Case", 'DateTime'>
    readonly updatedAt: FieldRef<"Case", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Case findUnique
   */
  export type CaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case findUniqueOrThrow
   */
  export type CaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case findFirst
   */
  export type CaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cases.
     */
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case findFirstOrThrow
   */
  export type CaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cases.
     */
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case findMany
   */
  export type CaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Cases to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cases.
     */
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case create
   */
  export type CaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Case.
     */
    data: XOR<CaseCreateInput, CaseUncheckedCreateInput>
  }

  /**
   * Case createMany
   */
  export type CaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cases.
     */
    data: CaseCreateManyInput | CaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Case createManyAndReturn
   */
  export type CaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * The data used to create many Cases.
     */
    data: CaseCreateManyInput | CaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Case update
   */
  export type CaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Case.
     */
    data: XOR<CaseUpdateInput, CaseUncheckedUpdateInput>
    /**
     * Choose, which Case to update.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case updateMany
   */
  export type CaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cases.
     */
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyInput>
    /**
     * Filter which Cases to update
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to update.
     */
    limit?: number
  }

  /**
   * Case updateManyAndReturn
   */
  export type CaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * The data used to update Cases.
     */
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyInput>
    /**
     * Filter which Cases to update
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Case upsert
   */
  export type CaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Case to update in case it exists.
     */
    where: CaseWhereUniqueInput
    /**
     * In case the Case found by the `where` argument doesn't exist, create a new Case with this data.
     */
    create: XOR<CaseCreateInput, CaseUncheckedCreateInput>
    /**
     * In case the Case was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseUpdateInput, CaseUncheckedUpdateInput>
  }

  /**
   * Case delete
   */
  export type CaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter which Case to delete.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case deleteMany
   */
  export type CaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cases to delete
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to delete.
     */
    limit?: number
  }

  /**
   * Case.assignedUser
   */
  export type Case$assignedUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Case.category
   */
  export type Case$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCategory
     */
    select?: CaseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseCategory
     */
    omit?: CaseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCategoryInclude<ExtArgs> | null
    where?: CaseCategoryWhereInput
  }

  /**
   * Case.comments
   */
  export type Case$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    where?: CaseCommentWhereInput
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    cursor?: CaseCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseCommentScalarFieldEnum | CaseCommentScalarFieldEnum[]
  }

  /**
   * Case.attachments
   */
  export type Case$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    where?: CaseAttachmentWhereInput
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    cursor?: CaseAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseAttachmentScalarFieldEnum | CaseAttachmentScalarFieldEnum[]
  }

  /**
   * Case.activityEvents
   */
  export type Case$activityEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    where?: CaseActivityEventWhereInput
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    cursor?: CaseActivityEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseActivityEventScalarFieldEnum | CaseActivityEventScalarFieldEnum[]
  }

  /**
   * Case without action
   */
  export type CaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
  }


  /**
   * Model CaseComment
   */

  export type AggregateCaseComment = {
    _count: CaseCommentCountAggregateOutputType | null
    _min: CaseCommentMinAggregateOutputType | null
    _max: CaseCommentMaxAggregateOutputType | null
  }

  export type CaseCommentMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    caseId: string | null
    authorUserId: string | null
    authorCustomerId: string | null
    body: string | null
    visibility: $Enums.Visibility | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseCommentMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    caseId: string | null
    authorUserId: string | null
    authorCustomerId: string | null
    body: string | null
    visibility: $Enums.Visibility | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseCommentCountAggregateOutputType = {
    id: number
    organizationId: number
    caseId: number
    authorUserId: number
    authorCustomerId: number
    body: number
    visibility: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseCommentMinAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    authorUserId?: true
    authorCustomerId?: true
    body?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseCommentMaxAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    authorUserId?: true
    authorCustomerId?: true
    body?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseCommentCountAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    authorUserId?: true
    authorCustomerId?: true
    body?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CaseCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseComment to aggregate.
     */
    where?: CaseCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseComments to fetch.
     */
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseComments
    **/
    _count?: true | CaseCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseCommentMaxAggregateInputType
  }

  export type GetCaseCommentAggregateType<T extends CaseCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseComment[P]>
      : GetScalarType<T[P], AggregateCaseComment[P]>
  }




  export type CaseCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseCommentWhereInput
    orderBy?: CaseCommentOrderByWithAggregationInput | CaseCommentOrderByWithAggregationInput[]
    by: CaseCommentScalarFieldEnum[] | CaseCommentScalarFieldEnum
    having?: CaseCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseCommentCountAggregateInputType | true
    _min?: CaseCommentMinAggregateInputType
    _max?: CaseCommentMaxAggregateInputType
  }

  export type CaseCommentGroupByOutputType = {
    id: string
    organizationId: string
    caseId: string
    authorUserId: string | null
    authorCustomerId: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt: Date
    updatedAt: Date
    _count: CaseCommentCountAggregateOutputType | null
    _min: CaseCommentMinAggregateOutputType | null
    _max: CaseCommentMaxAggregateOutputType | null
  }

  type GetCaseCommentGroupByPayload<T extends CaseCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseCommentGroupByOutputType[P]>
            : GetScalarType<T[P], CaseCommentGroupByOutputType[P]>
        }
      >
    >


  export type CaseCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    authorUserId?: boolean
    authorCustomerId?: boolean
    body?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    authorUser?: boolean | CaseComment$authorUserArgs<ExtArgs>
    authorCustomer?: boolean | CaseComment$authorCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseComment"]>

  export type CaseCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    authorUserId?: boolean
    authorCustomerId?: boolean
    body?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    authorUser?: boolean | CaseComment$authorUserArgs<ExtArgs>
    authorCustomer?: boolean | CaseComment$authorCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseComment"]>

  export type CaseCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    authorUserId?: boolean
    authorCustomerId?: boolean
    body?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    authorUser?: boolean | CaseComment$authorUserArgs<ExtArgs>
    authorCustomer?: boolean | CaseComment$authorCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseComment"]>

  export type CaseCommentSelectScalar = {
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    authorUserId?: boolean
    authorCustomerId?: boolean
    body?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "caseId" | "authorUserId" | "authorCustomerId" | "body" | "visibility" | "createdAt" | "updatedAt", ExtArgs["result"]["caseComment"]>
  export type CaseCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    authorUser?: boolean | CaseComment$authorUserArgs<ExtArgs>
    authorCustomer?: boolean | CaseComment$authorCustomerArgs<ExtArgs>
  }
  export type CaseCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    authorUser?: boolean | CaseComment$authorUserArgs<ExtArgs>
    authorCustomer?: boolean | CaseComment$authorCustomerArgs<ExtArgs>
  }
  export type CaseCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    authorUser?: boolean | CaseComment$authorUserArgs<ExtArgs>
    authorCustomer?: boolean | CaseComment$authorCustomerArgs<ExtArgs>
  }

  export type $CaseCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseComment"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      case: Prisma.$CasePayload<ExtArgs>
      authorUser: Prisma.$UserPayload<ExtArgs> | null
      authorCustomer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      caseId: string
      authorUserId: string | null
      authorCustomerId: string | null
      body: string
      visibility: $Enums.Visibility
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["caseComment"]>
    composites: {}
  }

  type CaseCommentGetPayload<S extends boolean | null | undefined | CaseCommentDefaultArgs> = $Result.GetResult<Prisma.$CaseCommentPayload, S>

  type CaseCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseCommentCountAggregateInputType | true
    }

  export interface CaseCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseComment'], meta: { name: 'CaseComment' } }
    /**
     * Find zero or one CaseComment that matches the filter.
     * @param {CaseCommentFindUniqueArgs} args - Arguments to find a CaseComment
     * @example
     * // Get one CaseComment
     * const caseComment = await prisma.caseComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseCommentFindUniqueArgs>(args: SelectSubset<T, CaseCommentFindUniqueArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseCommentFindUniqueOrThrowArgs} args - Arguments to find a CaseComment
     * @example
     * // Get one CaseComment
     * const caseComment = await prisma.caseComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCommentFindFirstArgs} args - Arguments to find a CaseComment
     * @example
     * // Get one CaseComment
     * const caseComment = await prisma.caseComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseCommentFindFirstArgs>(args?: SelectSubset<T, CaseCommentFindFirstArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCommentFindFirstOrThrowArgs} args - Arguments to find a CaseComment
     * @example
     * // Get one CaseComment
     * const caseComment = await prisma.caseComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseComments
     * const caseComments = await prisma.caseComment.findMany()
     * 
     * // Get first 10 CaseComments
     * const caseComments = await prisma.caseComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseCommentWithIdOnly = await prisma.caseComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseCommentFindManyArgs>(args?: SelectSubset<T, CaseCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseComment.
     * @param {CaseCommentCreateArgs} args - Arguments to create a CaseComment.
     * @example
     * // Create one CaseComment
     * const CaseComment = await prisma.caseComment.create({
     *   data: {
     *     // ... data to create a CaseComment
     *   }
     * })
     * 
     */
    create<T extends CaseCommentCreateArgs>(args: SelectSubset<T, CaseCommentCreateArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseComments.
     * @param {CaseCommentCreateManyArgs} args - Arguments to create many CaseComments.
     * @example
     * // Create many CaseComments
     * const caseComment = await prisma.caseComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseCommentCreateManyArgs>(args?: SelectSubset<T, CaseCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseComments and returns the data saved in the database.
     * @param {CaseCommentCreateManyAndReturnArgs} args - Arguments to create many CaseComments.
     * @example
     * // Create many CaseComments
     * const caseComment = await prisma.caseComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseComments and only return the `id`
     * const caseCommentWithIdOnly = await prisma.caseComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseComment.
     * @param {CaseCommentDeleteArgs} args - Arguments to delete one CaseComment.
     * @example
     * // Delete one CaseComment
     * const CaseComment = await prisma.caseComment.delete({
     *   where: {
     *     // ... filter to delete one CaseComment
     *   }
     * })
     * 
     */
    delete<T extends CaseCommentDeleteArgs>(args: SelectSubset<T, CaseCommentDeleteArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseComment.
     * @param {CaseCommentUpdateArgs} args - Arguments to update one CaseComment.
     * @example
     * // Update one CaseComment
     * const caseComment = await prisma.caseComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseCommentUpdateArgs>(args: SelectSubset<T, CaseCommentUpdateArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseComments.
     * @param {CaseCommentDeleteManyArgs} args - Arguments to filter CaseComments to delete.
     * @example
     * // Delete a few CaseComments
     * const { count } = await prisma.caseComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseCommentDeleteManyArgs>(args?: SelectSubset<T, CaseCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseComments
     * const caseComment = await prisma.caseComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseCommentUpdateManyArgs>(args: SelectSubset<T, CaseCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseComments and returns the data updated in the database.
     * @param {CaseCommentUpdateManyAndReturnArgs} args - Arguments to update many CaseComments.
     * @example
     * // Update many CaseComments
     * const caseComment = await prisma.caseComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseComments and only return the `id`
     * const caseCommentWithIdOnly = await prisma.caseComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseComment.
     * @param {CaseCommentUpsertArgs} args - Arguments to update or create a CaseComment.
     * @example
     * // Update or create a CaseComment
     * const caseComment = await prisma.caseComment.upsert({
     *   create: {
     *     // ... data to create a CaseComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseComment we want to update
     *   }
     * })
     */
    upsert<T extends CaseCommentUpsertArgs>(args: SelectSubset<T, CaseCommentUpsertArgs<ExtArgs>>): Prisma__CaseCommentClient<$Result.GetResult<Prisma.$CaseCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCommentCountArgs} args - Arguments to filter CaseComments to count.
     * @example
     * // Count the number of CaseComments
     * const count = await prisma.caseComment.count({
     *   where: {
     *     // ... the filter for the CaseComments we want to count
     *   }
     * })
    **/
    count<T extends CaseCommentCountArgs>(
      args?: Subset<T, CaseCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseCommentAggregateArgs>(args: Subset<T, CaseCommentAggregateArgs>): Prisma.PrismaPromise<GetCaseCommentAggregateType<T>>

    /**
     * Group by CaseComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseCommentGroupByArgs['orderBy'] }
        : { orderBy?: CaseCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseComment model
   */
  readonly fields: CaseCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    authorUser<T extends CaseComment$authorUserArgs<ExtArgs> = {}>(args?: Subset<T, CaseComment$authorUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    authorCustomer<T extends CaseComment$authorCustomerArgs<ExtArgs> = {}>(args?: Subset<T, CaseComment$authorCustomerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CaseComment model
   */
  interface CaseCommentFieldRefs {
    readonly id: FieldRef<"CaseComment", 'String'>
    readonly organizationId: FieldRef<"CaseComment", 'String'>
    readonly caseId: FieldRef<"CaseComment", 'String'>
    readonly authorUserId: FieldRef<"CaseComment", 'String'>
    readonly authorCustomerId: FieldRef<"CaseComment", 'String'>
    readonly body: FieldRef<"CaseComment", 'String'>
    readonly visibility: FieldRef<"CaseComment", 'Visibility'>
    readonly createdAt: FieldRef<"CaseComment", 'DateTime'>
    readonly updatedAt: FieldRef<"CaseComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseComment findUnique
   */
  export type CaseCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * Filter, which CaseComment to fetch.
     */
    where: CaseCommentWhereUniqueInput
  }

  /**
   * CaseComment findUniqueOrThrow
   */
  export type CaseCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * Filter, which CaseComment to fetch.
     */
    where: CaseCommentWhereUniqueInput
  }

  /**
   * CaseComment findFirst
   */
  export type CaseCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * Filter, which CaseComment to fetch.
     */
    where?: CaseCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseComments to fetch.
     */
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseComments.
     */
    cursor?: CaseCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseComments.
     */
    distinct?: CaseCommentScalarFieldEnum | CaseCommentScalarFieldEnum[]
  }

  /**
   * CaseComment findFirstOrThrow
   */
  export type CaseCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * Filter, which CaseComment to fetch.
     */
    where?: CaseCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseComments to fetch.
     */
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseComments.
     */
    cursor?: CaseCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseComments.
     */
    distinct?: CaseCommentScalarFieldEnum | CaseCommentScalarFieldEnum[]
  }

  /**
   * CaseComment findMany
   */
  export type CaseCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * Filter, which CaseComments to fetch.
     */
    where?: CaseCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseComments to fetch.
     */
    orderBy?: CaseCommentOrderByWithRelationInput | CaseCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseComments.
     */
    cursor?: CaseCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseComments.
     */
    distinct?: CaseCommentScalarFieldEnum | CaseCommentScalarFieldEnum[]
  }

  /**
   * CaseComment create
   */
  export type CaseCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseComment.
     */
    data: XOR<CaseCommentCreateInput, CaseCommentUncheckedCreateInput>
  }

  /**
   * CaseComment createMany
   */
  export type CaseCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseComments.
     */
    data: CaseCommentCreateManyInput | CaseCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseComment createManyAndReturn
   */
  export type CaseCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * The data used to create many CaseComments.
     */
    data: CaseCommentCreateManyInput | CaseCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseComment update
   */
  export type CaseCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseComment.
     */
    data: XOR<CaseCommentUpdateInput, CaseCommentUncheckedUpdateInput>
    /**
     * Choose, which CaseComment to update.
     */
    where: CaseCommentWhereUniqueInput
  }

  /**
   * CaseComment updateMany
   */
  export type CaseCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseComments.
     */
    data: XOR<CaseCommentUpdateManyMutationInput, CaseCommentUncheckedUpdateManyInput>
    /**
     * Filter which CaseComments to update
     */
    where?: CaseCommentWhereInput
    /**
     * Limit how many CaseComments to update.
     */
    limit?: number
  }

  /**
   * CaseComment updateManyAndReturn
   */
  export type CaseCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * The data used to update CaseComments.
     */
    data: XOR<CaseCommentUpdateManyMutationInput, CaseCommentUncheckedUpdateManyInput>
    /**
     * Filter which CaseComments to update
     */
    where?: CaseCommentWhereInput
    /**
     * Limit how many CaseComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseComment upsert
   */
  export type CaseCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseComment to update in case it exists.
     */
    where: CaseCommentWhereUniqueInput
    /**
     * In case the CaseComment found by the `where` argument doesn't exist, create a new CaseComment with this data.
     */
    create: XOR<CaseCommentCreateInput, CaseCommentUncheckedCreateInput>
    /**
     * In case the CaseComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseCommentUpdateInput, CaseCommentUncheckedUpdateInput>
  }

  /**
   * CaseComment delete
   */
  export type CaseCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
    /**
     * Filter which CaseComment to delete.
     */
    where: CaseCommentWhereUniqueInput
  }

  /**
   * CaseComment deleteMany
   */
  export type CaseCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseComments to delete
     */
    where?: CaseCommentWhereInput
    /**
     * Limit how many CaseComments to delete.
     */
    limit?: number
  }

  /**
   * CaseComment.authorUser
   */
  export type CaseComment$authorUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CaseComment.authorCustomer
   */
  export type CaseComment$authorCustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * CaseComment without action
   */
  export type CaseCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseComment
     */
    select?: CaseCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseComment
     */
    omit?: CaseCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseCommentInclude<ExtArgs> | null
  }


  /**
   * Model CaseAttachment
   */

  export type AggregateCaseAttachment = {
    _count: CaseAttachmentCountAggregateOutputType | null
    _avg: CaseAttachmentAvgAggregateOutputType | null
    _sum: CaseAttachmentSumAggregateOutputType | null
    _min: CaseAttachmentMinAggregateOutputType | null
    _max: CaseAttachmentMaxAggregateOutputType | null
  }

  export type CaseAttachmentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type CaseAttachmentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type CaseAttachmentMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    caseId: string | null
    uploadedByUserId: string | null
    uploadedByCustomerId: string | null
    fileName: string | null
    fileUrl: string | null
    fileType: string | null
    fileSize: number | null
    visibility: $Enums.Visibility | null
    createdAt: Date | null
  }

  export type CaseAttachmentMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    caseId: string | null
    uploadedByUserId: string | null
    uploadedByCustomerId: string | null
    fileName: string | null
    fileUrl: string | null
    fileType: string | null
    fileSize: number | null
    visibility: $Enums.Visibility | null
    createdAt: Date | null
  }

  export type CaseAttachmentCountAggregateOutputType = {
    id: number
    organizationId: number
    caseId: number
    uploadedByUserId: number
    uploadedByCustomerId: number
    fileName: number
    fileUrl: number
    fileType: number
    fileSize: number
    visibility: number
    createdAt: number
    _all: number
  }


  export type CaseAttachmentAvgAggregateInputType = {
    fileSize?: true
  }

  export type CaseAttachmentSumAggregateInputType = {
    fileSize?: true
  }

  export type CaseAttachmentMinAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    uploadedByUserId?: true
    uploadedByCustomerId?: true
    fileName?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    visibility?: true
    createdAt?: true
  }

  export type CaseAttachmentMaxAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    uploadedByUserId?: true
    uploadedByCustomerId?: true
    fileName?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    visibility?: true
    createdAt?: true
  }

  export type CaseAttachmentCountAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    uploadedByUserId?: true
    uploadedByCustomerId?: true
    fileName?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    visibility?: true
    createdAt?: true
    _all?: true
  }

  export type CaseAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseAttachment to aggregate.
     */
    where?: CaseAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAttachments to fetch.
     */
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseAttachments
    **/
    _count?: true | CaseAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CaseAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CaseAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseAttachmentMaxAggregateInputType
  }

  export type GetCaseAttachmentAggregateType<T extends CaseAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseAttachment[P]>
      : GetScalarType<T[P], AggregateCaseAttachment[P]>
  }




  export type CaseAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAttachmentWhereInput
    orderBy?: CaseAttachmentOrderByWithAggregationInput | CaseAttachmentOrderByWithAggregationInput[]
    by: CaseAttachmentScalarFieldEnum[] | CaseAttachmentScalarFieldEnum
    having?: CaseAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseAttachmentCountAggregateInputType | true
    _avg?: CaseAttachmentAvgAggregateInputType
    _sum?: CaseAttachmentSumAggregateInputType
    _min?: CaseAttachmentMinAggregateInputType
    _max?: CaseAttachmentMaxAggregateInputType
  }

  export type CaseAttachmentGroupByOutputType = {
    id: string
    organizationId: string
    caseId: string
    uploadedByUserId: string | null
    uploadedByCustomerId: string | null
    fileName: string
    fileUrl: string
    fileType: string | null
    fileSize: number | null
    visibility: $Enums.Visibility
    createdAt: Date
    _count: CaseAttachmentCountAggregateOutputType | null
    _avg: CaseAttachmentAvgAggregateOutputType | null
    _sum: CaseAttachmentSumAggregateOutputType | null
    _min: CaseAttachmentMinAggregateOutputType | null
    _max: CaseAttachmentMaxAggregateOutputType | null
  }

  type GetCaseAttachmentGroupByPayload<T extends CaseAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], CaseAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type CaseAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    uploadedByUserId?: boolean
    uploadedByCustomerId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    visibility?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | CaseAttachment$uploadedByUserArgs<ExtArgs>
    uploadedByCustomer?: boolean | CaseAttachment$uploadedByCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseAttachment"]>

  export type CaseAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    uploadedByUserId?: boolean
    uploadedByCustomerId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    visibility?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | CaseAttachment$uploadedByUserArgs<ExtArgs>
    uploadedByCustomer?: boolean | CaseAttachment$uploadedByCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseAttachment"]>

  export type CaseAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    uploadedByUserId?: boolean
    uploadedByCustomerId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    visibility?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | CaseAttachment$uploadedByUserArgs<ExtArgs>
    uploadedByCustomer?: boolean | CaseAttachment$uploadedByCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseAttachment"]>

  export type CaseAttachmentSelectScalar = {
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    uploadedByUserId?: boolean
    uploadedByCustomerId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    visibility?: boolean
    createdAt?: boolean
  }

  export type CaseAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "caseId" | "uploadedByUserId" | "uploadedByCustomerId" | "fileName" | "fileUrl" | "fileType" | "fileSize" | "visibility" | "createdAt", ExtArgs["result"]["caseAttachment"]>
  export type CaseAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | CaseAttachment$uploadedByUserArgs<ExtArgs>
    uploadedByCustomer?: boolean | CaseAttachment$uploadedByCustomerArgs<ExtArgs>
  }
  export type CaseAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | CaseAttachment$uploadedByUserArgs<ExtArgs>
    uploadedByCustomer?: boolean | CaseAttachment$uploadedByCustomerArgs<ExtArgs>
  }
  export type CaseAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    uploadedByUser?: boolean | CaseAttachment$uploadedByUserArgs<ExtArgs>
    uploadedByCustomer?: boolean | CaseAttachment$uploadedByCustomerArgs<ExtArgs>
  }

  export type $CaseAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseAttachment"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      case: Prisma.$CasePayload<ExtArgs>
      uploadedByUser: Prisma.$UserPayload<ExtArgs> | null
      uploadedByCustomer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      caseId: string
      uploadedByUserId: string | null
      uploadedByCustomerId: string | null
      fileName: string
      fileUrl: string
      fileType: string | null
      fileSize: number | null
      visibility: $Enums.Visibility
      createdAt: Date
    }, ExtArgs["result"]["caseAttachment"]>
    composites: {}
  }

  type CaseAttachmentGetPayload<S extends boolean | null | undefined | CaseAttachmentDefaultArgs> = $Result.GetResult<Prisma.$CaseAttachmentPayload, S>

  type CaseAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseAttachmentCountAggregateInputType | true
    }

  export interface CaseAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseAttachment'], meta: { name: 'CaseAttachment' } }
    /**
     * Find zero or one CaseAttachment that matches the filter.
     * @param {CaseAttachmentFindUniqueArgs} args - Arguments to find a CaseAttachment
     * @example
     * // Get one CaseAttachment
     * const caseAttachment = await prisma.caseAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseAttachmentFindUniqueArgs>(args: SelectSubset<T, CaseAttachmentFindUniqueArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseAttachmentFindUniqueOrThrowArgs} args - Arguments to find a CaseAttachment
     * @example
     * // Get one CaseAttachment
     * const caseAttachment = await prisma.caseAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAttachmentFindFirstArgs} args - Arguments to find a CaseAttachment
     * @example
     * // Get one CaseAttachment
     * const caseAttachment = await prisma.caseAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseAttachmentFindFirstArgs>(args?: SelectSubset<T, CaseAttachmentFindFirstArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAttachmentFindFirstOrThrowArgs} args - Arguments to find a CaseAttachment
     * @example
     * // Get one CaseAttachment
     * const caseAttachment = await prisma.caseAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseAttachments
     * const caseAttachments = await prisma.caseAttachment.findMany()
     * 
     * // Get first 10 CaseAttachments
     * const caseAttachments = await prisma.caseAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseAttachmentWithIdOnly = await prisma.caseAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseAttachmentFindManyArgs>(args?: SelectSubset<T, CaseAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseAttachment.
     * @param {CaseAttachmentCreateArgs} args - Arguments to create a CaseAttachment.
     * @example
     * // Create one CaseAttachment
     * const CaseAttachment = await prisma.caseAttachment.create({
     *   data: {
     *     // ... data to create a CaseAttachment
     *   }
     * })
     * 
     */
    create<T extends CaseAttachmentCreateArgs>(args: SelectSubset<T, CaseAttachmentCreateArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseAttachments.
     * @param {CaseAttachmentCreateManyArgs} args - Arguments to create many CaseAttachments.
     * @example
     * // Create many CaseAttachments
     * const caseAttachment = await prisma.caseAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseAttachmentCreateManyArgs>(args?: SelectSubset<T, CaseAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseAttachments and returns the data saved in the database.
     * @param {CaseAttachmentCreateManyAndReturnArgs} args - Arguments to create many CaseAttachments.
     * @example
     * // Create many CaseAttachments
     * const caseAttachment = await prisma.caseAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseAttachments and only return the `id`
     * const caseAttachmentWithIdOnly = await prisma.caseAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseAttachment.
     * @param {CaseAttachmentDeleteArgs} args - Arguments to delete one CaseAttachment.
     * @example
     * // Delete one CaseAttachment
     * const CaseAttachment = await prisma.caseAttachment.delete({
     *   where: {
     *     // ... filter to delete one CaseAttachment
     *   }
     * })
     * 
     */
    delete<T extends CaseAttachmentDeleteArgs>(args: SelectSubset<T, CaseAttachmentDeleteArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseAttachment.
     * @param {CaseAttachmentUpdateArgs} args - Arguments to update one CaseAttachment.
     * @example
     * // Update one CaseAttachment
     * const caseAttachment = await prisma.caseAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseAttachmentUpdateArgs>(args: SelectSubset<T, CaseAttachmentUpdateArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseAttachments.
     * @param {CaseAttachmentDeleteManyArgs} args - Arguments to filter CaseAttachments to delete.
     * @example
     * // Delete a few CaseAttachments
     * const { count } = await prisma.caseAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseAttachmentDeleteManyArgs>(args?: SelectSubset<T, CaseAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseAttachments
     * const caseAttachment = await prisma.caseAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseAttachmentUpdateManyArgs>(args: SelectSubset<T, CaseAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseAttachments and returns the data updated in the database.
     * @param {CaseAttachmentUpdateManyAndReturnArgs} args - Arguments to update many CaseAttachments.
     * @example
     * // Update many CaseAttachments
     * const caseAttachment = await prisma.caseAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseAttachments and only return the `id`
     * const caseAttachmentWithIdOnly = await prisma.caseAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseAttachment.
     * @param {CaseAttachmentUpsertArgs} args - Arguments to update or create a CaseAttachment.
     * @example
     * // Update or create a CaseAttachment
     * const caseAttachment = await prisma.caseAttachment.upsert({
     *   create: {
     *     // ... data to create a CaseAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseAttachment we want to update
     *   }
     * })
     */
    upsert<T extends CaseAttachmentUpsertArgs>(args: SelectSubset<T, CaseAttachmentUpsertArgs<ExtArgs>>): Prisma__CaseAttachmentClient<$Result.GetResult<Prisma.$CaseAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAttachmentCountArgs} args - Arguments to filter CaseAttachments to count.
     * @example
     * // Count the number of CaseAttachments
     * const count = await prisma.caseAttachment.count({
     *   where: {
     *     // ... the filter for the CaseAttachments we want to count
     *   }
     * })
    **/
    count<T extends CaseAttachmentCountArgs>(
      args?: Subset<T, CaseAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseAttachmentAggregateArgs>(args: Subset<T, CaseAttachmentAggregateArgs>): Prisma.PrismaPromise<GetCaseAttachmentAggregateType<T>>

    /**
     * Group by CaseAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: CaseAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseAttachment model
   */
  readonly fields: CaseAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    uploadedByUser<T extends CaseAttachment$uploadedByUserArgs<ExtArgs> = {}>(args?: Subset<T, CaseAttachment$uploadedByUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    uploadedByCustomer<T extends CaseAttachment$uploadedByCustomerArgs<ExtArgs> = {}>(args?: Subset<T, CaseAttachment$uploadedByCustomerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CaseAttachment model
   */
  interface CaseAttachmentFieldRefs {
    readonly id: FieldRef<"CaseAttachment", 'String'>
    readonly organizationId: FieldRef<"CaseAttachment", 'String'>
    readonly caseId: FieldRef<"CaseAttachment", 'String'>
    readonly uploadedByUserId: FieldRef<"CaseAttachment", 'String'>
    readonly uploadedByCustomerId: FieldRef<"CaseAttachment", 'String'>
    readonly fileName: FieldRef<"CaseAttachment", 'String'>
    readonly fileUrl: FieldRef<"CaseAttachment", 'String'>
    readonly fileType: FieldRef<"CaseAttachment", 'String'>
    readonly fileSize: FieldRef<"CaseAttachment", 'Int'>
    readonly visibility: FieldRef<"CaseAttachment", 'Visibility'>
    readonly createdAt: FieldRef<"CaseAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseAttachment findUnique
   */
  export type CaseAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAttachment to fetch.
     */
    where: CaseAttachmentWhereUniqueInput
  }

  /**
   * CaseAttachment findUniqueOrThrow
   */
  export type CaseAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAttachment to fetch.
     */
    where: CaseAttachmentWhereUniqueInput
  }

  /**
   * CaseAttachment findFirst
   */
  export type CaseAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAttachment to fetch.
     */
    where?: CaseAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAttachments to fetch.
     */
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseAttachments.
     */
    cursor?: CaseAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseAttachments.
     */
    distinct?: CaseAttachmentScalarFieldEnum | CaseAttachmentScalarFieldEnum[]
  }

  /**
   * CaseAttachment findFirstOrThrow
   */
  export type CaseAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAttachment to fetch.
     */
    where?: CaseAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAttachments to fetch.
     */
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseAttachments.
     */
    cursor?: CaseAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseAttachments.
     */
    distinct?: CaseAttachmentScalarFieldEnum | CaseAttachmentScalarFieldEnum[]
  }

  /**
   * CaseAttachment findMany
   */
  export type CaseAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAttachments to fetch.
     */
    where?: CaseAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAttachments to fetch.
     */
    orderBy?: CaseAttachmentOrderByWithRelationInput | CaseAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseAttachments.
     */
    cursor?: CaseAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseAttachments.
     */
    distinct?: CaseAttachmentScalarFieldEnum | CaseAttachmentScalarFieldEnum[]
  }

  /**
   * CaseAttachment create
   */
  export type CaseAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseAttachment.
     */
    data: XOR<CaseAttachmentCreateInput, CaseAttachmentUncheckedCreateInput>
  }

  /**
   * CaseAttachment createMany
   */
  export type CaseAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseAttachments.
     */
    data: CaseAttachmentCreateManyInput | CaseAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseAttachment createManyAndReturn
   */
  export type CaseAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many CaseAttachments.
     */
    data: CaseAttachmentCreateManyInput | CaseAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseAttachment update
   */
  export type CaseAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseAttachment.
     */
    data: XOR<CaseAttachmentUpdateInput, CaseAttachmentUncheckedUpdateInput>
    /**
     * Choose, which CaseAttachment to update.
     */
    where: CaseAttachmentWhereUniqueInput
  }

  /**
   * CaseAttachment updateMany
   */
  export type CaseAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseAttachments.
     */
    data: XOR<CaseAttachmentUpdateManyMutationInput, CaseAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which CaseAttachments to update
     */
    where?: CaseAttachmentWhereInput
    /**
     * Limit how many CaseAttachments to update.
     */
    limit?: number
  }

  /**
   * CaseAttachment updateManyAndReturn
   */
  export type CaseAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update CaseAttachments.
     */
    data: XOR<CaseAttachmentUpdateManyMutationInput, CaseAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which CaseAttachments to update
     */
    where?: CaseAttachmentWhereInput
    /**
     * Limit how many CaseAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseAttachment upsert
   */
  export type CaseAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseAttachment to update in case it exists.
     */
    where: CaseAttachmentWhereUniqueInput
    /**
     * In case the CaseAttachment found by the `where` argument doesn't exist, create a new CaseAttachment with this data.
     */
    create: XOR<CaseAttachmentCreateInput, CaseAttachmentUncheckedCreateInput>
    /**
     * In case the CaseAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseAttachmentUpdateInput, CaseAttachmentUncheckedUpdateInput>
  }

  /**
   * CaseAttachment delete
   */
  export type CaseAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
    /**
     * Filter which CaseAttachment to delete.
     */
    where: CaseAttachmentWhereUniqueInput
  }

  /**
   * CaseAttachment deleteMany
   */
  export type CaseAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseAttachments to delete
     */
    where?: CaseAttachmentWhereInput
    /**
     * Limit how many CaseAttachments to delete.
     */
    limit?: number
  }

  /**
   * CaseAttachment.uploadedByUser
   */
  export type CaseAttachment$uploadedByUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CaseAttachment.uploadedByCustomer
   */
  export type CaseAttachment$uploadedByCustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * CaseAttachment without action
   */
  export type CaseAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAttachment
     */
    select?: CaseAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAttachment
     */
    omit?: CaseAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model CaseActivityEvent
   */

  export type AggregateCaseActivityEvent = {
    _count: CaseActivityEventCountAggregateOutputType | null
    _min: CaseActivityEventMinAggregateOutputType | null
    _max: CaseActivityEventMaxAggregateOutputType | null
  }

  export type CaseActivityEventMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    caseId: string | null
    actorUserId: string | null
    actorCustomerId: string | null
    eventType: string | null
    createdAt: Date | null
  }

  export type CaseActivityEventMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    caseId: string | null
    actorUserId: string | null
    actorCustomerId: string | null
    eventType: string | null
    createdAt: Date | null
  }

  export type CaseActivityEventCountAggregateOutputType = {
    id: number
    organizationId: number
    caseId: number
    actorUserId: number
    actorCustomerId: number
    eventType: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type CaseActivityEventMinAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    actorUserId?: true
    actorCustomerId?: true
    eventType?: true
    createdAt?: true
  }

  export type CaseActivityEventMaxAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    actorUserId?: true
    actorCustomerId?: true
    eventType?: true
    createdAt?: true
  }

  export type CaseActivityEventCountAggregateInputType = {
    id?: true
    organizationId?: true
    caseId?: true
    actorUserId?: true
    actorCustomerId?: true
    eventType?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type CaseActivityEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseActivityEvent to aggregate.
     */
    where?: CaseActivityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseActivityEvents to fetch.
     */
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseActivityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseActivityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseActivityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseActivityEvents
    **/
    _count?: true | CaseActivityEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseActivityEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseActivityEventMaxAggregateInputType
  }

  export type GetCaseActivityEventAggregateType<T extends CaseActivityEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseActivityEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseActivityEvent[P]>
      : GetScalarType<T[P], AggregateCaseActivityEvent[P]>
  }




  export type CaseActivityEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseActivityEventWhereInput
    orderBy?: CaseActivityEventOrderByWithAggregationInput | CaseActivityEventOrderByWithAggregationInput[]
    by: CaseActivityEventScalarFieldEnum[] | CaseActivityEventScalarFieldEnum
    having?: CaseActivityEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseActivityEventCountAggregateInputType | true
    _min?: CaseActivityEventMinAggregateInputType
    _max?: CaseActivityEventMaxAggregateInputType
  }

  export type CaseActivityEventGroupByOutputType = {
    id: string
    organizationId: string
    caseId: string
    actorUserId: string | null
    actorCustomerId: string | null
    eventType: string
    metadata: JsonValue
    createdAt: Date
    _count: CaseActivityEventCountAggregateOutputType | null
    _min: CaseActivityEventMinAggregateOutputType | null
    _max: CaseActivityEventMaxAggregateOutputType | null
  }

  type GetCaseActivityEventGroupByPayload<T extends CaseActivityEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseActivityEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseActivityEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseActivityEventGroupByOutputType[P]>
            : GetScalarType<T[P], CaseActivityEventGroupByOutputType[P]>
        }
      >
    >


  export type CaseActivityEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    actorUserId?: boolean
    actorCustomerId?: boolean
    eventType?: boolean
    metadata?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    actorUser?: boolean | CaseActivityEvent$actorUserArgs<ExtArgs>
    actorCustomer?: boolean | CaseActivityEvent$actorCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseActivityEvent"]>

  export type CaseActivityEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    actorUserId?: boolean
    actorCustomerId?: boolean
    eventType?: boolean
    metadata?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    actorUser?: boolean | CaseActivityEvent$actorUserArgs<ExtArgs>
    actorCustomer?: boolean | CaseActivityEvent$actorCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseActivityEvent"]>

  export type CaseActivityEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    actorUserId?: boolean
    actorCustomerId?: boolean
    eventType?: boolean
    metadata?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    actorUser?: boolean | CaseActivityEvent$actorUserArgs<ExtArgs>
    actorCustomer?: boolean | CaseActivityEvent$actorCustomerArgs<ExtArgs>
  }, ExtArgs["result"]["caseActivityEvent"]>

  export type CaseActivityEventSelectScalar = {
    id?: boolean
    organizationId?: boolean
    caseId?: boolean
    actorUserId?: boolean
    actorCustomerId?: boolean
    eventType?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type CaseActivityEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "caseId" | "actorUserId" | "actorCustomerId" | "eventType" | "metadata" | "createdAt", ExtArgs["result"]["caseActivityEvent"]>
  export type CaseActivityEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    actorUser?: boolean | CaseActivityEvent$actorUserArgs<ExtArgs>
    actorCustomer?: boolean | CaseActivityEvent$actorCustomerArgs<ExtArgs>
  }
  export type CaseActivityEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    actorUser?: boolean | CaseActivityEvent$actorUserArgs<ExtArgs>
    actorCustomer?: boolean | CaseActivityEvent$actorCustomerArgs<ExtArgs>
  }
  export type CaseActivityEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    case?: boolean | CaseDefaultArgs<ExtArgs>
    actorUser?: boolean | CaseActivityEvent$actorUserArgs<ExtArgs>
    actorCustomer?: boolean | CaseActivityEvent$actorCustomerArgs<ExtArgs>
  }

  export type $CaseActivityEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseActivityEvent"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      case: Prisma.$CasePayload<ExtArgs>
      actorUser: Prisma.$UserPayload<ExtArgs> | null
      actorCustomer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      caseId: string
      actorUserId: string | null
      actorCustomerId: string | null
      eventType: string
      metadata: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["caseActivityEvent"]>
    composites: {}
  }

  type CaseActivityEventGetPayload<S extends boolean | null | undefined | CaseActivityEventDefaultArgs> = $Result.GetResult<Prisma.$CaseActivityEventPayload, S>

  type CaseActivityEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseActivityEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseActivityEventCountAggregateInputType | true
    }

  export interface CaseActivityEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseActivityEvent'], meta: { name: 'CaseActivityEvent' } }
    /**
     * Find zero or one CaseActivityEvent that matches the filter.
     * @param {CaseActivityEventFindUniqueArgs} args - Arguments to find a CaseActivityEvent
     * @example
     * // Get one CaseActivityEvent
     * const caseActivityEvent = await prisma.caseActivityEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseActivityEventFindUniqueArgs>(args: SelectSubset<T, CaseActivityEventFindUniqueArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseActivityEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseActivityEventFindUniqueOrThrowArgs} args - Arguments to find a CaseActivityEvent
     * @example
     * // Get one CaseActivityEvent
     * const caseActivityEvent = await prisma.caseActivityEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseActivityEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseActivityEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseActivityEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseActivityEventFindFirstArgs} args - Arguments to find a CaseActivityEvent
     * @example
     * // Get one CaseActivityEvent
     * const caseActivityEvent = await prisma.caseActivityEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseActivityEventFindFirstArgs>(args?: SelectSubset<T, CaseActivityEventFindFirstArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseActivityEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseActivityEventFindFirstOrThrowArgs} args - Arguments to find a CaseActivityEvent
     * @example
     * // Get one CaseActivityEvent
     * const caseActivityEvent = await prisma.caseActivityEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseActivityEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseActivityEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseActivityEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseActivityEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseActivityEvents
     * const caseActivityEvents = await prisma.caseActivityEvent.findMany()
     * 
     * // Get first 10 CaseActivityEvents
     * const caseActivityEvents = await prisma.caseActivityEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseActivityEventWithIdOnly = await prisma.caseActivityEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseActivityEventFindManyArgs>(args?: SelectSubset<T, CaseActivityEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseActivityEvent.
     * @param {CaseActivityEventCreateArgs} args - Arguments to create a CaseActivityEvent.
     * @example
     * // Create one CaseActivityEvent
     * const CaseActivityEvent = await prisma.caseActivityEvent.create({
     *   data: {
     *     // ... data to create a CaseActivityEvent
     *   }
     * })
     * 
     */
    create<T extends CaseActivityEventCreateArgs>(args: SelectSubset<T, CaseActivityEventCreateArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseActivityEvents.
     * @param {CaseActivityEventCreateManyArgs} args - Arguments to create many CaseActivityEvents.
     * @example
     * // Create many CaseActivityEvents
     * const caseActivityEvent = await prisma.caseActivityEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseActivityEventCreateManyArgs>(args?: SelectSubset<T, CaseActivityEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseActivityEvents and returns the data saved in the database.
     * @param {CaseActivityEventCreateManyAndReturnArgs} args - Arguments to create many CaseActivityEvents.
     * @example
     * // Create many CaseActivityEvents
     * const caseActivityEvent = await prisma.caseActivityEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseActivityEvents and only return the `id`
     * const caseActivityEventWithIdOnly = await prisma.caseActivityEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseActivityEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseActivityEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseActivityEvent.
     * @param {CaseActivityEventDeleteArgs} args - Arguments to delete one CaseActivityEvent.
     * @example
     * // Delete one CaseActivityEvent
     * const CaseActivityEvent = await prisma.caseActivityEvent.delete({
     *   where: {
     *     // ... filter to delete one CaseActivityEvent
     *   }
     * })
     * 
     */
    delete<T extends CaseActivityEventDeleteArgs>(args: SelectSubset<T, CaseActivityEventDeleteArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseActivityEvent.
     * @param {CaseActivityEventUpdateArgs} args - Arguments to update one CaseActivityEvent.
     * @example
     * // Update one CaseActivityEvent
     * const caseActivityEvent = await prisma.caseActivityEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseActivityEventUpdateArgs>(args: SelectSubset<T, CaseActivityEventUpdateArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseActivityEvents.
     * @param {CaseActivityEventDeleteManyArgs} args - Arguments to filter CaseActivityEvents to delete.
     * @example
     * // Delete a few CaseActivityEvents
     * const { count } = await prisma.caseActivityEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseActivityEventDeleteManyArgs>(args?: SelectSubset<T, CaseActivityEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseActivityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseActivityEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseActivityEvents
     * const caseActivityEvent = await prisma.caseActivityEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseActivityEventUpdateManyArgs>(args: SelectSubset<T, CaseActivityEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseActivityEvents and returns the data updated in the database.
     * @param {CaseActivityEventUpdateManyAndReturnArgs} args - Arguments to update many CaseActivityEvents.
     * @example
     * // Update many CaseActivityEvents
     * const caseActivityEvent = await prisma.caseActivityEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseActivityEvents and only return the `id`
     * const caseActivityEventWithIdOnly = await prisma.caseActivityEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseActivityEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseActivityEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseActivityEvent.
     * @param {CaseActivityEventUpsertArgs} args - Arguments to update or create a CaseActivityEvent.
     * @example
     * // Update or create a CaseActivityEvent
     * const caseActivityEvent = await prisma.caseActivityEvent.upsert({
     *   create: {
     *     // ... data to create a CaseActivityEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseActivityEvent we want to update
     *   }
     * })
     */
    upsert<T extends CaseActivityEventUpsertArgs>(args: SelectSubset<T, CaseActivityEventUpsertArgs<ExtArgs>>): Prisma__CaseActivityEventClient<$Result.GetResult<Prisma.$CaseActivityEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseActivityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseActivityEventCountArgs} args - Arguments to filter CaseActivityEvents to count.
     * @example
     * // Count the number of CaseActivityEvents
     * const count = await prisma.caseActivityEvent.count({
     *   where: {
     *     // ... the filter for the CaseActivityEvents we want to count
     *   }
     * })
    **/
    count<T extends CaseActivityEventCountArgs>(
      args?: Subset<T, CaseActivityEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseActivityEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseActivityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseActivityEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseActivityEventAggregateArgs>(args: Subset<T, CaseActivityEventAggregateArgs>): Prisma.PrismaPromise<GetCaseActivityEventAggregateType<T>>

    /**
     * Group by CaseActivityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseActivityEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseActivityEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseActivityEventGroupByArgs['orderBy'] }
        : { orderBy?: CaseActivityEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseActivityEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseActivityEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseActivityEvent model
   */
  readonly fields: CaseActivityEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseActivityEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseActivityEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actorUser<T extends CaseActivityEvent$actorUserArgs<ExtArgs> = {}>(args?: Subset<T, CaseActivityEvent$actorUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    actorCustomer<T extends CaseActivityEvent$actorCustomerArgs<ExtArgs> = {}>(args?: Subset<T, CaseActivityEvent$actorCustomerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CaseActivityEvent model
   */
  interface CaseActivityEventFieldRefs {
    readonly id: FieldRef<"CaseActivityEvent", 'String'>
    readonly organizationId: FieldRef<"CaseActivityEvent", 'String'>
    readonly caseId: FieldRef<"CaseActivityEvent", 'String'>
    readonly actorUserId: FieldRef<"CaseActivityEvent", 'String'>
    readonly actorCustomerId: FieldRef<"CaseActivityEvent", 'String'>
    readonly eventType: FieldRef<"CaseActivityEvent", 'String'>
    readonly metadata: FieldRef<"CaseActivityEvent", 'Json'>
    readonly createdAt: FieldRef<"CaseActivityEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseActivityEvent findUnique
   */
  export type CaseActivityEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * Filter, which CaseActivityEvent to fetch.
     */
    where: CaseActivityEventWhereUniqueInput
  }

  /**
   * CaseActivityEvent findUniqueOrThrow
   */
  export type CaseActivityEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * Filter, which CaseActivityEvent to fetch.
     */
    where: CaseActivityEventWhereUniqueInput
  }

  /**
   * CaseActivityEvent findFirst
   */
  export type CaseActivityEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * Filter, which CaseActivityEvent to fetch.
     */
    where?: CaseActivityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseActivityEvents to fetch.
     */
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseActivityEvents.
     */
    cursor?: CaseActivityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseActivityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseActivityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseActivityEvents.
     */
    distinct?: CaseActivityEventScalarFieldEnum | CaseActivityEventScalarFieldEnum[]
  }

  /**
   * CaseActivityEvent findFirstOrThrow
   */
  export type CaseActivityEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * Filter, which CaseActivityEvent to fetch.
     */
    where?: CaseActivityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseActivityEvents to fetch.
     */
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseActivityEvents.
     */
    cursor?: CaseActivityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseActivityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseActivityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseActivityEvents.
     */
    distinct?: CaseActivityEventScalarFieldEnum | CaseActivityEventScalarFieldEnum[]
  }

  /**
   * CaseActivityEvent findMany
   */
  export type CaseActivityEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * Filter, which CaseActivityEvents to fetch.
     */
    where?: CaseActivityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseActivityEvents to fetch.
     */
    orderBy?: CaseActivityEventOrderByWithRelationInput | CaseActivityEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseActivityEvents.
     */
    cursor?: CaseActivityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseActivityEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseActivityEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseActivityEvents.
     */
    distinct?: CaseActivityEventScalarFieldEnum | CaseActivityEventScalarFieldEnum[]
  }

  /**
   * CaseActivityEvent create
   */
  export type CaseActivityEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseActivityEvent.
     */
    data: XOR<CaseActivityEventCreateInput, CaseActivityEventUncheckedCreateInput>
  }

  /**
   * CaseActivityEvent createMany
   */
  export type CaseActivityEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseActivityEvents.
     */
    data: CaseActivityEventCreateManyInput | CaseActivityEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseActivityEvent createManyAndReturn
   */
  export type CaseActivityEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * The data used to create many CaseActivityEvents.
     */
    data: CaseActivityEventCreateManyInput | CaseActivityEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseActivityEvent update
   */
  export type CaseActivityEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseActivityEvent.
     */
    data: XOR<CaseActivityEventUpdateInput, CaseActivityEventUncheckedUpdateInput>
    /**
     * Choose, which CaseActivityEvent to update.
     */
    where: CaseActivityEventWhereUniqueInput
  }

  /**
   * CaseActivityEvent updateMany
   */
  export type CaseActivityEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseActivityEvents.
     */
    data: XOR<CaseActivityEventUpdateManyMutationInput, CaseActivityEventUncheckedUpdateManyInput>
    /**
     * Filter which CaseActivityEvents to update
     */
    where?: CaseActivityEventWhereInput
    /**
     * Limit how many CaseActivityEvents to update.
     */
    limit?: number
  }

  /**
   * CaseActivityEvent updateManyAndReturn
   */
  export type CaseActivityEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * The data used to update CaseActivityEvents.
     */
    data: XOR<CaseActivityEventUpdateManyMutationInput, CaseActivityEventUncheckedUpdateManyInput>
    /**
     * Filter which CaseActivityEvents to update
     */
    where?: CaseActivityEventWhereInput
    /**
     * Limit how many CaseActivityEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseActivityEvent upsert
   */
  export type CaseActivityEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseActivityEvent to update in case it exists.
     */
    where: CaseActivityEventWhereUniqueInput
    /**
     * In case the CaseActivityEvent found by the `where` argument doesn't exist, create a new CaseActivityEvent with this data.
     */
    create: XOR<CaseActivityEventCreateInput, CaseActivityEventUncheckedCreateInput>
    /**
     * In case the CaseActivityEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseActivityEventUpdateInput, CaseActivityEventUncheckedUpdateInput>
  }

  /**
   * CaseActivityEvent delete
   */
  export type CaseActivityEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
    /**
     * Filter which CaseActivityEvent to delete.
     */
    where: CaseActivityEventWhereUniqueInput
  }

  /**
   * CaseActivityEvent deleteMany
   */
  export type CaseActivityEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseActivityEvents to delete
     */
    where?: CaseActivityEventWhereInput
    /**
     * Limit how many CaseActivityEvents to delete.
     */
    limit?: number
  }

  /**
   * CaseActivityEvent.actorUser
   */
  export type CaseActivityEvent$actorUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CaseActivityEvent.actorCustomer
   */
  export type CaseActivityEvent$actorCustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * CaseActivityEvent without action
   */
  export type CaseActivityEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseActivityEvent
     */
    select?: CaseActivityEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseActivityEvent
     */
    omit?: CaseActivityEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseActivityEventInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    industry: 'industry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    email: 'email',
    phone: 'phone',
    externalReference: 'externalReference',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const CaseCategoryScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseCategoryScalarFieldEnum = (typeof CaseCategoryScalarFieldEnum)[keyof typeof CaseCategoryScalarFieldEnum]


  export const WorkflowStatusScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    slug: 'slug',
    color: 'color',
    sortOrder: 'sortOrder',
    isDefault: 'isDefault',
    isClosed: 'isClosed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkflowStatusScalarFieldEnum = (typeof WorkflowStatusScalarFieldEnum)[keyof typeof WorkflowStatusScalarFieldEnum]


  export const CaseScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    customerId: 'customerId',
    assignedUserId: 'assignedUserId',
    categoryId: 'categoryId',
    statusId: 'statusId',
    title: 'title',
    description: 'description',
    priority: 'priority',
    source: 'source',
    intakeData: 'intakeData',
    dueAt: 'dueAt',
    closedAt: 'closedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseScalarFieldEnum = (typeof CaseScalarFieldEnum)[keyof typeof CaseScalarFieldEnum]


  export const CaseCommentScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    caseId: 'caseId',
    authorUserId: 'authorUserId',
    authorCustomerId: 'authorCustomerId',
    body: 'body',
    visibility: 'visibility',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseCommentScalarFieldEnum = (typeof CaseCommentScalarFieldEnum)[keyof typeof CaseCommentScalarFieldEnum]


  export const CaseAttachmentScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    caseId: 'caseId',
    uploadedByUserId: 'uploadedByUserId',
    uploadedByCustomerId: 'uploadedByCustomerId',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    fileType: 'fileType',
    fileSize: 'fileSize',
    visibility: 'visibility',
    createdAt: 'createdAt'
  };

  export type CaseAttachmentScalarFieldEnum = (typeof CaseAttachmentScalarFieldEnum)[keyof typeof CaseAttachmentScalarFieldEnum]


  export const CaseActivityEventScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    caseId: 'caseId',
    actorUserId: 'actorUserId',
    actorCustomerId: 'actorCustomerId',
    eventType: 'eventType',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type CaseActivityEventScalarFieldEnum = (typeof CaseActivityEventScalarFieldEnum)[keyof typeof CaseActivityEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Priority'
   */
  export type EnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority'>
    


  /**
   * Reference to a field of type 'Priority[]'
   */
  export type ListEnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority[]'>
    


  /**
   * Reference to a field of type 'Source'
   */
  export type EnumSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Source'>
    


  /**
   * Reference to a field of type 'Source[]'
   */
  export type ListEnumSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Source[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Visibility'
   */
  export type EnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility'>
    


  /**
   * Reference to a field of type 'Visibility[]'
   */
  export type ListEnumVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Visibility[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    slug?: StringFilter<"Organization"> | string
    industry?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
    customers?: CustomerListRelationFilter
    cases?: CaseListRelationFilter
    categories?: CaseCategoryListRelationFilter
    statuses?: WorkflowStatusListRelationFilter
    comments?: CaseCommentListRelationFilter
    attachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    industry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    customers?: CustomerOrderByRelationAggregateInput
    cases?: CaseOrderByRelationAggregateInput
    categories?: CaseCategoryOrderByRelationAggregateInput
    statuses?: WorkflowStatusOrderByRelationAggregateInput
    comments?: CaseCommentOrderByRelationAggregateInput
    attachments?: CaseAttachmentOrderByRelationAggregateInput
    activityEvents?: CaseActivityEventOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    industry?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
    customers?: CustomerListRelationFilter
    cases?: CaseListRelationFilter
    categories?: CaseCategoryListRelationFilter
    statuses?: WorkflowStatusListRelationFilter
    comments?: CaseCommentListRelationFilter
    attachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }, "id" | "slug">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    industry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    slug?: StringWithAggregatesFilter<"Organization"> | string
    industry?: StringWithAggregatesFilter<"Organization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    organizationId?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    assignedCases?: CaseListRelationFilter
    authoredComments?: CaseCommentListRelationFilter
    uploadedAttachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    assignedCases?: CaseOrderByRelationAggregateInput
    authoredComments?: CaseCommentOrderByRelationAggregateInput
    uploadedAttachments?: CaseAttachmentOrderByRelationAggregateInput
    activityEvents?: CaseActivityEventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    organizationId?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    assignedCases?: CaseListRelationFilter
    authoredComments?: CaseCommentListRelationFilter
    uploadedAttachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    organizationId?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    organizationId?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    externalReference?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    cases?: CaseListRelationFilter
    authoredComments?: CaseCommentListRelationFilter
    uploadedAttachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    externalReference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    cases?: CaseOrderByRelationAggregateInput
    authoredComments?: CaseCommentOrderByRelationAggregateInput
    uploadedAttachments?: CaseAttachmentOrderByRelationAggregateInput
    activityEvents?: CaseActivityEventOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    organizationId?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    externalReference?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    cases?: CaseListRelationFilter
    authoredComments?: CaseCommentListRelationFilter
    uploadedAttachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    externalReference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    organizationId?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    externalReference?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type CaseCategoryWhereInput = {
    AND?: CaseCategoryWhereInput | CaseCategoryWhereInput[]
    OR?: CaseCategoryWhereInput[]
    NOT?: CaseCategoryWhereInput | CaseCategoryWhereInput[]
    id?: StringFilter<"CaseCategory"> | string
    organizationId?: StringFilter<"CaseCategory"> | string
    name?: StringFilter<"CaseCategory"> | string
    slug?: StringFilter<"CaseCategory"> | string
    description?: StringNullableFilter<"CaseCategory"> | string | null
    createdAt?: DateTimeFilter<"CaseCategory"> | Date | string
    updatedAt?: DateTimeFilter<"CaseCategory"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    cases?: CaseListRelationFilter
  }

  export type CaseCategoryOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    cases?: CaseOrderByRelationAggregateInput
  }

  export type CaseCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId_slug?: CaseCategoryOrganizationIdSlugCompoundUniqueInput
    AND?: CaseCategoryWhereInput | CaseCategoryWhereInput[]
    OR?: CaseCategoryWhereInput[]
    NOT?: CaseCategoryWhereInput | CaseCategoryWhereInput[]
    organizationId?: StringFilter<"CaseCategory"> | string
    name?: StringFilter<"CaseCategory"> | string
    slug?: StringFilter<"CaseCategory"> | string
    description?: StringNullableFilter<"CaseCategory"> | string | null
    createdAt?: DateTimeFilter<"CaseCategory"> | Date | string
    updatedAt?: DateTimeFilter<"CaseCategory"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    cases?: CaseListRelationFilter
  }, "id" | "organizationId_slug">

  export type CaseCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseCategoryCountOrderByAggregateInput
    _max?: CaseCategoryMaxOrderByAggregateInput
    _min?: CaseCategoryMinOrderByAggregateInput
  }

  export type CaseCategoryScalarWhereWithAggregatesInput = {
    AND?: CaseCategoryScalarWhereWithAggregatesInput | CaseCategoryScalarWhereWithAggregatesInput[]
    OR?: CaseCategoryScalarWhereWithAggregatesInput[]
    NOT?: CaseCategoryScalarWhereWithAggregatesInput | CaseCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseCategory"> | string
    organizationId?: StringWithAggregatesFilter<"CaseCategory"> | string
    name?: StringWithAggregatesFilter<"CaseCategory"> | string
    slug?: StringWithAggregatesFilter<"CaseCategory"> | string
    description?: StringNullableWithAggregatesFilter<"CaseCategory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CaseCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CaseCategory"> | Date | string
  }

  export type WorkflowStatusWhereInput = {
    AND?: WorkflowStatusWhereInput | WorkflowStatusWhereInput[]
    OR?: WorkflowStatusWhereInput[]
    NOT?: WorkflowStatusWhereInput | WorkflowStatusWhereInput[]
    id?: StringFilter<"WorkflowStatus"> | string
    organizationId?: StringFilter<"WorkflowStatus"> | string
    name?: StringFilter<"WorkflowStatus"> | string
    slug?: StringFilter<"WorkflowStatus"> | string
    color?: StringNullableFilter<"WorkflowStatus"> | string | null
    sortOrder?: IntFilter<"WorkflowStatus"> | number
    isDefault?: BoolFilter<"WorkflowStatus"> | boolean
    isClosed?: BoolFilter<"WorkflowStatus"> | boolean
    createdAt?: DateTimeFilter<"WorkflowStatus"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowStatus"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    cases?: CaseListRelationFilter
  }

  export type WorkflowStatusOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    color?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isDefault?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    cases?: CaseOrderByRelationAggregateInput
  }

  export type WorkflowStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId_slug?: WorkflowStatusOrganizationIdSlugCompoundUniqueInput
    AND?: WorkflowStatusWhereInput | WorkflowStatusWhereInput[]
    OR?: WorkflowStatusWhereInput[]
    NOT?: WorkflowStatusWhereInput | WorkflowStatusWhereInput[]
    organizationId?: StringFilter<"WorkflowStatus"> | string
    name?: StringFilter<"WorkflowStatus"> | string
    slug?: StringFilter<"WorkflowStatus"> | string
    color?: StringNullableFilter<"WorkflowStatus"> | string | null
    sortOrder?: IntFilter<"WorkflowStatus"> | number
    isDefault?: BoolFilter<"WorkflowStatus"> | boolean
    isClosed?: BoolFilter<"WorkflowStatus"> | boolean
    createdAt?: DateTimeFilter<"WorkflowStatus"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowStatus"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    cases?: CaseListRelationFilter
  }, "id" | "organizationId_slug">

  export type WorkflowStatusOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    color?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isDefault?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkflowStatusCountOrderByAggregateInput
    _avg?: WorkflowStatusAvgOrderByAggregateInput
    _max?: WorkflowStatusMaxOrderByAggregateInput
    _min?: WorkflowStatusMinOrderByAggregateInput
    _sum?: WorkflowStatusSumOrderByAggregateInput
  }

  export type WorkflowStatusScalarWhereWithAggregatesInput = {
    AND?: WorkflowStatusScalarWhereWithAggregatesInput | WorkflowStatusScalarWhereWithAggregatesInput[]
    OR?: WorkflowStatusScalarWhereWithAggregatesInput[]
    NOT?: WorkflowStatusScalarWhereWithAggregatesInput | WorkflowStatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowStatus"> | string
    organizationId?: StringWithAggregatesFilter<"WorkflowStatus"> | string
    name?: StringWithAggregatesFilter<"WorkflowStatus"> | string
    slug?: StringWithAggregatesFilter<"WorkflowStatus"> | string
    color?: StringNullableWithAggregatesFilter<"WorkflowStatus"> | string | null
    sortOrder?: IntWithAggregatesFilter<"WorkflowStatus"> | number
    isDefault?: BoolWithAggregatesFilter<"WorkflowStatus"> | boolean
    isClosed?: BoolWithAggregatesFilter<"WorkflowStatus"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WorkflowStatus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkflowStatus"> | Date | string
  }

  export type CaseWhereInput = {
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    id?: StringFilter<"Case"> | string
    organizationId?: StringFilter<"Case"> | string
    customerId?: StringFilter<"Case"> | string
    assignedUserId?: StringNullableFilter<"Case"> | string | null
    categoryId?: StringNullableFilter<"Case"> | string | null
    statusId?: StringFilter<"Case"> | string
    title?: StringFilter<"Case"> | string
    description?: StringNullableFilter<"Case"> | string | null
    priority?: EnumPriorityFilter<"Case"> | $Enums.Priority
    source?: EnumSourceFilter<"Case"> | $Enums.Source
    intakeData?: JsonFilter<"Case">
    dueAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    assignedUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    category?: XOR<CaseCategoryNullableScalarRelationFilter, CaseCategoryWhereInput> | null
    status?: XOR<WorkflowStatusScalarRelationFilter, WorkflowStatusWhereInput>
    comments?: CaseCommentListRelationFilter
    attachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }

  export type CaseOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    customerId?: SortOrder
    assignedUserId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    statusId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    priority?: SortOrder
    source?: SortOrder
    intakeData?: SortOrder
    dueAt?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
    assignedUser?: UserOrderByWithRelationInput
    category?: CaseCategoryOrderByWithRelationInput
    status?: WorkflowStatusOrderByWithRelationInput
    comments?: CaseCommentOrderByRelationAggregateInput
    attachments?: CaseAttachmentOrderByRelationAggregateInput
    activityEvents?: CaseActivityEventOrderByRelationAggregateInput
  }

  export type CaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    organizationId?: StringFilter<"Case"> | string
    customerId?: StringFilter<"Case"> | string
    assignedUserId?: StringNullableFilter<"Case"> | string | null
    categoryId?: StringNullableFilter<"Case"> | string | null
    statusId?: StringFilter<"Case"> | string
    title?: StringFilter<"Case"> | string
    description?: StringNullableFilter<"Case"> | string | null
    priority?: EnumPriorityFilter<"Case"> | $Enums.Priority
    source?: EnumSourceFilter<"Case"> | $Enums.Source
    intakeData?: JsonFilter<"Case">
    dueAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    assignedUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    category?: XOR<CaseCategoryNullableScalarRelationFilter, CaseCategoryWhereInput> | null
    status?: XOR<WorkflowStatusScalarRelationFilter, WorkflowStatusWhereInput>
    comments?: CaseCommentListRelationFilter
    attachments?: CaseAttachmentListRelationFilter
    activityEvents?: CaseActivityEventListRelationFilter
  }, "id">

  export type CaseOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    customerId?: SortOrder
    assignedUserId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    statusId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    priority?: SortOrder
    source?: SortOrder
    intakeData?: SortOrder
    dueAt?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseCountOrderByAggregateInput
    _max?: CaseMaxOrderByAggregateInput
    _min?: CaseMinOrderByAggregateInput
  }

  export type CaseScalarWhereWithAggregatesInput = {
    AND?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    OR?: CaseScalarWhereWithAggregatesInput[]
    NOT?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Case"> | string
    organizationId?: StringWithAggregatesFilter<"Case"> | string
    customerId?: StringWithAggregatesFilter<"Case"> | string
    assignedUserId?: StringNullableWithAggregatesFilter<"Case"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Case"> | string | null
    statusId?: StringWithAggregatesFilter<"Case"> | string
    title?: StringWithAggregatesFilter<"Case"> | string
    description?: StringNullableWithAggregatesFilter<"Case"> | string | null
    priority?: EnumPriorityWithAggregatesFilter<"Case"> | $Enums.Priority
    source?: EnumSourceWithAggregatesFilter<"Case"> | $Enums.Source
    intakeData?: JsonWithAggregatesFilter<"Case">
    dueAt?: DateTimeNullableWithAggregatesFilter<"Case"> | Date | string | null
    closedAt?: DateTimeNullableWithAggregatesFilter<"Case"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
  }

  export type CaseCommentWhereInput = {
    AND?: CaseCommentWhereInput | CaseCommentWhereInput[]
    OR?: CaseCommentWhereInput[]
    NOT?: CaseCommentWhereInput | CaseCommentWhereInput[]
    id?: StringFilter<"CaseComment"> | string
    organizationId?: StringFilter<"CaseComment"> | string
    caseId?: StringFilter<"CaseComment"> | string
    authorUserId?: StringNullableFilter<"CaseComment"> | string | null
    authorCustomerId?: StringNullableFilter<"CaseComment"> | string | null
    body?: StringFilter<"CaseComment"> | string
    visibility?: EnumVisibilityFilter<"CaseComment"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"CaseComment"> | Date | string
    updatedAt?: DateTimeFilter<"CaseComment"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    authorUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    authorCustomer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type CaseCommentOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    authorUserId?: SortOrderInput | SortOrder
    authorCustomerId?: SortOrderInput | SortOrder
    body?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    case?: CaseOrderByWithRelationInput
    authorUser?: UserOrderByWithRelationInput
    authorCustomer?: CustomerOrderByWithRelationInput
  }

  export type CaseCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseCommentWhereInput | CaseCommentWhereInput[]
    OR?: CaseCommentWhereInput[]
    NOT?: CaseCommentWhereInput | CaseCommentWhereInput[]
    organizationId?: StringFilter<"CaseComment"> | string
    caseId?: StringFilter<"CaseComment"> | string
    authorUserId?: StringNullableFilter<"CaseComment"> | string | null
    authorCustomerId?: StringNullableFilter<"CaseComment"> | string | null
    body?: StringFilter<"CaseComment"> | string
    visibility?: EnumVisibilityFilter<"CaseComment"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"CaseComment"> | Date | string
    updatedAt?: DateTimeFilter<"CaseComment"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    authorUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    authorCustomer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type CaseCommentOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    authorUserId?: SortOrderInput | SortOrder
    authorCustomerId?: SortOrderInput | SortOrder
    body?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseCommentCountOrderByAggregateInput
    _max?: CaseCommentMaxOrderByAggregateInput
    _min?: CaseCommentMinOrderByAggregateInput
  }

  export type CaseCommentScalarWhereWithAggregatesInput = {
    AND?: CaseCommentScalarWhereWithAggregatesInput | CaseCommentScalarWhereWithAggregatesInput[]
    OR?: CaseCommentScalarWhereWithAggregatesInput[]
    NOT?: CaseCommentScalarWhereWithAggregatesInput | CaseCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseComment"> | string
    organizationId?: StringWithAggregatesFilter<"CaseComment"> | string
    caseId?: StringWithAggregatesFilter<"CaseComment"> | string
    authorUserId?: StringNullableWithAggregatesFilter<"CaseComment"> | string | null
    authorCustomerId?: StringNullableWithAggregatesFilter<"CaseComment"> | string | null
    body?: StringWithAggregatesFilter<"CaseComment"> | string
    visibility?: EnumVisibilityWithAggregatesFilter<"CaseComment"> | $Enums.Visibility
    createdAt?: DateTimeWithAggregatesFilter<"CaseComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CaseComment"> | Date | string
  }

  export type CaseAttachmentWhereInput = {
    AND?: CaseAttachmentWhereInput | CaseAttachmentWhereInput[]
    OR?: CaseAttachmentWhereInput[]
    NOT?: CaseAttachmentWhereInput | CaseAttachmentWhereInput[]
    id?: StringFilter<"CaseAttachment"> | string
    organizationId?: StringFilter<"CaseAttachment"> | string
    caseId?: StringFilter<"CaseAttachment"> | string
    uploadedByUserId?: StringNullableFilter<"CaseAttachment"> | string | null
    uploadedByCustomerId?: StringNullableFilter<"CaseAttachment"> | string | null
    fileName?: StringFilter<"CaseAttachment"> | string
    fileUrl?: StringFilter<"CaseAttachment"> | string
    fileType?: StringNullableFilter<"CaseAttachment"> | string | null
    fileSize?: IntNullableFilter<"CaseAttachment"> | number | null
    visibility?: EnumVisibilityFilter<"CaseAttachment"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"CaseAttachment"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    uploadedByUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    uploadedByCustomer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type CaseAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    uploadedByUserId?: SortOrderInput | SortOrder
    uploadedByCustomerId?: SortOrderInput | SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    case?: CaseOrderByWithRelationInput
    uploadedByUser?: UserOrderByWithRelationInput
    uploadedByCustomer?: CustomerOrderByWithRelationInput
  }

  export type CaseAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseAttachmentWhereInput | CaseAttachmentWhereInput[]
    OR?: CaseAttachmentWhereInput[]
    NOT?: CaseAttachmentWhereInput | CaseAttachmentWhereInput[]
    organizationId?: StringFilter<"CaseAttachment"> | string
    caseId?: StringFilter<"CaseAttachment"> | string
    uploadedByUserId?: StringNullableFilter<"CaseAttachment"> | string | null
    uploadedByCustomerId?: StringNullableFilter<"CaseAttachment"> | string | null
    fileName?: StringFilter<"CaseAttachment"> | string
    fileUrl?: StringFilter<"CaseAttachment"> | string
    fileType?: StringNullableFilter<"CaseAttachment"> | string | null
    fileSize?: IntNullableFilter<"CaseAttachment"> | number | null
    visibility?: EnumVisibilityFilter<"CaseAttachment"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"CaseAttachment"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    uploadedByUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    uploadedByCustomer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type CaseAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    uploadedByUserId?: SortOrderInput | SortOrder
    uploadedByCustomerId?: SortOrderInput | SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    _count?: CaseAttachmentCountOrderByAggregateInput
    _avg?: CaseAttachmentAvgOrderByAggregateInput
    _max?: CaseAttachmentMaxOrderByAggregateInput
    _min?: CaseAttachmentMinOrderByAggregateInput
    _sum?: CaseAttachmentSumOrderByAggregateInput
  }

  export type CaseAttachmentScalarWhereWithAggregatesInput = {
    AND?: CaseAttachmentScalarWhereWithAggregatesInput | CaseAttachmentScalarWhereWithAggregatesInput[]
    OR?: CaseAttachmentScalarWhereWithAggregatesInput[]
    NOT?: CaseAttachmentScalarWhereWithAggregatesInput | CaseAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseAttachment"> | string
    organizationId?: StringWithAggregatesFilter<"CaseAttachment"> | string
    caseId?: StringWithAggregatesFilter<"CaseAttachment"> | string
    uploadedByUserId?: StringNullableWithAggregatesFilter<"CaseAttachment"> | string | null
    uploadedByCustomerId?: StringNullableWithAggregatesFilter<"CaseAttachment"> | string | null
    fileName?: StringWithAggregatesFilter<"CaseAttachment"> | string
    fileUrl?: StringWithAggregatesFilter<"CaseAttachment"> | string
    fileType?: StringNullableWithAggregatesFilter<"CaseAttachment"> | string | null
    fileSize?: IntNullableWithAggregatesFilter<"CaseAttachment"> | number | null
    visibility?: EnumVisibilityWithAggregatesFilter<"CaseAttachment"> | $Enums.Visibility
    createdAt?: DateTimeWithAggregatesFilter<"CaseAttachment"> | Date | string
  }

  export type CaseActivityEventWhereInput = {
    AND?: CaseActivityEventWhereInput | CaseActivityEventWhereInput[]
    OR?: CaseActivityEventWhereInput[]
    NOT?: CaseActivityEventWhereInput | CaseActivityEventWhereInput[]
    id?: StringFilter<"CaseActivityEvent"> | string
    organizationId?: StringFilter<"CaseActivityEvent"> | string
    caseId?: StringFilter<"CaseActivityEvent"> | string
    actorUserId?: StringNullableFilter<"CaseActivityEvent"> | string | null
    actorCustomerId?: StringNullableFilter<"CaseActivityEvent"> | string | null
    eventType?: StringFilter<"CaseActivityEvent"> | string
    metadata?: JsonFilter<"CaseActivityEvent">
    createdAt?: DateTimeFilter<"CaseActivityEvent"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    actorUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    actorCustomer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type CaseActivityEventOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorCustomerId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    case?: CaseOrderByWithRelationInput
    actorUser?: UserOrderByWithRelationInput
    actorCustomer?: CustomerOrderByWithRelationInput
  }

  export type CaseActivityEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseActivityEventWhereInput | CaseActivityEventWhereInput[]
    OR?: CaseActivityEventWhereInput[]
    NOT?: CaseActivityEventWhereInput | CaseActivityEventWhereInput[]
    organizationId?: StringFilter<"CaseActivityEvent"> | string
    caseId?: StringFilter<"CaseActivityEvent"> | string
    actorUserId?: StringNullableFilter<"CaseActivityEvent"> | string | null
    actorCustomerId?: StringNullableFilter<"CaseActivityEvent"> | string | null
    eventType?: StringFilter<"CaseActivityEvent"> | string
    metadata?: JsonFilter<"CaseActivityEvent">
    createdAt?: DateTimeFilter<"CaseActivityEvent"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    actorUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    actorCustomer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type CaseActivityEventOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorCustomerId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    _count?: CaseActivityEventCountOrderByAggregateInput
    _max?: CaseActivityEventMaxOrderByAggregateInput
    _min?: CaseActivityEventMinOrderByAggregateInput
  }

  export type CaseActivityEventScalarWhereWithAggregatesInput = {
    AND?: CaseActivityEventScalarWhereWithAggregatesInput | CaseActivityEventScalarWhereWithAggregatesInput[]
    OR?: CaseActivityEventScalarWhereWithAggregatesInput[]
    NOT?: CaseActivityEventScalarWhereWithAggregatesInput | CaseActivityEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseActivityEvent"> | string
    organizationId?: StringWithAggregatesFilter<"CaseActivityEvent"> | string
    caseId?: StringWithAggregatesFilter<"CaseActivityEvent"> | string
    actorUserId?: StringNullableWithAggregatesFilter<"CaseActivityEvent"> | string | null
    actorCustomerId?: StringNullableWithAggregatesFilter<"CaseActivityEvent"> | string | null
    eventType?: StringWithAggregatesFilter<"CaseActivityEvent"> | string
    metadata?: JsonWithAggregatesFilter<"CaseActivityEvent">
    createdAt?: DateTimeWithAggregatesFilter<"CaseActivityEvent"> | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    assignedCases?: CaseCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    organizationId: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedCases?: CaseUncheckedCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    assignedCases?: CaseUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCases?: CaseUncheckedUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    organizationId: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCustomersInput
    cases?: CaseCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    organizationId: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCustomersNestedInput
    cases?: CaseUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    organizationId: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCategoryCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCategoriesInput
    cases?: CaseCreateNestedManyWithoutCategoryInput
  }

  export type CaseCategoryUncheckedCreateInput = {
    id?: string
    organizationId: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CaseCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCategoriesNestedInput
    cases?: CaseUpdateManyWithoutCategoryNestedInput
  }

  export type CaseCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CaseCategoryCreateManyInput = {
    id?: string
    organizationId: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowStatusCreateInput = {
    id?: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutStatusesInput
    cases?: CaseCreateNestedManyWithoutStatusInput
  }

  export type WorkflowStatusUncheckedCreateInput = {
    id?: string
    organizationId: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutStatusInput
  }

  export type WorkflowStatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutStatusesNestedInput
    cases?: CaseUpdateManyWithoutStatusNestedInput
  }

  export type WorkflowStatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutStatusNestedInput
  }

  export type WorkflowStatusCreateManyInput = {
    id?: string
    organizationId: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowStatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowStatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    customer: CustomerCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateManyInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentCreateInput = {
    id?: string
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCommentsInput
    case: CaseCreateNestedOneWithoutCommentsInput
    authorUser?: UserCreateNestedOneWithoutAuthoredCommentsInput
    authorCustomer?: CustomerCreateNestedOneWithoutAuthoredCommentsInput
  }

  export type CaseCommentUncheckedCreateInput = {
    id?: string
    organizationId: string
    caseId: string
    authorUserId?: string | null
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCommentsNestedInput
    case?: CaseUpdateOneRequiredWithoutCommentsNestedInput
    authorUser?: UserUpdateOneWithoutAuthoredCommentsNestedInput
    authorCustomer?: CustomerUpdateOneWithoutAuthoredCommentsNestedInput
  }

  export type CaseCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentCreateManyInput = {
    id?: string
    organizationId: string
    caseId: string
    authorUserId?: string | null
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutAttachmentsInput
    case: CaseCreateNestedOneWithoutAttachmentsInput
    uploadedByUser?: UserCreateNestedOneWithoutUploadedAttachmentsInput
    uploadedByCustomer?: CustomerCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type CaseAttachmentUncheckedCreateInput = {
    id?: string
    organizationId: string
    caseId: string
    uploadedByUserId?: string | null
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutAttachmentsNestedInput
    case?: CaseUpdateOneRequiredWithoutAttachmentsNestedInput
    uploadedByUser?: UserUpdateOneWithoutUploadedAttachmentsNestedInput
    uploadedByCustomer?: CustomerUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type CaseAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentCreateManyInput = {
    id?: string
    organizationId: string
    caseId: string
    uploadedByUserId?: string | null
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventCreateInput = {
    id?: string
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutActivityEventsInput
    case: CaseCreateNestedOneWithoutActivityEventsInput
    actorUser?: UserCreateNestedOneWithoutActivityEventsInput
    actorCustomer?: CustomerCreateNestedOneWithoutActivityEventsInput
  }

  export type CaseActivityEventUncheckedCreateInput = {
    id?: string
    organizationId: string
    caseId: string
    actorUserId?: string | null
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseActivityEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutActivityEventsNestedInput
    case?: CaseUpdateOneRequiredWithoutActivityEventsNestedInput
    actorUser?: UserUpdateOneWithoutActivityEventsNestedInput
    actorCustomer?: CustomerUpdateOneWithoutActivityEventsNestedInput
  }

  export type CaseActivityEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventCreateManyInput = {
    id?: string
    organizationId: string
    caseId: string
    actorUserId?: string | null
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseActivityEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type CustomerListRelationFilter = {
    every?: CustomerWhereInput
    some?: CustomerWhereInput
    none?: CustomerWhereInput
  }

  export type CaseListRelationFilter = {
    every?: CaseWhereInput
    some?: CaseWhereInput
    none?: CaseWhereInput
  }

  export type CaseCategoryListRelationFilter = {
    every?: CaseCategoryWhereInput
    some?: CaseCategoryWhereInput
    none?: CaseCategoryWhereInput
  }

  export type WorkflowStatusListRelationFilter = {
    every?: WorkflowStatusWhereInput
    some?: WorkflowStatusWhereInput
    none?: WorkflowStatusWhereInput
  }

  export type CaseCommentListRelationFilter = {
    every?: CaseCommentWhereInput
    some?: CaseCommentWhereInput
    none?: CaseCommentWhereInput
  }

  export type CaseAttachmentListRelationFilter = {
    every?: CaseAttachmentWhereInput
    some?: CaseAttachmentWhereInput
    none?: CaseAttachmentWhereInput
  }

  export type CaseActivityEventListRelationFilter = {
    every?: CaseActivityEventWhereInput
    some?: CaseActivityEventWhereInput
    none?: CaseActivityEventWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseActivityEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    industry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    industry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    industry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    externalReference?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    externalReference?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    externalReference?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CaseCategoryOrganizationIdSlugCompoundUniqueInput = {
    organizationId: string
    slug: string
  }

  export type CaseCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type WorkflowStatusOrganizationIdSlugCompoundUniqueInput = {
    organizationId: string
    slug: string
  }

  export type WorkflowStatusCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    color?: SortOrder
    sortOrder?: SortOrder
    isDefault?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowStatusAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type WorkflowStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    color?: SortOrder
    sortOrder?: SortOrder
    isDefault?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowStatusMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    color?: SortOrder
    sortOrder?: SortOrder
    isDefault?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowStatusSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type EnumSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceFilter<$PrismaModel> | $Enums.Source
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CaseCategoryNullableScalarRelationFilter = {
    is?: CaseCategoryWhereInput | null
    isNot?: CaseCategoryWhereInput | null
  }

  export type WorkflowStatusScalarRelationFilter = {
    is?: WorkflowStatusWhereInput
    isNot?: WorkflowStatusWhereInput
  }

  export type CaseCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    customerId?: SortOrder
    assignedUserId?: SortOrder
    categoryId?: SortOrder
    statusId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    source?: SortOrder
    intakeData?: SortOrder
    dueAt?: SortOrder
    closedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    customerId?: SortOrder
    assignedUserId?: SortOrder
    categoryId?: SortOrder
    statusId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    source?: SortOrder
    dueAt?: SortOrder
    closedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    customerId?: SortOrder
    assignedUserId?: SortOrder
    categoryId?: SortOrder
    statusId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    priority?: SortOrder
    source?: SortOrder
    dueAt?: SortOrder
    closedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type EnumSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceWithAggregatesFilter<$PrismaModel> | $Enums.Source
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceFilter<$PrismaModel>
    _max?: NestedEnumSourceFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type CaseScalarRelationFilter = {
    is?: CaseWhereInput
    isNot?: CaseWhereInput
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type CaseCommentCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    authorUserId?: SortOrder
    authorCustomerId?: SortOrder
    body?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    authorUserId?: SortOrder
    authorCustomerId?: SortOrder
    body?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseCommentMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    authorUserId?: SortOrder
    authorCustomerId?: SortOrder
    body?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CaseAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    uploadedByUserId?: SortOrder
    uploadedByCustomerId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseAttachmentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type CaseAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    uploadedByUserId?: SortOrder
    uploadedByCustomerId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    uploadedByUserId?: SortOrder
    uploadedByCustomerId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseAttachmentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CaseActivityEventCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    actorUserId?: SortOrder
    actorCustomerId?: SortOrder
    eventType?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseActivityEventMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    actorUserId?: SortOrder
    actorCustomerId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseActivityEventMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    caseId?: SortOrder
    actorUserId?: SortOrder
    actorCustomerId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CustomerCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CustomerCreateWithoutOrganizationInput, CustomerUncheckedCreateWithoutOrganizationInput> | CustomerCreateWithoutOrganizationInput[] | CustomerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutOrganizationInput | CustomerCreateOrConnectWithoutOrganizationInput[]
    createMany?: CustomerCreateManyOrganizationInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type CaseCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseCreateWithoutOrganizationInput, CaseUncheckedCreateWithoutOrganizationInput> | CaseCreateWithoutOrganizationInput[] | CaseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutOrganizationInput | CaseCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseCreateManyOrganizationInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseCategoryCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseCategoryCreateWithoutOrganizationInput, CaseCategoryUncheckedCreateWithoutOrganizationInput> | CaseCategoryCreateWithoutOrganizationInput[] | CaseCategoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCategoryCreateOrConnectWithoutOrganizationInput | CaseCategoryCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseCategoryCreateManyOrganizationInputEnvelope
    connect?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
  }

  export type WorkflowStatusCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<WorkflowStatusCreateWithoutOrganizationInput, WorkflowStatusUncheckedCreateWithoutOrganizationInput> | WorkflowStatusCreateWithoutOrganizationInput[] | WorkflowStatusUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WorkflowStatusCreateOrConnectWithoutOrganizationInput | WorkflowStatusCreateOrConnectWithoutOrganizationInput[]
    createMany?: WorkflowStatusCreateManyOrganizationInputEnvelope
    connect?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
  }

  export type CaseCommentCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseCommentCreateWithoutOrganizationInput, CaseCommentUncheckedCreateWithoutOrganizationInput> | CaseCommentCreateWithoutOrganizationInput[] | CaseCommentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutOrganizationInput | CaseCommentCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseCommentCreateManyOrganizationInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseAttachmentCreateWithoutOrganizationInput, CaseAttachmentUncheckedCreateWithoutOrganizationInput> | CaseAttachmentCreateWithoutOrganizationInput[] | CaseAttachmentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutOrganizationInput | CaseAttachmentCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseAttachmentCreateManyOrganizationInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseActivityEventCreateWithoutOrganizationInput, CaseActivityEventUncheckedCreateWithoutOrganizationInput> | CaseActivityEventCreateWithoutOrganizationInput[] | CaseActivityEventUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutOrganizationInput | CaseActivityEventCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseActivityEventCreateManyOrganizationInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CustomerUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CustomerCreateWithoutOrganizationInput, CustomerUncheckedCreateWithoutOrganizationInput> | CustomerCreateWithoutOrganizationInput[] | CustomerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutOrganizationInput | CustomerCreateOrConnectWithoutOrganizationInput[]
    createMany?: CustomerCreateManyOrganizationInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type CaseUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseCreateWithoutOrganizationInput, CaseUncheckedCreateWithoutOrganizationInput> | CaseCreateWithoutOrganizationInput[] | CaseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutOrganizationInput | CaseCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseCreateManyOrganizationInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseCategoryCreateWithoutOrganizationInput, CaseCategoryUncheckedCreateWithoutOrganizationInput> | CaseCategoryCreateWithoutOrganizationInput[] | CaseCategoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCategoryCreateOrConnectWithoutOrganizationInput | CaseCategoryCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseCategoryCreateManyOrganizationInputEnvelope
    connect?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
  }

  export type WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<WorkflowStatusCreateWithoutOrganizationInput, WorkflowStatusUncheckedCreateWithoutOrganizationInput> | WorkflowStatusCreateWithoutOrganizationInput[] | WorkflowStatusUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WorkflowStatusCreateOrConnectWithoutOrganizationInput | WorkflowStatusCreateOrConnectWithoutOrganizationInput[]
    createMany?: WorkflowStatusCreateManyOrganizationInputEnvelope
    connect?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
  }

  export type CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseCommentCreateWithoutOrganizationInput, CaseCommentUncheckedCreateWithoutOrganizationInput> | CaseCommentCreateWithoutOrganizationInput[] | CaseCommentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutOrganizationInput | CaseCommentCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseCommentCreateManyOrganizationInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseAttachmentCreateWithoutOrganizationInput, CaseAttachmentUncheckedCreateWithoutOrganizationInput> | CaseAttachmentCreateWithoutOrganizationInput[] | CaseAttachmentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutOrganizationInput | CaseAttachmentCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseAttachmentCreateManyOrganizationInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<CaseActivityEventCreateWithoutOrganizationInput, CaseActivityEventUncheckedCreateWithoutOrganizationInput> | CaseActivityEventCreateWithoutOrganizationInput[] | CaseActivityEventUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutOrganizationInput | CaseActivityEventCreateOrConnectWithoutOrganizationInput[]
    createMany?: CaseActivityEventCreateManyOrganizationInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CustomerUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CustomerCreateWithoutOrganizationInput, CustomerUncheckedCreateWithoutOrganizationInput> | CustomerCreateWithoutOrganizationInput[] | CustomerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutOrganizationInput | CustomerCreateOrConnectWithoutOrganizationInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutOrganizationInput | CustomerUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CustomerCreateManyOrganizationInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutOrganizationInput | CustomerUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutOrganizationInput | CustomerUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type CaseUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseCreateWithoutOrganizationInput, CaseUncheckedCreateWithoutOrganizationInput> | CaseCreateWithoutOrganizationInput[] | CaseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutOrganizationInput | CaseCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutOrganizationInput | CaseUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseCreateManyOrganizationInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutOrganizationInput | CaseUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutOrganizationInput | CaseUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseCategoryUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseCategoryCreateWithoutOrganizationInput, CaseCategoryUncheckedCreateWithoutOrganizationInput> | CaseCategoryCreateWithoutOrganizationInput[] | CaseCategoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCategoryCreateOrConnectWithoutOrganizationInput | CaseCategoryCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseCategoryUpsertWithWhereUniqueWithoutOrganizationInput | CaseCategoryUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseCategoryCreateManyOrganizationInputEnvelope
    set?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    disconnect?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    delete?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    connect?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    update?: CaseCategoryUpdateWithWhereUniqueWithoutOrganizationInput | CaseCategoryUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseCategoryUpdateManyWithWhereWithoutOrganizationInput | CaseCategoryUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseCategoryScalarWhereInput | CaseCategoryScalarWhereInput[]
  }

  export type WorkflowStatusUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<WorkflowStatusCreateWithoutOrganizationInput, WorkflowStatusUncheckedCreateWithoutOrganizationInput> | WorkflowStatusCreateWithoutOrganizationInput[] | WorkflowStatusUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WorkflowStatusCreateOrConnectWithoutOrganizationInput | WorkflowStatusCreateOrConnectWithoutOrganizationInput[]
    upsert?: WorkflowStatusUpsertWithWhereUniqueWithoutOrganizationInput | WorkflowStatusUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: WorkflowStatusCreateManyOrganizationInputEnvelope
    set?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    disconnect?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    delete?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    connect?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    update?: WorkflowStatusUpdateWithWhereUniqueWithoutOrganizationInput | WorkflowStatusUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: WorkflowStatusUpdateManyWithWhereWithoutOrganizationInput | WorkflowStatusUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: WorkflowStatusScalarWhereInput | WorkflowStatusScalarWhereInput[]
  }

  export type CaseCommentUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseCommentCreateWithoutOrganizationInput, CaseCommentUncheckedCreateWithoutOrganizationInput> | CaseCommentCreateWithoutOrganizationInput[] | CaseCommentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutOrganizationInput | CaseCommentCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutOrganizationInput | CaseCommentUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseCommentCreateManyOrganizationInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutOrganizationInput | CaseCommentUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutOrganizationInput | CaseCommentUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutOrganizationInput, CaseAttachmentUncheckedCreateWithoutOrganizationInput> | CaseAttachmentCreateWithoutOrganizationInput[] | CaseAttachmentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutOrganizationInput | CaseAttachmentCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutOrganizationInput | CaseAttachmentUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseAttachmentCreateManyOrganizationInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutOrganizationInput | CaseAttachmentUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutOrganizationInput | CaseAttachmentUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutOrganizationInput, CaseActivityEventUncheckedCreateWithoutOrganizationInput> | CaseActivityEventCreateWithoutOrganizationInput[] | CaseActivityEventUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutOrganizationInput | CaseActivityEventCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutOrganizationInput | CaseActivityEventUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseActivityEventCreateManyOrganizationInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutOrganizationInput | CaseActivityEventUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutOrganizationInput | CaseActivityEventUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CustomerUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CustomerCreateWithoutOrganizationInput, CustomerUncheckedCreateWithoutOrganizationInput> | CustomerCreateWithoutOrganizationInput[] | CustomerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutOrganizationInput | CustomerCreateOrConnectWithoutOrganizationInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutOrganizationInput | CustomerUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CustomerCreateManyOrganizationInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutOrganizationInput | CustomerUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutOrganizationInput | CustomerUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type CaseUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseCreateWithoutOrganizationInput, CaseUncheckedCreateWithoutOrganizationInput> | CaseCreateWithoutOrganizationInput[] | CaseUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutOrganizationInput | CaseCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutOrganizationInput | CaseUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseCreateManyOrganizationInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutOrganizationInput | CaseUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutOrganizationInput | CaseUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseCategoryCreateWithoutOrganizationInput, CaseCategoryUncheckedCreateWithoutOrganizationInput> | CaseCategoryCreateWithoutOrganizationInput[] | CaseCategoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCategoryCreateOrConnectWithoutOrganizationInput | CaseCategoryCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseCategoryUpsertWithWhereUniqueWithoutOrganizationInput | CaseCategoryUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseCategoryCreateManyOrganizationInputEnvelope
    set?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    disconnect?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    delete?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    connect?: CaseCategoryWhereUniqueInput | CaseCategoryWhereUniqueInput[]
    update?: CaseCategoryUpdateWithWhereUniqueWithoutOrganizationInput | CaseCategoryUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseCategoryUpdateManyWithWhereWithoutOrganizationInput | CaseCategoryUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseCategoryScalarWhereInput | CaseCategoryScalarWhereInput[]
  }

  export type WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<WorkflowStatusCreateWithoutOrganizationInput, WorkflowStatusUncheckedCreateWithoutOrganizationInput> | WorkflowStatusCreateWithoutOrganizationInput[] | WorkflowStatusUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: WorkflowStatusCreateOrConnectWithoutOrganizationInput | WorkflowStatusCreateOrConnectWithoutOrganizationInput[]
    upsert?: WorkflowStatusUpsertWithWhereUniqueWithoutOrganizationInput | WorkflowStatusUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: WorkflowStatusCreateManyOrganizationInputEnvelope
    set?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    disconnect?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    delete?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    connect?: WorkflowStatusWhereUniqueInput | WorkflowStatusWhereUniqueInput[]
    update?: WorkflowStatusUpdateWithWhereUniqueWithoutOrganizationInput | WorkflowStatusUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: WorkflowStatusUpdateManyWithWhereWithoutOrganizationInput | WorkflowStatusUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: WorkflowStatusScalarWhereInput | WorkflowStatusScalarWhereInput[]
  }

  export type CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseCommentCreateWithoutOrganizationInput, CaseCommentUncheckedCreateWithoutOrganizationInput> | CaseCommentCreateWithoutOrganizationInput[] | CaseCommentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutOrganizationInput | CaseCommentCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutOrganizationInput | CaseCommentUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseCommentCreateManyOrganizationInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutOrganizationInput | CaseCommentUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutOrganizationInput | CaseCommentUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutOrganizationInput, CaseAttachmentUncheckedCreateWithoutOrganizationInput> | CaseAttachmentCreateWithoutOrganizationInput[] | CaseAttachmentUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutOrganizationInput | CaseAttachmentCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutOrganizationInput | CaseAttachmentUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseAttachmentCreateManyOrganizationInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutOrganizationInput | CaseAttachmentUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutOrganizationInput | CaseAttachmentUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutOrganizationInput, CaseActivityEventUncheckedCreateWithoutOrganizationInput> | CaseActivityEventCreateWithoutOrganizationInput[] | CaseActivityEventUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutOrganizationInput | CaseActivityEventCreateOrConnectWithoutOrganizationInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutOrganizationInput | CaseActivityEventUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: CaseActivityEventCreateManyOrganizationInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutOrganizationInput | CaseActivityEventUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutOrganizationInput | CaseActivityEventUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CaseCreateNestedManyWithoutAssignedUserInput = {
    create?: XOR<CaseCreateWithoutAssignedUserInput, CaseUncheckedCreateWithoutAssignedUserInput> | CaseCreateWithoutAssignedUserInput[] | CaseUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutAssignedUserInput | CaseCreateOrConnectWithoutAssignedUserInput[]
    createMany?: CaseCreateManyAssignedUserInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseCommentCreateNestedManyWithoutAuthorUserInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorUserInput, CaseCommentUncheckedCreateWithoutAuthorUserInput> | CaseCommentCreateWithoutAuthorUserInput[] | CaseCommentUncheckedCreateWithoutAuthorUserInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorUserInput | CaseCommentCreateOrConnectWithoutAuthorUserInput[]
    createMany?: CaseCommentCreateManyAuthorUserInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentCreateNestedManyWithoutUploadedByUserInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByUserInput, CaseAttachmentUncheckedCreateWithoutUploadedByUserInput> | CaseAttachmentCreateWithoutUploadedByUserInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByUserInput | CaseAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    createMany?: CaseAttachmentCreateManyUploadedByUserInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventCreateNestedManyWithoutActorUserInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorUserInput, CaseActivityEventUncheckedCreateWithoutActorUserInput> | CaseActivityEventCreateWithoutActorUserInput[] | CaseActivityEventUncheckedCreateWithoutActorUserInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorUserInput | CaseActivityEventCreateOrConnectWithoutActorUserInput[]
    createMany?: CaseActivityEventCreateManyActorUserInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type CaseUncheckedCreateNestedManyWithoutAssignedUserInput = {
    create?: XOR<CaseCreateWithoutAssignedUserInput, CaseUncheckedCreateWithoutAssignedUserInput> | CaseCreateWithoutAssignedUserInput[] | CaseUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutAssignedUserInput | CaseCreateOrConnectWithoutAssignedUserInput[]
    createMany?: CaseCreateManyAssignedUserInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseCommentUncheckedCreateNestedManyWithoutAuthorUserInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorUserInput, CaseCommentUncheckedCreateWithoutAuthorUserInput> | CaseCommentCreateWithoutAuthorUserInput[] | CaseCommentUncheckedCreateWithoutAuthorUserInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorUserInput | CaseCommentCreateOrConnectWithoutAuthorUserInput[]
    createMany?: CaseCommentCreateManyAuthorUserInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByUserInput, CaseAttachmentUncheckedCreateWithoutUploadedByUserInput> | CaseAttachmentCreateWithoutUploadedByUserInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByUserInput | CaseAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    createMany?: CaseAttachmentCreateManyUploadedByUserInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventUncheckedCreateNestedManyWithoutActorUserInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorUserInput, CaseActivityEventUncheckedCreateWithoutActorUserInput> | CaseActivityEventCreateWithoutActorUserInput[] | CaseActivityEventUncheckedCreateWithoutActorUserInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorUserInput | CaseActivityEventCreateOrConnectWithoutActorUserInput[]
    createMany?: CaseActivityEventCreateManyActorUserInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type OrganizationUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    upsert?: OrganizationUpsertWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUsersInput, OrganizationUpdateWithoutUsersInput>, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type CaseUpdateManyWithoutAssignedUserNestedInput = {
    create?: XOR<CaseCreateWithoutAssignedUserInput, CaseUncheckedCreateWithoutAssignedUserInput> | CaseCreateWithoutAssignedUserInput[] | CaseUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutAssignedUserInput | CaseCreateOrConnectWithoutAssignedUserInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutAssignedUserInput | CaseUpsertWithWhereUniqueWithoutAssignedUserInput[]
    createMany?: CaseCreateManyAssignedUserInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutAssignedUserInput | CaseUpdateWithWhereUniqueWithoutAssignedUserInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutAssignedUserInput | CaseUpdateManyWithWhereWithoutAssignedUserInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseCommentUpdateManyWithoutAuthorUserNestedInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorUserInput, CaseCommentUncheckedCreateWithoutAuthorUserInput> | CaseCommentCreateWithoutAuthorUserInput[] | CaseCommentUncheckedCreateWithoutAuthorUserInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorUserInput | CaseCommentCreateOrConnectWithoutAuthorUserInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutAuthorUserInput | CaseCommentUpsertWithWhereUniqueWithoutAuthorUserInput[]
    createMany?: CaseCommentCreateManyAuthorUserInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutAuthorUserInput | CaseCommentUpdateWithWhereUniqueWithoutAuthorUserInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutAuthorUserInput | CaseCommentUpdateManyWithWhereWithoutAuthorUserInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUpdateManyWithoutUploadedByUserNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByUserInput, CaseAttachmentUncheckedCreateWithoutUploadedByUserInput> | CaseAttachmentCreateWithoutUploadedByUserInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByUserInput | CaseAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput | CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput[]
    createMany?: CaseAttachmentCreateManyUploadedByUserInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput | CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutUploadedByUserInput | CaseAttachmentUpdateManyWithWhereWithoutUploadedByUserInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUpdateManyWithoutActorUserNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorUserInput, CaseActivityEventUncheckedCreateWithoutActorUserInput> | CaseActivityEventCreateWithoutActorUserInput[] | CaseActivityEventUncheckedCreateWithoutActorUserInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorUserInput | CaseActivityEventCreateOrConnectWithoutActorUserInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutActorUserInput | CaseActivityEventUpsertWithWhereUniqueWithoutActorUserInput[]
    createMany?: CaseActivityEventCreateManyActorUserInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutActorUserInput | CaseActivityEventUpdateWithWhereUniqueWithoutActorUserInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutActorUserInput | CaseActivityEventUpdateManyWithWhereWithoutActorUserInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type CaseUncheckedUpdateManyWithoutAssignedUserNestedInput = {
    create?: XOR<CaseCreateWithoutAssignedUserInput, CaseUncheckedCreateWithoutAssignedUserInput> | CaseCreateWithoutAssignedUserInput[] | CaseUncheckedCreateWithoutAssignedUserInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutAssignedUserInput | CaseCreateOrConnectWithoutAssignedUserInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutAssignedUserInput | CaseUpsertWithWhereUniqueWithoutAssignedUserInput[]
    createMany?: CaseCreateManyAssignedUserInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutAssignedUserInput | CaseUpdateWithWhereUniqueWithoutAssignedUserInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutAssignedUserInput | CaseUpdateManyWithWhereWithoutAssignedUserInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseCommentUncheckedUpdateManyWithoutAuthorUserNestedInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorUserInput, CaseCommentUncheckedCreateWithoutAuthorUserInput> | CaseCommentCreateWithoutAuthorUserInput[] | CaseCommentUncheckedCreateWithoutAuthorUserInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorUserInput | CaseCommentCreateOrConnectWithoutAuthorUserInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutAuthorUserInput | CaseCommentUpsertWithWhereUniqueWithoutAuthorUserInput[]
    createMany?: CaseCommentCreateManyAuthorUserInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutAuthorUserInput | CaseCommentUpdateWithWhereUniqueWithoutAuthorUserInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutAuthorUserInput | CaseCommentUpdateManyWithWhereWithoutAuthorUserInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByUserInput, CaseAttachmentUncheckedCreateWithoutUploadedByUserInput> | CaseAttachmentCreateWithoutUploadedByUserInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByUserInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByUserInput | CaseAttachmentCreateOrConnectWithoutUploadedByUserInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput | CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput[]
    createMany?: CaseAttachmentCreateManyUploadedByUserInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput | CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutUploadedByUserInput | CaseAttachmentUpdateManyWithWhereWithoutUploadedByUserInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutActorUserNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorUserInput, CaseActivityEventUncheckedCreateWithoutActorUserInput> | CaseActivityEventCreateWithoutActorUserInput[] | CaseActivityEventUncheckedCreateWithoutActorUserInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorUserInput | CaseActivityEventCreateOrConnectWithoutActorUserInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutActorUserInput | CaseActivityEventUpsertWithWhereUniqueWithoutActorUserInput[]
    createMany?: CaseActivityEventCreateManyActorUserInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutActorUserInput | CaseActivityEventUpdateWithWhereUniqueWithoutActorUserInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutActorUserInput | CaseActivityEventUpdateManyWithWhereWithoutActorUserInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutCustomersInput = {
    create?: XOR<OrganizationCreateWithoutCustomersInput, OrganizationUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCustomersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CaseCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseCommentCreateNestedManyWithoutAuthorCustomerInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorCustomerInput, CaseCommentUncheckedCreateWithoutAuthorCustomerInput> | CaseCommentCreateWithoutAuthorCustomerInput[] | CaseCommentUncheckedCreateWithoutAuthorCustomerInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorCustomerInput | CaseCommentCreateOrConnectWithoutAuthorCustomerInput[]
    createMany?: CaseCommentCreateManyAuthorCustomerInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentCreateNestedManyWithoutUploadedByCustomerInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput> | CaseAttachmentCreateWithoutUploadedByCustomerInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput | CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput[]
    createMany?: CaseAttachmentCreateManyUploadedByCustomerInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventCreateNestedManyWithoutActorCustomerInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorCustomerInput, CaseActivityEventUncheckedCreateWithoutActorCustomerInput> | CaseActivityEventCreateWithoutActorCustomerInput[] | CaseActivityEventUncheckedCreateWithoutActorCustomerInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorCustomerInput | CaseActivityEventCreateOrConnectWithoutActorCustomerInput[]
    createMany?: CaseActivityEventCreateManyActorCustomerInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type CaseUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseCommentUncheckedCreateNestedManyWithoutAuthorCustomerInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorCustomerInput, CaseCommentUncheckedCreateWithoutAuthorCustomerInput> | CaseCommentCreateWithoutAuthorCustomerInput[] | CaseCommentUncheckedCreateWithoutAuthorCustomerInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorCustomerInput | CaseCommentCreateOrConnectWithoutAuthorCustomerInput[]
    createMany?: CaseCommentCreateManyAuthorCustomerInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByCustomerInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput> | CaseAttachmentCreateWithoutUploadedByCustomerInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput | CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput[]
    createMany?: CaseAttachmentCreateManyUploadedByCustomerInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventUncheckedCreateNestedManyWithoutActorCustomerInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorCustomerInput, CaseActivityEventUncheckedCreateWithoutActorCustomerInput> | CaseActivityEventCreateWithoutActorCustomerInput[] | CaseActivityEventUncheckedCreateWithoutActorCustomerInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorCustomerInput | CaseActivityEventCreateOrConnectWithoutActorCustomerInput[]
    createMany?: CaseActivityEventCreateManyActorCustomerInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type OrganizationUpdateOneRequiredWithoutCustomersNestedInput = {
    create?: XOR<OrganizationCreateWithoutCustomersInput, OrganizationUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCustomersInput
    upsert?: OrganizationUpsertWithoutCustomersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutCustomersInput, OrganizationUpdateWithoutCustomersInput>, OrganizationUncheckedUpdateWithoutCustomersInput>
  }

  export type CaseUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutCustomerInput | CaseUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutCustomerInput | CaseUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutCustomerInput | CaseUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseCommentUpdateManyWithoutAuthorCustomerNestedInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorCustomerInput, CaseCommentUncheckedCreateWithoutAuthorCustomerInput> | CaseCommentCreateWithoutAuthorCustomerInput[] | CaseCommentUncheckedCreateWithoutAuthorCustomerInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorCustomerInput | CaseCommentCreateOrConnectWithoutAuthorCustomerInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutAuthorCustomerInput | CaseCommentUpsertWithWhereUniqueWithoutAuthorCustomerInput[]
    createMany?: CaseCommentCreateManyAuthorCustomerInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutAuthorCustomerInput | CaseCommentUpdateWithWhereUniqueWithoutAuthorCustomerInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutAuthorCustomerInput | CaseCommentUpdateManyWithWhereWithoutAuthorCustomerInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUpdateManyWithoutUploadedByCustomerNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput> | CaseAttachmentCreateWithoutUploadedByCustomerInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput | CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByCustomerInput | CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByCustomerInput[]
    createMany?: CaseAttachmentCreateManyUploadedByCustomerInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByCustomerInput | CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByCustomerInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutUploadedByCustomerInput | CaseAttachmentUpdateManyWithWhereWithoutUploadedByCustomerInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUpdateManyWithoutActorCustomerNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorCustomerInput, CaseActivityEventUncheckedCreateWithoutActorCustomerInput> | CaseActivityEventCreateWithoutActorCustomerInput[] | CaseActivityEventUncheckedCreateWithoutActorCustomerInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorCustomerInput | CaseActivityEventCreateOrConnectWithoutActorCustomerInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutActorCustomerInput | CaseActivityEventUpsertWithWhereUniqueWithoutActorCustomerInput[]
    createMany?: CaseActivityEventCreateManyActorCustomerInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutActorCustomerInput | CaseActivityEventUpdateWithWhereUniqueWithoutActorCustomerInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutActorCustomerInput | CaseActivityEventUpdateManyWithWhereWithoutActorCustomerInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type CaseUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutCustomerInput | CaseUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutCustomerInput | CaseUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutCustomerInput | CaseUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseCommentUncheckedUpdateManyWithoutAuthorCustomerNestedInput = {
    create?: XOR<CaseCommentCreateWithoutAuthorCustomerInput, CaseCommentUncheckedCreateWithoutAuthorCustomerInput> | CaseCommentCreateWithoutAuthorCustomerInput[] | CaseCommentUncheckedCreateWithoutAuthorCustomerInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutAuthorCustomerInput | CaseCommentCreateOrConnectWithoutAuthorCustomerInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutAuthorCustomerInput | CaseCommentUpsertWithWhereUniqueWithoutAuthorCustomerInput[]
    createMany?: CaseCommentCreateManyAuthorCustomerInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutAuthorCustomerInput | CaseCommentUpdateWithWhereUniqueWithoutAuthorCustomerInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutAuthorCustomerInput | CaseCommentUpdateManyWithWhereWithoutAuthorCustomerInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput> | CaseAttachmentCreateWithoutUploadedByCustomerInput[] | CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput | CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByCustomerInput | CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByCustomerInput[]
    createMany?: CaseAttachmentCreateManyUploadedByCustomerInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByCustomerInput | CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByCustomerInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutUploadedByCustomerInput | CaseAttachmentUpdateManyWithWhereWithoutUploadedByCustomerInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutActorCustomerNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutActorCustomerInput, CaseActivityEventUncheckedCreateWithoutActorCustomerInput> | CaseActivityEventCreateWithoutActorCustomerInput[] | CaseActivityEventUncheckedCreateWithoutActorCustomerInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutActorCustomerInput | CaseActivityEventCreateOrConnectWithoutActorCustomerInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutActorCustomerInput | CaseActivityEventUpsertWithWhereUniqueWithoutActorCustomerInput[]
    createMany?: CaseActivityEventCreateManyActorCustomerInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutActorCustomerInput | CaseActivityEventUpdateWithWhereUniqueWithoutActorCustomerInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutActorCustomerInput | CaseActivityEventUpdateManyWithWhereWithoutActorCustomerInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<OrganizationCreateWithoutCategoriesInput, OrganizationUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCategoriesInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CaseCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CaseCreateWithoutCategoryInput, CaseUncheckedCreateWithoutCategoryInput> | CaseCreateWithoutCategoryInput[] | CaseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCategoryInput | CaseCreateOrConnectWithoutCategoryInput[]
    createMany?: CaseCreateManyCategoryInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CaseCreateWithoutCategoryInput, CaseUncheckedCreateWithoutCategoryInput> | CaseCreateWithoutCategoryInput[] | CaseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCategoryInput | CaseCreateOrConnectWithoutCategoryInput[]
    createMany?: CaseCreateManyCategoryInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<OrganizationCreateWithoutCategoriesInput, OrganizationUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCategoriesInput
    upsert?: OrganizationUpsertWithoutCategoriesInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutCategoriesInput, OrganizationUpdateWithoutCategoriesInput>, OrganizationUncheckedUpdateWithoutCategoriesInput>
  }

  export type CaseUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CaseCreateWithoutCategoryInput, CaseUncheckedCreateWithoutCategoryInput> | CaseCreateWithoutCategoryInput[] | CaseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCategoryInput | CaseCreateOrConnectWithoutCategoryInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutCategoryInput | CaseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CaseCreateManyCategoryInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutCategoryInput | CaseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutCategoryInput | CaseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CaseCreateWithoutCategoryInput, CaseUncheckedCreateWithoutCategoryInput> | CaseCreateWithoutCategoryInput[] | CaseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCategoryInput | CaseCreateOrConnectWithoutCategoryInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutCategoryInput | CaseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CaseCreateManyCategoryInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutCategoryInput | CaseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutCategoryInput | CaseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutStatusesInput = {
    create?: XOR<OrganizationCreateWithoutStatusesInput, OrganizationUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutStatusesInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CaseCreateNestedManyWithoutStatusInput = {
    create?: XOR<CaseCreateWithoutStatusInput, CaseUncheckedCreateWithoutStatusInput> | CaseCreateWithoutStatusInput[] | CaseUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutStatusInput | CaseCreateOrConnectWithoutStatusInput[]
    createMany?: CaseCreateManyStatusInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseUncheckedCreateNestedManyWithoutStatusInput = {
    create?: XOR<CaseCreateWithoutStatusInput, CaseUncheckedCreateWithoutStatusInput> | CaseCreateWithoutStatusInput[] | CaseUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutStatusInput | CaseCreateOrConnectWithoutStatusInput[]
    createMany?: CaseCreateManyStatusInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrganizationUpdateOneRequiredWithoutStatusesNestedInput = {
    create?: XOR<OrganizationCreateWithoutStatusesInput, OrganizationUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutStatusesInput
    upsert?: OrganizationUpsertWithoutStatusesInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutStatusesInput, OrganizationUpdateWithoutStatusesInput>, OrganizationUncheckedUpdateWithoutStatusesInput>
  }

  export type CaseUpdateManyWithoutStatusNestedInput = {
    create?: XOR<CaseCreateWithoutStatusInput, CaseUncheckedCreateWithoutStatusInput> | CaseCreateWithoutStatusInput[] | CaseUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutStatusInput | CaseCreateOrConnectWithoutStatusInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutStatusInput | CaseUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: CaseCreateManyStatusInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutStatusInput | CaseUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutStatusInput | CaseUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseUncheckedUpdateManyWithoutStatusNestedInput = {
    create?: XOR<CaseCreateWithoutStatusInput, CaseUncheckedCreateWithoutStatusInput> | CaseCreateWithoutStatusInput[] | CaseUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutStatusInput | CaseCreateOrConnectWithoutStatusInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutStatusInput | CaseUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: CaseCreateManyStatusInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutStatusInput | CaseUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutStatusInput | CaseUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutCasesInput = {
    create?: XOR<OrganizationCreateWithoutCasesInput, OrganizationUncheckedCreateWithoutCasesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCasesInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutCasesInput = {
    create?: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCasesInput
    connect?: CustomerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedCasesInput = {
    create?: XOR<UserCreateWithoutAssignedCasesInput, UserUncheckedCreateWithoutAssignedCasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedCasesInput
    connect?: UserWhereUniqueInput
  }

  export type CaseCategoryCreateNestedOneWithoutCasesInput = {
    create?: XOR<CaseCategoryCreateWithoutCasesInput, CaseCategoryUncheckedCreateWithoutCasesInput>
    connectOrCreate?: CaseCategoryCreateOrConnectWithoutCasesInput
    connect?: CaseCategoryWhereUniqueInput
  }

  export type WorkflowStatusCreateNestedOneWithoutCasesInput = {
    create?: XOR<WorkflowStatusCreateWithoutCasesInput, WorkflowStatusUncheckedCreateWithoutCasesInput>
    connectOrCreate?: WorkflowStatusCreateOrConnectWithoutCasesInput
    connect?: WorkflowStatusWhereUniqueInput
  }

  export type CaseCommentCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseCommentCreateWithoutCaseInput, CaseCommentUncheckedCreateWithoutCaseInput> | CaseCommentCreateWithoutCaseInput[] | CaseCommentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutCaseInput | CaseCommentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseCommentCreateManyCaseInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAttachmentCreateWithoutCaseInput, CaseAttachmentUncheckedCreateWithoutCaseInput> | CaseAttachmentCreateWithoutCaseInput[] | CaseAttachmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutCaseInput | CaseAttachmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAttachmentCreateManyCaseInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseActivityEventCreateWithoutCaseInput, CaseActivityEventUncheckedCreateWithoutCaseInput> | CaseActivityEventCreateWithoutCaseInput[] | CaseActivityEventUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutCaseInput | CaseActivityEventCreateOrConnectWithoutCaseInput[]
    createMany?: CaseActivityEventCreateManyCaseInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type CaseCommentUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseCommentCreateWithoutCaseInput, CaseCommentUncheckedCreateWithoutCaseInput> | CaseCommentCreateWithoutCaseInput[] | CaseCommentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutCaseInput | CaseCommentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseCommentCreateManyCaseInputEnvelope
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
  }

  export type CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAttachmentCreateWithoutCaseInput, CaseAttachmentUncheckedCreateWithoutCaseInput> | CaseAttachmentCreateWithoutCaseInput[] | CaseAttachmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutCaseInput | CaseAttachmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAttachmentCreateManyCaseInputEnvelope
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
  }

  export type CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseActivityEventCreateWithoutCaseInput, CaseActivityEventUncheckedCreateWithoutCaseInput> | CaseActivityEventCreateWithoutCaseInput[] | CaseActivityEventUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutCaseInput | CaseActivityEventCreateOrConnectWithoutCaseInput[]
    createMany?: CaseActivityEventCreateManyCaseInputEnvelope
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
  }

  export type EnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority
  }

  export type EnumSourceFieldUpdateOperationsInput = {
    set?: $Enums.Source
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizationUpdateOneRequiredWithoutCasesNestedInput = {
    create?: XOR<OrganizationCreateWithoutCasesInput, OrganizationUncheckedCreateWithoutCasesInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCasesInput
    upsert?: OrganizationUpsertWithoutCasesInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutCasesInput, OrganizationUpdateWithoutCasesInput>, OrganizationUncheckedUpdateWithoutCasesInput>
  }

  export type CustomerUpdateOneRequiredWithoutCasesNestedInput = {
    create?: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCasesInput
    upsert?: CustomerUpsertWithoutCasesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutCasesInput, CustomerUpdateWithoutCasesInput>, CustomerUncheckedUpdateWithoutCasesInput>
  }

  export type UserUpdateOneWithoutAssignedCasesNestedInput = {
    create?: XOR<UserCreateWithoutAssignedCasesInput, UserUncheckedCreateWithoutAssignedCasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedCasesInput
    upsert?: UserUpsertWithoutAssignedCasesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedCasesInput, UserUpdateWithoutAssignedCasesInput>, UserUncheckedUpdateWithoutAssignedCasesInput>
  }

  export type CaseCategoryUpdateOneWithoutCasesNestedInput = {
    create?: XOR<CaseCategoryCreateWithoutCasesInput, CaseCategoryUncheckedCreateWithoutCasesInput>
    connectOrCreate?: CaseCategoryCreateOrConnectWithoutCasesInput
    upsert?: CaseCategoryUpsertWithoutCasesInput
    disconnect?: CaseCategoryWhereInput | boolean
    delete?: CaseCategoryWhereInput | boolean
    connect?: CaseCategoryWhereUniqueInput
    update?: XOR<XOR<CaseCategoryUpdateToOneWithWhereWithoutCasesInput, CaseCategoryUpdateWithoutCasesInput>, CaseCategoryUncheckedUpdateWithoutCasesInput>
  }

  export type WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput = {
    create?: XOR<WorkflowStatusCreateWithoutCasesInput, WorkflowStatusUncheckedCreateWithoutCasesInput>
    connectOrCreate?: WorkflowStatusCreateOrConnectWithoutCasesInput
    upsert?: WorkflowStatusUpsertWithoutCasesInput
    connect?: WorkflowStatusWhereUniqueInput
    update?: XOR<XOR<WorkflowStatusUpdateToOneWithWhereWithoutCasesInput, WorkflowStatusUpdateWithoutCasesInput>, WorkflowStatusUncheckedUpdateWithoutCasesInput>
  }

  export type CaseCommentUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseCommentCreateWithoutCaseInput, CaseCommentUncheckedCreateWithoutCaseInput> | CaseCommentCreateWithoutCaseInput[] | CaseCommentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutCaseInput | CaseCommentCreateOrConnectWithoutCaseInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutCaseInput | CaseCommentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseCommentCreateManyCaseInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutCaseInput | CaseCommentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutCaseInput | CaseCommentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutCaseInput, CaseAttachmentUncheckedCreateWithoutCaseInput> | CaseAttachmentCreateWithoutCaseInput[] | CaseAttachmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutCaseInput | CaseAttachmentCreateOrConnectWithoutCaseInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutCaseInput | CaseAttachmentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseAttachmentCreateManyCaseInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutCaseInput | CaseAttachmentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutCaseInput | CaseAttachmentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutCaseInput, CaseActivityEventUncheckedCreateWithoutCaseInput> | CaseActivityEventCreateWithoutCaseInput[] | CaseActivityEventUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutCaseInput | CaseActivityEventCreateOrConnectWithoutCaseInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutCaseInput | CaseActivityEventUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseActivityEventCreateManyCaseInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutCaseInput | CaseActivityEventUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutCaseInput | CaseActivityEventUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type CaseCommentUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseCommentCreateWithoutCaseInput, CaseCommentUncheckedCreateWithoutCaseInput> | CaseCommentCreateWithoutCaseInput[] | CaseCommentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseCommentCreateOrConnectWithoutCaseInput | CaseCommentCreateOrConnectWithoutCaseInput[]
    upsert?: CaseCommentUpsertWithWhereUniqueWithoutCaseInput | CaseCommentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseCommentCreateManyCaseInputEnvelope
    set?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    disconnect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    delete?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    connect?: CaseCommentWhereUniqueInput | CaseCommentWhereUniqueInput[]
    update?: CaseCommentUpdateWithWhereUniqueWithoutCaseInput | CaseCommentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseCommentUpdateManyWithWhereWithoutCaseInput | CaseCommentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseAttachmentCreateWithoutCaseInput, CaseAttachmentUncheckedCreateWithoutCaseInput> | CaseAttachmentCreateWithoutCaseInput[] | CaseAttachmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAttachmentCreateOrConnectWithoutCaseInput | CaseAttachmentCreateOrConnectWithoutCaseInput[]
    upsert?: CaseAttachmentUpsertWithWhereUniqueWithoutCaseInput | CaseAttachmentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseAttachmentCreateManyCaseInputEnvelope
    set?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    disconnect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    delete?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    connect?: CaseAttachmentWhereUniqueInput | CaseAttachmentWhereUniqueInput[]
    update?: CaseAttachmentUpdateWithWhereUniqueWithoutCaseInput | CaseAttachmentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseAttachmentUpdateManyWithWhereWithoutCaseInput | CaseAttachmentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseActivityEventCreateWithoutCaseInput, CaseActivityEventUncheckedCreateWithoutCaseInput> | CaseActivityEventCreateWithoutCaseInput[] | CaseActivityEventUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseActivityEventCreateOrConnectWithoutCaseInput | CaseActivityEventCreateOrConnectWithoutCaseInput[]
    upsert?: CaseActivityEventUpsertWithWhereUniqueWithoutCaseInput | CaseActivityEventUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseActivityEventCreateManyCaseInputEnvelope
    set?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    disconnect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    delete?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    connect?: CaseActivityEventWhereUniqueInput | CaseActivityEventWhereUniqueInput[]
    update?: CaseActivityEventUpdateWithWhereUniqueWithoutCaseInput | CaseActivityEventUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseActivityEventUpdateManyWithWhereWithoutCaseInput | CaseActivityEventUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutCommentsInput = {
    create?: XOR<OrganizationCreateWithoutCommentsInput, OrganizationUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCommentsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CaseCreateNestedOneWithoutCommentsInput = {
    create?: XOR<CaseCreateWithoutCommentsInput, CaseUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutCommentsInput
    connect?: CaseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAuthoredCommentsInput = {
    create?: XOR<UserCreateWithoutAuthoredCommentsInput, UserUncheckedCreateWithoutAuthoredCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutAuthoredCommentsInput = {
    create?: XOR<CustomerCreateWithoutAuthoredCommentsInput, CustomerUncheckedCreateWithoutAuthoredCommentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAuthoredCommentsInput
    connect?: CustomerWhereUniqueInput
  }

  export type EnumVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.Visibility
  }

  export type OrganizationUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<OrganizationCreateWithoutCommentsInput, OrganizationUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutCommentsInput
    upsert?: OrganizationUpsertWithoutCommentsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutCommentsInput, OrganizationUpdateWithoutCommentsInput>, OrganizationUncheckedUpdateWithoutCommentsInput>
  }

  export type CaseUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<CaseCreateWithoutCommentsInput, CaseUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutCommentsInput
    upsert?: CaseUpsertWithoutCommentsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutCommentsInput, CaseUpdateWithoutCommentsInput>, CaseUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneWithoutAuthoredCommentsNestedInput = {
    create?: XOR<UserCreateWithoutAuthoredCommentsInput, UserUncheckedCreateWithoutAuthoredCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthoredCommentsInput
    upsert?: UserUpsertWithoutAuthoredCommentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthoredCommentsInput, UserUpdateWithoutAuthoredCommentsInput>, UserUncheckedUpdateWithoutAuthoredCommentsInput>
  }

  export type CustomerUpdateOneWithoutAuthoredCommentsNestedInput = {
    create?: XOR<CustomerCreateWithoutAuthoredCommentsInput, CustomerUncheckedCreateWithoutAuthoredCommentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAuthoredCommentsInput
    upsert?: CustomerUpsertWithoutAuthoredCommentsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutAuthoredCommentsInput, CustomerUpdateWithoutAuthoredCommentsInput>, CustomerUncheckedUpdateWithoutAuthoredCommentsInput>
  }

  export type OrganizationCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<OrganizationCreateWithoutAttachmentsInput, OrganizationUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAttachmentsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CaseCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<CaseCreateWithoutAttachmentsInput, CaseUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAttachmentsInput
    connect?: CaseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUploadedAttachmentsInput = {
    create?: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedAttachmentsInput
    connect?: UserWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutUploadedAttachmentsInput = {
    create?: XOR<CustomerCreateWithoutUploadedAttachmentsInput, CustomerUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUploadedAttachmentsInput
    connect?: CustomerWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrganizationUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<OrganizationCreateWithoutAttachmentsInput, OrganizationUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAttachmentsInput
    upsert?: OrganizationUpsertWithoutAttachmentsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutAttachmentsInput, OrganizationUpdateWithoutAttachmentsInput>, OrganizationUncheckedUpdateWithoutAttachmentsInput>
  }

  export type CaseUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<CaseCreateWithoutAttachmentsInput, CaseUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAttachmentsInput
    upsert?: CaseUpsertWithoutAttachmentsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutAttachmentsInput, CaseUpdateWithoutAttachmentsInput>, CaseUncheckedUpdateWithoutAttachmentsInput>
  }

  export type UserUpdateOneWithoutUploadedAttachmentsNestedInput = {
    create?: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedAttachmentsInput
    upsert?: UserUpsertWithoutUploadedAttachmentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedAttachmentsInput, UserUpdateWithoutUploadedAttachmentsInput>, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
  }

  export type CustomerUpdateOneWithoutUploadedAttachmentsNestedInput = {
    create?: XOR<CustomerCreateWithoutUploadedAttachmentsInput, CustomerUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUploadedAttachmentsInput
    upsert?: CustomerUpsertWithoutUploadedAttachmentsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUploadedAttachmentsInput, CustomerUpdateWithoutUploadedAttachmentsInput>, CustomerUncheckedUpdateWithoutUploadedAttachmentsInput>
  }

  export type OrganizationCreateNestedOneWithoutActivityEventsInput = {
    create?: XOR<OrganizationCreateWithoutActivityEventsInput, OrganizationUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutActivityEventsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type CaseCreateNestedOneWithoutActivityEventsInput = {
    create?: XOR<CaseCreateWithoutActivityEventsInput, CaseUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutActivityEventsInput
    connect?: CaseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActivityEventsInput = {
    create?: XOR<UserCreateWithoutActivityEventsInput, UserUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityEventsInput
    connect?: UserWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutActivityEventsInput = {
    create?: XOR<CustomerCreateWithoutActivityEventsInput, CustomerUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutActivityEventsInput
    connect?: CustomerWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutActivityEventsNestedInput = {
    create?: XOR<OrganizationCreateWithoutActivityEventsInput, OrganizationUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutActivityEventsInput
    upsert?: OrganizationUpsertWithoutActivityEventsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutActivityEventsInput, OrganizationUpdateWithoutActivityEventsInput>, OrganizationUncheckedUpdateWithoutActivityEventsInput>
  }

  export type CaseUpdateOneRequiredWithoutActivityEventsNestedInput = {
    create?: XOR<CaseCreateWithoutActivityEventsInput, CaseUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutActivityEventsInput
    upsert?: CaseUpsertWithoutActivityEventsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutActivityEventsInput, CaseUpdateWithoutActivityEventsInput>, CaseUncheckedUpdateWithoutActivityEventsInput>
  }

  export type UserUpdateOneWithoutActivityEventsNestedInput = {
    create?: XOR<UserCreateWithoutActivityEventsInput, UserUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityEventsInput
    upsert?: UserUpsertWithoutActivityEventsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityEventsInput, UserUpdateWithoutActivityEventsInput>, UserUncheckedUpdateWithoutActivityEventsInput>
  }

  export type CustomerUpdateOneWithoutActivityEventsNestedInput = {
    create?: XOR<CustomerCreateWithoutActivityEventsInput, CustomerUncheckedCreateWithoutActivityEventsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutActivityEventsInput
    upsert?: CustomerUpsertWithoutActivityEventsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutActivityEventsInput, CustomerUpdateWithoutActivityEventsInput>, CustomerUncheckedUpdateWithoutActivityEventsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type NestedEnumSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceFilter<$PrismaModel> | $Enums.Source
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type NestedEnumSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Source | EnumSourceFieldRefInput<$PrismaModel>
    in?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Source[] | ListEnumSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceWithAggregatesFilter<$PrismaModel> | $Enums.Source
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceFilter<$PrismaModel>
    _max?: NestedEnumSourceFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityFilter<$PrismaModel> | $Enums.Visibility
  }

  export type NestedEnumVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Visibility | EnumVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Visibility[] | ListEnumVisibilityFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.Visibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityFilter<$PrismaModel>
    _max?: NestedEnumVisibilityFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserCreateWithoutOrganizationInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedCases?: CaseCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedCases?: CaseUncheckedCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserCreateManyOrganizationInputEnvelope = {
    data: UserCreateManyOrganizationInput | UserCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CustomerCreateWithoutOrganizationInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerCreateOrConnectWithoutOrganizationInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutOrganizationInput, CustomerUncheckedCreateWithoutOrganizationInput>
  }

  export type CustomerCreateManyOrganizationInputEnvelope = {
    data: CustomerCreateManyOrganizationInput | CustomerCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CaseCreateWithoutOrganizationInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutOrganizationInput = {
    id?: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutOrganizationInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutOrganizationInput, CaseUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseCreateManyOrganizationInputEnvelope = {
    data: CaseCreateManyOrganizationInput | CaseCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CaseCategoryCreateWithoutOrganizationInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseCreateNestedManyWithoutCategoryInput
  }

  export type CaseCategoryUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CaseCategoryCreateOrConnectWithoutOrganizationInput = {
    where: CaseCategoryWhereUniqueInput
    create: XOR<CaseCategoryCreateWithoutOrganizationInput, CaseCategoryUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseCategoryCreateManyOrganizationInputEnvelope = {
    data: CaseCategoryCreateManyOrganizationInput | CaseCategoryCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowStatusCreateWithoutOrganizationInput = {
    id?: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseCreateNestedManyWithoutStatusInput
  }

  export type WorkflowStatusUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutStatusInput
  }

  export type WorkflowStatusCreateOrConnectWithoutOrganizationInput = {
    where: WorkflowStatusWhereUniqueInput
    create: XOR<WorkflowStatusCreateWithoutOrganizationInput, WorkflowStatusUncheckedCreateWithoutOrganizationInput>
  }

  export type WorkflowStatusCreateManyOrganizationInputEnvelope = {
    data: WorkflowStatusCreateManyOrganizationInput | WorkflowStatusCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CaseCommentCreateWithoutOrganizationInput = {
    id?: string
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    case: CaseCreateNestedOneWithoutCommentsInput
    authorUser?: UserCreateNestedOneWithoutAuthoredCommentsInput
    authorCustomer?: CustomerCreateNestedOneWithoutAuthoredCommentsInput
  }

  export type CaseCommentUncheckedCreateWithoutOrganizationInput = {
    id?: string
    caseId: string
    authorUserId?: string | null
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentCreateOrConnectWithoutOrganizationInput = {
    where: CaseCommentWhereUniqueInput
    create: XOR<CaseCommentCreateWithoutOrganizationInput, CaseCommentUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseCommentCreateManyOrganizationInputEnvelope = {
    data: CaseCommentCreateManyOrganizationInput | CaseCommentCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CaseAttachmentCreateWithoutOrganizationInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutAttachmentsInput
    uploadedByUser?: UserCreateNestedOneWithoutUploadedAttachmentsInput
    uploadedByCustomer?: CustomerCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type CaseAttachmentUncheckedCreateWithoutOrganizationInput = {
    id?: string
    caseId: string
    uploadedByUserId?: string | null
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseAttachmentCreateOrConnectWithoutOrganizationInput = {
    where: CaseAttachmentWhereUniqueInput
    create: XOR<CaseAttachmentCreateWithoutOrganizationInput, CaseAttachmentUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseAttachmentCreateManyOrganizationInputEnvelope = {
    data: CaseAttachmentCreateManyOrganizationInput | CaseAttachmentCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type CaseActivityEventCreateWithoutOrganizationInput = {
    id?: string
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutActivityEventsInput
    actorUser?: UserCreateNestedOneWithoutActivityEventsInput
    actorCustomer?: CustomerCreateNestedOneWithoutActivityEventsInput
  }

  export type CaseActivityEventUncheckedCreateWithoutOrganizationInput = {
    id?: string
    caseId: string
    actorUserId?: string | null
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateOrConnectWithoutOrganizationInput = {
    where: CaseActivityEventWhereUniqueInput
    create: XOR<CaseActivityEventCreateWithoutOrganizationInput, CaseActivityEventUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseActivityEventCreateManyOrganizationInputEnvelope = {
    data: CaseActivityEventCreateManyOrganizationInput | CaseActivityEventCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    organizationId?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type CustomerUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CustomerWhereUniqueInput
    update: XOR<CustomerUpdateWithoutOrganizationInput, CustomerUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CustomerCreateWithoutOrganizationInput, CustomerUncheckedCreateWithoutOrganizationInput>
  }

  export type CustomerUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CustomerWhereUniqueInput
    data: XOR<CustomerUpdateWithoutOrganizationInput, CustomerUncheckedUpdateWithoutOrganizationInput>
  }

  export type CustomerUpdateManyWithWhereWithoutOrganizationInput = {
    where: CustomerScalarWhereInput
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CustomerScalarWhereInput = {
    AND?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    OR?: CustomerScalarWhereInput[]
    NOT?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    id?: StringFilter<"Customer"> | string
    organizationId?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    externalReference?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }

  export type CaseUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CaseWhereUniqueInput
    update: XOR<CaseUpdateWithoutOrganizationInput, CaseUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CaseCreateWithoutOrganizationInput, CaseUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CaseWhereUniqueInput
    data: XOR<CaseUpdateWithoutOrganizationInput, CaseUncheckedUpdateWithoutOrganizationInput>
  }

  export type CaseUpdateManyWithWhereWithoutOrganizationInput = {
    where: CaseScalarWhereInput
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CaseScalarWhereInput = {
    AND?: CaseScalarWhereInput | CaseScalarWhereInput[]
    OR?: CaseScalarWhereInput[]
    NOT?: CaseScalarWhereInput | CaseScalarWhereInput[]
    id?: StringFilter<"Case"> | string
    organizationId?: StringFilter<"Case"> | string
    customerId?: StringFilter<"Case"> | string
    assignedUserId?: StringNullableFilter<"Case"> | string | null
    categoryId?: StringNullableFilter<"Case"> | string | null
    statusId?: StringFilter<"Case"> | string
    title?: StringFilter<"Case"> | string
    description?: StringNullableFilter<"Case"> | string | null
    priority?: EnumPriorityFilter<"Case"> | $Enums.Priority
    source?: EnumSourceFilter<"Case"> | $Enums.Source
    intakeData?: JsonFilter<"Case">
    dueAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
  }

  export type CaseCategoryUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CaseCategoryWhereUniqueInput
    update: XOR<CaseCategoryUpdateWithoutOrganizationInput, CaseCategoryUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CaseCategoryCreateWithoutOrganizationInput, CaseCategoryUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseCategoryUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CaseCategoryWhereUniqueInput
    data: XOR<CaseCategoryUpdateWithoutOrganizationInput, CaseCategoryUncheckedUpdateWithoutOrganizationInput>
  }

  export type CaseCategoryUpdateManyWithWhereWithoutOrganizationInput = {
    where: CaseCategoryScalarWhereInput
    data: XOR<CaseCategoryUpdateManyMutationInput, CaseCategoryUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CaseCategoryScalarWhereInput = {
    AND?: CaseCategoryScalarWhereInput | CaseCategoryScalarWhereInput[]
    OR?: CaseCategoryScalarWhereInput[]
    NOT?: CaseCategoryScalarWhereInput | CaseCategoryScalarWhereInput[]
    id?: StringFilter<"CaseCategory"> | string
    organizationId?: StringFilter<"CaseCategory"> | string
    name?: StringFilter<"CaseCategory"> | string
    slug?: StringFilter<"CaseCategory"> | string
    description?: StringNullableFilter<"CaseCategory"> | string | null
    createdAt?: DateTimeFilter<"CaseCategory"> | Date | string
    updatedAt?: DateTimeFilter<"CaseCategory"> | Date | string
  }

  export type WorkflowStatusUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: WorkflowStatusWhereUniqueInput
    update: XOR<WorkflowStatusUpdateWithoutOrganizationInput, WorkflowStatusUncheckedUpdateWithoutOrganizationInput>
    create: XOR<WorkflowStatusCreateWithoutOrganizationInput, WorkflowStatusUncheckedCreateWithoutOrganizationInput>
  }

  export type WorkflowStatusUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: WorkflowStatusWhereUniqueInput
    data: XOR<WorkflowStatusUpdateWithoutOrganizationInput, WorkflowStatusUncheckedUpdateWithoutOrganizationInput>
  }

  export type WorkflowStatusUpdateManyWithWhereWithoutOrganizationInput = {
    where: WorkflowStatusScalarWhereInput
    data: XOR<WorkflowStatusUpdateManyMutationInput, WorkflowStatusUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type WorkflowStatusScalarWhereInput = {
    AND?: WorkflowStatusScalarWhereInput | WorkflowStatusScalarWhereInput[]
    OR?: WorkflowStatusScalarWhereInput[]
    NOT?: WorkflowStatusScalarWhereInput | WorkflowStatusScalarWhereInput[]
    id?: StringFilter<"WorkflowStatus"> | string
    organizationId?: StringFilter<"WorkflowStatus"> | string
    name?: StringFilter<"WorkflowStatus"> | string
    slug?: StringFilter<"WorkflowStatus"> | string
    color?: StringNullableFilter<"WorkflowStatus"> | string | null
    sortOrder?: IntFilter<"WorkflowStatus"> | number
    isDefault?: BoolFilter<"WorkflowStatus"> | boolean
    isClosed?: BoolFilter<"WorkflowStatus"> | boolean
    createdAt?: DateTimeFilter<"WorkflowStatus"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowStatus"> | Date | string
  }

  export type CaseCommentUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CaseCommentWhereUniqueInput
    update: XOR<CaseCommentUpdateWithoutOrganizationInput, CaseCommentUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CaseCommentCreateWithoutOrganizationInput, CaseCommentUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseCommentUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CaseCommentWhereUniqueInput
    data: XOR<CaseCommentUpdateWithoutOrganizationInput, CaseCommentUncheckedUpdateWithoutOrganizationInput>
  }

  export type CaseCommentUpdateManyWithWhereWithoutOrganizationInput = {
    where: CaseCommentScalarWhereInput
    data: XOR<CaseCommentUpdateManyMutationInput, CaseCommentUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CaseCommentScalarWhereInput = {
    AND?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
    OR?: CaseCommentScalarWhereInput[]
    NOT?: CaseCommentScalarWhereInput | CaseCommentScalarWhereInput[]
    id?: StringFilter<"CaseComment"> | string
    organizationId?: StringFilter<"CaseComment"> | string
    caseId?: StringFilter<"CaseComment"> | string
    authorUserId?: StringNullableFilter<"CaseComment"> | string | null
    authorCustomerId?: StringNullableFilter<"CaseComment"> | string | null
    body?: StringFilter<"CaseComment"> | string
    visibility?: EnumVisibilityFilter<"CaseComment"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"CaseComment"> | Date | string
    updatedAt?: DateTimeFilter<"CaseComment"> | Date | string
  }

  export type CaseAttachmentUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CaseAttachmentWhereUniqueInput
    update: XOR<CaseAttachmentUpdateWithoutOrganizationInput, CaseAttachmentUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CaseAttachmentCreateWithoutOrganizationInput, CaseAttachmentUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseAttachmentUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CaseAttachmentWhereUniqueInput
    data: XOR<CaseAttachmentUpdateWithoutOrganizationInput, CaseAttachmentUncheckedUpdateWithoutOrganizationInput>
  }

  export type CaseAttachmentUpdateManyWithWhereWithoutOrganizationInput = {
    where: CaseAttachmentScalarWhereInput
    data: XOR<CaseAttachmentUpdateManyMutationInput, CaseAttachmentUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CaseAttachmentScalarWhereInput = {
    AND?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
    OR?: CaseAttachmentScalarWhereInput[]
    NOT?: CaseAttachmentScalarWhereInput | CaseAttachmentScalarWhereInput[]
    id?: StringFilter<"CaseAttachment"> | string
    organizationId?: StringFilter<"CaseAttachment"> | string
    caseId?: StringFilter<"CaseAttachment"> | string
    uploadedByUserId?: StringNullableFilter<"CaseAttachment"> | string | null
    uploadedByCustomerId?: StringNullableFilter<"CaseAttachment"> | string | null
    fileName?: StringFilter<"CaseAttachment"> | string
    fileUrl?: StringFilter<"CaseAttachment"> | string
    fileType?: StringNullableFilter<"CaseAttachment"> | string | null
    fileSize?: IntNullableFilter<"CaseAttachment"> | number | null
    visibility?: EnumVisibilityFilter<"CaseAttachment"> | $Enums.Visibility
    createdAt?: DateTimeFilter<"CaseAttachment"> | Date | string
  }

  export type CaseActivityEventUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: CaseActivityEventWhereUniqueInput
    update: XOR<CaseActivityEventUpdateWithoutOrganizationInput, CaseActivityEventUncheckedUpdateWithoutOrganizationInput>
    create: XOR<CaseActivityEventCreateWithoutOrganizationInput, CaseActivityEventUncheckedCreateWithoutOrganizationInput>
  }

  export type CaseActivityEventUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: CaseActivityEventWhereUniqueInput
    data: XOR<CaseActivityEventUpdateWithoutOrganizationInput, CaseActivityEventUncheckedUpdateWithoutOrganizationInput>
  }

  export type CaseActivityEventUpdateManyWithWhereWithoutOrganizationInput = {
    where: CaseActivityEventScalarWhereInput
    data: XOR<CaseActivityEventUpdateManyMutationInput, CaseActivityEventUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type CaseActivityEventScalarWhereInput = {
    AND?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
    OR?: CaseActivityEventScalarWhereInput[]
    NOT?: CaseActivityEventScalarWhereInput | CaseActivityEventScalarWhereInput[]
    id?: StringFilter<"CaseActivityEvent"> | string
    organizationId?: StringFilter<"CaseActivityEvent"> | string
    caseId?: StringFilter<"CaseActivityEvent"> | string
    actorUserId?: StringNullableFilter<"CaseActivityEvent"> | string | null
    actorCustomerId?: StringNullableFilter<"CaseActivityEvent"> | string | null
    eventType?: StringFilter<"CaseActivityEvent"> | string
    metadata?: JsonFilter<"CaseActivityEvent">
    createdAt?: DateTimeFilter<"CaseActivityEvent"> | Date | string
  }

  export type OrganizationCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
  }

  export type CaseCreateWithoutAssignedUserInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    customer: CustomerCreateNestedOneWithoutCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutAssignedUserInput = {
    id?: string
    organizationId: string
    customerId: string
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutAssignedUserInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutAssignedUserInput, CaseUncheckedCreateWithoutAssignedUserInput>
  }

  export type CaseCreateManyAssignedUserInputEnvelope = {
    data: CaseCreateManyAssignedUserInput | CaseCreateManyAssignedUserInput[]
    skipDuplicates?: boolean
  }

  export type CaseCommentCreateWithoutAuthorUserInput = {
    id?: string
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCommentsInput
    case: CaseCreateNestedOneWithoutCommentsInput
    authorCustomer?: CustomerCreateNestedOneWithoutAuthoredCommentsInput
  }

  export type CaseCommentUncheckedCreateWithoutAuthorUserInput = {
    id?: string
    organizationId: string
    caseId: string
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentCreateOrConnectWithoutAuthorUserInput = {
    where: CaseCommentWhereUniqueInput
    create: XOR<CaseCommentCreateWithoutAuthorUserInput, CaseCommentUncheckedCreateWithoutAuthorUserInput>
  }

  export type CaseCommentCreateManyAuthorUserInputEnvelope = {
    data: CaseCommentCreateManyAuthorUserInput | CaseCommentCreateManyAuthorUserInput[]
    skipDuplicates?: boolean
  }

  export type CaseAttachmentCreateWithoutUploadedByUserInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutAttachmentsInput
    case: CaseCreateNestedOneWithoutAttachmentsInput
    uploadedByCustomer?: CustomerCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type CaseAttachmentUncheckedCreateWithoutUploadedByUserInput = {
    id?: string
    organizationId: string
    caseId: string
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseAttachmentCreateOrConnectWithoutUploadedByUserInput = {
    where: CaseAttachmentWhereUniqueInput
    create: XOR<CaseAttachmentCreateWithoutUploadedByUserInput, CaseAttachmentUncheckedCreateWithoutUploadedByUserInput>
  }

  export type CaseAttachmentCreateManyUploadedByUserInputEnvelope = {
    data: CaseAttachmentCreateManyUploadedByUserInput | CaseAttachmentCreateManyUploadedByUserInput[]
    skipDuplicates?: boolean
  }

  export type CaseActivityEventCreateWithoutActorUserInput = {
    id?: string
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutActivityEventsInput
    case: CaseCreateNestedOneWithoutActivityEventsInput
    actorCustomer?: CustomerCreateNestedOneWithoutActivityEventsInput
  }

  export type CaseActivityEventUncheckedCreateWithoutActorUserInput = {
    id?: string
    organizationId: string
    caseId: string
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateOrConnectWithoutActorUserInput = {
    where: CaseActivityEventWhereUniqueInput
    create: XOR<CaseActivityEventCreateWithoutActorUserInput, CaseActivityEventUncheckedCreateWithoutActorUserInput>
  }

  export type CaseActivityEventCreateManyActorUserInputEnvelope = {
    data: CaseActivityEventCreateManyActorUserInput | CaseActivityEventCreateManyActorUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutUsersInput = {
    update: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CaseUpsertWithWhereUniqueWithoutAssignedUserInput = {
    where: CaseWhereUniqueInput
    update: XOR<CaseUpdateWithoutAssignedUserInput, CaseUncheckedUpdateWithoutAssignedUserInput>
    create: XOR<CaseCreateWithoutAssignedUserInput, CaseUncheckedCreateWithoutAssignedUserInput>
  }

  export type CaseUpdateWithWhereUniqueWithoutAssignedUserInput = {
    where: CaseWhereUniqueInput
    data: XOR<CaseUpdateWithoutAssignedUserInput, CaseUncheckedUpdateWithoutAssignedUserInput>
  }

  export type CaseUpdateManyWithWhereWithoutAssignedUserInput = {
    where: CaseScalarWhereInput
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyWithoutAssignedUserInput>
  }

  export type CaseCommentUpsertWithWhereUniqueWithoutAuthorUserInput = {
    where: CaseCommentWhereUniqueInput
    update: XOR<CaseCommentUpdateWithoutAuthorUserInput, CaseCommentUncheckedUpdateWithoutAuthorUserInput>
    create: XOR<CaseCommentCreateWithoutAuthorUserInput, CaseCommentUncheckedCreateWithoutAuthorUserInput>
  }

  export type CaseCommentUpdateWithWhereUniqueWithoutAuthorUserInput = {
    where: CaseCommentWhereUniqueInput
    data: XOR<CaseCommentUpdateWithoutAuthorUserInput, CaseCommentUncheckedUpdateWithoutAuthorUserInput>
  }

  export type CaseCommentUpdateManyWithWhereWithoutAuthorUserInput = {
    where: CaseCommentScalarWhereInput
    data: XOR<CaseCommentUpdateManyMutationInput, CaseCommentUncheckedUpdateManyWithoutAuthorUserInput>
  }

  export type CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByUserInput = {
    where: CaseAttachmentWhereUniqueInput
    update: XOR<CaseAttachmentUpdateWithoutUploadedByUserInput, CaseAttachmentUncheckedUpdateWithoutUploadedByUserInput>
    create: XOR<CaseAttachmentCreateWithoutUploadedByUserInput, CaseAttachmentUncheckedCreateWithoutUploadedByUserInput>
  }

  export type CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByUserInput = {
    where: CaseAttachmentWhereUniqueInput
    data: XOR<CaseAttachmentUpdateWithoutUploadedByUserInput, CaseAttachmentUncheckedUpdateWithoutUploadedByUserInput>
  }

  export type CaseAttachmentUpdateManyWithWhereWithoutUploadedByUserInput = {
    where: CaseAttachmentScalarWhereInput
    data: XOR<CaseAttachmentUpdateManyMutationInput, CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserInput>
  }

  export type CaseActivityEventUpsertWithWhereUniqueWithoutActorUserInput = {
    where: CaseActivityEventWhereUniqueInput
    update: XOR<CaseActivityEventUpdateWithoutActorUserInput, CaseActivityEventUncheckedUpdateWithoutActorUserInput>
    create: XOR<CaseActivityEventCreateWithoutActorUserInput, CaseActivityEventUncheckedCreateWithoutActorUserInput>
  }

  export type CaseActivityEventUpdateWithWhereUniqueWithoutActorUserInput = {
    where: CaseActivityEventWhereUniqueInput
    data: XOR<CaseActivityEventUpdateWithoutActorUserInput, CaseActivityEventUncheckedUpdateWithoutActorUserInput>
  }

  export type CaseActivityEventUpdateManyWithWhereWithoutActorUserInput = {
    where: CaseActivityEventScalarWhereInput
    data: XOR<CaseActivityEventUpdateManyMutationInput, CaseActivityEventUncheckedUpdateManyWithoutActorUserInput>
  }

  export type OrganizationCreateWithoutCustomersInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutCustomersInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutCustomersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCustomersInput, OrganizationUncheckedCreateWithoutCustomersInput>
  }

  export type CaseCreateWithoutCustomerInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutCustomerInput = {
    id?: string
    organizationId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutCustomerInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput>
  }

  export type CaseCreateManyCustomerInputEnvelope = {
    data: CaseCreateManyCustomerInput | CaseCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CaseCommentCreateWithoutAuthorCustomerInput = {
    id?: string
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCommentsInput
    case: CaseCreateNestedOneWithoutCommentsInput
    authorUser?: UserCreateNestedOneWithoutAuthoredCommentsInput
  }

  export type CaseCommentUncheckedCreateWithoutAuthorCustomerInput = {
    id?: string
    organizationId: string
    caseId: string
    authorUserId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentCreateOrConnectWithoutAuthorCustomerInput = {
    where: CaseCommentWhereUniqueInput
    create: XOR<CaseCommentCreateWithoutAuthorCustomerInput, CaseCommentUncheckedCreateWithoutAuthorCustomerInput>
  }

  export type CaseCommentCreateManyAuthorCustomerInputEnvelope = {
    data: CaseCommentCreateManyAuthorCustomerInput | CaseCommentCreateManyAuthorCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CaseAttachmentCreateWithoutUploadedByCustomerInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutAttachmentsInput
    case: CaseCreateNestedOneWithoutAttachmentsInput
    uploadedByUser?: UserCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput = {
    id?: string
    organizationId: string
    caseId: string
    uploadedByUserId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseAttachmentCreateOrConnectWithoutUploadedByCustomerInput = {
    where: CaseAttachmentWhereUniqueInput
    create: XOR<CaseAttachmentCreateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput>
  }

  export type CaseAttachmentCreateManyUploadedByCustomerInputEnvelope = {
    data: CaseAttachmentCreateManyUploadedByCustomerInput | CaseAttachmentCreateManyUploadedByCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CaseActivityEventCreateWithoutActorCustomerInput = {
    id?: string
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutActivityEventsInput
    case: CaseCreateNestedOneWithoutActivityEventsInput
    actorUser?: UserCreateNestedOneWithoutActivityEventsInput
  }

  export type CaseActivityEventUncheckedCreateWithoutActorCustomerInput = {
    id?: string
    organizationId: string
    caseId: string
    actorUserId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateOrConnectWithoutActorCustomerInput = {
    where: CaseActivityEventWhereUniqueInput
    create: XOR<CaseActivityEventCreateWithoutActorCustomerInput, CaseActivityEventUncheckedCreateWithoutActorCustomerInput>
  }

  export type CaseActivityEventCreateManyActorCustomerInputEnvelope = {
    data: CaseActivityEventCreateManyActorCustomerInput | CaseActivityEventCreateManyActorCustomerInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutCustomersInput = {
    update: XOR<OrganizationUpdateWithoutCustomersInput, OrganizationUncheckedUpdateWithoutCustomersInput>
    create: XOR<OrganizationCreateWithoutCustomersInput, OrganizationUncheckedCreateWithoutCustomersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutCustomersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutCustomersInput, OrganizationUncheckedUpdateWithoutCustomersInput>
  }

  export type OrganizationUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CaseUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CaseWhereUniqueInput
    update: XOR<CaseUpdateWithoutCustomerInput, CaseUncheckedUpdateWithoutCustomerInput>
    create: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput>
  }

  export type CaseUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CaseWhereUniqueInput
    data: XOR<CaseUpdateWithoutCustomerInput, CaseUncheckedUpdateWithoutCustomerInput>
  }

  export type CaseUpdateManyWithWhereWithoutCustomerInput = {
    where: CaseScalarWhereInput
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CaseCommentUpsertWithWhereUniqueWithoutAuthorCustomerInput = {
    where: CaseCommentWhereUniqueInput
    update: XOR<CaseCommentUpdateWithoutAuthorCustomerInput, CaseCommentUncheckedUpdateWithoutAuthorCustomerInput>
    create: XOR<CaseCommentCreateWithoutAuthorCustomerInput, CaseCommentUncheckedCreateWithoutAuthorCustomerInput>
  }

  export type CaseCommentUpdateWithWhereUniqueWithoutAuthorCustomerInput = {
    where: CaseCommentWhereUniqueInput
    data: XOR<CaseCommentUpdateWithoutAuthorCustomerInput, CaseCommentUncheckedUpdateWithoutAuthorCustomerInput>
  }

  export type CaseCommentUpdateManyWithWhereWithoutAuthorCustomerInput = {
    where: CaseCommentScalarWhereInput
    data: XOR<CaseCommentUpdateManyMutationInput, CaseCommentUncheckedUpdateManyWithoutAuthorCustomerInput>
  }

  export type CaseAttachmentUpsertWithWhereUniqueWithoutUploadedByCustomerInput = {
    where: CaseAttachmentWhereUniqueInput
    update: XOR<CaseAttachmentUpdateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedUpdateWithoutUploadedByCustomerInput>
    create: XOR<CaseAttachmentCreateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedCreateWithoutUploadedByCustomerInput>
  }

  export type CaseAttachmentUpdateWithWhereUniqueWithoutUploadedByCustomerInput = {
    where: CaseAttachmentWhereUniqueInput
    data: XOR<CaseAttachmentUpdateWithoutUploadedByCustomerInput, CaseAttachmentUncheckedUpdateWithoutUploadedByCustomerInput>
  }

  export type CaseAttachmentUpdateManyWithWhereWithoutUploadedByCustomerInput = {
    where: CaseAttachmentScalarWhereInput
    data: XOR<CaseAttachmentUpdateManyMutationInput, CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerInput>
  }

  export type CaseActivityEventUpsertWithWhereUniqueWithoutActorCustomerInput = {
    where: CaseActivityEventWhereUniqueInput
    update: XOR<CaseActivityEventUpdateWithoutActorCustomerInput, CaseActivityEventUncheckedUpdateWithoutActorCustomerInput>
    create: XOR<CaseActivityEventCreateWithoutActorCustomerInput, CaseActivityEventUncheckedCreateWithoutActorCustomerInput>
  }

  export type CaseActivityEventUpdateWithWhereUniqueWithoutActorCustomerInput = {
    where: CaseActivityEventWhereUniqueInput
    data: XOR<CaseActivityEventUpdateWithoutActorCustomerInput, CaseActivityEventUncheckedUpdateWithoutActorCustomerInput>
  }

  export type CaseActivityEventUpdateManyWithWhereWithoutActorCustomerInput = {
    where: CaseActivityEventScalarWhereInput
    data: XOR<CaseActivityEventUpdateManyMutationInput, CaseActivityEventUncheckedUpdateManyWithoutActorCustomerInput>
  }

  export type OrganizationCreateWithoutCategoriesInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutCategoriesInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutCategoriesInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCategoriesInput, OrganizationUncheckedCreateWithoutCategoriesInput>
  }

  export type CaseCreateWithoutCategoryInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    customer: CustomerCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutCategoryInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutCategoryInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutCategoryInput, CaseUncheckedCreateWithoutCategoryInput>
  }

  export type CaseCreateManyCategoryInputEnvelope = {
    data: CaseCreateManyCategoryInput | CaseCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutCategoriesInput = {
    update: XOR<OrganizationUpdateWithoutCategoriesInput, OrganizationUncheckedUpdateWithoutCategoriesInput>
    create: XOR<OrganizationCreateWithoutCategoriesInput, OrganizationUncheckedCreateWithoutCategoriesInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutCategoriesInput, OrganizationUncheckedUpdateWithoutCategoriesInput>
  }

  export type OrganizationUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CaseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CaseWhereUniqueInput
    update: XOR<CaseUpdateWithoutCategoryInput, CaseUncheckedUpdateWithoutCategoryInput>
    create: XOR<CaseCreateWithoutCategoryInput, CaseUncheckedCreateWithoutCategoryInput>
  }

  export type CaseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CaseWhereUniqueInput
    data: XOR<CaseUpdateWithoutCategoryInput, CaseUncheckedUpdateWithoutCategoryInput>
  }

  export type CaseUpdateManyWithWhereWithoutCategoryInput = {
    where: CaseScalarWhereInput
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyWithoutCategoryInput>
  }

  export type OrganizationCreateWithoutStatusesInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutStatusesInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutStatusesInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutStatusesInput, OrganizationUncheckedCreateWithoutStatusesInput>
  }

  export type CaseCreateWithoutStatusInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    customer: CustomerCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutStatusInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutStatusInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutStatusInput, CaseUncheckedCreateWithoutStatusInput>
  }

  export type CaseCreateManyStatusInputEnvelope = {
    data: CaseCreateManyStatusInput | CaseCreateManyStatusInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutStatusesInput = {
    update: XOR<OrganizationUpdateWithoutStatusesInput, OrganizationUncheckedUpdateWithoutStatusesInput>
    create: XOR<OrganizationCreateWithoutStatusesInput, OrganizationUncheckedCreateWithoutStatusesInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutStatusesInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutStatusesInput, OrganizationUncheckedUpdateWithoutStatusesInput>
  }

  export type OrganizationUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CaseUpsertWithWhereUniqueWithoutStatusInput = {
    where: CaseWhereUniqueInput
    update: XOR<CaseUpdateWithoutStatusInput, CaseUncheckedUpdateWithoutStatusInput>
    create: XOR<CaseCreateWithoutStatusInput, CaseUncheckedCreateWithoutStatusInput>
  }

  export type CaseUpdateWithWhereUniqueWithoutStatusInput = {
    where: CaseWhereUniqueInput
    data: XOR<CaseUpdateWithoutStatusInput, CaseUncheckedUpdateWithoutStatusInput>
  }

  export type CaseUpdateManyWithWhereWithoutStatusInput = {
    where: CaseScalarWhereInput
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyWithoutStatusInput>
  }

  export type OrganizationCreateWithoutCasesInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutCasesInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutCasesInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCasesInput, OrganizationUncheckedCreateWithoutCasesInput>
  }

  export type CustomerCreateWithoutCasesInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCustomersInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerUncheckedCreateWithoutCasesInput = {
    id?: string
    organizationId: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerCreateOrConnectWithoutCasesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
  }

  export type UserCreateWithoutAssignedCasesInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorUserInput
  }

  export type UserUncheckedCreateWithoutAssignedCasesInput = {
    id?: string
    organizationId: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorUserInput
  }

  export type UserCreateOrConnectWithoutAssignedCasesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedCasesInput, UserUncheckedCreateWithoutAssignedCasesInput>
  }

  export type CaseCategoryCreateWithoutCasesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCategoriesInput
  }

  export type CaseCategoryUncheckedCreateWithoutCasesInput = {
    id?: string
    organizationId: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCategoryCreateOrConnectWithoutCasesInput = {
    where: CaseCategoryWhereUniqueInput
    create: XOR<CaseCategoryCreateWithoutCasesInput, CaseCategoryUncheckedCreateWithoutCasesInput>
  }

  export type WorkflowStatusCreateWithoutCasesInput = {
    id?: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutStatusesInput
  }

  export type WorkflowStatusUncheckedCreateWithoutCasesInput = {
    id?: string
    organizationId: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowStatusCreateOrConnectWithoutCasesInput = {
    where: WorkflowStatusWhereUniqueInput
    create: XOR<WorkflowStatusCreateWithoutCasesInput, WorkflowStatusUncheckedCreateWithoutCasesInput>
  }

  export type CaseCommentCreateWithoutCaseInput = {
    id?: string
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCommentsInput
    authorUser?: UserCreateNestedOneWithoutAuthoredCommentsInput
    authorCustomer?: CustomerCreateNestedOneWithoutAuthoredCommentsInput
  }

  export type CaseCommentUncheckedCreateWithoutCaseInput = {
    id?: string
    organizationId: string
    authorUserId?: string | null
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentCreateOrConnectWithoutCaseInput = {
    where: CaseCommentWhereUniqueInput
    create: XOR<CaseCommentCreateWithoutCaseInput, CaseCommentUncheckedCreateWithoutCaseInput>
  }

  export type CaseCommentCreateManyCaseInputEnvelope = {
    data: CaseCommentCreateManyCaseInput | CaseCommentCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type CaseAttachmentCreateWithoutCaseInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutAttachmentsInput
    uploadedByUser?: UserCreateNestedOneWithoutUploadedAttachmentsInput
    uploadedByCustomer?: CustomerCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type CaseAttachmentUncheckedCreateWithoutCaseInput = {
    id?: string
    organizationId: string
    uploadedByUserId?: string | null
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseAttachmentCreateOrConnectWithoutCaseInput = {
    where: CaseAttachmentWhereUniqueInput
    create: XOR<CaseAttachmentCreateWithoutCaseInput, CaseAttachmentUncheckedCreateWithoutCaseInput>
  }

  export type CaseAttachmentCreateManyCaseInputEnvelope = {
    data: CaseAttachmentCreateManyCaseInput | CaseAttachmentCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type CaseActivityEventCreateWithoutCaseInput = {
    id?: string
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutActivityEventsInput
    actorUser?: UserCreateNestedOneWithoutActivityEventsInput
    actorCustomer?: CustomerCreateNestedOneWithoutActivityEventsInput
  }

  export type CaseActivityEventUncheckedCreateWithoutCaseInput = {
    id?: string
    organizationId: string
    actorUserId?: string | null
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateOrConnectWithoutCaseInput = {
    where: CaseActivityEventWhereUniqueInput
    create: XOR<CaseActivityEventCreateWithoutCaseInput, CaseActivityEventUncheckedCreateWithoutCaseInput>
  }

  export type CaseActivityEventCreateManyCaseInputEnvelope = {
    data: CaseActivityEventCreateManyCaseInput | CaseActivityEventCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutCasesInput = {
    update: XOR<OrganizationUpdateWithoutCasesInput, OrganizationUncheckedUpdateWithoutCasesInput>
    create: XOR<OrganizationCreateWithoutCasesInput, OrganizationUncheckedCreateWithoutCasesInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutCasesInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutCasesInput, OrganizationUncheckedUpdateWithoutCasesInput>
  }

  export type OrganizationUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CustomerUpsertWithoutCasesInput = {
    update: XOR<CustomerUpdateWithoutCasesInput, CustomerUncheckedUpdateWithoutCasesInput>
    create: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutCasesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutCasesInput, CustomerUncheckedUpdateWithoutCasesInput>
  }

  export type CustomerUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCustomersNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorCustomerNestedInput
  }

  export type UserUpsertWithoutAssignedCasesInput = {
    update: XOR<UserUpdateWithoutAssignedCasesInput, UserUncheckedUpdateWithoutAssignedCasesInput>
    create: XOR<UserCreateWithoutAssignedCasesInput, UserUncheckedCreateWithoutAssignedCasesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedCasesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedCasesInput, UserUncheckedUpdateWithoutAssignedCasesInput>
  }

  export type UserUpdateWithoutAssignedCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorUserNestedInput
  }

  export type CaseCategoryUpsertWithoutCasesInput = {
    update: XOR<CaseCategoryUpdateWithoutCasesInput, CaseCategoryUncheckedUpdateWithoutCasesInput>
    create: XOR<CaseCategoryCreateWithoutCasesInput, CaseCategoryUncheckedCreateWithoutCasesInput>
    where?: CaseCategoryWhereInput
  }

  export type CaseCategoryUpdateToOneWithWhereWithoutCasesInput = {
    where?: CaseCategoryWhereInput
    data: XOR<CaseCategoryUpdateWithoutCasesInput, CaseCategoryUncheckedUpdateWithoutCasesInput>
  }

  export type CaseCategoryUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CaseCategoryUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowStatusUpsertWithoutCasesInput = {
    update: XOR<WorkflowStatusUpdateWithoutCasesInput, WorkflowStatusUncheckedUpdateWithoutCasesInput>
    create: XOR<WorkflowStatusCreateWithoutCasesInput, WorkflowStatusUncheckedCreateWithoutCasesInput>
    where?: WorkflowStatusWhereInput
  }

  export type WorkflowStatusUpdateToOneWithWhereWithoutCasesInput = {
    where?: WorkflowStatusWhereInput
    data: XOR<WorkflowStatusUpdateWithoutCasesInput, WorkflowStatusUncheckedUpdateWithoutCasesInput>
  }

  export type WorkflowStatusUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutStatusesNestedInput
  }

  export type WorkflowStatusUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUpsertWithWhereUniqueWithoutCaseInput = {
    where: CaseCommentWhereUniqueInput
    update: XOR<CaseCommentUpdateWithoutCaseInput, CaseCommentUncheckedUpdateWithoutCaseInput>
    create: XOR<CaseCommentCreateWithoutCaseInput, CaseCommentUncheckedCreateWithoutCaseInput>
  }

  export type CaseCommentUpdateWithWhereUniqueWithoutCaseInput = {
    where: CaseCommentWhereUniqueInput
    data: XOR<CaseCommentUpdateWithoutCaseInput, CaseCommentUncheckedUpdateWithoutCaseInput>
  }

  export type CaseCommentUpdateManyWithWhereWithoutCaseInput = {
    where: CaseCommentScalarWhereInput
    data: XOR<CaseCommentUpdateManyMutationInput, CaseCommentUncheckedUpdateManyWithoutCaseInput>
  }

  export type CaseAttachmentUpsertWithWhereUniqueWithoutCaseInput = {
    where: CaseAttachmentWhereUniqueInput
    update: XOR<CaseAttachmentUpdateWithoutCaseInput, CaseAttachmentUncheckedUpdateWithoutCaseInput>
    create: XOR<CaseAttachmentCreateWithoutCaseInput, CaseAttachmentUncheckedCreateWithoutCaseInput>
  }

  export type CaseAttachmentUpdateWithWhereUniqueWithoutCaseInput = {
    where: CaseAttachmentWhereUniqueInput
    data: XOR<CaseAttachmentUpdateWithoutCaseInput, CaseAttachmentUncheckedUpdateWithoutCaseInput>
  }

  export type CaseAttachmentUpdateManyWithWhereWithoutCaseInput = {
    where: CaseAttachmentScalarWhereInput
    data: XOR<CaseAttachmentUpdateManyMutationInput, CaseAttachmentUncheckedUpdateManyWithoutCaseInput>
  }

  export type CaseActivityEventUpsertWithWhereUniqueWithoutCaseInput = {
    where: CaseActivityEventWhereUniqueInput
    update: XOR<CaseActivityEventUpdateWithoutCaseInput, CaseActivityEventUncheckedUpdateWithoutCaseInput>
    create: XOR<CaseActivityEventCreateWithoutCaseInput, CaseActivityEventUncheckedCreateWithoutCaseInput>
  }

  export type CaseActivityEventUpdateWithWhereUniqueWithoutCaseInput = {
    where: CaseActivityEventWhereUniqueInput
    data: XOR<CaseActivityEventUpdateWithoutCaseInput, CaseActivityEventUncheckedUpdateWithoutCaseInput>
  }

  export type CaseActivityEventUpdateManyWithWhereWithoutCaseInput = {
    where: CaseActivityEventScalarWhereInput
    data: XOR<CaseActivityEventUpdateManyMutationInput, CaseActivityEventUncheckedUpdateManyWithoutCaseInput>
  }

  export type OrganizationCreateWithoutCommentsInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutCommentsInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutCommentsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutCommentsInput, OrganizationUncheckedCreateWithoutCommentsInput>
  }

  export type CaseCreateWithoutCommentsInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    customer: CustomerCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutCommentsInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutCommentsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutCommentsInput, CaseUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutAuthoredCommentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    assignedCases?: CaseCreateNestedManyWithoutAssignedUserInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorUserInput
  }

  export type UserUncheckedCreateWithoutAuthoredCommentsInput = {
    id?: string
    organizationId: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedCases?: CaseUncheckedCreateNestedManyWithoutAssignedUserInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorUserInput
  }

  export type UserCreateOrConnectWithoutAuthoredCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthoredCommentsInput, UserUncheckedCreateWithoutAuthoredCommentsInput>
  }

  export type CustomerCreateWithoutAuthoredCommentsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCustomersInput
    cases?: CaseCreateNestedManyWithoutCustomerInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerUncheckedCreateWithoutAuthoredCommentsInput = {
    id?: string
    organizationId: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByCustomerInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerCreateOrConnectWithoutAuthoredCommentsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutAuthoredCommentsInput, CustomerUncheckedCreateWithoutAuthoredCommentsInput>
  }

  export type OrganizationUpsertWithoutCommentsInput = {
    update: XOR<OrganizationUpdateWithoutCommentsInput, OrganizationUncheckedUpdateWithoutCommentsInput>
    create: XOR<OrganizationCreateWithoutCommentsInput, OrganizationUncheckedCreateWithoutCommentsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutCommentsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutCommentsInput, OrganizationUncheckedUpdateWithoutCommentsInput>
  }

  export type OrganizationUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CaseUpsertWithoutCommentsInput = {
    update: XOR<CaseUpdateWithoutCommentsInput, CaseUncheckedUpdateWithoutCommentsInput>
    create: XOR<CaseCreateWithoutCommentsInput, CaseUncheckedCreateWithoutCommentsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutCommentsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutCommentsInput, CaseUncheckedUpdateWithoutCommentsInput>
  }

  export type CaseUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type UserUpsertWithoutAuthoredCommentsInput = {
    update: XOR<UserUpdateWithoutAuthoredCommentsInput, UserUncheckedUpdateWithoutAuthoredCommentsInput>
    create: XOR<UserCreateWithoutAuthoredCommentsInput, UserUncheckedCreateWithoutAuthoredCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthoredCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthoredCommentsInput, UserUncheckedUpdateWithoutAuthoredCommentsInput>
  }

  export type UserUpdateWithoutAuthoredCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    assignedCases?: CaseUpdateManyWithoutAssignedUserNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthoredCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCases?: CaseUncheckedUpdateManyWithoutAssignedUserNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorUserNestedInput
  }

  export type CustomerUpsertWithoutAuthoredCommentsInput = {
    update: XOR<CustomerUpdateWithoutAuthoredCommentsInput, CustomerUncheckedUpdateWithoutAuthoredCommentsInput>
    create: XOR<CustomerCreateWithoutAuthoredCommentsInput, CustomerUncheckedCreateWithoutAuthoredCommentsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutAuthoredCommentsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutAuthoredCommentsInput, CustomerUncheckedUpdateWithoutAuthoredCommentsInput>
  }

  export type CustomerUpdateWithoutAuthoredCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCustomersNestedInput
    cases?: CaseUpdateManyWithoutCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutAuthoredCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorCustomerNestedInput
  }

  export type OrganizationCreateWithoutAttachmentsInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutAttachmentsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutAttachmentsInput, OrganizationUncheckedCreateWithoutAttachmentsInput>
  }

  export type CaseCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    customer: CustomerCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutAttachmentsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutAttachmentsInput, CaseUncheckedCreateWithoutAttachmentsInput>
  }

  export type UserCreateWithoutUploadedAttachmentsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    assignedCases?: CaseCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorUserInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorUserInput
  }

  export type UserUncheckedCreateWithoutUploadedAttachmentsInput = {
    id?: string
    organizationId: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedCases?: CaseUncheckedCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorUserInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorUserInput
  }

  export type UserCreateOrConnectWithoutUploadedAttachmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
  }

  export type CustomerCreateWithoutUploadedAttachmentsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCustomersInput
    cases?: CaseCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorCustomerInput
    activityEvents?: CaseActivityEventCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerUncheckedCreateWithoutUploadedAttachmentsInput = {
    id?: string
    organizationId: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorCustomerInput
    activityEvents?: CaseActivityEventUncheckedCreateNestedManyWithoutActorCustomerInput
  }

  export type CustomerCreateOrConnectWithoutUploadedAttachmentsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUploadedAttachmentsInput, CustomerUncheckedCreateWithoutUploadedAttachmentsInput>
  }

  export type OrganizationUpsertWithoutAttachmentsInput = {
    update: XOR<OrganizationUpdateWithoutAttachmentsInput, OrganizationUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<OrganizationCreateWithoutAttachmentsInput, OrganizationUncheckedCreateWithoutAttachmentsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutAttachmentsInput, OrganizationUncheckedUpdateWithoutAttachmentsInput>
  }

  export type OrganizationUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CaseUpsertWithoutAttachmentsInput = {
    update: XOR<CaseUpdateWithoutAttachmentsInput, CaseUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<CaseCreateWithoutAttachmentsInput, CaseUncheckedCreateWithoutAttachmentsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutAttachmentsInput, CaseUncheckedUpdateWithoutAttachmentsInput>
  }

  export type CaseUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type UserUpsertWithoutUploadedAttachmentsInput = {
    update: XOR<UserUpdateWithoutUploadedAttachmentsInput, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
    create: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedAttachmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedAttachmentsInput, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
  }

  export type UserUpdateWithoutUploadedAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    assignedCases?: CaseUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorUserNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCases?: CaseUncheckedUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorUserNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorUserNestedInput
  }

  export type CustomerUpsertWithoutUploadedAttachmentsInput = {
    update: XOR<CustomerUpdateWithoutUploadedAttachmentsInput, CustomerUncheckedUpdateWithoutUploadedAttachmentsInput>
    create: XOR<CustomerCreateWithoutUploadedAttachmentsInput, CustomerUncheckedCreateWithoutUploadedAttachmentsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutUploadedAttachmentsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutUploadedAttachmentsInput, CustomerUncheckedUpdateWithoutUploadedAttachmentsInput>
  }

  export type CustomerUpdateWithoutUploadedAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCustomersNestedInput
    cases?: CaseUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorCustomerNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutUploadedAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorCustomerNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorCustomerNestedInput
  }

  export type OrganizationCreateWithoutActivityEventsInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    customers?: CustomerCreateNestedManyWithoutOrganizationInput
    cases?: CaseCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutActivityEventsInput = {
    id?: string
    name: string
    slug: string
    industry?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    customers?: CustomerUncheckedCreateNestedManyWithoutOrganizationInput
    cases?: CaseUncheckedCreateNestedManyWithoutOrganizationInput
    categories?: CaseCategoryUncheckedCreateNestedManyWithoutOrganizationInput
    statuses?: WorkflowStatusUncheckedCreateNestedManyWithoutOrganizationInput
    comments?: CaseCommentUncheckedCreateNestedManyWithoutOrganizationInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutActivityEventsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutActivityEventsInput, OrganizationUncheckedCreateWithoutActivityEventsInput>
  }

  export type CaseCreateWithoutActivityEventsInput = {
    id?: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCasesInput
    customer: CustomerCreateNestedOneWithoutCasesInput
    assignedUser?: UserCreateNestedOneWithoutAssignedCasesInput
    category?: CaseCategoryCreateNestedOneWithoutCasesInput
    status: WorkflowStatusCreateNestedOneWithoutCasesInput
    comments?: CaseCommentCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutActivityEventsInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CaseCommentUncheckedCreateNestedManyWithoutCaseInput
    attachments?: CaseAttachmentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutActivityEventsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutActivityEventsInput, CaseUncheckedCreateWithoutActivityEventsInput>
  }

  export type UserCreateWithoutActivityEventsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    assignedCases?: CaseCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByUserInput
  }

  export type UserUncheckedCreateWithoutActivityEventsInput = {
    id?: string
    organizationId: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedCases?: CaseUncheckedCreateNestedManyWithoutAssignedUserInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorUserInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByUserInput
  }

  export type UserCreateOrConnectWithoutActivityEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityEventsInput, UserUncheckedCreateWithoutActivityEventsInput>
  }

  export type CustomerCreateWithoutActivityEventsInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutCustomersInput
    cases?: CaseCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentCreateNestedManyWithoutUploadedByCustomerInput
  }

  export type CustomerUncheckedCreateWithoutActivityEventsInput = {
    id?: string
    organizationId: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
    authoredComments?: CaseCommentUncheckedCreateNestedManyWithoutAuthorCustomerInput
    uploadedAttachments?: CaseAttachmentUncheckedCreateNestedManyWithoutUploadedByCustomerInput
  }

  export type CustomerCreateOrConnectWithoutActivityEventsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutActivityEventsInput, CustomerUncheckedCreateWithoutActivityEventsInput>
  }

  export type OrganizationUpsertWithoutActivityEventsInput = {
    update: XOR<OrganizationUpdateWithoutActivityEventsInput, OrganizationUncheckedUpdateWithoutActivityEventsInput>
    create: XOR<OrganizationCreateWithoutActivityEventsInput, OrganizationUncheckedCreateWithoutActivityEventsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutActivityEventsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutActivityEventsInput, OrganizationUncheckedUpdateWithoutActivityEventsInput>
  }

  export type OrganizationUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    industry?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    customers?: CustomerUncheckedUpdateManyWithoutOrganizationNestedInput
    cases?: CaseUncheckedUpdateManyWithoutOrganizationNestedInput
    categories?: CaseCategoryUncheckedUpdateManyWithoutOrganizationNestedInput
    statuses?: WorkflowStatusUncheckedUpdateManyWithoutOrganizationNestedInput
    comments?: CaseCommentUncheckedUpdateManyWithoutOrganizationNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type CaseUpsertWithoutActivityEventsInput = {
    update: XOR<CaseUpdateWithoutActivityEventsInput, CaseUncheckedUpdateWithoutActivityEventsInput>
    create: XOR<CaseCreateWithoutActivityEventsInput, CaseUncheckedCreateWithoutActivityEventsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutActivityEventsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutActivityEventsInput, CaseUncheckedUpdateWithoutActivityEventsInput>
  }

  export type CaseUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type UserUpsertWithoutActivityEventsInput = {
    update: XOR<UserUpdateWithoutActivityEventsInput, UserUncheckedUpdateWithoutActivityEventsInput>
    create: XOR<UserCreateWithoutActivityEventsInput, UserUncheckedCreateWithoutActivityEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityEventsInput, UserUncheckedUpdateWithoutActivityEventsInput>
  }

  export type UserUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    assignedCases?: CaseUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCases?: CaseUncheckedUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
  }

  export type CustomerUpsertWithoutActivityEventsInput = {
    update: XOR<CustomerUpdateWithoutActivityEventsInput, CustomerUncheckedUpdateWithoutActivityEventsInput>
    create: XOR<CustomerCreateWithoutActivityEventsInput, CustomerUncheckedCreateWithoutActivityEventsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutActivityEventsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutActivityEventsInput, CustomerUncheckedUpdateWithoutActivityEventsInput>
  }

  export type CustomerUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCustomersNestedInput
    cases?: CaseUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutActivityEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerNestedInput
  }

  export type UserCreateManyOrganizationInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateManyOrganizationInput = {
    id?: string
    name: string
    email?: string | null
    phone?: string | null
    externalReference?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCreateManyOrganizationInput = {
    id?: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCategoryCreateManyOrganizationInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowStatusCreateManyOrganizationInput = {
    id?: string
    name: string
    slug: string
    color?: string | null
    sortOrder?: number
    isDefault?: boolean
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentCreateManyOrganizationInput = {
    id?: string
    caseId: string
    authorUserId?: string | null
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAttachmentCreateManyOrganizationInput = {
    id?: string
    caseId: string
    uploadedByUserId?: string | null
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateManyOrganizationInput = {
    id?: string
    caseId: string
    actorUserId?: string | null
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type UserUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCases?: CaseUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedCases?: CaseUncheckedUpdateManyWithoutAssignedUserNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorUserNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutActorCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
    authoredComments?: CaseCommentUncheckedUpdateManyWithoutAuthorCustomerNestedInput
    uploadedAttachments?: CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutActorCustomerNestedInput
  }

  export type CustomerUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    externalReference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCategoryUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUpdateManyWithoutCategoryNestedInput
  }

  export type CaseCategoryUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CaseCategoryUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowStatusUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUpdateManyWithoutStatusNestedInput
  }

  export type WorkflowStatusUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutStatusNestedInput
  }

  export type WorkflowStatusUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutCommentsNestedInput
    authorUser?: UserUpdateOneWithoutAuthoredCommentsNestedInput
    authorCustomer?: CustomerUpdateOneWithoutAuthoredCommentsNestedInput
  }

  export type CaseCommentUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutAttachmentsNestedInput
    uploadedByUser?: UserUpdateOneWithoutUploadedAttachmentsNestedInput
    uploadedByCustomer?: CustomerUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type CaseAttachmentUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutActivityEventsNestedInput
    actorUser?: UserUpdateOneWithoutActivityEventsNestedInput
    actorCustomer?: CustomerUpdateOneWithoutActivityEventsNestedInput
  }

  export type CaseActivityEventUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateManyAssignedUserInput = {
    id?: string
    organizationId: string
    customerId: string
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentCreateManyAuthorUserInput = {
    id?: string
    organizationId: string
    caseId: string
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAttachmentCreateManyUploadedByUserInput = {
    id?: string
    organizationId: string
    caseId: string
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateManyActorUserInput = {
    id?: string
    organizationId: string
    caseId: string
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseUpdateWithoutAssignedUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutAssignedUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateManyWithoutAssignedUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUpdateWithoutAuthorUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCommentsNestedInput
    case?: CaseUpdateOneRequiredWithoutCommentsNestedInput
    authorCustomer?: CustomerUpdateOneWithoutAuthoredCommentsNestedInput
  }

  export type CaseCommentUncheckedUpdateWithoutAuthorUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUncheckedUpdateManyWithoutAuthorUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUpdateWithoutUploadedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutAttachmentsNestedInput
    case?: CaseUpdateOneRequiredWithoutAttachmentsNestedInput
    uploadedByCustomer?: CustomerUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type CaseAttachmentUncheckedUpdateWithoutUploadedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutUploadedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUpdateWithoutActorUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutActivityEventsNestedInput
    case?: CaseUpdateOneRequiredWithoutActivityEventsNestedInput
    actorCustomer?: CustomerUpdateOneWithoutActivityEventsNestedInput
  }

  export type CaseActivityEventUncheckedUpdateWithoutActorUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutActorUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateManyCustomerInput = {
    id?: string
    organizationId: string
    assignedUserId?: string | null
    categoryId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseCommentCreateManyAuthorCustomerInput = {
    id?: string
    organizationId: string
    caseId: string
    authorUserId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAttachmentCreateManyUploadedByCustomerInput = {
    id?: string
    organizationId: string
    caseId: string
    uploadedByUserId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateManyActorCustomerInput = {
    id?: string
    organizationId: string
    caseId: string
    actorUserId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUpdateWithoutAuthorCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCommentsNestedInput
    case?: CaseUpdateOneRequiredWithoutCommentsNestedInput
    authorUser?: UserUpdateOneWithoutAuthoredCommentsNestedInput
  }

  export type CaseCommentUncheckedUpdateWithoutAuthorCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUncheckedUpdateManyWithoutAuthorCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUpdateWithoutUploadedByCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutAttachmentsNestedInput
    case?: CaseUpdateOneRequiredWithoutAttachmentsNestedInput
    uploadedByUser?: UserUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type CaseAttachmentUncheckedUpdateWithoutUploadedByCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutUploadedByCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUpdateWithoutActorCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutActivityEventsNestedInput
    case?: CaseUpdateOneRequiredWithoutActivityEventsNestedInput
    actorUser?: UserUpdateOneWithoutActivityEventsNestedInput
  }

  export type CaseActivityEventUncheckedUpdateWithoutActorCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutActorCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateManyCategoryInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    statusId: string
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    status?: WorkflowStatusUpdateOneRequiredWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateManyStatusInput = {
    id?: string
    organizationId: string
    customerId: string
    assignedUserId?: string | null
    categoryId?: string | null
    title: string
    description?: string | null
    priority?: $Enums.Priority
    source?: $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: Date | string | null
    closedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseUpdateWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCasesNestedInput
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    assignedUser?: UserUpdateOneWithoutAssignedCasesNestedInput
    category?: CaseCategoryUpdateOneWithoutCasesNestedInput
    comments?: CaseCommentUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CaseCommentUncheckedUpdateManyWithoutCaseNestedInput
    attachments?: CaseAttachmentUncheckedUpdateManyWithoutCaseNestedInput
    activityEvents?: CaseActivityEventUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateManyWithoutStatusInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    source?: EnumSourceFieldUpdateOperationsInput | $Enums.Source
    intakeData?: JsonNullValueInput | InputJsonValue
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentCreateManyCaseInput = {
    id?: string
    organizationId: string
    authorUserId?: string | null
    authorCustomerId?: string | null
    body: string
    visibility: $Enums.Visibility
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAttachmentCreateManyCaseInput = {
    id?: string
    organizationId: string
    uploadedByUserId?: string | null
    uploadedByCustomerId?: string | null
    fileName: string
    fileUrl: string
    fileType?: string | null
    fileSize?: number | null
    visibility?: $Enums.Visibility
    createdAt?: Date | string
  }

  export type CaseActivityEventCreateManyCaseInput = {
    id?: string
    organizationId: string
    actorUserId?: string | null
    actorCustomerId?: string | null
    eventType: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseCommentUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutCommentsNestedInput
    authorUser?: UserUpdateOneWithoutAuthoredCommentsNestedInput
    authorCustomer?: CustomerUpdateOneWithoutAuthoredCommentsNestedInput
  }

  export type CaseCommentUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCommentUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    authorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    authorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutAttachmentsNestedInput
    uploadedByUser?: UserUpdateOneWithoutUploadedAttachmentsNestedInput
    uploadedByCustomer?: CustomerUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type CaseAttachmentUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAttachmentUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    uploadedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: EnumVisibilityFieldUpdateOperationsInput | $Enums.Visibility
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutActivityEventsNestedInput
    actorUser?: UserUpdateOneWithoutActivityEventsNestedInput
    actorCustomer?: CustomerUpdateOneWithoutActivityEventsNestedInput
  }

  export type CaseActivityEventUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseActivityEventUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    actorUserId?: NullableStringFieldUpdateOperationsInput | string | null
    actorCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}