<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-list variant="tonal">
        <v-list-subheader>Virtual Clusters: {{store.items.length}}</v-list-subheader>
        <v-list-item v-for="vcluster in virtualClusters" :key="vcluster.metadata.name">
          <v-list-item-title>
            <v-card prepend-icon="mdi-devices">

              <template v-slot:title>
                <v-container>
                  <v-row>
                    <v-col><span>{{ vcluster.metadata.name }}</span></v-col>
                    <v-col><span v-if="vcluster.metadata.deletionTimestamp" style="color: darkorange">Terminating</span></v-col>
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
</template>

<script lang="ts" setup>
  import {computed, onMounted, onUnmounted} from "vue";
  import {useVirtualClustersStore} from "@/store/virtualclusters";

  const store = useVirtualClustersStore();

  const virtualClusters = computed(() => {
    return store.items
  })

  let interval: number

  onMounted(() => {
    interval = setInterval(store.get, 3000)
  });

  onUnmounted(() => {
    clearInterval(interval)
  })
</script>
