<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { TypographyContext } from "./types";

defineProps<{ context: TypographyContext }>();
</script>

<template>
  <UiPage
    :title="context.contentConfig.texts.typography"
    heading="Basic Typography"
    ><div class="example-stack">
      <ExampleCard :title="context.contentConfig.texts.heading"
        ><div
          v-for="([size, line], i) in context.headingSizes"
          :key="i"
          class="b5-type-sample"
        >
          <component
            :is="context.contentConfig.texts.h + (i + 1)"
            :style="{
              fontSize: size + context.contentConfig.texts.px,
              lineHeight: line + context.contentConfig.texts.px,
              fontWeight: 600,
            }"
            >{{ context.contentConfig.texts.h }}{{ i + 1
            }}{{ context.contentConfig.texts.heading2 }}</component
          >
          <p>
            {{ context.contentConfig.texts.fontSize }}{{ size
            }}{{ context.contentConfig.texts.lineHeight }}{{ line
            }}{{ context.contentConfig.texts.fontWeight600 }}
          </p>
        </div>
        <div
          v-for="[label, size, line] in context.bodyStyles"
          :key="label"
          class="b5-type-sample"
        >
          <div
            :style="{
              fontSize: size + context.contentConfig.texts.px,
              lineHeight: line + context.contentConfig.texts.px,
              fontWeight: 400,
              textTransform:
                label === context.contentConfig.texts.overline
                  ? context.contentConfig.texts.uppercase
                  : undefined,
            }"
          >
            {{ label }}{{ context.contentConfig.texts.text1 }}{{ context.text }}
          </div>
          <p>
            {{ context.contentConfig.texts.fontSize }}{{ size
            }}{{ context.contentConfig.texts.lineHeight }}{{ line
            }}{{ context.contentConfig.texts.fontWeight400 }}
          </p>
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.defaultText"
        ><div
          v-for="color in context.contentConfig.values.items1"
          :key="color"
          class="b5-type-sample"
          :class="context.contentConfig.texts.text + color"
        >
          <h3>
            {{ context.contentConfig.texts.text2
            }}{{ color[0].toUpperCase() + color.slice(1) }}
          </h3>
          <p :class="context.contentConfig.texts.text + color">
            {{ context.text }}
          </p>
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.textAlignment"
        ><div class="b5-type-lines">
          <p>{{ context.contentConfig.texts.leftAlignedOnAllViewportSizes }}</p>
          <p class="text-center">
            {{ context.contentConfig.texts.centerAlignedOnAllViewportSizes }}
          </p>
          <p class="text-right">
            {{ context.contentConfig.texts.rightAlignedOnAllViewportSizes }}
          </p>
          <p
            v-for="size in context.contentConfig.values.items2"
            :key="size"
            :class="
              context.contentConfig.texts.text +
              size +
              context.contentConfig.texts.left
            "
          >
            {{ context.contentConfig.texts.leftAlignedOnViewports
            }}{{ size.toUpperCase() }}{{ context.contentConfig.texts.orWider }}
          </p>
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.decoration"
        ><div class="b5-type-lines">
          <router-link
            :to="context.contentConfig.texts.pagesRouteDirectory"
            class="text-decoration-none"
            >{{ context.contentConfig.texts.nonUnderlinedLink }}</router-link
          >
          <p class="text-decoration-line-through">
            {{ context.contentConfig.texts.lineThroughText }}
          </p>
          <p class="text-decoration-overline">
            {{ context.contentConfig.texts.overlineText }}
          </p>
          <p class="text-decoration-underline">
            {{ context.contentConfig.texts.underlineText }}
          </p>
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.opacity"
        ><div class="b5-type-lines">
          <p class="text-high-emphasis">
            {{
              context.contentConfig.texts
                .highEmphasisHasAnOpacityOf87InLightSkinAnd100InDark
            }}
          </p>
          <p class="text-medium-emphasis">
            {{
              context.contentConfig.texts
                .mediumEmphasisTextAndHintTextHaveOpacitiesOf60InLightSk
            }}
          </p>
          <p class="text-disabled">
            {{
              context.contentConfig.texts
                .disabledTextHasAnOpacityOf38InLightSkinAnd50InDark
            }}
          </p>
        </div></ExampleCard
      >
    </div></UiPage
  >
</template>
