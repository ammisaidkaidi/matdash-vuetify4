<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Editor/Editor.vue";
import type { EditorContext } from "../../com/Editor/types";
import { ref, computed } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Code,
  CodeXml,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
  RemoveFormatting,
  ImagePlus,
  Minus,
} from "@lucide/vue";
import FormPage from "../../com/ui/FormPage.vue";
import { notify, confirmDemo } from "../../composables/useFeedback";
const original =
  "<h2>Hi there,</h2><p>this is a <strong>basic</strong> example of <em>tiptap</em>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre><code>body {\n  display: none;\n}</code></pre><p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p><blockquote><p>Wow, that’s amazing. Good work, boy! 👏<br>— Mom</p></blockquote>";
const revision = ref(0),
  imageInput = ref();
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      link: {
        openOnClick: false,
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Image.configure({
      allowBase64: true,
    }),
  ],
  content: original,
  editorProps: {
    attributes: {
      role: "textbox",
      "aria-label": "Rich text editor",
      "aria-multiline": "true",
      spellcheck: "true",
    },
  },
  onUpdate: () => revision.value++,
});
const tools = [
  {
    name: "Bold",
    icon: Bold,
    mark: "bold",
    command: (c) => c.toggleBold(),
  },
  {
    name: "Italic",
    icon: Italic,
    mark: "italic",
    command: (c) => c.toggleItalic(),
  },
  {
    name: "Underline",
    icon: Underline,
    mark: "underline",
    command: (c) => c.toggleUnderline(),
  },
  {
    name: "Strike through",
    icon: Strikethrough,
    mark: "strike",
    command: (c) => c.toggleStrike(),
  },
  {
    name: "Heading 1",
    icon: Heading1,
    mark: "heading",
    attrs: {
      level: 1,
    },
    command: (c) =>
      c.toggleHeading({
        level: 1,
      }),
  },
  {
    name: "Heading 2",
    icon: Heading2,
    mark: "heading",
    attrs: {
      level: 2,
    },
    command: (c) =>
      c.toggleHeading({
        level: 2,
      }),
  },
  {
    name: "Paragraph",
    icon: Pilcrow,
    mark: "paragraph",
    command: (c) => c.setParagraph(),
  },
  {
    name: "Bullet list",
    icon: List,
    mark: "bulletList",
    command: (c) => c.toggleBulletList(),
  },
  {
    name: "Numbered list",
    icon: ListOrdered,
    mark: "orderedList",
    command: (c) => c.toggleOrderedList(),
  },
  {
    name: "Blockquote",
    icon: Quote,
    mark: "blockquote",
    command: (c) => c.toggleBlockquote(),
  },
  {
    name: "Inline code",
    icon: Code,
    mark: "code",
    command: (c) => c.toggleCode(),
  },
  {
    name: "Code block",
    icon: CodeXml,
    mark: "codeBlock",
    command: (c) => c.toggleCodeBlock(),
  },
  {
    name: "Horizontal rule",
    icon: Minus,
    command: (c) => c.setHorizontalRule(),
  },
  ...[
    [AlignLeft, "left"],
    [AlignCenter, "center"],
    [AlignRight, "right"],
    [AlignJustify, "justify"],
  ].map(([icon, align]) => ({
    name: "Align " + align,
    icon,
    attrs: {
      textAlign: align,
    },
    command: (c) => c.setTextAlign(align),
  })),
  {
    name: "Clear formatting",
    icon: RemoveFormatting,
    command: (c) => c.clearNodes().unsetAllMarks(),
  },
];
const wordCount = computed(() => {
  revision.value;
  return (
    editor.value?.getText().trim().split(/\s+/).filter(Boolean).length || 0
  );
});
function run(tool) {
  tool.command(editor.value.chain().focus()).run();
}
async function reset() {
  if (
    await confirmDemo(
      "Reset editor?",
      "This replaces the current unsaved content with the original sample.",
    )
  )
    editor.value.commands.setContent(original);
}
function upload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (
    !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
      file.type,
    ) ||
    file.size > 2 * 1024 * 1024
  ) {
    notify("Choose a JPG, PNG, GIF, or WebP image up to 2 MB.", "error");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    if (editor.value && !editor.value.isDestroyed)
      editor.value
        .chain()
        .focus()
        .setImage({
          src: String(reader.result),
          alt: file.name,
        })
        .run();
  };
  reader.readAsDataURL(file);
  event.target.value = "";
}
function download() {
  const html =
    '<!doctype html><html><head><meta charset="utf-8"><title>MatDash editor document</title></head><body>' +
    editor.value.getHTML() +
    "</body></html>";
  const url = URL.createObjectURL(
    new Blob([html], {
      type: "text/html",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "matdash-editor.html";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: EditorContext = __viewReactive({
  get download() {
    return __viewUnref(download);
  },
  get editor() {
    return __viewUnref(editor);
  },
  set editor(value: any) {
    if (__viewIsRef(editor)) (editor as any).value = value;
  },
  get imageInput() {
    return __viewUnref(imageInput);
  },
  set imageInput(value: any) {
    if (__viewIsRef(imageInput)) (imageInput as any).value = value;
  },
  get reset() {
    return __viewUnref(reset);
  },
  get run() {
    return __viewUnref(run);
  },
  get tools() {
    return __viewUnref(tools);
  },
  get upload() {
    return __viewUnref(upload);
  },
  get wordCount() {
    return __viewUnref(wordCount);
  },
  set wordCount(value: any) {
    if (__viewIsRef(wordCount)) (wordCount as any).value = value;
  },
  contentConfig: {
    texts: {
      editor: "Editor",
      textFormatting: "Text formatting",
      primary: "primary",
      insertImage: "Insert image",
      insertLocalImageUpTo2MB: "Insert local image (up to 2 MB)",
      undo: "Undo",
      redo: "Redo",
      editorImageFile: "Editor image file",
      wordsUnsavedLocalContent: " words · Unsaved local content",
      resetSample: "Reset sample",
      downloadHTML: "Download HTML",
    },
    values: {},
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
