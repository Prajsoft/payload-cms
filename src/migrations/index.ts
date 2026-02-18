import * as migration_20260216_081521_init from './20260216_081521_init';

export const migrations = [
  {
    up: migration_20260216_081521_init.up,
    down: migration_20260216_081521_init.down,
    name: '20260216_081521_init'
  },
];
