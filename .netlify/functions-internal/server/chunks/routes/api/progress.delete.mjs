import { d as defineEventHandler, r as requireSession, p as progressCollection } from '../../nitro/nitro.mjs';
import 'mongodb';
import 'better-auth';
import 'better-auth/adapters/mongodb';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';

const progress_delete = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const progress = await progressCollection();
  const { deletedCount } = await progress.deleteOne({ userId: session.user.id });
  return { deleted: deletedCount > 0 };
});

export { progress_delete as default };
//# sourceMappingURL=progress.delete.mjs.map
