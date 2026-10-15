<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { AlertsContext } from "./types";

defineProps<{ context: AlertsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.alert"
    ><div class="example-stack">
      <ExampleCard
        v-for="[title, variant] in context.contentConfig.values.items1"
        :key="title"
        :title="title"
        ><div class="b5-alert-stack">
          <v-alert
            v-for="type in context.types"
            :key="type"
            :type="type"
            :variant="variant"
            :icon="
              title === context.contentConfig.texts.basic ? false : undefined
            "
            density="compact"
            >{{ context.contentConfig.texts.thisIsAn }}{{ type
            }}{{ context.contentConfig.texts.alertCheckItOut }}</v-alert
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.description"
        ><div class="b5-alert-stack">
          <v-alert
            v-for="type in context.types"
            :key="type"
            :type="type"
            variant="tonal"
            :title="type[0].toUpperCase() + type.slice(1)"
            >{{ context.contentConfig.texts.thisIsAn }}{{ type
            }}{{ context.contentConfig.texts.alertCheckItOut }}</v-alert
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.action"
        ><div class="b5-alert-stack">
          <v-alert
            v-if="context.warning"
            type="warning"
            variant="flat"
            density="compact"
            >{{ context.contentConfig.texts.thisIsAWarningAlertCheckItOut
            }}<template #append
              ><v-btn
                variant="text"
                size="small"
                @click="
                  context.warning = false;
                  context.notify(
                    context.contentConfig.texts.warningAcknowledgedLocally,
                  );
                "
                >{{ context.contentConfig.texts.undo }}</v-btn
              ></template
            ></v-alert
          ><v-alert
            v-if="context.info"
            type="info"
            variant="flat"
            density="compact"
            >{{ context.contentConfig.texts.thisIsAnInfoAlertCheckItOut
            }}<template #append
              ><v-btn
                icon
                variant="text"
                size="small"
                :aria-label="context.contentConfig.texts.dismissInfoAlert"
                @click="context.info = false"
                ><Icon name="close" :size="18" /></v-btn></template></v-alert
          ><v-btn
            v-if="!context.warning || !context.info"
            variant="text"
            color="primary"
            @click="
              context.warning = true;
              context.info = true;
            "
            >{{ context.contentConfig.texts.resetActionAlerts }}</v-btn
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.withIcons"
        ><div class="b5-alert-stack">
          <v-alert
            v-for="[type, icon] in context.contentConfig.values.items2"
            :key="type"
            :type="type"
            variant="tonal"
            density="compact"
            ><template #prepend><Icon :name="icon" :size="22" /></template
            >{{ context.contentConfig.texts.thisIsA }}{{ type
            }}{{ context.contentConfig.texts.alert2 }}</v-alert
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.closable"
        ><v-alert
          v-model="context.visible"
          :title="context.contentConfig.texts.closableAlert"
          closable
          close-label="Close closable alert"
          color="primary"
          variant="tonal"
          border="start"
          >{{
            context.contentConfig.texts
              .aeneanImperdietQuisqueIdOdioCrasDapibusPellentesqueUtNe
          }}</v-alert
        ><v-btn
          v-if="!context.visible"
          variant="tonal"
          color="primary"
          @click="context.visible = true"
          >{{ context.contentConfig.texts.restoreAlert }}</v-btn
        ></ExampleCard
      >
    </div></UiPage
  >
</template>
