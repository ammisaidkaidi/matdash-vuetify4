<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { InvoicesContext } from "./types";

defineProps<{ context: InvoicesContext }>();
</script>

<template>
  <WorkspacePage :title="context.title"
    ><v-card
      v-if="context.mode === context.contentConfig.texts.list"
      class="workspace-card"
      ><div class="invoice-metrics">
        <button
          v-for="s in context.contentConfig.values.items1"
          :key="s"
          :class="{
            selected: context.status === s,
          }"
          @click="context.status = s"
        >
          <v-avatar :color="context.colors[s]" variant="tonal" size="46"
            ><Icon name="invoice" :size="23"
          /></v-avatar>
          <div>
            <strong>{{
              s === context.contentConfig.texts.all
                ? context.contentConfig.texts.total
                : s
            }}</strong
            ><small
              >{{
                context.demo.invoices.filter(
                  (i) =>
                    s === context.contentConfig.texts.all || i.status === s,
                ).length
              }}{{ context.contentConfig.texts.invoices }}</small
            ><span>{{
              context.money(
                context.demo.invoices
                  .filter(
                    (i) =>
                      s === context.contentConfig.texts.all || i.status === s,
                  )
                  .reduce((sum, i) => sum + context.invoiceTotal(i), 0),
              )
            }}</span>
          </div>
        </button>
      </div>
      <div class="workspace-toolbar">
        <v-text-field
          v-model="context.search"
          :label="context.contentConfig.texts.searchInvoice"
          density="compact"
        /><v-spacer /><v-btn
          color="primary"
          :to="context.contentConfig.texts.appsInvoiceCreate"
          >{{ context.contentConfig.texts.newInvoice }}</v-btn
        >
      </div>
      <v-data-table
        :headers="context.headers"
        :items="context.filtered"
        :search="context.search"
        :items-per-page="10"
        class="workspace-table"
        ><template #item.id="{ item }"
          ><router-link
            :to="context.contentConfig.texts.appsInvoiceDetails + item.id"
            >{{ item.id }}</router-link
          ></template
        ><template #item.total="{ item }">{{
          context.money(context.invoiceTotal(item))
        }}</template
        ><template #item.status="{ item }"
          ><v-chip
            :color="context.colors[item.status]"
            size="small"
            rounded="sm"
            >{{ item.status }}</v-chip
          ></template
        ><template #item.actions="{ item }"
          ><div class="row-actions">
            <v-btn
              icon
              variant="tonal"
              size="29"
              color="success"
              :to="context.contentConfig.texts.appsInvoiceEdit + item.id"
              :aria-label="context.contentConfig.texts.editInvoice + item.id"
              ><Icon name="edit" :size="14" /></v-btn
            ><v-btn
              icon
              variant="tonal"
              size="29"
              color="primary"
              :to="context.contentConfig.texts.appsInvoiceDetails + item.id"
              :aria-label="context.contentConfig.texts.viewInvoice + item.id"
              ><Icon name="eye" :size="14" /></v-btn
            ><v-btn
              icon
              variant="tonal"
              size="29"
              color="error"
              :aria-label="context.contentConfig.texts.deleteInvoice + item.id"
              @click="context.remove(item)"
              ><Icon name="trash" :size="14"
            /></v-btn></div></template></v-data-table
    ></v-card>
    <v-card
      v-else-if="(context.mode === context.contentConfig.texts.detail || context.mode === context.contentConfig.texts.edit) &amp;&amp; !context.existing"
      class="workspace-empty"
      ><h2>{{ context.contentConfig.texts.invoiceNotFound }}</h2>
      <p class="muted">
        {{
          context.contentConfig.texts
            .thisInvoiceMayHaveBeenDeletedFromTheLocalWorkspace
        }}
      </p>
      <v-btn :to="context.contentConfig.texts.appsInvoice" color="primary">{{
        context.contentConfig.texts.backToInvoices
      }}</v-btn></v-card
    >
    <v-card v-else class="workspace-card invoice-sheet"
      ><v-form
        :ref="(element) => (context.form = element)"
        @submit.prevent="context.save"
        ><div class="invoice-heading">
          <img
            v-if="context.mode === context.contentConfig.texts.detail"
            :src="context.contentConfig.texts.assetsLogoDq6uoDMSvg"
            :alt="context.contentConfig.texts.matDash"
            width="135"
          />
          <div v-else>
            <h2>
              {{
                context.mode === context.contentConfig.texts.edit
                  ? context.contentConfig.texts.edit2
                  : context.contentConfig.texts.addNew
              }}{{ context.contentConfig.texts.invoiceDetails }}
            </h2>
            <p class="muted mt-5">
              {{ context.contentConfig.texts.iD }}{{ context.draft.id }}<br />{{
                context.contentConfig.texts.date
              }}{{ context.draft.date }}
            </p>
          </div>
          <div
            v-if="context.mode === context.contentConfig.texts.detail"
            class="text-right"
          >
            <v-chip
              :color="context.colors[context.draft.status]"
              size="small"
              >{{ context.draft.status }}</v-chip
            >
            <h3 class="mt-2">
              {{ context.contentConfig.texts.text1 }}{{ context.draft.id }}
            </h3>
          </div>
        </div>
        <div
          v-if="context.mode === context.contentConfig.texts.detail"
          class="invoice-addresses"
        >
          <div>
            <h3>{{ context.contentConfig.texts.billFrom }}</h3>
            <p>{{ context.draft.from }}</p>
            <p>{{ context.draft.fromEmail }}</p>
            <p>{{ context.draft.fromAddress }}</p>
          </div>
          <div class="text-right">
            <h3>{{ context.contentConfig.texts.billTo }}</h3>
            <p>{{ context.draft.to }}</p>
            <p>{{ context.draft.toEmail }}</p>
            <p>{{ context.draft.toAddress }}</p>
          </div>
        </div>
        <div v-else class="invoice-fields">
          <v-text-field
            v-model="context.draft.from"
            :label="context.contentConfig.texts.billFrom"
            :rules="[context.required]"
            hide-details="auto"
          /><v-text-field
            v-model="context.draft.to"
            :label="context.contentConfig.texts.billTo"
            :rules="[context.required]"
            hide-details="auto"
          /><v-select
            v-model="context.draft.status"
            :label="context.contentConfig.texts.status"
            :items="context.contentConfig.values.items2"
          /><v-text-field
            v-model="context.draft.fromAddress"
            :label="context.contentConfig.texts.fromAddress"
            :rules="[context.required]"
            hide-details="auto"
          /><v-text-field
            v-model="context.draft.toAddress"
            :label="context.contentConfig.texts.billToAddress"
            :rules="[context.required]"
            hide-details="auto"
          /><v-text-field
            v-model="context.draft.vat"
            type="number"
            min="0"
            max="100"
            :label="context.contentConfig.texts.vAT"
            :rules="[v => Number(v) >= 0 &amp;&amp; Number(v) &lt;= 100 || context.contentConfig.texts.use0100]"
            hide-details="auto"
          />
        </div>
        <v-table class="invoice-items"
          ><thead>
            <tr>
              <th>{{ context.contentConfig.texts.itemName }}</th>
              <th>{{ context.contentConfig.texts.unitPrice }}</th>
              <th>{{ context.contentConfig.texts.units }}</th>
              <th>{{ context.contentConfig.texts.totalCost }}</th>
              <th
                v-if="context.mode !== context.contentConfig.texts.detail"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, index) in context.draft.items" :key="index">
              <template
                v-if="context.mode === context.contentConfig.texts.detail"
                ><td>{{ line.name }}</td>
                <td>{{ context.money(line.price) }}</td>
                <td>{{ line.quantity }}</td></template
              ><template v-else
                ><td>
                  <v-text-field
                    v-model="line.name"
                    :label="context.contentConfig.texts.itemName"
                    :rules="[context.required]"
                    density="compact"
                    hide-details="auto"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model.number="line.price"
                    type="number"
                    min="0"
                    :label="context.contentConfig.texts.unitPrice"
                    :rules="[v => Number(v) >= 0 &amp;&amp; v !== context.contentConfig.texts.text2 || context.contentConfig.texts.enterAPrice]"
                    density="compact"
                    hide-details="auto"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model.number="line.quantity"
                    type="number"
                    min="1"
                    :label="context.contentConfig.texts.units"
                    :rules="[
                      (v) =>
                        Number(v) > 0 ||
                        context.contentConfig.texts.useAtLeast1,
                    ]"
                    density="compact"
                    hide-details="auto"
                  /></td
              ></template>
              <td>{{ context.money(line.price * line.quantity) }}</td>
              <td v-if="context.mode !== context.contentConfig.texts.detail">
                <v-btn
                  icon
                  size="30"
                  variant="text"
                  :disabled="context.draft.items.length === 1"
                  :aria-label="context.contentConfig.texts.removeLine"
                  @click="context.draft.items.splice(index, 1)"
                  ><Icon name="trash" :size="17"
                /></v-btn>
              </td>
            </tr></tbody></v-table
        ><v-btn
          v-if="context.mode !== context.contentConfig.texts.detail"
          color="primary"
          variant="tonal"
          class="mt-4"
          @click="
            context.draft.items.push({
              name: context.contentConfig.texts.text2,
              price: 0,
              quantity: 1,
            })
          "
          ><Icon name="plus" :size="17" class="mr-2" />{{
            context.contentConfig.texts.addItem
          }}</v-btn
        >
        <div class="invoice-totals">
          <p>
            <span>{{ context.contentConfig.texts.subTotal }}</span
            ><strong>{{
              context.money(context.invoiceSubtotal(context.draft))
            }}</strong>
          </p>
          <p>
            <span
              >{{ context.contentConfig.texts.vAT2 }}{{ context.draft.vat
              }}{{ context.contentConfig.texts.text3 }}</span
            ><strong>{{
              context.money(
                (context.invoiceSubtotal(context.draft) * context.draft.vat) /
                  100,
              )
            }}</strong>
          </p>
          <p>
            <span>{{ context.contentConfig.texts.grandTotal }}</span
            ><strong>{{
              context.money(context.invoiceTotal(context.draft))
            }}</strong>
          </p>
        </div>
        <div class="workspace-actions">
          <template v-if="context.mode === context.contentConfig.texts.detail"
            ><v-btn variant="outlined" @click="context.exportInvoice">{{
              context.contentConfig.texts.download
            }}</v-btn
            ><v-btn
              color="primary"
              :to="
                context.contentConfig.texts.appsInvoiceEdit + context.draft.id
              "
              >{{ context.contentConfig.texts.editInvoice2 }}</v-btn
            ><v-btn
              variant="tonal"
              color="primary"
              :to="context.contentConfig.texts.appsInvoice"
              >{{ context.contentConfig.texts.backToInvoiceList }}</v-btn
            ></template
          ><template v-else
            ><v-btn color="primary" type="submit">{{
              context.mode === context.contentConfig.texts.create
                ? context.contentConfig.texts.createInvoice
                : context.contentConfig.texts.save
            }}</v-btn
            ><v-btn
              color="error"
              variant="tonal"
              :to="context.contentConfig.texts.appsInvoice"
              >{{ context.contentConfig.texts.cancel }}</v-btn
            ></template
          >
        </div></v-form
      ></v-card
    ></WorkspacePage
  >
</template>
