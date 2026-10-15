<script setup lang="ts">
import { VFileInput } from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { FileInputsContext } from "./types";

defineProps<{ context: FileInputsContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.fileInputs"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.accept"
        ><v-file-input
          v-model="context.files.accept"
          :label="context.contentConfig.texts.fileInput"
          accept="image/*"
          variant="outlined"
          hide-details
          clearable /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.chips"
        ><v-file-input
          v-model="context.files.chips"
          :label="context.contentConfig.texts.fileInputWChips"
          multiple
          chips
          variant="outlined"
          hide-details
          clearable /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.counter"
        ><v-file-input
          v-model="context.files.counter"
          :label="context.contentConfig.texts.fileInputWithCounter"
          multiple
          counter
          show-size
          variant="outlined"
          hide-details="auto" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.density"
        ><v-file-input
          v-model="context.files.density"
          :label="context.contentConfig.texts.compactFileInput"
          density="compact"
          variant="outlined"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.multiple"
        ><v-file-input
          v-model="context.files.multiple"
          :label="context.contentConfig.texts.multipleFiles"
          multiple
          variant="outlined"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.prependIcon"
        ><v-file-input
          v-model="context.files.icon"
          :label="context.contentConfig.texts.fileWithCameraIcon"
          accept="image/*"
          :prepend-icon="context.mdiCamera"
          variant="outlined"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.validation"
        ><v-file-input
          v-model="context.files.avatar"
          :label="context.contentConfig.texts.avatar"
          accept="image/jpeg,image/png,image/gif"
          :rules="context.avatarRules"
          validate-on="input"
          :prepend-icon="context.mdiCamera"
          variant="outlined"
          show-size
          hide-details="auto" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.complexSelectionSlots"
        ><v-file-input
          v-model="context.files.selection"
          :label="context.contentConfig.texts.customSelectionFiles"
          multiple
          show-size
          variant="outlined"
          hide-details
          ><template #selection="{ fileNames, totalBytesReadable }"
            ><div class="file-selection">
              <v-chip
                v-for="name in fileNames.slice(0, 2)"
                :key="name"
                size="small"
                color="primary"
                >{{ name }}</v-chip
              ><span v-if="fileNames.length > 2"
                >{{ context.contentConfig.texts.text1 }}{{ fileNames.length - 2
                }}{{ context.contentConfig.texts.files }}</span
              ><small>{{ totalBytesReadable }}</small>
            </div></template
          ></v-file-input
        ></ExampleCard
      >
    </div>
    <div class="example-footer">
      <span
        >{{ context.selectedCount
        }}{{
          context.contentConfig.texts
            .filesSelectedFilesRemainInMemoryAndAreNotUploaded
        }}</span
      ><v-btn
        variant="text"
        color="primary"
        @click="
          Object.keys(context.files).forEach(
            (k) =>
              (context.files[k] = Array.isArray(context.files[k]) ? [] : null),
          )
        "
        >{{ context.contentConfig.texts.clearAllFiles }}</v-btn
      >
    </div></FormPage
  >
</template>
