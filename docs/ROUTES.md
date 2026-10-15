# Route inventory

**110 mapped destinations: 103 ready front-end routes, 7 placeholders.**

Dashboard1, Account Settings, and the Route Directory form the baseline. Batches 1–5 add 100 implementations. “Ready” describes a local front-end demo, not a connected production backend.

See [the 107-page plan](../plans/IMPLEMENTATION-PLAN.md) and [batch allocation](../plans/batches.json).

## Dashboards

| Page                       | Route                           | Status      |
| -------------------------- | ------------------------------- | ----------- |
| Dashboard1                 | `/dashboards/dashboard1`        | Ready       |
| Dashboard2                 | `/dashboards/dashboard2`        | Ready       |
| Dashboard3                 | `/dashboards/dashboard3`        | Ready       |
| Front Pages · Homepage     | `/front-page/homepage`          | Ready       |
| Front Pages · About Us     | `/front-page/about-us`          | Ready       |
| Front Pages · Blog         | `/front-page/blog/posts`        | Ready       |
| Front Pages · Blog Details | `/front-page/blog/:slug`        | Ready       |
| Front Pages · Contact Us   | `/front-page/contact-us`        | Ready       |
| Front Pages · Portfolio    | `/front-page/portfolio`         | Placeholder |
| Front Pages · Pricing      | `/front-page/pricing`           | Placeholder |
| ECommerce · Shop           | `/ecommerce/products`           | Ready       |
| ECommerce · Detail         | `/ecommerce/product/detail/:id` | Ready       |
| ECommerce · List           | `/ecommerce/productlist`        | Ready       |
| ECommerce · Checkout       | `/ecommerce/checkout`           | Ready       |
| ECommerce · Add Product    | `/ecommerce/add-product`        | Ready       |
| ECommerce · Edit Product   | `/ecommerce/edit-product`       | Ready       |
| Blog · Blog Posts          | `/apps/blog/posts`              | Ready       |
| Blog · Blog Details        | `/apps/blog/:slug`              | Ready       |
| User Profile · Profile     | `/apps/user/profile`            | Ready       |
| User Profile · Followers   | `/apps/user/profile/followers`  | Ready       |
| User Profile · Friends     | `/apps/user/profile/friends`    | Ready       |
| User Profile · Gallery     | `/apps/user/profile/gallery`    | Ready       |
| Invoice · List             | `/apps/invoice`                 | Ready       |
| Invoice · Details          | `/apps/invoice/details/:id`     | Ready       |
| Invoice · Create           | `/apps/invoice/create`          | Ready       |
| Invoice · Edit             | `/apps/invoice/edit/:id`        | Ready       |
| Calendar                   | `/apps/calendar`                | Ready       |
| Email                      | `/apps/email`                   | Ready       |
| Chats                      | `/apps/chats`                   | Ready       |
| Notes                      | `/apps/notes`                   | Ready       |
| Kanban                     | `/apps/kanban`                  | Ready       |
| Contact                    | `/apps/contacts`                | Ready       |
| Tickets                    | `/apps/tickets`                 | Ready       |

## Pages

| Page             | Route                          | Status |
| ---------------- | ------------------------------ | ------ |
| Account Settings | `/pages/account-settings`      | Ready  |
| Banners Widgets  | `/widgets/banners`             | Ready  |
| Cards Widgets    | `/widgets/cards`               | Ready  |
| Charts Widgets   | `/widgets/charts`              | Ready  |
| FAQ              | `/pages/faq`                   | Ready  |
| Gallery Lightbox | `/pages/gallery-lightbox`      | Ready  |
| Pricing          | `/pages/pricing`               | Ready  |
| Search Results   | `/pages/search-results`        | Ready  |
| Social Contacts  | `/pages/social-media-contacts` | Ready  |
| Treeview         | `/pages/treeview`              | Ready  |
| Tabler Icons     | `/icons/tabler`                | Ready  |
| Solar Icons      | `/icons/solar`                 | Ready  |
| Route Directory  | `/pages/route-directory`       | Ready  |

## Forms

| Page                          | Route                               | Status |
| ----------------------------- | ----------------------------------- | ------ |
| Form Elements · Autocomplete  | `/forms/form-elements/autocomplete` | Ready  |
| Form Elements · Combobox      | `/forms/form-elements/combobox`     | Ready  |
| Form Elements · Button        | `/forms/form-elements/button`       | Ready  |
| Form Elements · Checkbox      | `/forms/form-elements/checkbox`     | Ready  |
| Form Elements · Custom Inputs | `/forms/form-elements/custominputs` | Ready  |
| Form Elements · File Inputs   | `/forms/form-elements/fileinputs`   | Ready  |
| Form Elements · Radio         | `/forms/form-elements/radio`        | Ready  |
| Form Elements · Date Time     | `/forms/form-elements/date-time`    | Ready  |
| Form Elements · Select        | `/forms/form-elements/select`       | Ready  |
| Form Elements · Slider        | `/forms/form-elements/slider`       | Ready  |
| Form Elements · Switch        | `/forms/form-elements/switch`       | Ready  |
| Form Elements · Time Picker   | `/forms/form-elements/time-picker`  | Ready  |
| Form Elements · Stepper       | `/forms/form-elements/stepper`      | Ready  |
| Form Layout                   | `/forms/form-layouts`               | Ready  |
| Form Horizontal               | `/forms/form-horizontal`            | Ready  |
| Form Vertical                 | `/forms/form-vertical`              | Ready  |
| Form Custom                   | `/forms/form-custom`                | Ready  |
| Form Validation               | `/forms/form-validation`            | Ready  |
| Editor                        | `/forms/editor`                     | Ready  |

## Tables

| Page               | Route                           | Status |
| ------------------ | ------------------------------- | ------ |
| Basic Table        | `/tables/basic`                 | Ready  |
| Dark Table         | `/tables/dark`                  | Ready  |
| Density Table      | `/tables/density`               | Ready  |
| Fixed Header Table | `/tables/fixed-header`          | Ready  |
| Height Table       | `/tables/height`                | Ready  |
| Editable Table     | `/tables/editable`              | Ready  |
| Basic Table        | `/tables/datatables/basic`      | Ready  |
| Header Table       | `/tables/datatables/header`     | Ready  |
| Selection Table    | `/tables/datatables/selection`  | Ready  |
| Sorting Table      | `/tables/datatables/sorting`    | Ready  |
| Pagination Table   | `/tables/datatables/pagination` | Ready  |
| Filtering Table    | `/tables/datatables/filtering`  | Ready  |
| Grouping Table     | `/tables/datatables/grouping`   | Ready  |
| Table Slots        | `/tables/datatables/slots`      | Ready  |
| CRUD Table         | `/tables/datatables/crudtable`  | Ready  |

## Charts

| Page              | Route                        | Status |
| ----------------- | ---------------------------- | ------ |
| Line              | `/charts/line-chart`         | Ready  |
| Gredient          | `/charts/gredient-chart`     | Ready  |
| Area              | `/charts/area-chart`         | Ready  |
| Candlestick       | `/charts/candlestick-chart`  | Ready  |
| Column            | `/charts/column-chart`       | Ready  |
| Doughnut & Pie    | `/charts/doughnut-pie-chart` | Ready  |
| Radialbar & Radar | `/charts/radialbar-chart`    | Ready  |

## UI Components

| Page       | Route                       | Status |
| ---------- | --------------------------- | ------ |
| Alert      | `/ui-components/alert`      | Ready  |
| Accordion  | `/ui-components/accordion`  | Ready  |
| Avatar     | `/ui-components/avatar`     | Ready  |
| Chip       | `/ui-components/chip`       | Ready  |
| Dialog     | `/ui-components/dialogs`    | Ready  |
| List       | `/ui-components/list`       | Ready  |
| Menus      | `/ui-components/menus`      | Ready  |
| Rating     | `/ui-components/rating`     | Ready  |
| Tabs       | `/ui-components/tabs`       | Ready  |
| Tooltip    | `/ui-components/tooltip`    | Ready  |
| Typography | `/ui-components/typography` | Ready  |

## Authentication

| Page             | Route                    | Status      |
| ---------------- | ------------------------ | ----------- |
| Error            | `/auth/404`              | Ready       |
| Side Login       | `/auth/login`            | Ready       |
| Boxed Login      | `/auth/login2`           | Ready       |
| Side Register    | `/auth/register`         | Ready       |
| Boxed Register   | `/auth/register2`        | Ready       |
| Side Forgot Pwd  | `/auth/forgot-password`  | Ready       |
| Boxed Forgot Pwd | `/auth/forgot-password2` | Ready       |
| Side Two Steps   | `/auth/two-step`         | Placeholder |
| Boxed Two Steps  | `/auth/two-step2`        | Placeholder |
| Maintenance      | `/auth/maintenance`      | Placeholder |

## Others

| Page                 | Route     | Status      |
| -------------------- | --------- | ----------- |
| Menu Level · Level 1 | `/level1` | Placeholder |
| Level 1 · Level 2    | `/barry`  | Placeholder |
