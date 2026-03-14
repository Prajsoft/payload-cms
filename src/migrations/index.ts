import * as migration_20260216_081521_init from './20260216_081521_init';
import * as migration_20260218_003924 from './20260218_003924';
import * as migration_20260218_135222 from './20260218_135222';
import * as migration_20260313_000000_add_blog from './20260313_000000_add_blog';
import * as migration_20260315_000000_blog_blocks from './20260315_000000_blog_blocks';
import * as migration_20260316_000000_related_posts_relationship from './20260316_000000_related_posts_relationship';

export const migrations = [
  {
    up: migration_20260216_081521_init.up,
    down: migration_20260216_081521_init.down,
    name: '20260216_081521_init',
  },
  {
    up: migration_20260218_003924.up,
    down: migration_20260218_003924.down,
    name: '20260218_003924',
  },
  {
    up: migration_20260218_135222.up,
    down: migration_20260218_135222.down,
    name: '20260218_135222',
  },
  {
    up: migration_20260313_000000_add_blog.up,
    down: migration_20260313_000000_add_blog.down,
    name: '20260313_000000_add_blog',
  },
  {
    up: migration_20260315_000000_blog_blocks.up,
    down: migration_20260315_000000_blog_blocks.down,
    name: '20260315_000000_blog_blocks',
  },
  {
    up: migration_20260316_000000_related_posts_relationship.up,
    down: migration_20260316_000000_related_posts_relationship.down,
    name: '20260316_000000_related_posts_relationship',
  },
];
