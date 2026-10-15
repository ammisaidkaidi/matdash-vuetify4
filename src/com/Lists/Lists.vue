<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { ListsContext } from "./types";

defineProps<{ context: ListsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.lists" heading="List"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.simpleList"
        ><v-list
          v-model:selected="context.selected"
          color="primary"
          density="compact"
          ><v-list-item
            v-for="[name, icon] in context.items"
            :key="name"
            :value="name"
            :title="name"
            ><template #prepend
              ><Icon
                :name="icon"
                :size="18"
                class="mr-4" /></template></v-list-item
        ></v-list>
        <p v-if="context.selected.length" class="field-help">
          {{ context.contentConfig.texts.selected }}{{ context.selected[0] }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.nestedList"
        ><h4 class="mb-3">{{ context.contentConfig.texts.nestedListItems }}</h4>
        <v-list
          v-model:selected="context.nested"
          color="primary"
          density="compact"
          ><v-list-item
            :title="context.contentConfig.texts.sentMail"
            :value="context.contentConfig.texts.sentMail"
            ><template #prepend
              ><Icon
                name="send"
                :size="18"
                class="mr-4" /></template></v-list-item
          ><v-list-item
            :title="context.contentConfig.texts.drafts"
            :value="context.contentConfig.texts.drafts"
            ><template #prepend
              ><Icon
                name="file"
                :size="18"
                class="mr-4" /></template></v-list-item
          ><v-list-group :value="context.contentConfig.texts.inbox"
            ><template #activator="{ props }"
              ><v-list-item
                v-bind="props"
                :title="context.contentConfig.texts.inbox"
                ><template #prepend
                  ><Icon
                    name="email"
                    :size="18"
                    class="mr-4" /></template></v-list-item></template
            ><v-list-item
              :title="context.contentConfig.texts.starred"
              :value="context.contentConfig.texts.starred" /><v-list-item
              :title="context.contentConfig.texts.important"
              :value="context.contentConfig.texts.important" /></v-list-group
        ></v-list>
        <p v-if="context.nested.length" class="field-help">
          {{ context.contentConfig.texts.selected }}{{ context.nested[0] }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.folderList"
        ><v-list
          ><v-list-item
            v-for="[name, date] in context.contentConfig.values.items1"
            :key="name"
            :title="name"
            :subtitle="date"
            :active="context.folder === name"
            color="primary"
            @click="context.folder = name"
            ><template #prepend
              ><v-avatar color="primary" variant="tonal" size="38" class="mr-4"
                ><Icon
                  name="folder"
                  :size="
                    19
                  " /></v-avatar></template></v-list-item></v-list></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.disabledList"
        ><v-list disabled density="compact"
          ><v-list-item
            v-for="[name, icon] in context.items.slice(0, 3)"
            :key="name"
            :title="name"
            ><template #prepend
              ><Icon
                :name="icon"
                :size="18"
                class="mr-4" /></template></v-list-item></v-list></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.switchList"
        ><v-list
          ><v-list-item :title="context.contentConfig.texts.wiFi"
            ><template #prepend
              ><Icon name="globe" :size="18" class="mr-4" /></template
            ><template #append
              ><v-switch
                v-model="context.wifi"
                color="primary"
                :aria-label="context.contentConfig.texts.wiFi"
                hide-details /></template></v-list-item
          ><v-list-item :title="context.contentConfig.texts.bluetooth"
            ><template #prepend
              ><Icon name="phone" :size="18" class="mr-4" /></template
            ><template #append
              ><v-switch
                v-model="context.bluetooth"
                color="primary"
                :aria-label="context.contentConfig.texts.bluetooth"
                hide-details /></template></v-list-item></v-list></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.roundedList"
        ><v-list v-model:selected="context.rounded" color="primary" rounded="xl"
          ><v-list-item
            v-for="[name, icon] in context.items.slice(0, 3)"
            :key="name"
            :title="name"
            :value="name"
            rounded="xl"
            ><template #prepend
              ><Icon
                :name="icon"
                :size="18"
                class="mr-4" /></template></v-list-item></v-list></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.customAlignedList"
        ><v-list
          ><v-list-item
            v-for="([name, growth, value], i) in context.contentConfig.values
              .items2"
            :key="i"
            :title="name"
            :subtitle="growth"
            ><template #append
              ><span class="b5-stock-value"
                >{{ value }}
                <Icon
                  name="trending"
                  :size="17"
                  :class="
                    i % 2
                      ? context.contentConfig.texts.textError
                      : context.contentConfig.texts.textSuccess
                  " /></span></template></v-list-item></v-list></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.scrollableList"
        ><v-list class="b5-scroll-list" density="compact"
          ><v-list-item
            v-for="n in 200"
            :key="n"
            :title="context.contentConfig.texts.item + n"
            :active="
              context.scrollItem === context.contentConfig.texts.item + n
            "
            color="primary"
            @click="context.scrollItem = context.contentConfig.texts.item + n"
        /></v-list>
        <p v-if="context.scrollItem" class="field-help">
          {{ context.contentConfig.texts.selected }}{{ context.scrollItem }}
        </p></ExampleCard
      >
    </div></UiPage
  >
</template>
