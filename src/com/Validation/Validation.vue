<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { ValidationContext } from "./types";

defineProps<{ context: ValidationContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.formValidation" bare
    ><div class="example-grid">
      <ExampleCard
        :title="context.contentConfig.texts.signUpValidation"
        class="standalone-example validation-auth"
        ><img
          :src="context.contentConfig.texts.assetsLogoDq6uoDMSvg"
          :alt="context.contentConfig.texts.matDash"
          class="validation-logo"
        /><v-form
          :ref="(element) => (context.signupForm = element)"
          @submit.prevent="context.submit(context.signupForm, context.signup)"
          :aria-label="context.contentConfig.texts.signUpValidation"
          ><div class="control-stack">
            <v-text-field
              v-model="context.signup.name"
              :label="context.contentConfig.texts.name"
              :rules="[context.required]"
              hide-details="auto"
            /><v-text-field
              v-model="context.signup.email"
              :label="context.contentConfig.texts.email"
              type="email"
              :rules="[context.required, context.validEmail]"
              hide-details="auto"
            /><v-text-field
              v-model="context.signup.password"
              :label="context.contentConfig.texts.password"
              type="password"
              autocomplete="new-password"
              :rules="[context.required, context.passwordRule]"
              hide-details="auto"
            /><v-text-field
              v-model="context.signup.confirm"
              :label="context.contentConfig.texts.confirmPassword"
              type="password"
              autocomplete="new-password"
              :rules="[
                context.required,
                (v) =>
                  v === context.signup.password ||
                  context.contentConfig.texts.passwordsDoNotMatch,
              ]"
              hide-details="auto"
            />
          </div>
          <div class="validation-options">
            <v-checkbox
              v-model="context.signup.remember"
              :label="context.contentConfig.texts.rememberThisDevice"
              color="primary"
              hide-details
              density="compact"
            /><router-link
              :to="context.contentConfig.texts.authForgotPassword"
              >{{ context.contentConfig.texts.forgotPassword }}</router-link
            >
          </div>
          <v-btn type="submit" block color="primary">{{
            context.contentConfig.texts.submit
          }}</v-btn></v-form
        ></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.loginValidation"
        class="standalone-example validation-auth"
        ><img
          :src="context.contentConfig.texts.assetsLogoDq6uoDMSvg"
          :alt="context.contentConfig.texts.matDash"
          class="validation-logo"
        /><v-form
          :ref="(element) => (context.loginForm = element)"
          @submit.prevent="context.submit(context.loginForm, context.login)"
          :aria-label="context.contentConfig.texts.loginValidation"
          ><div class="control-stack">
            <v-text-field
              v-model="context.login.email"
              :label="context.contentConfig.texts.email"
              type="email"
              :rules="[context.required, context.validEmail]"
              hide-details="auto"
            /><v-text-field
              v-model="context.login.password"
              :label="context.contentConfig.texts.password"
              type="password"
              autocomplete="off"
              :rules="[context.required, context.passwordRule]"
              hide-details="auto"
            />
          </div>
          <div class="validation-options">
            <v-checkbox
              v-model="context.login.remember"
              :label="context.contentConfig.texts.rememberThisDevice"
              color="primary"
              hide-details
              density="compact"
            /><router-link
              :to="context.contentConfig.texts.authForgotPassword"
              >{{ context.contentConfig.texts.forgotPassword }}</router-link
            >
          </div>
          <v-btn type="submit" block color="primary">{{
            context.contentConfig.texts.submit
          }}</v-btn></v-form
        ></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.select"
        class="standalone-example"
        ><v-form
          :ref="(element) => (context.ageForm = element)"
          @submit.prevent="context.submit(context.ageForm)"
          :aria-label="context.contentConfig.texts.ageValidation"
          ><v-select
            v-model="context.age"
            :items="context.contentConfig.values.items1"
            :label="context.contentConfig.texts.age"
            :rules="[context.required]"
            hide-details="auto"
            clearable
          /><v-btn type="submit" color="primary" class="mt-6">{{
            context.contentConfig.texts.submit
          }}</v-btn></v-form
        ></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.onLeave"
        class="standalone-example"
        ><v-form
          :ref="(element) => (context.leaveForm = element)"
          @submit.prevent="context.submit(context.leaveForm, context.leave)"
          validate-on="blur"
          :aria-label="context.contentConfig.texts.onLeaveValidation"
          ><div class="control-stack">
            <v-text-field
              v-model="context.leave.email"
              :label="context.contentConfig.texts.email"
              type="email"
              :rules="[context.required, context.validEmail]"
              hide-details="auto"
            /><v-text-field
              v-model="context.leave.password"
              :label="context.contentConfig.texts.password"
              type="password"
              autocomplete="off"
              :rules="[context.required, context.passwordRule]"
              hide-details="auto"
            />
          </div>
          <v-btn type="submit" color="primary" class="mt-6">{{
            context.contentConfig.texts.submit
          }}</v-btn></v-form
        ></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.checkboxes"
        class="standalone-example"
        ><v-form
          @submit.prevent="context.submitChoices(false)"
          :aria-label="context.contentConfig.texts.checkboxValidation"
          ><p class="mb-2">
            {{
              context.checks.join(context.contentConfig.texts.text1) ||
              context.contentConfig.texts.none
            }}
          </p>
          <v-checkbox
            v-for="item in context.contentConfig.values.items2"
            :key="item"
            v-model="context.checks"
            :value="item"
            :label="item"
            color="primary"
            hide-details
            @update:model-value="context.checkError = false"
          />
          <p
            v-if="context.checkError"
            class="text-error text-caption"
            role="alert"
          >
            {{ context.contentConfig.texts.youHaveToChooseAtLeastOneDrink }}
          </p>
          <v-btn type="submit" color="primary" class="mt-6">{{
            context.contentConfig.texts.submit
          }}</v-btn></v-form
        ></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.radio"
        class="standalone-example"
        ><v-form
          @submit.prevent="context.submitChoices(true)"
          :aria-label="context.contentConfig.texts.radioValidation"
          ><p class="mb-2">
            {{ context.drink || context.contentConfig.texts.none }}
          </p>
          <v-radio-group
            v-model="context.drink"
            :error-messages="
              context.radioError
                ? context.contentConfig.texts.youHaveToChooseOneDrink
                : context.contentConfig.texts.text2
            "
            hide-details="auto"
            @update:model-value="context.radioError = false"
            ><v-radio
              v-for="item in context.contentConfig.values.items3"
              :key="item"
              :value="item"
              :label="item"
              color="primary" /></v-radio-group
          ><v-btn type="submit" color="primary" class="mt-6">{{
            context.contentConfig.texts.submit
          }}</v-btn></v-form
        ></ExampleCard
      >
    </div></FormPage
  >
</template>
