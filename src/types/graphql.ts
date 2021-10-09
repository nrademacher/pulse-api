// @ts-nocheck 
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User, Project } from './node_modules/.prisma/client/index.d.ts';
export type Maybe<T> = T | undefined | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  bio?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  role?: Maybe<UserRoles>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type Query = {
  __typename?: 'Query';
  findSelf: User;
  findUserByEmail: User;
  findUserById: User;
  login: Scalars['String'];
  myProjects: Array<Maybe<Project>>;
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  projects?: Maybe<Array<Maybe<Project>>>;
  users: Array<Maybe<User>>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  projects?: Maybe<Array<Maybe<Project>>>;
  role: UserRoles;
  teams?: Maybe<Array<Maybe<Team>>>;
  updatedAt: Scalars['DateTime'];
  verified?: Maybe<Scalars['Boolean']>;
};

export type UserRoles =
  | 'PRODUCT_OWNER'
  | 'PROJECT_MANAGER'
  | 'SOFTWARE_DEVELOPER'
  | 'TECHNICAL_LEAD';



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Team: ResolverTypeWrapper<Omit<Team, 'projects' | 'users'> & { projects?: Maybe<Array<Maybe<ResolversTypes['Project']>>>, users: Array<Maybe<ResolversTypes['User']>> }>;
  User: ResolverTypeWrapper<User>;
  UserRoles: UserRoles;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Mutation: {};
  Project: Project;
  Query: {};
  String: Scalars['String'];
  Team: Omit<Team, 'projects' | 'users'> & { projects?: Maybe<Array<Maybe<ResolversParentTypes['Project']>>>, users: Array<Maybe<ResolversParentTypes['User']>> };
  User: User;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password'>>;
};

export type ProjectResolvers<ContextType = any, ParentType = ResolversParentTypes['Project']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType = ResolversParentTypes['Query']> = {
  findSelf?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  findUserByEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserByEmailArgs, 'email'>>;
  findUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserByIdArgs, 'id'>>;
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  myProjects?: Resolver<Array<Maybe<ResolversTypes['Project']>>, ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType = ResolversParentTypes['Team']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRoles'], ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

