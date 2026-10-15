<script setup lang="ts">
import PageHeader from "../ui/PageHeader.vue";
import SettingsField from "../ui/SettingsField.vue";
import Icon from "../ui/Icon.vue";
import type { AccountSettingsContext } from "./types";

defineProps<{ context: AccountSettingsContext }>();
</script>

<template>
  <div class="account-page">
    <PageHeader :title="context.contentConfig.texts.accountSetting" />
    <v-card class="account-shell">
      <v-tabs
        v-model="context.tab"
        color="primary"
        height="70"
        class="account-tabs"
        :aria-label="context.contentConfig.texts.accountSettingsSections"
        ><v-tab
          v-for="item in context.tabs"
          :key="item.value"
          :value="item.value"
          ><Icon :name="item.icon" :size="19" />{{ item.title
          }}<span
            v-if="context.sectionDirty(item.value) || item.value === context.contentConfig.texts.account &amp;&amp; context.passwordsDirty"
            class="tab-dirty"
            :aria-label="context.contentConfig.texts.unsavedChanges"
          ></span></v-tab
      ></v-tabs>
      <div class="account-content">
        <v-form
          v-if="context.tab === context.contentConfig.texts.account"
          :ref="(el) => (context.forms.account = el)"
          @submit.prevent="context.saveTab"
        >
          <div class="account-top-grid">
            <v-card class="settings-panel profile-panel" variant="outlined"
              ><h2>{{ context.contentConfig.texts.changeProfile }}</h2>
              <p class="settings-description">
                {{
                  context.contentConfig.texts.changeYourProfilePictureFromHere
                }}
              </p>
              <div class="profile-editor">
                <v-avatar size="120"
                  ><img
                    :src="context.draft.account.avatar"
                    :alt="context.contentConfig.texts.profilePreview"
                    width="120"
                    height="120"
                /></v-avatar>
                <div class="profile-actions">
                  <v-btn color="primary" @click="context.upload.click()">{{
                    context.contentConfig.texts.upload
                  }}</v-btn
                  ><v-btn
                    variant="outlined"
                    color="error"
                    @click="
                      context.draft.account.avatar = context.defaultAvatar;
                      context.uploadError = context.contentConfig.texts.text1;
                    "
                    >{{ context.contentConfig.texts.reset }}</v-btn
                  >
                </div>
                <input
                  :ref="(element) => (context.upload = element)"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  class="visually-hidden"
                  :aria-label="context.contentConfig.texts.uploadProfileImage"
                  @change="context.readUpload"
                />
                <p class="muted">
                  {{
                    context.contentConfig.texts.allowedJPGGIFOrPNGMaxSizeOf800K
                  }}
                </p>
                <p
                  v-if="context.uploadError"
                  class="text-error mt-3"
                  role="alert"
                >
                  {{ context.uploadError }}
                </p>
              </div></v-card
            >
            <v-card class="settings-panel password-panel" variant="outlined"
              ><h2>{{ context.contentConfig.texts.changePassword }}</h2>
              <p class="settings-description">
                {{
                  context.contentConfig.texts
                    .toChangeYourPasswordPleaseConfirmHere
                }}
              </p>
              <div class="field-stack">
                <SettingsField
                  v-model="context.passwords.current"
                  id="current-password"
                  :label="context.contentConfig.texts.currentPassword"
                  password
                  :rules="context.passwordRules.current"
                  :placeholder="
                    context.contentConfig.texts.enterCurrentPassword
                  "
                /><SettingsField
                  v-model="context.passwords.next"
                  id="new-password"
                  :label="context.contentConfig.texts.newPassword"
                  password
                  :rules="context.passwordRules.next"
                  :placeholder="context.contentConfig.texts.atLeast8Characters"
                /><SettingsField
                  v-model="context.passwords.confirm"
                  id="confirm-password"
                  :label="context.contentConfig.texts.confirmPassword"
                  password
                  :rules="context.passwordRules.confirm"
                  :placeholder="context.contentConfig.texts.reEnterNewPassword"
                />
              </div>
              <p class="demo-caption mt-3">
                {{
                  context.contentConfig.texts
                    .demoOnlyPasswordsAreCheckedNeverSavedOrChanged
                }}
              </p></v-card
            >
          </div>
          <v-card class="settings-panel personal-panel" variant="outlined"
            ><h2>{{ context.contentConfig.texts.personalDetails }}</h2>
            <p class="settings-description">
              {{
                context.contentConfig.texts
                  .toChangeYourPersonalDetailsEditAndSaveFromHere
              }}
            </p>
            <div class="account-fields">
              <SettingsField
                v-model="context.draft.account.name"
                id="account-name"
                :label="context.contentConfig.texts.yourName"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.account.store"
                id="account-store"
                :label="context.contentConfig.texts.storeName"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.account.location"
                id="account-location"
                :label="context.contentConfig.texts.location"
                :items="context.locations"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.account.currency"
                id="account-currency"
                :label="context.contentConfig.texts.currency"
                :items="context.currencies"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.account.email"
                id="account-email"
                :label="context.contentConfig.texts.email"
                type="email"
                :rules="[context.required, context.email]"
              /><SettingsField
                v-model="context.draft.account.phone"
                id="account-phone"
                :label="context.contentConfig.texts.phone"
                type="tel"
                :rules="[context.required, context.phone]"
              /><SettingsField
                v-model="context.draft.account.address"
                id="account-address"
                :label="context.contentConfig.texts.address"
                class="full-field"
                :rules="[context.required]"
              /></div
          ></v-card>
        </v-form>
        <v-form
          v-if="context.tab === context.contentConfig.texts.notification"
          :ref="(el) => (context.forms.notification = el)"
          @submit.prevent="context.saveTab"
          class="settings-narrow"
        >
          <v-card class="settings-panel" variant="outlined"
            ><h2>{{ context.contentConfig.texts.notificationPreferences }}</h2>
            <p class="settings-description">
              {{
                context.contentConfig.texts
                  .selectTheNotificationsYouWouldLikeToReceiveViaEmailPlea
              }}
            </p>
            <SettingsField
              v-model="context.draft.notification.email"
              id="notification-email"
              :label="context.contentConfig.texts.emailAddress"
              type="email"
              :rules="[context.required, context.email]"
              :hint="context.contentConfig.texts.requiredForNotifications"
              class="mt-6" />
            <div class="preference-list">
              <div
                v-for="item in context.preferences"
                :key="item.key"
                class="preference-row"
              >
                <v-avatar rounded="lg" color="rail" size="48"
                  ><Icon :name="item.icon" :size="22"
                /></v-avatar>
                <div class="preference-copy">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.text }}</p>
                </div>
                <v-switch
                  v-model="context.draft.notification[item.key]"
                  color="primary"
                  hide-details
                  :aria-label="item.title"
                  class="preference-switch"
                />
              </div></div
          ></v-card>
          <v-card class="settings-panel" variant="outlined"
            ><h2>{{ context.contentConfig.texts.dateTime }}</h2>
            <p class="settings-description">
              {{
                context.contentConfig.texts.timeZonesAndCalendarDisplaySettings
              }}
            </p>
            <div class="timezone-row">
              <v-avatar rounded="lg" color="rail" size="48"
                ><Icon name="clock" :size="22" /></v-avatar
              ><SettingsField
                v-model="context.draft.notification.timezone"
                id="timezone"
                :label="context.contentConfig.texts.timeZone"
                :items="context.zones"
              />
            </div>
            <p class="demo-caption mt-3">
              {{
                context.contentConfig.texts
                  .uTCOffsetsShownAreStandardTimeLabelsDaylightSavingMayAp
              }}
            </p></v-card
          >
          <v-card class="settings-panel" variant="outlined"
            ><h2>{{ context.contentConfig.texts.ignoreTracking }}</h2>
            <div class="preference-row mt-6">
              <v-avatar rounded="lg" color="rail" size="48"
                ><Icon name="panel" :size="22"
              /></v-avatar>
              <div class="preference-copy">
                <h3>{{ context.contentConfig.texts.ignoreBrowserTracking }}</h3>
                <p>{{ context.contentConfig.texts.browserCookie }}</p>
              </div>
              <v-switch
                v-model="context.draft.notification.ignoreTracking"
                :aria-label="context.contentConfig.texts.ignoreBrowserTracking"
                color="primary"
                hide-details
                class="preference-switch"
              />
            </div>
            <p class="demo-caption mt-3">
              {{
                context.contentConfig.texts
                  .preferencePreviewOnlyThisAppDoesNotSendAnalyticsOrNotif
              }}
            </p></v-card
          >
        </v-form>
        <v-form
          v-if="context.tab === context.contentConfig.texts.bills"
          :ref="(el) => (context.forms.bills = el)"
          @submit.prevent="context.saveTab"
          class="settings-narrow"
        >
          <v-card class="settings-panel" variant="outlined"
            ><h2>{{ context.contentConfig.texts.billingInformation }}</h2>
            <div class="account-fields">
              <SettingsField
                v-model="context.draft.bills.business"
                id="billing-business"
                :label="context.contentConfig.texts.businessName"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.bills.sector"
                id="billing-sector"
                :label="context.contentConfig.texts.businessSector"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.bills.address"
                id="billing-address"
                :label="context.contentConfig.texts.businessAddress"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.bills.country"
                id="billing-country"
                :label="context.contentConfig.texts.country"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.bills.firstName"
                id="billing-firstname"
                :label="context.contentConfig.texts.firstName"
                :rules="[context.required]"
              /><SettingsField
                v-model="context.draft.bills.lastName"
                id="billing-lastname"
                :label="context.contentConfig.texts.lastName"
                :rules="[context.required]"
              /></div
          ></v-card>
          <v-card class="settings-panel" variant="outlined"
            ><h2>
              {{ context.contentConfig.texts.currentPlan
              }}<span
                :class="
                  context.draft.bills.cancelled
                    ? context.contentConfig.texts.textError
                    : context.contentConfig.texts.textSuccess
                "
                >{{
                  context.draft.bills.cancelled
                    ? context.contentConfig.texts.cancelled
                    : context.draft.bills.plan
                }}</span
              >
            </h2>
            <p class="settings-description">
              {{
                context.draft.bills.cancelled
                  ? context.contentConfig.texts
                      .yourSampleSubscriptionIsMarkedAsCancelled
                  : context.contentConfig.texts
                      .thanksForBeingAPremiumMemberAndSupportingOurDevelopment
              }}
            </p>
            <div class="plan-summary">
              <v-avatar color="lightprimary" rounded="lg" size="48"
                ><Icon name="package" :size="22"
              /></v-avatar>
              <div>
                <p class="muted">
                  {{ context.contentConfig.texts.currentPlan2 }}
                </p>
                <h3>
                  {{ context.selectedPlan.visits
                  }}{{ context.contentConfig.texts.monthlyVisits }}
                </h3>
              </div>
              <v-spacer /><v-btn
                icon
                variant="text"
                size="32"
                :aria-label="context.contentConfig.texts.viewPlanChoices"
                @click="
                  context.planChoice = context.draft.bills.plan;
                  context.planDialog = true;
                "
                ><Icon name="plus"
              /></v-btn>
            </div>
            <div class="d-flex ga-4 flex-wrap">
              <v-btn
                color="primary"
                @click="
                  context.planChoice = context.draft.bills.plan;
                  context.planDialog = true;
                "
                >{{ context.contentConfig.texts.changePlan }}</v-btn
              ><v-btn
                color="error"
                variant="outlined"
                @click="
                  context.draft.bills.plan =
                    context.contentConfig.texts.executive;
                  context.draft.bills.cancelled = false;
                "
                >{{ context.contentConfig.texts.resetPlan }}</v-btn
              >
            </div></v-card
          >
          <v-card class="settings-panel" variant="outlined"
            ><h2>{{ context.contentConfig.texts.paymentMethod }}</h2>
            <p class="settings-description">
              {{ context.contentConfig.texts.on26December2024 }}
            </p>
            <div class="plan-summary">
              <v-avatar color="lightprimary" rounded="lg" size="48"
                ><Icon name="creditcard" :size="22"
              /></v-avatar>
              <div>
                <h3>{{ context.contentConfig.texts.visa }}</h3>
                <p class="mt-1">{{ context.contentConfig.texts.text2 }}</p>
              </div>
              <v-spacer /><v-btn
                icon
                variant="text"
                size="32"
                :aria-label="context.contentConfig.texts.paymentMethodDetails"
                @click="context.paymentDialog = true"
                ><Icon name="edit" :size="21"
              /></v-btn>
            </div>
            <p class="settings-description">
              {{
                context.contentConfig.texts
                  .ifYouUpdateYourPaymentMethodItWillOnlyBeDisplayedHereAf
              }}
            </p>
            <v-btn
              color="error"
              variant="tonal"
              class="mt-3"
              :disabled="context.draft.bills.cancelled"
              @click="
                context.askConfirmation(
                  context.contentConfig.texts.cancelSampleSubscription,
                  context.contentConfig.texts
                    .thisChangesOnlyTheLocalDemoNoRealSubscriptionOrPaymentW,
                  () => (context.draft.bills.cancelled = true),
                )
              "
              >{{ context.contentConfig.texts.cancelSubscription }}</v-btn
            >
            <p class="demo-caption mt-4">
              {{
                context.contentConfig.texts
                  .demoBillingInformationNoPaymentServiceIsConnected
              }}
            </p></v-card
          >
        </v-form>
        <div
          v-if="context.tab === context.contentConfig.texts.security"
          class="security-grid"
        >
          <v-card class="settings-panel security-methods" variant="outlined"
            ><h2>{{ context.contentConfig.texts.twoFactorAuthentication }}</h2>
            <div class="security-intro">
              <p class="settings-description">
                {{
                  context.contentConfig.texts
                    .addAnExtraLayerOfProtectionToYourAccountExploreTheSetup
                }}
              </p>
              <v-btn
                color="primary"
                @click="
                  context.openSetup(context.contentConfig.texts.twoFactor)
                "
                >{{
                  context.draft.security.twoFactor
                    ? context.contentConfig.texts.disable
                    : context.contentConfig.texts.enable
                }}</v-btn
              >
            </div>
            <v-chip
              v-if="context.draft.security.twoFactor"
              color="success"
              size="small"
              class="mb-4"
              >{{ context.contentConfig.texts.enabledInDemoOnly }}</v-chip
            >
            <div class="security-row">
              <div>
                <h3>{{ context.contentConfig.texts.authenticationApp }}</h3>
                <p>
                  {{
                    context.draft.security.app
                      ? context.contentConfig.texts.configuredInThisDemo
                      : context.contentConfig.texts.googleAuthApp
                  }}
                </p>
              </div>
              <v-btn
                variant="tonal"
                color="primary"
                @click="context.openSetup(context.contentConfig.texts.app)"
                >{{
                  context.draft.security.app
                    ? context.contentConfig.texts.manage
                    : context.contentConfig.texts.setup
                }}</v-btn
              >
            </div>
            <div class="security-row">
              <div>
                <h3>{{ context.contentConfig.texts.anotherEMail }}</h3>
                <p>
                  {{
                    context.draft.security.recoveryEmail ||
                    context.contentConfig.texts.eMailToSendVerificationLink
                  }}
                </p>
              </div>
              <v-btn
                variant="tonal"
                color="primary"
                @click="context.openSetup(context.contentConfig.texts.email2)"
                >{{
                  context.draft.security.recoveryEmail
                    ? context.contentConfig.texts.manage
                    : context.contentConfig.texts.setup
                }}</v-btn
              >
            </div>
            <div class="security-row">
              <div>
                <h3>{{ context.contentConfig.texts.sMSRecovery }}</h3>
                <p>
                  {{
                    context.draft.security.recoveryPhone ||
                    context.contentConfig.texts
                      .yourPhoneNumberForAccountRecovery
                  }}
                </p>
              </div>
              <v-btn
                variant="tonal"
                color="primary"
                @click="context.openSetup(context.contentConfig.texts.sms)"
                >{{
                  context.draft.security.recoveryPhone
                    ? context.contentConfig.texts.manage
                    : context.contentConfig.texts.setup
                }}</v-btn
              >
            </div>
            <p class="demo-caption mt-5">
              {{
                context.contentConfig.texts
                  .theseControlsDoNotActivateRealMFAVerifyRecoveryDetailsO
              }}
            </p></v-card
          >
          <v-card class="settings-panel devices-panel" variant="outlined"
            ><v-avatar color="lightprimary" rounded="lg" size="48" class="mb-4"
              ><Icon name="laptop" class="text-primary" :size="23"
            /></v-avatar>
            <h2>{{ context.contentConfig.texts.devices }}</h2>
            <p class="settings-description">
              {{
                context.contentConfig.texts
                  .reviewTheSampleDevicesAssociatedWithThisAccount
              }}
            </p>
            <v-btn
              color="primary"
              class="mt-4 signout-button"
              :disabled="!context.draft.security.devices.length"
              @click="
                context.askConfirmation(
                  context.contentConfig.texts.signOutSampleDevices,
                  context.contentConfig.texts
                    .thisWillClearTheDemoDeviceListOnlyNoRealSessionsWillBeE,
                  () => (context.draft.security.devices = []),
                )
              "
              >{{ context.contentConfig.texts.signOutFromAllDevices }}</v-btn
            >
            <div class="device-list">
              <div
                v-for="id in context.draft.security.devices"
                :key="id"
                class="device-row"
              >
                <Icon
                  :name="
                    context.deviceDetails[id]?.icon ||
                    context.contentConfig.texts.monitor
                  "
                  :size="23"
                />
                <div>
                  <h3>{{ context.deviceDetails[id]?.title }}</h3>
                  <p>{{ context.deviceDetails[id]?.text }}</p>
                </div>
                <v-menu
                  ><template #activator="{ props }"
                    ><v-btn
                      v-bind="props"
                      icon
                      size="28"
                      variant="text"
                      :aria-label="
                        context.contentConfig.texts.optionsFor +
                        context.deviceDetails[id]?.title
                      "
                      ><Icon name="more" :size="18" /></v-btn></template
                  ><v-list
                    ><v-list-item
                      :title="context.contentConfig.texts.removeSampleDevice"
                      @click="
                        context.askConfirmation(
                          context.contentConfig.texts.removeThisSampleDevice,
                          context.contentConfig.texts
                            .onlyTheLocalDeviceListWillChange,
                          () =>
                            (context.draft.security.devices =
                              context.draft.security.devices.filter(
                                (d) => d !== id,
                              )),
                        )
                      " /></v-list
                ></v-menu>
              </div>
              <p
                v-if="!context.draft.security.devices.length"
                class="empty-devices"
              >
                <Icon name="checks" :size="28" /><span>{{
                  context.contentConfig.texts.noSampleDevicesSignedIn
                }}</span>
              </p>
            </div>
            <v-btn
              block
              color="primary"
              variant="tonal"
              @click="context.helpDialog = true"
              >{{ context.contentConfig.texts.needHelp }}</v-btn
            ></v-card
          >
        </div>
        <div class="settings-footer">
          <span class="save-caption">{{
            context.sectionDirty(context.tab) ||
            (context.tab === context.contentConfig.texts.account &&
              context.passwordsDirty)
              ? context.contentConfig.texts.youHaveUnsavedChanges
              : context.contentConfig.texts.changesAreStoredInThisBrowserOnly
          }}</span
          ><v-btn
            color="primary"
            :loading="context.saving"
            @click="context.saveTab"
            >{{ context.contentConfig.texts.save }}</v-btn
          ><v-btn
            color="error"
            variant="tonal"
            @click="context.cancelChanges"
            >{{ context.contentConfig.texts.cancel }}</v-btn
          >
        </div>
      </div>
    </v-card>
  </div>
  <v-snackbar
    v-model="context.snackbar"
    :color="context.messageColor"
    location="top right"
    :timeout="5000"
    >{{ context.message
    }}<template #actions
      ><v-btn
        icon
        size="small"
        variant="text"
        :aria-label="context.contentConfig.texts.dismissMessage"
        @click="context.snackbar = false"
        ><Icon name="close" /></v-btn></template
  ></v-snackbar>
  <v-dialog v-model="context.planDialog" max-width="630"
    ><v-card class="dialog-body"
      ><div class="dialog-title">
        <h2>{{ context.contentConfig.texts.chooseYourPlan }}</h2>
        <v-btn
          icon
          size="small"
          variant="text"
          :aria-label="context.contentConfig.texts.closePlanChoices"
          @click="context.planDialog = false"
          ><Icon name="close"
        /></v-btn>
      </div>
      <p class="muted mb-5">
        {{
          context.contentConfig.texts
            .previewASubscriptionPlanThisDoesNotCreateACharge
        }}
      </p>
      <div class="plan-options">
        <button
          v-for="plan in context.plans"
          :key="plan.name"
          :class="[
            context.contentConfig.texts.planOption,
            {
              chosen: context.planChoice === plan.name,
            },
          ]"
          :aria-pressed="context.planChoice === plan.name"
          @click="context.planChoice = plan.name"
        >
          <Icon name="package" :size="26" />
          <h3>{{ plan.name }}</h3>
          <strong>{{ plan.price }}</strong
          ><span
            >{{ plan.visits
            }}{{ context.contentConfig.texts.monthlyVisits2 }}</span
          ><Icon
            v-if="context.planChoice === plan.name"
            name="check"
            class="text-primary"
          />
        </button>
      </div>
      <div class="dialog-actions">
        <v-btn variant="text" @click="context.planDialog = false">{{
          context.contentConfig.texts.cancel
        }}</v-btn
        ><v-btn
          color="primary"
          @click="
            context.draft.bills.plan = context.planChoice;
            context.draft.bills.cancelled = false;
            context.planDialog = false;
          "
          >{{ context.contentConfig.texts.useThisDemoPlan }}</v-btn
        >
      </div></v-card
    ></v-dialog
  >
  <v-dialog v-model="context.paymentDialog"
    ><v-card class="dialog-body"
      ><v-avatar size="52" color="lightprimary" class="mb-4"
        ><Icon name="creditcard" class="text-primary" :size="26"
      /></v-avatar>
      <h2>{{ context.contentConfig.texts.paymentMethodPreview }}</h2>
      <p class="muted mt-3">
        {{
          context.contentConfig.texts
            .visaEndingIn2102IsSampleDataThisAppDoesNotCollectOrStor
        }}
      </p>
      <v-btn
        color="primary"
        class="mt-6"
        @click="context.paymentDialog = false"
        >{{ context.contentConfig.texts.gotIt }}</v-btn
      ></v-card
    ></v-dialog
  >
  <v-dialog v-model="context.setupDialog"
    ><v-card class="dialog-body"
      ><div class="dialog-title">
        <h2>{{ context.setupTitle }}</h2>
        <v-btn
          icon
          size="small"
          variant="text"
          :aria-label="context.contentConfig.texts.closeSecuritySetup"
          @click="context.setupDialog = false"
          ><Icon name="close"
        /></v-btn>
      </div>
      <v-alert type="info" variant="tonal" class="mb-5" density="compact">{{
        context.contentConfig.texts
          .demoSetupOnlyNoCodesEmailsOrSMSMessagesAreSent
      }}</v-alert
      ><template v-if="context.setupMode === context.contentConfig.texts.app"
        ><div class="auth-app-preview">
          <v-avatar size="64" rounded="lg" color="lightprimary"
            ><Icon name="shield" :size="32" class="text-primary"
          /></v-avatar>
          <div>
            <h3>{{ context.contentConfig.texts.authenticatorApp }}</h3>
            <p class="muted">
              {{
                context.contentConfig.texts
                  .aRealSetupRequiresAServerGeneratedSecretAndVerifiedTime
              }}
            </p>
          </div>
        </div></template
      ><SettingsField
        v-if="context.setupMode === context.contentConfig.texts.email2"
        v-model="context.setupValue"
        id="recovery-email"
        :label="context.contentConfig.texts.recoveryEmailAddress"
        type="email"
      /><SettingsField
        v-if="context.setupMode === context.contentConfig.texts.sms"
        v-model="context.setupValue"
        id="recovery-phone"
        :label="context.contentConfig.texts.recoveryPhoneNumber"
        type="tel"
      />
      <p
        v-if="context.setupMode === context.contentConfig.texts.twoFactor"
        class="muted"
      >
        {{
          context.draft.security.twoFactor
            ? context.contentConfig.texts.disable
            : context.contentConfig.texts.enable
        }}{{
          context.contentConfig.texts
            .theTwoFactorSettingInTheLocalPreviewThisDoesNotChangeRe
        }}
      </p>
      <p v-if="context.setupError" class="text-error mt-2" role="alert">
        {{ context.setupError }}
      </p>
      <div class="dialog-actions">
        <v-btn variant="text" @click="context.setupDialog = false">{{
          context.contentConfig.texts.cancel
        }}</v-btn
        ><v-btn color="primary" @click="context.finishSetup">{{
          context.setupMode === context.contentConfig.texts.app
            ? context.contentConfig.texts.markAsConfigured
            : context.setupMode === context.contentConfig.texts.twoFactor
              ? context.contentConfig.texts.confirmDemoSetting
              : context.contentConfig.texts.useForDemo
        }}</v-btn>
      </div></v-card
    ></v-dialog
  >
  <v-dialog v-model="context.confirmDialog"
    ><v-card class="dialog-body"
      ><h2>{{ context.confirmation.title }}</h2>
      <p class="muted mt-3">{{ context.confirmation.text }}</p>
      <div class="dialog-actions">
        <v-btn variant="text" @click="context.confirmDialog = false">{{
          context.contentConfig.texts.keepCurrentSetting
        }}</v-btn
        ><v-btn color="error" @click="context.confirmAction">{{
          context.contentConfig.texts.confirm
        }}</v-btn>
      </div></v-card
    ></v-dialog
  >
  <v-dialog :model-value="context.leaveDialog" persistent
    ><v-card class="dialog-body"
      ><h2>{{ context.contentConfig.texts.leaveWithoutSaving }}</h2>
      <p class="muted mt-3">
        {{
          context.contentConfig.texts
            .yourUnsavedAccountChangesWillBeDiscardedStayHereToSaveT
        }}
      </p>
      <div class="dialog-actions">
        <v-btn variant="text" @click="context.respondToLeave(false)">{{
          context.contentConfig.texts.stayHere
        }}</v-btn
        ><v-btn color="error" @click="context.respondToLeave(true)">{{
          context.contentConfig.texts.discardAndLeave
        }}</v-btn>
      </div></v-card
    ></v-dialog
  >
  <v-dialog v-model="context.helpDialog"
    ><v-card class="dialog-body"
      ><h2>{{ context.contentConfig.texts.keepYourAccountSecure }}</h2>
      <p class="muted mt-3">
        {{
          context.contentConfig.texts
            .useAUniquePasswordEnableAuthenticatorBasedTwoFactorAuth
        }}
      </p>
      <p class="muted mt-3">
        {{
          context.contentConfig.texts
            .thisIsAFrontEndPreviewRealAuthenticationAndDeviceManage
        }}
      </p>
      <v-btn color="primary" class="mt-6" @click="context.helpDialog = false">{{
        context.contentConfig.texts.understood
      }}</v-btn></v-card
    ></v-dialog
  >
</template>
