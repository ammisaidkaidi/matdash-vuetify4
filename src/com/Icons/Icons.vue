<script setup lang="ts">
import { VPagination } from "vuetify/components";
import WorkspacePage from "../ui/WorkspacePage.vue";
import type { IconsContext } from "./types";

defineProps<{ context: IconsContext }>();
</script>

<template>
  <WorkspacePage
    :title="
      context.set === context.contentConfig.texts.solar
        ? context.contentConfig.texts.solarIcons
        : context.contentConfig.texts.tablerIcons
    "
    data-batch="3"
    ><v-card class="workspace-card"
      ><div class="b3-list-heading mt-0">
        <div>
          <h2>
            {{
              context.set === context.contentConfig.texts.solar
                ? context.contentConfig.texts.solar2
                : context.contentConfig.texts.tabler
            }}{{ context.contentConfig.texts.iconLibrary }}
          </h2>
          <p class="muted text-caption mt-2">
            {{ context.contentConfig.texts.locallyBundledSVGsNoExternalEmbed }}
          </p>
        </div>
        <v-text-field
          v-model="context.query"
          :label="context.contentConfig.texts.filterIcons"
          density="compact"
        />
      </div>
      <p v-if="context.data" class="text-caption mb-6">
        {{ context.data.attribution.author.name
        }}{{ context.contentConfig.texts.text1
        }}<a
          :href="context.data.attribution.license.url"
          target="_blank"
          rel="noopener noreferrer"
          >{{ context.data.attribution.license.title }}</a
        >{{ context.contentConfig.texts.text1
        }}{{ context.names.length.toLocaleString()
        }}{{ context.contentConfig.texts.matchingIcons }}
      </p>
      <v-progress-linear
        v-if="!context.data &amp;&amp; !context.error"
        indeterminate
        color="primary" /><v-alert
        v-if="context.error"
        type="error"
        variant="tonal"
        >{{ context.error }}
        <v-btn @click="context.load">{{
          context.contentConfig.texts.retry
        }}</v-btn></v-alert
      >
      <div class="b3-icon-grid">
        <button
          v-for="name in context.shown"
          :key="name"
          :aria-label="name"
          @click="
            context.selected = name;
            context.copied = false;
          "
        >
          <span v-html="context.svg(name)" /><small>{{ name }}</small>
        </button>
      </div>
      <p
        v-if="context.data &amp;&amp; !context.shown.length"
        class="workspace-empty"
      >
        {{ context.contentConfig.texts.noIconsMatchYourSearch }}
      </p>
      <v-pagination
        v-if="context.names.length > 60"
        v-model="context.page"
        :length="Math.ceil(context.names.length / 60)"
        :total-visible="5"
        color="primary"
        class="mt-6" /></v-card
    ><v-dialog
      :model-value="!!context.selected"
      @update:model-value="context.selected = null"
      ><v-card v-if="context.selected" class="dialog-body"
        ><div class="b3-icon-preview" v-html="context.svg(context.selected)" />
        <h2 class="my-5">{{ context.selected }}</h2>
        <v-text-field
          :model-value="
            context.set + context.contentConfig.texts.text2 + context.selected
          "
          readonly
          :label="context.contentConfig.texts.iconName"
        />
        <p class="text-caption muted mt-4">
          {{ context.data.attribution.author.name
          }}{{ context.contentConfig.texts.text1
          }}{{ context.data.attribution.license.title
          }}{{
            context.contentConfig.texts
              .retainRequiredAttributionWhenUsingThisIcon
          }}
        </p>
        <div class="dialog-actions">
          <v-btn variant="text" @click="context.selected = null">{{
            context.contentConfig.texts.close
          }}</v-btn
          ><v-btn variant="tonal" color="primary" @click="context.copy">{{
            context.copied
              ? context.contentConfig.texts.copied
              : context.contentConfig.texts.copyName
          }}</v-btn
          ><v-btn color="primary" @click="context.download">{{
            context.contentConfig.texts.downloadSVG
          }}</v-btn>
        </div></v-card
      ></v-dialog
    ></WorkspacePage
  >
</template>
