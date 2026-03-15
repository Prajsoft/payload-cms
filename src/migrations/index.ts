import * as migration_20260216_081521_init from './20260216_081521_init';
import * as migration_20260218_003924 from './20260218_003924';
import * as migration_20260218_135222 from './20260218_135222';
import * as migration_20260313_000000_add_blog from './20260313_000000_add_blog';
import * as migration_20260315_000000_blog_blocks from './20260315_000000_blog_blocks';
import * as migration_20260316_000000_related_posts_relationship from './20260316_000000_related_posts_relationship';
import * as migration_20260317_000000_new_blocks from './20260317_000000_new_blocks';
import * as migration_20260318_000000_blog_fixes from './20260318_000000_blog_fixes';
import * as migration_20260319_000000_homepage_active from './20260319_000000_homepage_active';
import * as migration_20260320_000000_hero_image_block from './20260320_000000_hero_image_block';
import * as migration_20260321_000000_blog_background_svg from './20260321_000000_blog_background_svg';

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
  {
    up: migration_20260317_000000_new_blocks.up,
    down: migration_20260317_000000_new_blocks.down,
    name: '20260317_000000_new_blocks',
  },
  {
    up: migration_20260318_000000_blog_fixes.up,
    down: migration_20260318_000000_blog_fixes.down,
    name: '20260318_000000_blog_fixes',
  },
  {
    up: migration_20260319_000000_homepage_active.up,
    down: migration_20260319_000000_homepage_active.down,
    name: '20260319_000000_homepage_active',
  },
  {
    up: migration_20260320_000000_hero_image_block.up,
    down: migration_20260320_000000_hero_image_block.down,
    name: '20260320_000000_hero_image_block',
  },
  {
    up: migration_20260321_000000_blog_background_svg.up,
    down: migration_20260321_000000_blog_background_svg.down,
    name: '20260321_000000_blog_background_svg',
  },
];
