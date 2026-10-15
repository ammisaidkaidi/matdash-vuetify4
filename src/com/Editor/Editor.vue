<script setup lang="ts">
import { EditorContent } from "@tiptap/vue-3";
import { ImagePlus, Undo2, Redo2 } from "@lucide/vue";
import FormPage from "../ui/FormPage.vue";
import Icon from "../ui/Icon.vue";
import type { EditorContext } from "./types";

defineProps<{ context: EditorContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.editor"
    ><div v-if="context.editor" class="rich-editor">
      <div
        class="editor-toolbar"
        role="toolbar"
        :aria-label="context.contentConfig.texts.textFormatting"
      >
        <v-btn
          v-for="tool in context.tools"
          :key="tool.name"
          :aria-label="tool.name"
          :title="tool.name"
          :aria-pressed="
            tool.mark
              ? context.editor.isActive(tool.mark, tool.attrs)
              : tool.attrs
                ? context.editor.isActive(tool.attrs)
                : undefined
          "
          :color="tool.mark &amp;&amp; context.editor.isActive(tool.mark, tool.attrs) || tool.attrs &amp;&amp; !tool.mark &amp;&amp; context.editor.isActive(tool.attrs) ? context.contentConfig.texts.primary : undefined"
          variant="text"
          icon
          size="34"
          @mousedown.prevent
          @click="context.run(tool)"
          ><component :is="tool.icon" :size="17" /></v-btn
        ><v-btn
          :aria-label="context.contentConfig.texts.insertImage"
          :title="context.contentConfig.texts.insertLocalImageUpTo2MB"
          variant="text"
          icon
          size="34"
          @mousedown.prevent
          @click="context.imageInput.click()"
          ><ImagePlus :size="17" /></v-btn
        ><v-btn
          :aria-label="context.contentConfig.texts.undo"
          :title="context.contentConfig.texts.undo"
          variant="text"
          icon
          size="34"
          :disabled="!context.editor.can().undo()"
          @mousedown.prevent
          @click="context.editor.chain().focus().undo().run()"
          ><Undo2 :size="17" /></v-btn
        ><v-btn
          :aria-label="context.contentConfig.texts.redo"
          :title="context.contentConfig.texts.redo"
          variant="text"
          icon
          size="34"
          :disabled="!context.editor.can().redo()"
          @mousedown.prevent
          @click="context.editor.chain().focus().redo().run()"
          ><Redo2 :size="17"
        /></v-btn>
      </div>
      <EditorContent :editor="context.editor" /><input
        :ref="(element) => (context.imageInput = element)"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        hidden
        :aria-label="context.contentConfig.texts.editorImageFile"
        @change="context.upload"
      />
    </div>
    <div class="example-footer">
      <span
        >{{ context.wordCount
        }}{{ context.contentConfig.texts.wordsUnsavedLocalContent }}</span
      >
      <div class="button-samples">
        <v-btn variant="text" @click="context.reset">{{
          context.contentConfig.texts.resetSample
        }}</v-btn
        ><v-btn color="primary" variant="tonal" @click="context.download"
          ><Icon name="download" :size="17" class="mr-2" />{{
            context.contentConfig.texts.downloadHTML
          }}</v-btn
        >
      </div>
    </div></FormPage
  >
</template>
