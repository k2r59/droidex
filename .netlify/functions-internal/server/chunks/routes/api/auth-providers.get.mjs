import { d as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
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

const authProviders_get = defineEventHandler(() => {
  const config = useRuntimeConfig();
  const candidates = {
    discord: [config.discordClientId, config.discordClientSecret],
    google: [config.googleClientId, config.googleClientSecret],
    twitch: [config.twitchClientId, config.twitchClientSecret]
  };
  return {
    providers: Object.entries(candidates).filter(([, [id, secret]]) => Boolean(id && secret)).map(([name]) => name)
  };
});

export { authProviders_get as default };
//# sourceMappingURL=auth-providers.get.mjs.map
