<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import type { BannersContext } from "./types";

defineProps<{ context: BannersContext }>();
</script>

<template>
  <WorkspacePage
    :title="context.contentConfig.texts.bannerWidgets"
    data-batch="3"
    ><div class="b3-banner-layout">
      <div class="example-stack">
        <v-card color="primary" class="b3-wide-banner"
          ><img
            :src="context.asset(context.contentConfig.texts.welcomeBg2)"
            :alt="context.contentConfig.texts.text1"
          />
          <div>
            <h2>{{ context.contentConfig.texts.welcomeBackDavid }}</h2>
            <p>
              {{
                context.contentConfig.texts
                  .youHaveEarned54MoreThanLastMonthWhichIsGreatThing
              }}
            </p>
            <v-btn
              :to="context.contentConfig.texts.dashboardsDashboard2"
              color="error"
              >{{ context.contentConfig.texts.check }}</v-btn
            >
          </div></v-card
        ><v-card color="lightsecondary" class="b3-wide-banner"
          ><img
            :src="context.asset(context.contentConfig.texts.trackBg)"
            :alt="context.contentConfig.texts.transactionIllustration"
          />
          <div>
            <h2>
              {{ context.contentConfig.texts.trackYourEveryTransactionEasily }}
            </h2>
            <p>
              {{
                context.contentConfig.texts
                  .trackAndRecordYourEveryIncomeAndExpenseEasilyToControlY
              }}
            </p>
            <v-btn color="secondary" @click="context.download">{{
              context.contentConfig.texts.download
            }}</v-btn>
          </div></v-card
        >
        <div class="b3-two">
          <v-card class="b3-banner-small"
            ><img
              :src="context.asset(context.contentConfig.texts.maintenance)"
              :alt="context.contentConfig.texts.maintenanceIllustration"
            />
            <h2>
              {{
                context.retried
                  ? context.contentConfig.texts.demoCheckComplete
                  : context.contentConfig.texts.oopsSomethingWentWrong
              }}
            </h2>
            <p>
              {{
                context.retried
                  ? context.contentConfig.texts
                      .thisDemonstrationHasResetNoServerRequestWasMade
                  : context.contentConfig.texts
                      .tryingAgainToBypassTheseTemporaryErrors
              }}
            </p>
            <v-btn color="error" @click="context.retried = !context.retried">{{
              context.retried
                ? context.contentConfig.texts.resetExample
                : context.contentConfig.texts.retry
            }}</v-btn></v-card
          ><v-card class="b3-banner-small"
            ><img
              :src="
                context.asset(context.contentConfig.texts.emptyShoppingCart)
              "
              :alt="context.contentConfig.texts.emptyShoppingCart2"
            />
            <h2>{{ context.contentConfig.texts.oopYourCartIsEmpty }}</h2>
            <p>
              {{
                context.contentConfig.texts.getBackToShoppingAndGetRewardsFromIt
              }}
            </p>
            <v-btn
              color="primary"
              :to="context.contentConfig.texts.ecommerceProducts"
              >{{ context.contentConfig.texts.goForShopping }}</v-btn
            ></v-card
          >
        </div>
      </div>
      <div class="example-stack">
        <v-card class="b3-banner-small"
          ><p>{{ context.contentConfig.texts.lEVELUP }}</p>
          <img
            :src="context.asset(context.contentConfig.texts.gold)"
            :alt="context.contentConfig.texts.goldAchievementMedal"
          />
          <h2>
            {{
              context.acknowledged
                ? context.contentConfig.texts.readyForYourNextTask
                : context.contentConfig.texts.youReachAllNotifications
            }}
          </h2>
          <p>
            {{ context.contentConfig.texts.congratulations }}<br />{{
              context.contentConfig.texts.tapToContinueNextTask
            }}
          </p>
          <v-btn
            color="primary"
            @click="
              context.acknowledged = true;
              context.notify(
                context.contentConfig.texts.achievementAcknowledgedLocally,
              );
            "
            >{{
              context.acknowledged
                ? context.contentConfig.texts.gotIt
                : context.contentConfig.texts.yesGotIt
            }}</v-btn
          ></v-card
        ><v-card class="b3-banner-small"
          ><h2>{{ context.contentConfig.texts.mutualFriendRevealed }}</h2>
          <v-avatar size="120" class="my-5"
            ><img
              :src="context.avatar(3)"
              :alt="context.contentConfig.texts.tommoieHenderson"
          /></v-avatar>
          <h3>{{ context.contentConfig.texts.tommoieHenderson }}</h3>
          <p>
            {{
              context.pageDemos.bannerFriend ===
              context.contentConfig.texts.pending
                ? context.contentConfig.texts.acceptTheRequestAndTypeAMessage
                : context.pageDemos.bannerFriend ===
                    context.contentConfig.texts.accepted
                  ? context.contentConfig.texts.requestAcceptedLocally
                  : context.contentConfig.texts.requestRemovedLocally
            }}
          </p>
          <div class="button-samples justify-center">
            <v-btn
              v-if="
                context.pageDemos.bannerFriend ===
                context.contentConfig.texts.pending
              "
              color="primary"
              @click="
                context.pageDemos.bannerFriend =
                  context.contentConfig.texts.accepted
              "
              >{{ context.contentConfig.texts.accept }}</v-btn
            ><v-btn
              v-if="
                context.pageDemos.bannerFriend ===
                context.contentConfig.texts.pending
              "
              color="error"
              variant="tonal"
              @click="
                context.pageDemos.bannerFriend =
                  context.contentConfig.texts.removed
              "
              >{{ context.contentConfig.texts.remove }}</v-btn
            ><v-btn
              v-else
              variant="text"
              @click="
                context.pageDemos.bannerFriend =
                  context.contentConfig.texts.pending
              "
              >{{ context.contentConfig.texts.resetRequest }}</v-btn
            >
          </div></v-card
        >
      </div>
    </div></WorkspacePage
  >
</template>
