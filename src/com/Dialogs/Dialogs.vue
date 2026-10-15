<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { DialogsContext } from "./types";

defineProps<{ context: DialogsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.dialog"
    ><div class="example-grid three">
      <ExampleCard
        v-for="[title, label, color] in context.demos"
        :key="title"
        :title="title"
        ><v-btn :color="color" block @click="context.active = title">{{
          label
        }}</v-btn></ExampleCard
      >
    </div></UiPage
  ><v-dialog
    :model-value="!!context.active"
    :persistent="context.active === context.contentConfig.texts.persistent"
    :fullscreen="context.active === context.contentConfig.texts.fullScreen"
    :max-width="
      context.active === context.contentConfig.texts.fullScreen
        ? context.contentConfig.texts.none
        : 560
    "
    :scrollable="context.active === context.contentConfig.texts.scrollable"
    :transition="
      context.active === context.contentConfig.texts.transition
        ? context.contentConfig.texts.dialogBottomTransition
        : context.contentConfig.texts.dialogTransition
    "
    @update:model-value="
      (value) => {
        if (!value) context.close();
      }
    "
    ><v-card class="b5-dialog-card"
      ><header>
        <h2>
          {{
            context.active === context.contentConfig.texts.fullScreen
              ? context.contentConfig.texts.settings
              : context.active === context.contentConfig.texts.form
                ? context.contentConfig.texts.userProfile
                : context.active === context.contentConfig.texts.scrollable
                  ? context.contentConfig.texts.selectACountry
                  : context.active === context.contentConfig.texts.nestedDialog
                    ? context.contentConfig.texts.dialog1
                    : context.active + context.contentConfig.texts.dialog2
          }}
        </h2>
        <v-btn
          v-if="context.active !== context.contentConfig.texts.persistent"
          icon
          variant="text"
          :aria-label="context.contentConfig.texts.closeDialog"
          @click="context.close"
          ><Icon name="close"
        /></v-btn>
      </header>
      <div
        :class="[
          context.contentConfig.texts.b5DialogBody,
          {
            'b5-dialog-scroll':
              context.active === context.contentConfig.texts.scrollable,
          },
        ]"
      >
        <v-form
          v-if="context.active === context.contentConfig.texts.form"
          :ref="(element) => (context.form = element)"
          @submit.prevent="context.save"
          ><div class="control-stack">
            <v-text-field
              v-model="context.profile.name"
              :label="context.contentConfig.texts.fullName"
              :rules="[context.required]"
              hide-details="auto"
            /><v-text-field
              v-model="context.profile.email"
              :label="context.contentConfig.texts.email"
              type="email"
              :rules="[context.required, context.validEmail]"
              hide-details="auto"
            /></div></v-form
        ><template
          v-else-if="context.active === context.contentConfig.texts.fullScreen"
          ><h3 class="mb-5">
            {{ context.contentConfig.texts.notificationsPreferences }}
          </h3>
          <v-switch
            v-model="context.settings.notifications"
            :label="context.contentConfig.texts.enableNotifications"
            color="primary"
            hide-details
          /><v-switch
            v-model="context.settings.sound"
            :label="context.contentConfig.texts.soundEffects"
            color="primary"
            hide-details
          />
          <p class="muted mt-5">
            {{
              context.contentConfig.texts
                .theseSettingsAreDemonstrationValuesOnly
            }}
          </p></template
        ><v-radio-group
          v-else-if="context.active === context.contentConfig.texts.scrollable"
          v-model="context.choice"
          color="primary"
          ><v-radio
            v-for="country in context.contentConfig.values.items1"
            :key="country"
            :label="country"
            :value="country" /></v-radio-group
        ><template v-else
          ><p class="b5-prose">
            {{
              context.active === context.contentConfig.texts.persistent
                ? context.contentConfig.texts
                    .thisDialogStaysOpenWhenYouClickOutsideOrPressEscapeChoo
                : context.contentConfig.texts
                    .aDialogFocusesAttentionOnADecisionOrASmallPieceOfInform
            }}
          </p>
          <v-btn
            v-if="context.active === context.contentConfig.texts.nestedDialog"
            color="primary"
            class="mt-6"
            @click="context.nested = true"
            >{{ context.contentConfig.texts.openDialog2 }}</v-btn
          ></template
        >
      </div>
      <footer>
        <v-btn variant="text" @click="context.close">{{
          context.active === context.contentConfig.texts.persistent
            ? context.contentConfig.texts.disagree
            : context.contentConfig.texts.cancel
        }}</v-btn
        ><v-btn color="primary" @click="context.save">{{
          context.active === context.contentConfig.texts.persistent
            ? context.contentConfig.texts.agree
            : context.active === context.contentConfig.texts.form
              ? context.contentConfig.texts.save
              : context.active === context.contentConfig.texts.scrollable
                ? context.contentConfig.texts.select
                : context.contentConfig.texts.done
        }}</v-btn>
      </footer>
      <v-dialog v-model="context.nested" max-width="400"
        ><v-card class="dialog-body"
          ><h2>{{ context.contentConfig.texts.dialog22 }}</h2>
          <p class="my-5">
            {{
              context.contentConfig.texts.thisNestedDialogAppearsAboveDialog1
            }}
          </p>
          <v-btn color="primary" @click="context.nested = false">{{
            context.contentConfig.texts.closeDialog2
          }}</v-btn></v-card
        ></v-dialog
      ></v-card
    ></v-dialog
  >
</template>
