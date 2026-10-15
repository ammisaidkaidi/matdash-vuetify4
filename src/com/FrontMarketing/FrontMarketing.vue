<script setup lang="ts">
import FaqList from "../ui/FaqList.vue";
import Icon from "../ui/Icon.vue";
import type { FrontMarketingContext } from "./types";

defineProps<{ context: FrontMarketingContext }>();
</script>

<template>
  <component :is="context.FrontLayout"
    ><section
      :class="[
        context.contentConfig.texts.b3MarketingHero,
        {
          about: context.about,
        },
      ]"
    >
      <div class="front-container b3-hero-grid">
        <div>
          <p class="b3-eyebrow">
            {{ context.contentConfig.texts.dESIGNEDFORYOURNEXTBIGIDEA }}
          </p>
          <h1>
            {{
              context.about
                ? context.contentConfig.texts.getToKnowMatDashDashboardTemplate
                : context.contentConfig.texts
                    .aFeaturePackedDashboardBuiltForDevelopersNeeds
            }}
          </h1>
          <template v-if="!context.about"
            ><div class="b3-hero-social">
              <div class="b3-avatar-stack">
                <v-avatar
                  v-for="n in context.contentConfig.values.items1"
                  :key="n"
                  size="42"
                  ><img
                    :src="context.avatar(n)"
                    :alt="context.contentConfig.texts.sampleDeveloper"
                /></v-avatar>
              </div>
              <p>
                <strong>{{ context.contentConfig.texts.text1 }}</strong
                ><br />{{
                  context.contentConfig.texts
                    .developersAgenciesUsingOurTemplates
                }}
              </p>
            </div>
            <v-btn
              :to="context.contentConfig.texts.authLogin"
              color="primary"
              size="large"
              >{{ context.contentConfig.texts.logIn }}</v-btn
            >
            <p class="text-caption muted mt-4">
              {{
                context.contentConfig.texts
                  .illustrativeReferenceFiguresNotMetricsForThisRecreation
              }}
            </p></template
          >
          <div v-else class="button-samples mt-6">
            <v-btn
              :to="context.contentConfig.texts.authRegister"
              color="primary"
              >{{ context.contentConfig.texts.createAnAccount }}</v-btn
            ><v-btn
              :to="context.contentConfig.texts.frontPageContactUs"
              variant="outlined"
              >{{ context.contentConfig.texts.viewOpenPositions }}</v-btn
            >
          </div>
        </div>
        <p v-if="context.about" class="b3-about-intro">
          {{
            context.contentConfig.texts
              .doYouNeedAHighlyCustomizableAndDeveloperFriendlyPremium
          }}
        </p>
        <img
          v-else
          :src="context.asset(context.contentConfig.texts.mainBanner)"
          :alt="context.contentConfig.texts.matDashDashboardPreviews"
          class="b3-hero-image"
        />
      </div>
    </section>
    <section class="b3-marketing-section front-container">
      <div v-if="!context.about" class="b3-feature-intro">
        <div>
          <h2>
            {{ context.contentConfig.texts.over45000Clients }}<br />{{
              context.contentConfig.texts.andCounting
            }}
          </h2>
          <p class="muted my-5">
            {{
              context.contentConfig.texts
                .buildWithReusableComponentsAndThoughtfulDetailsFocusOnT
            }}
          </p>
          <v-btn
            :to="context.contentConfig.texts.frontPageContactUs"
            color="primary"
            variant="outlined"
            >{{ context.contentConfig.texts.requestACallback }}</v-btn
          >
        </div>
        <div class="b3-two">
          <article
            v-for="[icon, title] in context.contentConfig.values.items2"
            :key="title"
            class="b3-feature-tile"
          >
            <v-avatar color="primary" variant="tonal" rounded="lg"
              ><Icon :name="icon"
            /></v-avatar>
            <h3>{{ title }}</h3>
            <p class="muted">
              {{
                context.contentConfig.texts
                  .clearGuidanceAndThoughtfulToolsForYourNextProject
              }}
            </p>
          </article>
        </div>
      </div>
      <template v-else
        ><h2 class="text-center mb-8">
          {{ context.contentConfig.texts.theHassleFreeSetupProcess }}
        </h2>
        <div class="b3-four">
          <v-card
            v-for="([icon, title], i) in context.contentConfig.values.items3"
            :key="title"
            :color="
              [
                context.contentConfig.texts.lightprimary,
                context.contentConfig.texts.lighterror,
                context.contentConfig.texts.lightsecondary,
                context.contentConfig.texts.canvas,
              ][i]
            "
            class="pa-6"
            ><Icon :name="icon" :size="28" />
            <h3 class="my-4">{{ title }}</h3>
            <p>
              {{
                context.contentConfig.texts
                  .thoughtfulComponentsToHelpYouBuildWithConfidence
              }}
            </p></v-card
          >
        </div></template
      >
    </section>
    <section v-if="!context.about" class="b3-feature-section">
      <div class="front-container">
        <v-tabs v-model="context.tab" color="primary" align-tabs="center"
          ><v-tab
            v-for="name in context.contentConfig.values.items4"
            :key="name"
            :value="name"
            >{{ name }}</v-tab
          ></v-tabs
        >
        <div class="b3-feature-detail">
          <img
            :src="context.asset(context.contentConfig.texts.featureImage)"
            :alt="context.contentConfig.texts.schedulingAndWorkflowPreview"
          />
          <div>
            <p class="b3-eyebrow">{{ context.tab }}</p>
            <h2>{{ context.feature[0] }}</h2>
            <h3 class="mt-6">{{ context.feature[1] }}</h3>
            <p class="muted my-4">{{ context.feature[2] }}</p>
            <p class="my-4">
              {{ context.contentConfig.texts.factorInOutsideColleagues }}
            </p>
            <p class="my-4">
              {{ context.contentConfig.texts.roundRobinPooling }}
            </p>
            <v-btn
              color="primary"
              :to="context.contentConfig.texts.frontPageAboutUs"
              >{{ context.contentConfig.texts.learnMore }}</v-btn
            >
          </div>
        </div>
      </div>
    </section>
    <section v-else class="front-container b3-marketing-section">
      <h2 class="mb-8">
        {{ context.contentConfig.texts.aUniqueStoryInEveryNumber }}
      </h2>
      <div class="b3-three">
        <div
          v-for="[n, caption] in context.contentConfig.values.items5"
          :key="n"
        >
          <strong class="b3-big-number">{{ n }}</strong>
          <p class="muted">{{ caption }}</p>
        </div>
      </div>
      <p class="text-caption muted mt-6">
        {{
          context.contentConfig.texts
            .statisticsShownAsReferenceTemplateSampleContent
        }}
      </p>
    </section>
    <section class="b3-team-section">
      <div class="front-container">
        <div class="b3-section-heading">
          <h2>{{ context.contentConfig.texts.meetOurTeam }}</h2>
          <p>
            {{
              context.contentConfig.texts
                .ourRobustAnalyticsOfferRichInsightsIntoThe
            }}<br />{{
              context.contentConfig.texts
                .informationBuyersWantInformingWhereTeams
            }}
          </p>
        </div>
        <div class="b3-four">
          <article v-for="([name, job], i) in context.team" :key="name">
            <img
              :src="
                context.asset(
                  context.contentConfig.texts.leader +
                    (i + 1) +
                    context.contentConfig.texts.text2,
                )
              "
              :alt="name"
            />
            <h3>{{ name }}</h3>
            <p>{{ job }}</p>
          </article>
        </div>
      </div>
    </section>
    <div v-if="!context.about" class="b3-contact-band">
      <p>
        {{
          context.contentConfig.texts
            .saveValuableTimeAndEffortSpentSearchingForASolution
        }}
      </p>
      <v-btn
        :to="context.contentConfig.texts.frontPageContactUs"
        variant="outlined"
        >{{ context.contentConfig.texts.contactUsNow }}</v-btn
      >
    </div>
    <section class="front-container b3-marketing-section">
      <div class="b3-testimonials">
        <div>
          <h2>{{ context.contentConfig.texts.wordsFromCustomers }}</h2>
          <p class="muted mt-4">
            {{
              context.contentConfig.texts.pellentesqueVariusSemperOdioNonPretium
            }}
          </p>
          <div class="button-samples mt-6">
            <v-btn
              icon
              variant="tonal"
              :aria-label="context.contentConfig.texts.previousTestimonial"
              @click="context.slide = (context.slide + 2) % 3"
              ><Icon name="back" /></v-btn
            ><v-btn
              icon
              variant="tonal"
              :aria-label="context.contentConfig.texts.nextTestimonial"
              @click="context.slide = (context.slide + 1) % 3"
              ><Icon name="right"
            /></v-btn>
          </div>
        </div>
        <div aria-live="polite">
          <v-rating :model-value="5" readonly color="warning" size="22" />
          <blockquote>
            {{
              context.contentConfig.texts
                .thisTemplateIsGreatUIRichAndUpToDateAlthoughItIsPrettyM
            }}
          </blockquote>
          <div class="person-cell mt-5">
            <v-avatar size="48"
              ><img
                :src="context.avatar(context.slide + 1)"
                :alt="context.testimonials[context.slide]"
            /></v-avatar>
            <div>
              <h3>{{ context.testimonials[context.slide] }}</h3>
              <p class="muted">
                {{ context.contentConfig.texts.cEOHeadOfCompInc }}
              </p>
            </div>
          </div>
          <p class="text-caption muted mt-4">
            {{
              context.contentConfig.texts
                .sampleTestimonialReproducedFromTheReference
            }}{{ context.slide + 1 }}{{ context.contentConfig.texts.of3 }}
          </p>
        </div>
      </div>
      <div class="b3-feature-chips">
        <v-chip
          v-for="(name, i) in context.contentConfig.values.items6"
          :key="name"
          :color="
            [
              context.contentConfig.texts.primary,
              context.contentConfig.texts.secondary,
              context.contentConfig.texts.error,
              context.contentConfig.texts.success,
              context.contentConfig.texts.warning,
            ][i % 5]
          "
          variant="tonal"
          >{{ name }}</v-chip
        >
      </div>
      <p class="text-caption text-center muted">
        {{
          context.contentConfig.texts
            .referenceFeatureLabelsSeeTheRouteDirectoryForThisRecrea
        }}
      </p>
    </section>
    <section class="front-container b3-marketing-section b3-license-section">
      <div class="b3-centered-heading">
        <h2>{{ context.contentConfig.texts.fairPricingForEveryone }}</h2>
        <p>
          {{
            context.contentConfig.texts
              .chooseTheLayoutThatFitsYourProjectTheseAreIllustrativeT
          }}
        </p>
      </div>
      <div class="b3-four">
        <v-card
          v-for="[name, price, projects] in context.pricing"
          :key="name"
          class="b3-license-card"
          variant="outlined"
          ><h3>
            {{ name }}
            <v-chip v-if="price === 299" color="primary" size="x-small">{{
              context.contentConfig.texts.popular
            }}</v-chip>
          </h3>
          <p class="muted my-4">
            {{
              projects === context.contentConfig.texts.oneProject
                ? context.contentConfig.texts.useForASingleEndProduct
                : context.contentConfig.texts.useForMultipleEndProducts
            }}
          </p>
          <h2>{{ context.contentConfig.texts.text3 }}{{ price }}</h2>
          <small class="muted">{{
            context.contentConfig.texts.oneTimePay
          }}</small>
          <ul>
            <li
              v-for="text in [
                context.contentConfig.texts.fullSourceCode,
                context.contentConfig.texts.documentation,
                context.contentConfig.texts.useInSaaSApp,
                projects,
                context.contentConfig.texts.oneYearTechnicalSupport,
              ]"
              :key="text"
            >
              <Icon name="check" :size="15" />{{ text }}
            </li>
          </ul>
          <v-btn color="primary" block @click="context.plan = name">{{
            context.contentConfig.texts.purchaseNow
          }}</v-btn></v-card
        >
      </div>
      <p class="text-center text-caption muted mt-6">
        {{
          context.contentConfig.texts
            .demoPricingOnlyNoPurchasesVendorLicensesOrSupportContra
        }}
      </p>
    </section>
    <section class="front-container b3-marketing-section">
      <h2 class="text-center mb-8">
        {{ context.contentConfig.texts.frequentlyAskedQuestions }}
      </h2>
      <div class="b3-front-faq"><FaqList :items="context.frontFaq" /></div>
      <p class="text-center mt-7">
        {{ context.contentConfig.texts.stillHaveAQuestion
        }}<router-link :to="context.contentConfig.texts.frontPageContactUs">{{
          context.contentConfig.texts.contactUs
        }}</router-link
        >{{ context.contentConfig.texts.or
        }}<router-link :to="context.contentConfig.texts.appsTickets">{{
          context.contentConfig.texts.openDemoTickets
        }}</router-link
        >{{ context.contentConfig.texts.text4 }}
      </p>
    </section>
    <v-dialog
      :model-value="!!context.plan"
      @update:model-value="context.plan = null"
      ><v-card v-if="context.plan" class="dialog-body"
        ><h2>
          {{ context.plan }}{{ context.contentConfig.texts.demoPreview }}
        </h2>
        <p class="my-5">
          {{
            context.contentConfig.texts
              .noPurchaseWillBeMadeThisRecreationDoesNotSellCommercial
          }}
        </p>
        <v-btn color="primary" @click="context.plan = null">{{
          context.contentConfig.texts.gotIt
        }}</v-btn></v-card
      ></v-dialog
    ></component
  >
</template>
