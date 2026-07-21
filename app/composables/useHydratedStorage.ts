/**
 * Référence persistée dans `localStorage`, sans casser l'hydratation.
 *
 * `useLocalStorage` de VueUse lit le stockage dès l'initialisation côté client, alors que
 * le rendu serveur n'a que la valeur par défaut : le premier rendu client diffère du HTML
 * envoyé, et Vue signale un « hydration mismatch ». On garde donc la valeur par défaut
 * jusqu'au montage, puis on adopte celle du stockage.
 *
 * Le coût est un flash d'un frame sur les préférences persistées ; en échange l'hydratation
 * est propre et le SSR reste utilisable pour le référencement.
 */
export function useHydratedStorage<T>(key: string, defaultValue: T) {
  const state = ref<T>(defaultValue) as Ref<T>

  onMounted(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) state.value = JSON.parse(raw) as T
    } catch {
      // Valeur corrompue ou stockage indisponible (navigation privée) : on garde le défaut.
    }

    watch(
      state,
      (value) => {
        try {
          localStorage.setItem(key, JSON.stringify(value))
        } catch {
          // Quota dépassé ou stockage refusé — la session reste utilisable en mémoire.
        }
      },
      { deep: true },
    )
  })

  return state
}
