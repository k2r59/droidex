/**
 * Efface la progression enregistrée sur le compte.
 *
 * Elle manquait : `clear()` du store ne vidait que `localStorage`, si bien que la
 * progression revenait à la reconnexion suivante — le bouton d'effacement donnait donc
 * l'illusion d'avoir supprimé des données toujours présentes côté serveur.
 *
 * On supprime le document plutôt que de le remettre à zéro : un compte sans document est
 * exactement l'état d'un compte neuf, et `enableRemote()` sait déjà pousser le local vers
 * un compte vide. Remettre des champs à zéro aurait créé un troisième état à gérer.
 */
export default defineEventHandler(async (event) => {
  const session = await requireSession(event)

  const progress = await progressCollection()
  const { deletedCount } = await progress.deleteOne({ userId: session.user.id })

  return { deleted: deletedCount > 0 }
})
