// Utilities
import { defineStore } from 'pinia'

import {Client, Resources} from "@loft-enterprise/client"
import {ManagementV1VirtualClusterInstance} from "@loft-enterprise/client/gen/models/ManagementV1VirtualClusterInstance"
import {ManagementV1VirtualClusterInstanceList} from "@loft-enterprise/client/gen/models/ManagementV1VirtualClusterInstanceList"

export const client = new Client("my-access-key", "https://path-to-my-loft.com")

export const useVirtualClustersStore = defineStore('virtualClusters', {
  state: () => ({
    loading: false,
    items: [] as ManagementV1VirtualClusterInstance[],
  }),
  actions: {
    async create() {
      const name = prompt("Virtual Cluster Name")
      const project = prompt("Virtual Cluster Project")
      const namespace = "loft-p-"+project

      const result = await client.management(Resources.ManagementV1VirtualClusterInstance).Namespace(namespace).Create({
        metadata: {
          name: name+"",
          namespace: namespace,
        },
        spec: {
          template: {}
        }
      })
      if (result.err) {
        alert("Error creating virtual cluster: " + result.val.message)
        return
      } 

      await this.get()
      alert("Successfully created virtual cluster " + name)
    },

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
        return
      }

      await this.get()
      alert("Successfully deleted virtual cluster")
    }
  }
})
