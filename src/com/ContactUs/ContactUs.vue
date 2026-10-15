<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import type { ContactUsContext } from "./types";

defineProps<{ context: ContactUsContext }>();
</script>

<template>
  <section class="contact-page" data-page-ready="true" data-batch="2">
    <header class="front-header">
      <div class="front-container front-header-inner">
        <router-link
          :to="context.contentConfig.texts.dashboardsDashboard1"
          :aria-label="context.contentConfig.texts.matDashDashboard"
          ><img
            :src="context.contentConfig.texts.assetsLogoDq6uoDMSvg"
            :alt="context.contentConfig.texts.matDash"
            width="145"
        /></router-link>
        <nav
          :class="[
            context.contentConfig.texts.frontNav,
            {
              open: context.menu,
            },
          ]"
          :aria-label="context.contentConfig.texts.frontPageNavigation"
        >
          <router-link
            v-for="[label, path] in context.links"
            :key="path"
            :to="path"
            :class="{
              active: label === context.contentConfig.texts.contact,
            }"
            @click="context.menu = false"
            >{{ label }}</router-link
          ><v-btn
            :to="context.contentConfig.texts.authLogin"
            color="primary"
            rounded="pill"
            >{{ context.contentConfig.texts.logIn }}</v-btn
          >
        </nav>
        <v-btn
          class="front-menu-button"
          icon
          variant="text"
          :aria-label="context.contentConfig.texts.toggleNavigation"
          :aria-expanded="context.menu"
          @click="context.menu = !context.menu"
          ><Icon
            :name="
              context.menu
                ? context.contentConfig.texts.close
                : context.contentConfig.texts.menu
            "
        /></v-btn>
      </div>
    </header>
    <div class="front-hero">
      <div class="front-container">
        <h1>{{ context.contentConfig.texts.weDLoveToHearFromYou }}</h1>
        <p>
          <router-link :to="context.contentConfig.texts.dashboardsDashboard1">{{
            context.contentConfig.texts.mATDASH
          }}</router-link
          ><span>{{ context.contentConfig.texts.text1 }}</span
          >{{ context.contentConfig.texts.cONTACTUS }}
        </p>
      </div>
    </div>
    <div class="front-container contact-body">
      <aside class="contact-info">
        <div class="contact-orbit" aria-hidden="true"></div>
        <v-avatar color="white" variant="tonal" size="64" class="mb-7"
          ><Icon name="chats" :size="30"
        /></v-avatar>
        <h2>{{ context.contentConfig.texts.reachOutToday }}</h2>
        <p>
          {{
            context.contentConfig.texts
              .haveQuestionsOrNeedAssistanceWeReJustAMessageAway
          }}
        </p>
        <div class="contact-location">
          <Icon name="globe" :size="30" />
          <h2>{{ context.contentConfig.texts.ourLocation }}</h2>
          <p>
            {{
              context.contentConfig.texts
                .visitUsInPersonOrFindOurContactDetailsToConnectWithUsDi
            }}
          </p>
        </div>
        <div class="contact-decoration" aria-hidden="true">
          <Icon name="send" :size="80" />
        </div>
      </aside>
      <v-form
        :ref="(element) => (context.form = element)"
        @submit.prevent="context.submit"
        :aria-label="context.contentConfig.texts.contactEnquiry"
        class="contact-form"
        ><div class="demo-field-grid two-columns">
          <div class="demo-field">
            <label for="contact-first"
              >{{ context.contentConfig.texts.firstName
              }}<span>{{ context.contentConfig.texts.text2 }}</span></label
            ><v-text-field
              id="contact-first"
              v-model="context.values.first"
              :placeholder="context.contentConfig.texts.name"
              :rules="[context.required]"
              density="comfortable"
              hide-details="auto"
            />
          </div>
          <div class="demo-field">
            <label for="contact-last"
              >{{ context.contentConfig.texts.lastName
              }}<span>{{ context.contentConfig.texts.text2 }}</span></label
            ><v-text-field
              id="contact-last"
              v-model="context.values.last"
              :placeholder="context.contentConfig.texts.lastName2"
              :rules="[context.required]"
              density="comfortable"
              hide-details="auto"
            />
          </div>
          <div class="demo-field">
            <label for="contact-phone"
              >{{ context.contentConfig.texts.phoneNumber
              }}<span>{{ context.contentConfig.texts.text2 }}</span></label
            ><v-text-field
              id="contact-phone"
              v-model="context.values.phone"
              type="tel"
              :placeholder="context.contentConfig.texts.xxxXxxXxxx"
              :rules="[
                context.required,
                (v) =>
                  /^[+\d()\s.-]{7,25}$/.test(v) ||
                  context.contentConfig.texts.enterAValidPhoneNumber,
              ]"
              density="comfortable"
              hide-details="auto"
            />
          </div>
          <div class="demo-field">
            <label for="contact-email"
              >{{ context.contentConfig.texts.email
              }}<span>{{ context.contentConfig.texts.text2 }}</span></label
            ><v-text-field
              id="contact-email"
              v-model="context.values.email"
              type="email"
              :placeholder="context.contentConfig.texts.emailAddress"
              :rules="[context.required, context.validEmail]"
              density="comfortable"
              hide-details="auto"
            />
          </div>
          <div class="demo-field wide">
            <label for="contact-enquiry"
              >{{ context.contentConfig.texts.enquireRelatedTo
              }}<span>{{ context.contentConfig.texts.text2 }}</span></label
            ><v-select
              id="contact-enquiry"
              v-model="context.values.enquiry"
              :items="context.contentConfig.values.items1"
              :rules="[context.required]"
              density="comfortable"
              hide-details="auto"
            />
          </div>
          <div class="demo-field wide">
            <label for="contact-message">{{
              context.contentConfig.texts.message
            }}</label
            ><v-textarea
              id="contact-message"
              v-model="context.values.message"
              :placeholder="context.contentConfig.texts.writeYourMessageHere"
              rows="5"
              variant="outlined"
              hide-details
            />
          </div>
        </div>
        <v-alert
          v-if="context.submitted"
          type="success"
          variant="tonal"
          density="compact"
          class="mt-5"
          role="status"
          >{{
            context.contentConfig.texts
              .yourEnquiryWasValidatedInThisBrowserThisDemoDoesNotSend
          }}</v-alert
        ><v-btn type="submit" color="primary" class="mt-6" size="large">{{
          context.contentConfig.texts.submit
        }}</v-btn>
        <p class="field-help mt-4">
          {{
            context.contentConfig.texts
              .frontEndDemoOnlyYourInformationIsNotSentOrSaved
          }}
        </p></v-form
      >
    </div>
    <section class="front-cta">
      <div class="front-container">
        <h2>
          {{
            context.contentConfig.texts
              .focusOnWhatTrulyMattersCreatingStunningFunctionalDesign
          }}
        </h2>
        <p>
          {{
            context.contentConfig.texts
              .designedForEaseOfUseAndCustomizationThisTemplateHelpsYo
          }}
        </p>
        <v-btn
          :to="context.contentConfig.texts.authRegister"
          color="primary"
          size="large"
          rounded="pill"
          >{{ context.contentConfig.texts.register }}</v-btn
        >
      </div>
    </section>
    <footer class="front-container front-footer">
      <img
        :src="context.contentConfig.texts.assetsLogoDq6uoDMSvg"
        :alt="context.contentConfig.texts.matDash"
        width="130"
      /><span>{{
        context.contentConfig.texts.matDashVue3Vuetify4FrontEndRecreation
      }}</span
      ><router-link :to="context.contentConfig.texts.pagesRouteDirectory">{{
        context.contentConfig.texts.viewRouteProgress
      }}</router-link>
    </footer>
  </section>
</template>
