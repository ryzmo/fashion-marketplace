import { verifyUser } from '../lib/auth';

export function withAuth(handler) {
  return async (ctx) => {
    const { req } = ctx;
    const user = verifyUser(req);

    if (!user) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    return handler({ ...ctx, user });
  };
}
