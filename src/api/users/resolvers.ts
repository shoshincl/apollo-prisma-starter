import { Context } from '../../app';

export default {
  Query: {
    user: async (
      parent: any,
      args: any,
      { prisma }: { prisma: Context['prisma'] }
    ) => ({
      id: 'FAKE_ID',
    }),
  },
};
