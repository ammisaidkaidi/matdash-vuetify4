# Reusable component extractions

## Scope

This directory covers the **68 page/demo families** in the review inventory: the 67 files under `src/styles/pages` and the routed `src/components/Dashboard.vue`.

- `CrudTable/` was supplied previously.
- The other **67 folders** were created during this extraction request.
- **Imports and route loaders now point to the extracted `*page.vue` wrappers.** The original source files were subsequently removed. Route URLs are unchanged; the current page-wrapper paths are recorded in `builtin/assets/Component_Translations.json`.
- `extractions.json` is the machine-readable source-to-folder index.

## The three-file pattern

```text
src/com/<Name>/
├── <Name>.vue       # Reusable presentation
└── types.ts         # External interface definitions

src/app/snipets/
└── <Name>page.vue   # Demo/application controller and configuration
```

The existing CrudTable filenames retain their supplied capitalization: `Crudtable.vue` and `Crudtablepage.vue`.

### Focused, data-driven interfaces

`CrudTable`, `DataTables`, `PlainTables`, and `Charts` expose focused props, models, events, and slots for their respective UI families. Data records, columns/fields, labels, formatters, and example-specific configuration are supplied externally. `Editable` is an adapter over the existing generic CrudTable rather than a duplicate CRUD implementation.

For example, in a component under `src/`:

```vue
<script setup lang="ts">
import { ref } from "vue";
import DataTables from "./com/DataTables/DataTables.vue";

const records = ref([{ id: 1, name: "Customer A" }]);
const columns = [{ key: "name", title: "Customer" }];
</script>

<template>
  <DataTables
    :items="records"
    :columns="columns"
    title="Customers"
    searchable
    selection
  />
</template>
```

### Larger screens: typed view contexts

The other 63 families use a typed `context` prop. Their reusable `.vue` files contain presentation, not demo stores, route selection, persistence, or action implementations. `types.ts` lists the controller values and callbacks they require. The matching `*page.vue` is a complete wiring example:

- Data imports, stores, refs, computed values, callbacks, lifecycle hooks, and page decisions stay in the wrapper.
- `contentConfig.texts` supplies the extracted display strings and literal values used by the template.
- `contentConfig.values` supplies literal lists and objects previously embedded in the template.
- Writable accessors preserve the wrapper's refs and the form/DOM refs used by its callbacks.
- Where a screen composes a data-coupled custom helper, the wrapper supplies that renderer through the context. Existing helper components are not duplicated or rewritten.
- Neutral UI primitives/layouts can still be imported by the view.

Use the reusable view as `<Notes :context="notesContext" />`, with a context matching `Notes/types.ts`; use `src/app/snipets/Notespage.vue` as a complete starting point for wiring it to another data source.

These are **presentation/controller separations**, not a claim that every screen has been converted to one universal fields schema. Screen-specific layout remains in the reusable view. Data, content, state, and action implementations are external. Some context data shapes intentionally remain broad (`any` / records) so they can be narrowed when integrating a real backend.

## Inventory

| Component folder    | Original source                        | Interface pattern       |
| ------------------- | -------------------------------------- | ----------------------- |
| `Accordion/`        | `src/pages/batch05/Accordion.vue`      | Typed view context      |
| `AccountSettings/`  | `src/pages/AccountSettings.vue`        | Typed view context      |
| `Alerts/`           | `src/pages/batch05/Alerts.vue`         | Typed view context      |
| `Auth/`             | `src/pages/batch05/Auth.vue`           | Typed view context      |
| `Autocomplete/`     | `src/pages/forms/Autocomplete.vue`     | Typed view context      |
| `Avatars/`          | `src/pages/batch05/Avatars.vue`        | Typed view context      |
| `Banners/`          | `src/pages/batch03/Banners.vue`        | Typed view context      |
| `Blog/`             | `src/pages/apps/Blog.vue`              | Typed view context      |
| `Buttons/`          | `src/pages/forms/Buttons.vue`          | Typed view context      |
| `Calendar/`         | `src/pages/apps/Calendar.vue`          | Typed view context      |
| `CardWidgets/`      | `src/pages/batch03/CardWidgets.vue`    | Typed view context      |
| `Charts/`           | `src/pages/batch04/Charts.vue`         | Focused data-driven API |
| `ChartWidgets/`     | `src/pages/batch03/ChartWidgets.vue`   | Typed view context      |
| `Chats/`            | `src/pages/apps/Chats.vue`             | Typed view context      |
| `Checkout/`         | `src/pages/apps/Checkout.vue`          | Typed view context      |
| `Chips/`            | `src/pages/batch05/Chips.vue`          | Typed view context      |
| `Choices/`          | `src/pages/forms/Choices.vue`          | Typed view context      |
| `CircularCharts/`   | `src/pages/batch05/CircularCharts.vue` | Typed view context      |
| `Combobox/`         | `src/pages/forms/Combobox.vue`         | Typed view context      |
| `Contacts/`         | `src/pages/apps/Contacts.vue`          | Typed view context      |
| `ContactUs/`        | `src/pages/front/ContactUs.vue`        | Typed view context      |
| `CrudTable/`        | `src/pages/batch04/CrudTable.vue`      | Focused data-driven API |
| `CustomForm/`       | `src/pages/forms/CustomForm.vue`       | Typed view context      |
| `CustomInputs/`     | `src/pages/forms/CustomInputs.vue`     | Typed view context      |
| `Dashboard/`        | `src/components/Dashboard.vue`         | Typed view context      |
| `Dashboards/`       | `src/pages/batch03/Dashboards.vue`     | Typed view context      |
| `DataTables/`       | `src/pages/batch04/DataTables.vue`     | Focused data-driven API |
| `DateTime/`         | `src/pages/forms/DateTime.vue`         | Typed view context      |
| `Dialogs/`          | `src/pages/batch05/Dialogs.vue`        | Typed view context      |
| `DirectionalForms/` | `src/pages/forms/DirectionalForms.vue` | Typed view context      |
| `Editable/`         | `src/pages/batch04/Editable.vue`       | Shared CRUD adapter     |
| `Editor/`           | `src/pages/forms/Editor.vue`           | Typed view context      |
| `Email/`            | `src/pages/apps/Email.vue`             | Typed view context      |
| `ErrorPage/`        | `src/pages/batch05/ErrorPage.vue`      | Typed view context      |
| `Faq/`              | `src/pages/batch03/Faq.vue`            | Typed view context      |
| `FileInputs/`       | `src/pages/forms/FileInputs.vue`       | Typed view context      |
| `FormLayouts/`      | `src/pages/forms/FormLayouts.vue`      | Typed view context      |
| `FrontBlog/`        | `src/pages/batch03/FrontBlog.vue`      | Typed view context      |
| `FrontMarketing/`   | `src/pages/batch03/FrontMarketing.vue` | Typed view context      |
| `Gallery/`          | `src/pages/batch03/Gallery.vue`        | Typed view context      |
| `Icons/`            | `src/pages/batch03/Icons.vue`          | Typed view context      |
| `Invoices/`         | `src/pages/apps/Invoices.vue`          | Typed view context      |
| `Kanban/`           | `src/pages/apps/Kanban.vue`            | Typed view context      |
| `Lists/`            | `src/pages/batch05/Lists.vue`          | Typed view context      |
| `Menus/`            | `src/pages/batch05/Menus.vue`          | Typed view context      |
| `Notes/`            | `src/pages/apps/Notes.vue`             | Typed view context      |
| `NotFound/`         | `src/pages/NotFound.vue`               | Typed view context      |
| `People/`           | `src/pages/batch03/People.vue`         | Typed view context      |
| `PlainTables/`      | `src/pages/batch04/PlainTables.vue`    | Focused data-driven API |
| `Pricing/`          | `src/pages/batch03/Pricing.vue`        | Typed view context      |
| `ProductDetail/`    | `src/pages/apps/ProductDetail.vue`     | Typed view context      |
| `ProductEditor/`    | `src/pages/apps/ProductEditor.vue`     | Typed view context      |
| `Products/`         | `src/pages/apps/Products.vue`          | Typed view context      |
| `Profile/`          | `src/pages/apps/Profile.vue`           | Typed view context      |
| `QueuedPage/`       | `src/pages/QueuedPage.vue`             | Typed view context      |
| `Ratings/`          | `src/pages/batch05/Ratings.vue`        | Typed view context      |
| `RouteDirectory/`   | `src/pages/RouteDirectory.vue`         | Typed view context      |
| `Search/`           | `src/pages/batch03/Search.vue`         | Typed view context      |
| `Select/`           | `src/pages/forms/Select.vue`           | Typed view context      |
| `Sliders/`          | `src/pages/forms/Sliders.vue`          | Typed view context      |
| `Steppers/`         | `src/pages/forms/Steppers.vue`         | Typed view context      |
| `Tabs/`             | `src/pages/batch05/Tabs.vue`           | Typed view context      |
| `Tickets/`          | `src/pages/apps/Tickets.vue`           | Typed view context      |
| `TimePickers/`      | `src/pages/forms/TimePickers.vue`      | Typed view context      |
| `Tooltips/`         | `src/pages/batch05/Tooltips.vue`       | Typed view context      |
| `Treeview/`         | `src/pages/batch03/Treeview.vue`       | Typed view context      |
| `Typography/`       | `src/pages/batch05/Typography.vue`     | Typed view context      |
| `Validation/`       | `src/pages/forms/Validation.vue`       | Typed view context      |

## Initial extraction validation

- All **136 Vue files** (68 views and 68 page wrappers) passed Vue SFC compilation.
- Browser-only module substitutions exercised the extracted wrappers over **105 unique routes**, covering all **68 families**, without modifying the application router.
- Missing editor icon imports found in that pass were corrected and the editor was rechecked.
- Seven interaction groups passed: Notes editing/filtering, DataTables selection, PlainTables row actions, chart data/CSV/reset, Editable contact creation, AccountSettings form refs/save, and Editor content/history/file-input refs.
- Those interaction checks produced no runtime errors or unresolved-component/write warnings.
- This is not an exhaustive interaction audit and is not a full `vue-tsc` strict type check.

## Routing integration

All mapped import replacements have been written: **108 references in 9 source files** during the initial integration. Original files were later removed. Route URLs remain unchanged. `Component_Translations.json` now records the relocated page-wrapper paths. The detailed audit is in `builtin/assets/Component_Replacement_Report.json`. The build is performed only after the entire replacement batch.

The final production build passed after all replacements were complete.

## Page-wrapper location

All **68 page wrappers** now live directly in `src/app/snipets/`. Reusable views and `types.ts` remain in their original `src/com/<Name>/` folders. Incoming imports, each moved wrapper's own relative imports, the translation mapping, and the inventory file lists have been updated. The earlier routing replacement report is a historical audit of that operation.

Post-relocation reference checks found no stale page imports or missing local imports. The production build passed.

## Shared UI helpers

The 25 existing shared UI helpers are located directly in `src/com/ui/`. Their filenames and APIs are preserved; only import and asset-path references were adjusted. These helpers are separate from the 68 extracted page/view families.

Shared-UI move verification: all 25 moved Vue SFCs compiled, the production build passed, and all 25 UI development-module requests returned HTTP 200. The preview runs on port 5173.
