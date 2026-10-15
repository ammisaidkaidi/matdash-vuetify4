<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import type { AuthContext } from "./types";

defineProps<{ context: AuthContext }>();
</script>

<template>
  <section
    :class="[
      context.contentConfig.texts.b5AuthPage,
      context.boxed
        ? context.contentConfig.texts.b5AuthBoxed
        : context.contentConfig.texts.b5AuthSide,
    ]"
    data-page-ready="true"
    data-batch="5"
  >
    <div class="b5-auth-frame">
      <div class="b5-auth-form-panel">
        <router-link
          :to="context.contentConfig.texts.frontPageHomepage"
          :aria-label="context.contentConfig.texts.matDashHomepage"
          class="b5-auth-brand"
          ><img
            :src="context.contentConfig.texts.assetsLogoDq6uoDMSvg"
            :alt="context.contentConfig.texts.matDash"
        /></router-link>
        <h1>{{ context.title }}</h1>
        <p
          v-if="context.mode === context.contentConfig.texts.forgot"
          class="b5-auth-description"
        >
          {{
            context.contentConfig.texts
              .enterTheEmailAddressAssociatedWithYourAccountToPreviewP
          }}
        </p>
        <p v-else-if="!context.boxed" class="b5-auth-subtitle">
          {{ context.contentConfig.texts.yourAdminDashboard }}
        </p>
        <template v-if="context.mode !== context.contentConfig.texts.forgot"
          ><div class="b5-social-auth">
            <v-btn
              v-for="provider in context.boxed
                ? [
                    context.contentConfig.texts.facebook,
                    context.contentConfig.texts.google,
                  ]
                : [
                    context.contentConfig.texts.google,
                    context.contentConfig.texts.facebook,
                  ]"
              :key="provider"
              variant="outlined"
              @click="
                context.notify(
                  provider +
                    context.contentConfig.texts
                      .authenticationIsNotConnectedInThisDemo,
                  context.contentConfig.texts.info,
                )
              "
              ><span
                :class="[
                  context.contentConfig.texts.b5Provider,
                  provider.toLowerCase(),
                ]"
                >{{
                  provider === context.contentConfig.texts.google
                    ? context.contentConfig.texts.g
                    : context.contentConfig.texts.f
                }}</span
              >{{
                context.boxed
                  ? context.contentConfig.texts.signInWith
                  : context.contentConfig.texts.text1
              }}{{ provider }}</v-btn
            >
          </div>
          <div class="b5-auth-divider">
            <span>{{
              context.boxed
                ? context.contentConfig.texts.orSign +
                  (context.mode === context.contentConfig.texts.login
                    ? context.contentConfig.texts.in
                    : context.contentConfig.texts.up) +
                  context.contentConfig.texts.withEmail
                : context.contentConfig.texts.orSignInWith
            }}</span>
          </div></template
        ><v-form
          :ref="(element) => (context.form = element)"
          @submit.prevent="context.submit"
          :aria-label="context.mode + context.contentConfig.texts.demoForm"
          ><div class="b5-auth-fields">
            <div v-if="context.mode === context.contentConfig.texts.register">
              <label for="auth-name">{{
                context.contentConfig.texts.name
              }}</label
              ><v-text-field
                id="auth-name"
                v-model="context.values.name"
                :rules="[context.required]"
                autocomplete="off"
                density="comfortable"
                hide-details="auto"
              />
            </div>
            <div>
              <label for="auth-email">{{
                context.mode === context.contentConfig.texts.login
                  ? context.contentConfig.texts.username
                  : context.mode === context.contentConfig.texts.register
                    ? context.contentConfig.texts.emailAddress
                    : context.contentConfig.texts.emailAddress
              }}</label
              ><v-text-field
                id="auth-email"
                v-model="context.values.email"
                :type="
                  context.mode === context.contentConfig.texts.login
                    ? context.contentConfig.texts.text
                    : context.contentConfig.texts.email
                "
                :rules="
                  context.mode === context.contentConfig.texts.login
                    ? [context.required]
                    : [context.required, context.validEmail]
                "
                autocomplete="off"
                density="comfortable"
                hide-details="auto"
              />
            </div>
            <div v-if="context.mode !== context.contentConfig.texts.forgot">
              <div class="b5-password-label">
                <label for="auth-password">{{
                  context.contentConfig.texts.password
                }}</label
                ><router-link
                  v-if="context.boxed &amp;&amp; context.mode === context.contentConfig.texts.login"
                  :to="
                    context.contentConfig.texts.authForgotPassword +
                    context.suffix
                  "
                  >{{ context.contentConfig.texts.forgotPassword }}</router-link
                >
              </div>
              <v-text-field
                id="auth-password"
                v-model="context.values.password"
                :type="
                  context.reveal
                    ? context.contentConfig.texts.text
                    : context.contentConfig.texts.password2
                "
                :rules="[context.required, context.passwordRule]"
                autocomplete="off"
                density="comfortable"
                hide-details="auto"
                ><template #append-inner
                  ><v-btn
                    icon
                    size="28"
                    variant="text"
                    :aria-label="
                      context.reveal
                        ? context.contentConfig.texts.hidePassword
                        : context.contentConfig.texts.showPassword
                    "
                    @click="context.reveal = !context.reveal"
                    ><Icon
                      :name="
                        context.reveal
                          ? context.contentConfig.texts.eyeoff
                          : context.contentConfig.texts.eye
                      "
                      :size="17" /></v-btn></template
              ></v-text-field>
            </div>
          </div>
          <div
            v-if="context.mode === context.contentConfig.texts.login"
            class="b5-auth-options"
          >
            <v-checkbox
              v-model="context.remember"
              :label="
                context.boxed
                  ? context.contentConfig.texts.keepMeLoggedIn
                  : context.contentConfig.texts.rememberThisDevice
              "
              color="primary"
              density="compact"
              hide-details
            /><router-link
              v-if="!context.boxed"
              :to="
                context.contentConfig.texts.authForgotPassword + context.suffix
              "
              >{{ context.contentConfig.texts.forgotPassword }}</router-link
            >
          </div>
          <v-alert
            v-if="context.error"
            type="error"
            variant="tonal"
            density="compact"
            class="my-4"
            role="alert"
            >{{ context.error }}</v-alert
          ><v-alert
            v-if="context.success"
            type="success"
            variant="tonal"
            density="compact"
            class="my-4"
            role="status"
            >{{
              context.mode === context.contentConfig.texts.forgot
                ? context.contentConfig.texts
                    .emailFormatValidatedNoResetEmailWasSentAndNoPasswordWas
                : context.contentConfig.texts
                    .registrationValidatedLocallyNoAccountWasCreatedThePassw
            }}</v-alert
          ><v-btn
            type="submit"
            :color="
              context.boxed ||
              context.mode === context.contentConfig.texts.forgot
                ? context.contentConfig.texts.text2
                : context.contentConfig.texts.primary
            "
            block
            size="large"
            class="b5-auth-submit"
            >{{
              context.mode === context.contentConfig.texts.login
                ? context.contentConfig.texts.signIn
                : context.mode === context.contentConfig.texts.register
                  ? context.contentConfig.texts.signUp
                  : context.contentConfig.texts.forgotPassword2
            }}</v-btn
          ><v-btn
            v-if="context.mode === context.contentConfig.texts.forgot"
            :to="context.loginPath"
            color="primary"
            variant="tonal"
            block
            size="large"
            class="mt-4"
            >{{ context.contentConfig.texts.backToLogin }}</v-btn
          ></v-form
        >
        <p
          v-if="context.mode !== context.contentConfig.texts.forgot"
          class="b5-auth-switch"
        >
          {{
            context.mode === context.contentConfig.texts.login
              ? context.contentConfig.texts.donTHaveAnAccountYet
              : context.contentConfig.texts.alreadyHaveAnAccount
          }}
          <router-link
            :to="
              context.mode === context.contentConfig.texts.login
                ? context.contentConfig.texts.authRegister + context.suffix
                : context.loginPath
            "
            >{{
              context.mode === context.contentConfig.texts.login
                ? context.boxed
                  ? context.contentConfig.texts.signUpNow
                  : context.contentConfig.texts.createAnAccount
                : context.boxed
                  ? context.contentConfig.texts.signInNow
                  : context.contentConfig.texts.signIn2
            }}</router-link
          >
        </p>
        <div class="b5-auth-notice">
          <strong>{{ context.contentConfig.texts.localDemoOnly }}</strong>
          <p v-if="context.mode === context.contentConfig.texts.login">
            {{ context.contentConfig.texts.username2
            }}<code>{{ context.contentConfig.texts.demoMatdashLocal }}</code
            ><br />{{ context.contentConfig.texts.password3
            }}<code>{{ context.contentConfig.texts.demo123 }}</code>
          </p>
          <p>
            {{
              context.mode === context.contentConfig.texts.login
                ? context.contentConfig.texts
                    .onlyTheDemoSessionFlagCanBeRememberedCredentialsAreNeve
                : context.contentConfig.texts
                    .useSampleInformationNoAccountEmailOrPasswordServiceIsCo
            }}
          </p>
        </div>
      </div>
      <aside v-if="context.boxed" class="b5-auth-features">
        <img
          :src="context.asset(context.slides[context.slide][2])"
          :alt="context.slides[context.slide][0]"
        />
        <h2>{{ context.slides[context.slide][0] }}</h2>
        <p>{{ context.slides[context.slide][1] }}</p>
        <v-btn
          :to="context.contentConfig.texts.frontPageHomepage"
          color="primary"
          >{{ context.contentConfig.texts.learnMore }}</v-btn
        >
        <div class="b5-carousel-dots">
          <button
            v-for="(_, i) in context.slides"
            :key="i"
            :class="{
              active: context.slide === i,
            }"
            :aria-label="context.contentConfig.texts.featureSlide + (i + 1)"
            :aria-pressed="context.slide === i"
            @click="context.slide = i"
          />
        </div>
      </aside>
      <aside v-else class="b5-auth-welcome">
        <div>
          <h2>
            {{ context.contentConfig.texts.welcomeTo }}<br />{{
              context.contentConfig.texts.matDash
            }}
          </h2>
          <p>
            {{
              context.contentConfig.texts
                .matDashHelpsDevelopersToBuildOrganizedAndWellCodedDashb
            }}
          </p>
          <v-btn
            :to="context.contentConfig.texts.frontPageHomepage"
            color="primary"
            >{{ context.contentConfig.texts.learnMore }}</v-btn
          >
        </div>
        <svg viewBox="0 0 400 350" aria-hidden="true">
          <path
            d="M55 270L190 40M205 285L285 147M320 290L333 267"
            stroke="currentColor"
            stroke-width="75"
            stroke-linecap="round"
          />
        </svg>
      </aside>
    </div>
  </section>
</template>
