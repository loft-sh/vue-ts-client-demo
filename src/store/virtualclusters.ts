// Utilities
import { defineStore } from 'pinia'

import {Client, Resources} from "@loft-enterprise/client"
import {ManagementV1VirtualClusterInstance} from "@loft-enterprise/client/gen/models/ManagementV1VirtualClusterInstance"
import {ManagementV1VirtualClusterInstanceList} from "@loft-enterprise/client/gen/models/ManagementV1VirtualClusterInstanceList"

const client = new Client("", "https://localhost:8080")

export const useVirtualClustersStore = defineStore('virtualClusters', {
  state: () => ({
    loading: false,
    items: [] as ManagementV1VirtualClusterInstance,
  }),
  actions: {
    async get() {
      const result = await client.management(Resources.ManagementV1VirtualClusterInstance).List()
      if (result.err) {
        console.error(result)
        return
      }

      this.items = (result.val as ManagementV1VirtualClusterInstanceList)?.items
    },

    async delete(vcluster: ManagementV1VirtualClusterInstance) {
      const result = await client.management(Resources.ManagementV1VirtualClusterInstance)
        .Namespace(vcluster.metadata!.namespace)
        .Delete(vcluster.metadata!.name!)

      if (result.err) {
        console.error(result)
      }

      await this.get()
    }
  }
})
