<template>
  <v-container>
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-list variant="tonal">
        <v-list-subheader style="font-size: 24px; font-weight: bold;">Virtual Clusters: {{store.items.length}}</v-list-subheader>
        <v-list-item v-for="vcluster in virtualClusters" :key="vcluster.metadata?.name">
          <v-list-item-title>
            <v-card prepend-icon="mdi-devices">

              <template v-slot:title>
                <v-container>
                  <v-row>
                    <v-col style="text-align: left;"><span>{{ vcluster.metadata?.name + " (Project: " + vcluster.metadata?.namespace?.substring(7) + ")" }}</span></v-col>
                    <v-col>
                      <span v-if="vcluster.metadata?.deletionTimestamp" style="color: darkorange">Terminating</span>
                      <span v-if="vcluster.status?.phase==='Sleeping'" style="color: orange">Sleeping</span>
                      <span v-if="vcluster.status?.phase==='Ready' && !vcluster.metadata?.deletionTimestamp" style="color: green">Ready</span>
                    </v-col>
                  </v-row>
                </v-container>
              </template>

              <template v-slot:append>
                <v-btn prepend-icon="mdi-delete" @click="store.delete(vcluster)">
                  Delete
                </v-btn>
              </template>

            </v-card>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-responsive>
  </v-container>
  <div style="display: flex; justify-content: center;">
    <v-btn @click="store.create()" >Create Virtual Cluster</v-btn>
  </div>
</template>

<script lang="ts" setup>
  import {computed, onMounted, onUnmounted} from "vue";
  import {useVirtualClustersStore} from "@/store/virtualclusters";

  const store = useVirtualClustersStore();
  const virtualClusters = computed(() => {
    return store.items
  })

  let interval: NodeJS.Timer

  onMounted(() => {
    store.get()
    interval = setInterval(store.get, 3000)
  });

  onUnmounted(() => {
    clearInterval(interval)
  })
</script>
