<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { ButtonsContext } from "./types";

defineProps<{ context: ButtonsContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.buttons"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.base" wide
        ><div class="button-samples spread">
          <v-btn
            v-for="[variant, label] in context.contentConfig.values.items1"
            :key="variant"
            :variant="variant"
            :color="
              variant === context.contentConfig.texts.elevated
                ? undefined
                : context.contentConfig.texts.primary
            "
            :elevation="
              variant === context.contentConfig.texts.elevated ? 2 : 0
            "
            @click="context.clicked(label)"
            >{{ label }}</v-btn
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.colors"
        ><div class="button-samples">
          <v-btn
            v-for="color in context.colors"
            :key="color"
            :color="color"
            @click="context.clicked(color)"
            >{{ color[0].toUpperCase() + color.slice(1) }}</v-btn
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.size"
        ><div class="button-samples">
          <v-btn
            v-for="[size, label] in context.sizes"
            :key="size"
            :size="size"
            color="primary"
            @click="context.clicked(label)"
            >{{ label }}</v-btn
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.outlined"
        ><div class="button-samples">
          <v-btn
            variant="outlined"
            color="primary"
            @click="context.clicked(context.contentConfig.texts.primary2)"
            >{{ context.contentConfig.texts.primary2 }}</v-btn
          ><v-btn
            variant="outlined"
            color="secondary"
            @click="context.clicked(context.contentConfig.texts.secondary)"
            >{{ context.contentConfig.texts.secondary }}</v-btn
          ><v-btn variant="outlined" disabled>{{
            context.contentConfig.texts.disabled
          }}</v-btn
          ><v-btn
            variant="outlined"
            color="info"
            :to="context.contentConfig.texts.formsFormElementsCombobox"
            >{{ context.contentConfig.texts.link }}</v-btn
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.outlinedIcon"
        ><div class="button-samples">
          <v-btn
            variant="outlined"
            color="error"
            @click="context.clicked(context.contentConfig.texts.leftIcon)"
            ><Icon name="trash" :size="17" class="mr-2" />{{
              context.contentConfig.texts.leftIcon
            }}</v-btn
          ><v-btn
            variant="outlined"
            color="secondary"
            @click="context.clicked(context.contentConfig.texts.rightIcon)"
            >{{ context.contentConfig.texts.rightIcon
            }}<Icon name="send" :size="17" class="ml-2"
          /></v-btn></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.outlineSize"
        ><div class="button-samples">
          <v-btn
            v-for="[size, label] in context.sizes"
            :key="size"
            :size="size"
            variant="outlined"
            color="primary"
            @click="context.clicked(label)"
            >{{ label }}</v-btn
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.textColor"
        ><div class="button-samples">
          <v-btn
            v-for="color in context.colors"
            :key="color"
            :color="color"
            variant="text"
            @click="context.clicked(color)"
            >{{ color }}</v-btn
          >
        </div></ExampleCard
      ><ExampleCard
        v-for="outlined in context.contentConfig.values.items2"
        :key="String(outlined)"
        :title="
          outlined
            ? context.contentConfig.texts.outlinedIconColor
            : context.contentConfig.texts.iconColor
        "
        ><div class="button-samples">
          <v-btn
            v-for="(color, i) in context.colors"
            :key="color"
            :color="color"
            :variant="
              outlined
                ? context.contentConfig.texts.outlined2
                : context.contentConfig.texts.flat
            "
            icon
            size="42"
            :aria-label="
              (outlined
                ? context.contentConfig.texts.outlined3
                : context.contentConfig.texts.text1) +
              context.iconNames[i] +
              context.contentConfig.texts.button
            "
            @click="context.clicked(context.iconNames[i])"
            ><Icon :name="context.iconNames[i]" :size="20"
          /></v-btn></div></ExampleCard
      ><ExampleCard
        v-for="outlined in context.contentConfig.values.items3"
        :key="context.contentConfig.texts.sizes + outlined"
        :title="
          outlined
            ? context.contentConfig.texts.outlinedIconSize
            : context.contentConfig.texts.iconSize
        "
        ><div class="button-samples">
          <v-btn
            v-for="([size, label], i) in context.sizes"
            :key="size"
            :size="size"
            :variant="
              outlined
                ? context.contentConfig.texts.outlined2
                : context.contentConfig.texts.flat
            "
            color="primary"
            icon
            :aria-label="
              (outlined
                ? context.contentConfig.texts.outlined3
                : context.contentConfig.texts.text1) +
              label +
              context.contentConfig.texts.icon
            "
            @click="context.clicked(label)"
            ><Icon name="heart" :size="14 + i * 3"
          /></v-btn></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.buttonGroup" wide
        ><div class="button-group-examples">
          <div
            v-for="(variant, i) in context.contentConfig.values.items4"
            :key="variant"
          >
            <h4>
              {{
                i === 0
                  ? context.contentConfig.texts.default
                  : variant[0].toUpperCase() + variant.slice(1)
              }}
            </h4>
            <v-btn-toggle
              v-model="context.groups[i]"
              mandatory
              color="primary"
              :variant="variant"
              divided
              ><v-btn
                v-for="(name, j) in context.contentConfig.values.items5"
                :key="name"
                :value="j"
                :aria-label="variant + context.contentConfig.texts.text2 + name"
                >{{ name }}</v-btn
              ></v-btn-toggle
            >
          </div>
        </div></ExampleCard
      >
    </div></FormPage
  >
</template>
