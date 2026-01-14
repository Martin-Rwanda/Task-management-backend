import { RefreshTokenModel} from '../src/infrastructure';
import { sequelize } from '../src/infrastructure/database/sequelizer';
import { seedAdmin } from '../test-utils/seedAdmin';

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await seedAdmin();
});

beforeEach(async () => {
  await RefreshTokenModel.destroy({ where: {}, force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('setup database', () => {
  expect(true).toBe(true);
});