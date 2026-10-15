<script setup>
import { ref } from "vue";
import {
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelTitle,
  VExpansionPanelText,
} from "vuetify/components";
import ExampleCard from "./ExampleCard.vue";
import DemoForm from "./DemoForm.vue";
import { personalFields, addressFields } from "../../data/form-fields";
const props = defineProps({ horizontal: Boolean });
const panels = ref(props.horizontal ? undefined : 0),
  tab = ref("Personal Info"),
  delivery = ref("Standard delivery"),
  payment = ref("Invoice on delivery");
const account = [
  { key: "username", label: "Username", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "password", label: "Password", type: "password", required: true },
  {
    key: "confirm",
    label: "Confirm Password",
    type: "password",
    confirm: true,
    required: true,
  },
];
const social = [
  {
    key: "website",
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
  },
  {
    key: "linkedin",
    label: "LinkedIn profile",
    type: "url",
    placeholder: "https://linkedin.com/in/your-name",
  },
  { key: "social", label: "Social handle", placeholder: "@username" },
];
</script>
<template>
  <ExampleCard title="Collapsible Section" class="standalone-example"
    ><v-expansion-panels v-model="panels" variant="accordion"
      ><v-expansion-panel
        ><v-expansion-panel-title>Delivery Address</v-expansion-panel-title
        ><v-expansion-panel-text
          ><DemoForm
            :fields="addressFields"
            :columns="2"
            :horizontal="horizontal"
            submit-label="Save Address"
            cancel
            form-name="Delivery address demo" /></v-expansion-panel-text></v-expansion-panel
      ><v-expansion-panel
        ><v-expansion-panel-title>Delivery Options</v-expansion-panel-title
        ><v-expansion-panel-text
          ><v-radio-group v-model="delivery" color="primary"
            ><v-radio
              label="Standard delivery"
              value="Standard delivery" /><v-radio
              label="Express delivery"
              value="Express delivery" /><v-radio
              label="Collect in store"
              value="Collect in store"
          /></v-radio-group>
          <p class="muted text-caption">
            Selected: {{ delivery }} · Sample choice only.
          </p></v-expansion-panel-text
        ></v-expansion-panel
      ><v-expansion-panel
        ><v-expansion-panel-title>Payment Method</v-expansion-panel-title
        ><v-expansion-panel-text
          ><v-select
            v-model="payment"
            :items="['Invoice on delivery', 'Demo card ending in 2102']"
            label="Payment method"
            class="mb-4"
          /><v-alert type="info" variant="tonal" density="compact"
            >Demo selection only. No payment details are collected and no
            charges are made.</v-alert
          ></v-expansion-panel-text
        ></v-expansion-panel
      ></v-expansion-panels
    ></ExampleCard
  ><ExampleCard title="Form with Tabs" class="standalone-example"
    ><v-tabs v-model="tab" color="primary" class="form-example-tabs"
      ><v-tab
        v-for="name in ['Personal Info', 'Account Details', 'Social Links']"
        :key="name"
        :value="name"
        >{{ name }}</v-tab
      ></v-tabs
    >
    <div class="pt-6">
      <DemoForm
        v-show="tab === 'Personal Info'"
        :fields="personalFields"
        :columns="2"
        cancel
        form-name="Personal info tab"
      /><DemoForm
        v-show="tab === 'Account Details'"
        :fields="account"
        :columns="2"
        cancel
        form-name="Account details tab"
      /><DemoForm
        v-show="tab === 'Social Links'"
        :fields="social"
        cancel
        form-name="Social links tab"
      /></div
  ></ExampleCard>
</template>
