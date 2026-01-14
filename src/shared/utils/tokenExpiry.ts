import ms from 'ms';

export const getRefreshTokenExpiryDate = (): Date => {
  const ttl = process.env.REFRESH_TOKEN_TTL ?? '7d';

  const ttlMs = ms(ttl as ms.StringValue);

  if (typeof ttlMs !== 'number') {
    throw new Error('Invalid REFRESH_TOKEN_TTL value');
  }

  return new Date(Date.now() + ttlMs);
};