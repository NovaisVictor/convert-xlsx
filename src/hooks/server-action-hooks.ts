import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
  createServerActionsKeyFactory,
  setupServerActionHooks,
} from 'zsa-react-query'

export const QueryKeyFactory = createServerActionsKeyFactory({
  getCompanyTablesAction: () => ['tables'],
  getProductsAction: () => ['products'],
  getCompaniesAction: () => ['clients-table'],
  getPendingInvitesAction: () => ['pending-invites'],
})

const {
  useServerActionQuery,
  useServerActionMutation,
  useServerActionInfiniteQuery,
} = setupServerActionHooks({
  hooks: {
    useQuery,
    useMutation,
    useInfiniteQuery,
  },
  queryKeyFactory: QueryKeyFactory,
})

export {
  useServerActionInfiniteQuery,
  useServerActionMutation,
  useServerActionQuery,
}
