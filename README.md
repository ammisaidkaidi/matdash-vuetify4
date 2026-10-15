# MatDash — Vue 3 + Vuetify 4 + Vue Router

## Current project organization

```text
src/
├── App.vue
├── main.js
├── app/
│   ├── router/          # Route configuration and batch loaders
│   └── snipets/         # 68 page wrappers
├── com/
│   ├── <Name>/          # 68 reusable views with types.ts
│   └── ui/              # 25 shared UI helpers
├── composables/
├── data/
└── styles/              # The seven existing stylesheets
builtin/assets/          # Navigation JSON, component mapping, and historical audit
public/                  # Static assets and icons
backups/                 # App.vue.old and the two original ZIP archives
scripts/                 # Existing rename utility
docs/ROUTES.md          # Route inventory
```

Component and wrapper filenames, route URLs, application behavior, and backup contents are unchanged. `src/App.vue` receives only the required import-path updates. Only empty legacy `src/pages/` folders were removed. The original routing replacement report is a historical audit; the current router lives in `src/app/router/`.

## Version 1.6: Batch 5 — UI components, charts, and demo authentication

The application now contains **103 ready catalog routes and 7 explicitly labelled placeholders**:

- Baseline: Dashboard1, Account Settings, and the Route Directory.
- Batch 1: **20 application pages**, implemented using shared page-family components.
- Batch 2: **20 form/contact pages**, starting with Combobox and all 13 form-element siblings.
- Batch 3: **20 dashboard/profile/widget/utility/icon/front pages**, with shared layouts and working demo interactions.
- Batch 4: **20 table/chart pages**, with native Vuetify table behaviours and ApexCharts visualizations.
- Batch 5: **20 chart/UI/authentication pages**, with working component examples and clearly labelled local auth demonstrations.

This is a staged front-end recreation, not the original commercial source or a complete production backend.

## Plan and optimized workflow

Start with **[plans/IMPLEMENTATION-PLAN.md](plans/IMPLEMENTATION-PLAN.md)**. It explains what was learned from Dashboard1 and Account Settings, how the references were inspected, what can be reused, and how the remaining work is grouped.

- Exact allocation of all 107 originally remaining pages: **[plans/batches.json](plans/batches.json)**.
- Batches: **20 + 20 + 20 + 20 + 20 + 7**.
- Batch 5 reference evidence: **[plans/BATCH-05-REFERENCE-LEDGER.md](plans/BATCH-05-REFERENCE-LEDGER.md)**.
- Batch 4 reference evidence: **[plans/BATCH-04-REFERENCE-LEDGER.md](plans/BATCH-04-REFERENCE-LEDGER.md)**.
- Batch 3 reference evidence: **[plans/BATCH-03-REFERENCE-LEDGER.md](plans/BATCH-03-REFERENCE-LEDGER.md)**.
- Batch 2 reference evidence: **[plans/BATCH-02-REFERENCE-LEDGER.md](plans/BATCH-02-REFERENCE-LEDGER.md)**.
- First-batch reference evidence: **[plans/BATCH-01-REFERENCE-LEDGER.md](plans/BATCH-01-REFERENCE-LEDGER.md)**.
- Current route/status inventory: **[ROUTES.md](docs/ROUTES.md)**.

For each batch, read the references together using one public demo login and four concurrent workers. Cache successful reads. Implement shared components first, then the page-specific views. Run **one combined build and smoke checkpoint after the batch**, rather than a test/screenshot loop after every page. Per-page pixel-perfect verification is not claimed.

## Batch 1 pages

| Family        | Implemented routes                                                      |
| ------------- | ----------------------------------------------------------------------- |
| Commerce — 6  | Shop, Product Detail, Product List, Checkout, Add Product, Edit Product |
| Invoices — 4  | Invoice List, Details, Create, Edit                                     |
| Core apps — 7 | Calendar, Email, Chats, Notes, Kanban, Contacts, Tickets                |
| Blog — 2      | Blog Posts, Blog Details                                                |
| Profile — 1   | Main User Profile                                                       |

### Working demo behaviours

- **Products:** search, category/audience/price/rating filtering, sorting, details, quantity selection, related products, validated create/edit forms, thumbnail upload, local deletion.
- **Cart and checkout:** shared cart state, quantity changes, remove item, validated billing form, demo payment-method selection, local order confirmation. No card details collected; no charges made.
- **Invoices:** searchable/filterable list, route-driven details, create/edit line items, calculated subtotal/VAT/total, local delete, text download.
- **Contacts and tickets:** search, forms, local create/edit/delete, status summaries.
- **Notes:** search, create, edit title/body/colour, delete, automatic local persistence.
- **Kanban:** create/edit/delete tasks, drag between columns, accessible edit/move alternative for mobile.
- **Calendar:** month/week/day modes, period navigation, event create/edit/delete, date picker and agenda.
- **Email:** folders, labels, search, starred/important state, read view, compose, local drafts/sent/trash, reply/forward. Nothing is sent externally.
- **Chats:** contact search/selection, locally retained messages, image attachments. No real recipient or live connection.
- **Blog:** featured/cards layout, route-driven articles, local comments.
- **Profile:** cover/header, introduction/photos, local posts, likes, comments, image attachments, sample story-to-feed action.

## Batch 2 pages — completed in the requested order

1. **All form-element siblings (13):** Combobox, Autocomplete, Buttons, Checkbox, Custom Inputs, File Inputs, Radio, Date/Time, Select, Slider, Switch, Time Picker, Stepper.
2. **Related forms (6):** Form Layouts, Horizontal Form, Vertical Form, Custom Form, Form Validation, Editor.
3. **Contact Us (1):** front-page navigation, contact form, information panel, and footer CTA.

### Working form behaviours

- Free-text combobox entries, multiple selection, removable chips, readonly examples, autocomplete filtering, select menus.
- Checkbox/radio/switch models, button variants/groups, explicit disabled/loading examples.
- File selection, chips, counters, multiple-file selection and avatar type/2 MB validation. Files are not uploaded.
- Native date/time fields, keyboard-adjustable sliders, dial time pickers, constrained time ranges, and a previous/next/finish stepper.
- Label/icon layouts, readonly/disabled fields, local validation, password confirmation, form resets, retained tab drafts, and collapsible delivery/payment demonstrations.
- Required/select/checkbox/radio validation and validation-on-blur examples. Passwords are cleared after a successful local validation and are not persisted.
- Real **Tiptap** rich-text editing: formatting, headings, lists, code, alignment, undo/redo, local image insertion (2 MB maximum), reset confirmation, and HTML download.
- Contact Us validates in-browser and explicitly confirms that no message was sent. Front-page links to unfinished destinations open their honest placeholders.

The original dashboard/widget batch was moved to Batch 3. No route was omitted or duplicated.

## Batch 3 pages — completed

| Family          | Pages                                                                           |
| --------------- | ------------------------------------------------------------------------------- |
| Dashboards — 2  | Dashboard2, Dashboard3                                                          |
| Profile — 3     | Followers, Friends, Gallery                                                     |
| Widgets — 3     | Banners, Cards, Charts                                                          |
| Utilities — 6   | FAQ, Gallery Lightbox, Pricing, Search Results, Social Media Contacts, Treeview |
| Icons — 2       | Tabler, Solar                                                                   |
| Front pages — 4 | Homepage, About Us, Blog Posts, Blog Details                                    |

### Working Batch 3 behaviours

- Dashboard charts, product/category and period controls, metric/project details, calendar month/week/day navigation and event editing.
- People search, persistent local follow state, profile dialogs, local story posting; searchable gallery and keyboard/button-controlled lightbox with image download.
- Expandable FAQs; monthly/yearly sample pricing and explicit confirmation that no subscription or charge is created; local search/pagination; nested tree expansion/activation.
- Actual locally bundled icon libraries: **6,286 Tabler definitions and 8,859 Solar definitions**, searchable with pagination, preview, copy-name fallback, and SVG download. [Icon attribution](public/icons/ATTRIBUTION.md).
- Banner actions, CSV download, local friend acceptance; product-to-cart actions; widget settings, gift preview, activity links and interactive chart controls.
- Responsive front-page navigation, feature tabs, testimonial carousel, sample license-pricing dialogs, FAQ panels, ten-article blog grid/filter and route-driven article details.

### Deliberate Batch 3 simplifications

Analytics are illustrative, not live financial data. The location visualization uses a globe and region bars rather than an interactive world map. Music cards show track information; no audio is bundled. Search results come from 30 local records, not the web. Gallery filenames are illustrative labels over sample JPEGs. Marketing figures, testimonials, feature labels, and license prices are reference sample content—not claims about this recreation or offers for sale. Some example text and decorative elements differ from the reference. Icon collections reflect the installed packages and therefore have different counts from the older embedded reference.

## Batch 4 pages — completed

| Family              | Pages                                                                           |
| ------------------- | ------------------------------------------------------------------------------- |
| Standard tables — 6 | Basic, Dark, Density, Fixed Header, Height, Editable                            |
| Data tables — 9     | Basic, Header, Selection, Sorting, Pagination, Filtering, Grouping, Slots, CRUD |
| Charts — 5          | Line, Gredient, Area, Candlestick, Column                                       |

### Working Batch 4 behaviours

- Five rich static table variants with local avatars, status/team chips, progress and record dialogs; density switching and bounded/fixed-header scrolling.
- Editable contacts reuse the existing validated contact editor and shared `matdash-apps-v1` data. Edits made here also appear in the Contact App.
- Independent selection examples, selected-value output, disabled rows, single/page/all strategies, numeric budget sorting, multi-sort state, external page controls, custom uppercase filtering, name-only product filtering, collapsible status groups, custom row/header slots, accessible expandable rows.
- Dessert create/edit/delete with required-name and finite non-negative numeric validation, cancellation, deletion confirmation, search, sorting, pagination, and persistent local data.
- Native ApexCharts line, gradient line, area, candlestick and grouped-column charts; hover/legend interaction, candlestick zoom/reset, source-data tables, CSV downloads, and native candlestick export tools.

### Batch 4 boundaries

Tables demonstrate client-side operations; there is no remote database. Example data and some row order/wording differ from the reference. Graphics-card images are generic inline illustrations, not product photographs. Chart series are reference-aligned examples; candlesticks use deterministic synthetic OHLC data. They are not live financial feeds. The original `/charts/gredient-chart` spelling is retained for route compatibility. No pixel-perfect per-page audit is claimed.

## Batch 5 pages — completed

| Family             | Pages                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------- |
| Charts — 2         | Doughnut & Pie; Radialbar & Radar                                                      |
| UI components — 11 | Alert, Accordion, Avatar, Chip, Dialog, List, Menus, Rating, Tabs, Tooltip, Typography |
| Authentication — 7 | Error 404; Side/Boxed Login; Side/Boxed Register; Side/Boxed Forgot Password           |

### Working Batch 5 behaviours

- Circular, radial, and radar charts with hover/legend behaviour where applicable, data views and CSV downloads.
- Dismiss/restore alerts and chips; independent accordion variants; avatar variants/sizes; eight working dialog examples including validated forms, persistent/fullscreen/scrollable/nested dialogs.
- List selection/nesting/switches/scrolling, anchored and hover menus, tooltip activators, popovers, clearable and half-step ratings, long scrolling tabs, disabled tabs, controlled tooltips and typography examples.
- Side and boxed authentication layouts, independent of the dashboard navigation; working internal links, password visibility control, field validation, boxed feature slides and an illustrated 404.

### Demo authentication — not a security system

Use **`demo@matdash.local` / `Demo123!`** on either login page. Only these displayed sample values start the demo session. Remembering the session stores **only `{ "demo": true }`** under `matdash-auth-demo-v1` in localStorage; otherwise the flag uses sessionStorage. The account menu can clear the demo session. No credentials are stored.

Registration validates the form but **does not create an account**; recovery validates an email format but **does not send email or change a password**. Password fields are cleared after successful registration and when leaving the form. Google/Facebook buttons show a disconnected-service notice; no OAuth flow is started. All dashboard routes remain publicly accessible—there is no authorization enforcement or production authentication backend. Use sample information only.

Some hidden dialog content and decorative auth backgrounds are newly authored approximations. Reference animation-in-progress screenshots are implemented as stable, complete charts. No pixel-perfect verification is claimed.

## Run locally

Requires Node.js 20.19+ or Node.js 22+.

```bash
npm ci
npm run dev
```

The root opens Dashboard1. Examples:

```text
/ui-components/dialogs
/ui-components/tabs
/charts/doughnut-pie-chart
/auth/login
/auth/login2
/tables/basic
/tables/editable
/tables/datatables/selection
/tables/datatables/crudtable
/charts/line-chart
/charts/candlestick-chart
/dashboards/dashboard2
/dashboards/dashboard3
/apps/user/profile/followers
/widgets/charts
/icons/solar
/front-page/homepage
/forms/form-elements/combobox
/forms/form-elements/time-picker
/forms/form-validation
/forms/editor
/front-page/contact-us
/pages/account-settings
/pages/route-directory
/ecommerce/products
/ecommerce/product/detail/1
/ecommerce/productlist
/ecommerce/checkout
/apps/invoice
/apps/invoice/details/102
/apps/contacts
/apps/calendar
/apps/email
/apps/chats
/apps/notes
/apps/kanban
/apps/tickets
/apps/blog/posts
/apps/user/profile
```

All internal navigation uses Vue Router. Routes not yet rebuilt open an explicit placeholder, not an external demo or a falsely labelled complete page.

```bash
npm run build
npm run preview
```

## Local state and backend boundaries

The shared application demo store is `src/composables/useDemoStore.js`. It makes product/list/detail/cart and invoice/list/editor flows consistent across routes. It persists to `localStorage` under `matdash-apps-v1`. Account Settings separately uses `matdash-account-settings-v1`.

Data is local to one browser, not encrypted application storage and not synchronized with a server. Avoid entering sensitive production information. Storage failures show a warning. Batch 1 application image uploads are limited to 800 KB. The Batch 2 avatar validation example and editor image insertion allow up to 2 MB. Passwords and payment card details are never persisted.

Messages, comments, orders, invoices, billing changes, and security controls are **local demonstrations**. No email/chat delivery, payment processing, real subscription management, MFA activation, or remote session revocation is performed.

Batch 2 examples and contact fields use **ephemeral component state**, not the app store. Navigation/reload discards those values; editor content can be downloaded explicitly. Do not enter real passwords or sensitive contact details in demo forms.

Batch 3 local preferences (followed people, selected demo plan/billing period, widget settings and friend state) use `matdash-pages-v1`. Calendar, story, and cart actions reuse the existing shared app store. No social network, subscription, transaction, or gift service is connected.

Batch 4 desserts use `matdash-table-demos-v1`. Selection, filters, expansion, and chart controls are ephemeral demonstration state. No table action contacts a server or changes a real invoice/project.

## Fidelity and deliberate simplifications

The references were read in bulk from their rendered DOM and screenshots. The common MatDash shell, palette, imagery, typography, cards, and major page-family layouts are retained. Dynamic/random reference data is replaced with consistent sample data where needed.

This batch prioritizes usable front-end flows over exhaustive commercial-template feature parity. For example, the product description uses a plain-text editor rather than the original rich-text editor; calendar variants are represented by a main calendar, picker, and agenda; stories are added to the local profile feed; messages are local-only; checkout uses a safe demo payment choice. Some decorative controls and sample content differ. These are not pixel-verified copies of every reference state.

## Project layout

```text
src/
  App.vue                         Shared shell, toolbar, search, navigation
  main.js                         Vue, Vuetify 4, and router registration
  router/
    batch02.js                    Twenty forms-first route mappings
    batch03.js                    Twenty dashboard/utility/front route mappings
    batch04.js                    Twenty table/chart route mappings
    batch05.js                    Twenty chart/UI/auth route mappings
    index.js                      Route registry and lazy loading
    batch01.js                    Twenty new route-to-component mappings
  data/
    navigation.js                 Full sidebar and implementation statuses
    dashboard.js                  Dashboard product statistics
    app-seed.js                    Shared app sample data
    app-assets.json               Local reference asset mapping
  composables/
    useAccountSettings.js         Validated account drafts and local save/reset
    useDemoStore.js                Shared persistent application demo state
    useFeedback.js                Notifications, confirmations, validation helpers
  components/
    Dashboard.vue                 Dashboard1
    DashboardChart.vue            ApexCharts configurations
    NavigationItem.vue            Recursive local sidebar links
    PageHeader.vue                Shared breadcrumb/header
    SettingsField.vue             Account form field
    apps/                         Workspace wrapper, record dialog, product card, feedback
    forms/                        Shared page, example card, schema form, tab/section controls
  pages/
    AccountSettings.vue           Four account tabs
    RouteDirectory.vue            Searchable status directory
    QueuedPage.vue                Explicit placeholder
    NotFound.vue                  Unknown-route 404
    apps/                         The Batch 1 page families
    forms/                        The Batch 2 component/form/editor families
    front/ContactUs.vue           Front-layout contact demonstration
    batch03/                      Dashboard, community, utility, widget, marketing views
    batch04/                      Standard/data/CRUD tables and chart examples
    batch05/                      Circular charts, UI demos, and demo auth layouts
  style.css                       Original shell/dashboard styles
  pages.css                       Account/routing page styles
  apps.css                        Shared application-family styles
  forms.css                       Responsive/dark form examples and contact layout
  batch03.css                     Responsive/dark Batch 3 and marketing layouts
  batch04.css                     Responsive/dark table and chart examples
  batch05.css                     Responsive/dark UI and authentication layouts
plans/                            Full plan, batch allocation, reference ledger
scripts/                          Batch planning and bulk reference reader
tests/                            Baseline and consolidated batch checks
public/assets/                    Locally stored reference imagery
public/icons/                     Local Tabler/Solar libraries and attribution
```

## Reference acquisition

The plan was generated once at the v1.1 baseline; do not regenerate it from the reduced remaining-route list. It is a frozen work allocation.

To acquire the next batch:

```bash
npx playwright install --with-deps chromium
node scripts/read-reference-batch.mjs 6
```

The reader uses the public demo's prefilled sign-in form, one signed-in browser context, four workers, and up to 20 paths from the plan. It records page text, headings, controls, tabs, tables, image URLs, links, and screenshots in `research/batch-XX/`. These raw research captures are not included in the source archive; the reusable acquisition script and concise ledgers for all five completed batches are included.

## Batch checkpoint

Run the development server in one terminal, then:

```bash
npm run build
npm run test:batch05
```

For this delivery, the production build passed. Ten of eleven combined groups passed initially; the half-rating test clicked the whole-star region rather than the left half. Correcting the pointer location made the affected rating/tab check pass. No application fix or rebuild was required. Both runs had zero browser exceptions, unresolved-component warnings, and POST requests. Aggregate coverage: 20 routes, eleven interaction groups, all seven auth pages, credential-storage checks, nine mobile families, and dark mode. See `plans/BATCH-05-CHECKPOINT.json`.

To rerun only an affected group, use `ONLY=ratings-tabs npm run test:batch05`. A normal test runs the complete batch. No full cross-batch regression or per-page visual comparison was run for this delivery.

Older baseline suites remain available for a final or targeted regression pass:

```bash
npm run test:batch01
npm run test:batch02
npm run test:batch03
npm run test:batch04
npm run test:smoke
npm run test:account
npm run test:routes
```

`BASE_ORIGIN` overrides the development server origin for app/account/route tests. The original dashboard test uses `BASE_URL`. Route tests expect Vite development mode.

## Next batch

Batch 6 contains the final seven pages: Side/Boxed Two Steps, Maintenance, front Portfolio/Pricing, and two nested-menu destinations. Its exact routes are listed in `plans/batches.json`. They remain placeholders until implemented. No background worker is implementing them automatically.

## Deployment and third-party rights

Deploy `dist/` with a history-mode SPA fallback to `index.html`; Netlify's `_redirects` is included. Runtime fonts, icons, and images are local. Restrict development-server host allowlists appropriately outside the preview environment.

Reference: https://matdash-vuetify-main.netlify.app/

The MatDash branding and images retain their original ownership. This recreation does not grant rights to the commercial template or its assets. Confirm appropriate rights before production use/redistribution, or replace the assets. Review the applicable Vue, Vue Router, Vuetify, ApexCharts, Lucide, Manrope, Tiptap, and ProseMirror licenses. Tabler icons are MIT-licensed; Solar icons are by 480 Design under CC BY 4.0. Full bundled-icon notices and attribution are in `public/icons/`.
