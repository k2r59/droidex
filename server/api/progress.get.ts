/** Progression du joueur connecté. Renvoie un document vierge s'il n'a rien enregistré. */
export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  const progress = await progressCollection()

  const doc = await progress.findOne({ userId: session.user.id }, { projection: { _id: 0 } })

  return (
    doc ?? {
      userId: session.user.id,
      collection: {},
      rebirth: 0,
      superRebirth: 0,
      cycle: 1,
      novaCrystals: 0,
      shopLevels: {},
      updatedAt: new Date(),
    }
  )
})
