import '../src/modules/user';
import { database, resolversStore } from '../src/services';
import { GraphQLResolveInfo } from 'graphql';

const { resolvers } = resolversStore;
const { Mutation } = resolvers;
const mutationResolvers = { ...Mutation };

beforeAll(async () => await database.user.deleteMany());

afterAll(async () => {
  await database.user.deleteMany();

  database.$disconnect;
});

describe('user creation', () => {
  const { createUser } = mutationResolvers;

  it('should create new user ', async () => {
    let result;

    if (createUser) {
      result = await createUser(
        {},
        { email: 'john@doe', role: 'ADMIN', password: '123313', cc: 'ADV_ENG' },
        { isAuthed: false },
        {} as GraphQLResolveInfo,
      );
    } else {
      console.log('FAIL');
    }

    expect(result).toEqual({
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
    });
  });
});
