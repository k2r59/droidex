<script setup lang="ts">
import type { SocialProvider } from '~/utils/auth-client'

const { user, isPending } = useAuthSession()
const localePath = useLocalePath()

const open = ref(false)
const root = useTemplateRef('root')
onClickOutside(root, () => { open.value = false })

const providers: SocialProvider[] = ['discord', 'google', 'twitch']

const PROVIDER_CLASS: Record<SocialProvider, string> = {
  discord: 'bg-[#5865F2] hover:bg-[#4752c4]',
  google: 'bg-[#ffffff] text-[#1f1f1f] hover:bg-[#e8e8e8]',
  twitch: 'bg-[#9146FF] hover:bg-[#772ce8]',
}

async function login(provider: SocialProvider) {
  // Retour sur la page courante après le détour OAuth.
  await authClient.signIn.social({ provider, callbackURL: window.location.pathname })
}

async function logout() {
  open.value = false
  await authClient.signOut()
}
</script>

<template>
  <div ref="root" class="relative">
    <div v-if="isPending" class="size-8 animate-pulse rounded-full bg-panel" />

    <button
      v-else-if="user"
      type="button"
      class="grid size-8 place-items-center overflow-hidden rounded-full bg-panel-raised text-sm font-semibold"
      :aria-expanded="open"
      @click="open = !open"
    >
      <img
        v-if="user.image"
        :src="user.image"
        :alt="user.name ?? ''"
        class="size-full object-cover"
        referrerpolicy="no-referrer"
      >
      <span v-else>{{ (user.name ?? '?').slice(0, 1).toUpperCase() }}</span>
    </button>

    <button
      v-else
      type="button"
      class="rounded-lg bg-iconic px-3 py-1.5 text-sm font-medium text-void transition-opacity hover:opacity-90"
      @click="open = !open"
    >
      {{ $t('auth.signIn') }}
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-50 mt-1 w-60 overflow-hidden rounded-xl border border-edge bg-panel-raised shadow-xl"
    >
      <template v-if="user">
        <div class="border-b border-edge px-3 py-2">
          <p class="truncate text-sm font-medium">{{ user.name }}</p>
          <p class="truncate text-xs text-ink-muted">{{ user.email }}</p>
        </div>
        <NuxtLink
          :to="localePath('/profile')"
          class="block px-3 py-2 text-sm transition-colors hover:bg-panel"
          @click="open = false"
        >
          {{ $t('nav.profile') }}
        </NuxtLink>
        <button
          type="button"
          class="w-full px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-panel"
          @click="logout"
        >
          {{ $t('auth.signOut') }}
        </button>
      </template>

      <template v-else>
        <p class="border-b border-edge px-3 py-2 text-xs text-ink-muted">
          {{ $t('auth.signInBenefit') }}
        </p>
        <div class="flex flex-col gap-1.5 p-2">
          <button
            v-for="p in providers"
            :key="p"
            type="button"
            class="rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
            :class="PROVIDER_CLASS[p]"
            @click="login(p)"
          >
            {{ $t('auth.signInWith', { provider: $t(`auth.provider.${p}`) }) }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
