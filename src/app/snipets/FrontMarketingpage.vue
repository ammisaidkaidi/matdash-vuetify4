<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/FrontMarketing/FrontMarketing.vue";
import type { FrontMarketingContext } from "../../com/FrontMarketing/types";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import FrontLayout from "../../com/ui/FrontLayout.vue";
import FaqList from "../../com/ui/FaqList.vue";
import { asset, avatar } from "../../data/app-seed";
import { frontFaq } from "../../data/batch03";
const about = useRoute().path.endsWith("about-us"),
  tab = ref("Team Scheduling"),
  slide = ref(0),
  plan = ref(null);
const team = [
  ["Alex Martinez", "CEO & Co-Founder"],
  ["Jordan Nguyen", "CTO & Co-Founder"],
  ["Taylor Roberts", "Product Manager"],
  ["Morgan Patel", "Lead Developer"],
];
const testimonials = ["Jenny Wilson", "Josh Cui", "Eminson Mendoza"];
const feature = computed(
  () =>
    ({
      "Team Scheduling": [
        "Defend your focus",
        "Combine teammate schedules",
        "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
      ],
      Payments: [
        "Make every detail count",
        "Keep payments organized",
        "Bring clear records and intuitive workflows together. Payment controls in this recreation are demonstrations only.",
      ],
      Embedding: [
        "Build into your workflow",
        "Keep your tools together",
        "Reuse components and compose responsive screens for the way your team works.",
      ],
      Workflows: [
        "Create space for good work",
        "Turn plans into progress",
        "Organize the steps that matter and keep your team aligned with one clear view.",
      ],
    })[tab.value],
);
const pricing = [
  ["Single Use", 49, "One Project"],
  ["Multiple Use", 89, "Unlimited Project"],
  ["Extended Use", 299, "One Project"],
  ["Unlimited Use", 499, "Unlimited Project"],
];

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: FrontMarketingContext = __viewReactive({
  get FrontLayout() {
    return __viewUnref(FrontLayout);
  },
  get about() {
    return __viewUnref(about);
  },
  set about(value: any) {
    if (__viewIsRef(about)) (about as any).value = value;
  },
  get asset() {
    return __viewUnref(asset);
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get feature() {
    return __viewUnref(feature);
  },
  set feature(value: any) {
    if (__viewIsRef(feature)) (feature as any).value = value;
  },
  get frontFaq() {
    return __viewUnref(frontFaq);
  },
  get plan() {
    return __viewUnref(plan);
  },
  set plan(value: any) {
    if (__viewIsRef(plan)) (plan as any).value = value;
  },
  get pricing() {
    return __viewUnref(pricing);
  },
  get slide() {
    return __viewUnref(slide);
  },
  set slide(value: any) {
    if (__viewIsRef(slide)) (slide as any).value = value;
  },
  get tab() {
    return __viewUnref(tab);
  },
  set tab(value: any) {
    if (__viewIsRef(tab)) (tab as any).value = value;
  },
  get team() {
    return __viewUnref(team);
  },
  get testimonials() {
    return __viewUnref(testimonials);
  },
  contentConfig: {
    texts: {
      b3MarketingHero: "b3-marketing-hero",
      dESIGNEDFORYOURNEXTBIGIDEA: "DESIGNED FOR YOUR NEXT BIG IDEA",
      getToKnowMatDashDashboardTemplate:
        "Get to know MatDash Dashboard Template",
      aFeaturePackedDashboardBuiltForDevelopersNeeds:
        "A feature-packed dashboard built for developers’ needs.",
      sampleDeveloper: "Sample developer",
      text1: "52,589+",
      developersAgenciesUsingOurTemplates:
        "developers & agencies using our templates ",
      authLogin: "/auth/login",
      logIn: "Log In",
      illustrativeReferenceFiguresNotMetricsForThisRecreation:
        " Illustrative reference figures, not metrics for this recreation. ",
      authRegister: "/auth/register",
      createAnAccount: "Create An Account",
      frontPageContactUs: "/front-page/contact-us",
      viewOpenPositions: "View Open Positions",
      doYouNeedAHighlyCustomizableAndDeveloperFriendlyPremium:
        " Do you need a highly customizable and developer friendly premium Vue admin template packed with numerous features? MatDash brings flexible layouts and reusable components together, with a thoughtful foundation for your next application. ",
      mainBanner: "main-banner-",
      matDashDashboardPreviews: "MatDash dashboard previews",
      over45000Clients: "Over 45,000 clients",
      andCounting: "and counting.",
      buildWithReusableComponentsAndThoughtfulDetailsFocusOnT:
        " Build with reusable components and thoughtful details. Focus on the experience you want to create. ",
      requestACallback: "Request a Callback",
      clearGuidanceAndThoughtfulToolsForYourNextProject:
        " Clear guidance and thoughtful tools for your next project. ",
      theHassleFreeSetupProcess: "The hassle-free setup process",
      lightprimary: "lightprimary",
      lighterror: "lighterror",
      lightsecondary: "lightsecondary",
      canvas: "canvas",
      thoughtfulComponentsToHelpYouBuildWithConfidence:
        " Thoughtful components to help you build with confidence. ",
      featureImage: "feature-image-",
      schedulingAndWorkflowPreview: "Scheduling and workflow preview",
      factorInOutsideColleagues: "✓ Factor in outside colleagues",
      roundRobinPooling: "✓ Round robin pooling",
      frontPageAboutUs: "/front-page/about-us",
      learnMore: "Learn More",
      aUniqueStoryInEveryNumber: "A unique story in every number",
      statisticsShownAsReferenceTemplateSampleContent:
        " Statistics shown as reference-template sample content. ",
      meetOurTeam: "Meet our team",
      ourRobustAnalyticsOfferRichInsightsIntoThe:
        " Our robust analytics offer rich insights into the",
      informationBuyersWantInformingWhereTeams:
        "information buyers want, informing where teams. ",
      leader: "leader",
      text2: "-",
      saveValuableTimeAndEffortSpentSearchingForASolution:
        "Save valuable time and effort spent searching for a solution.",
      contactUsNow: "Contact us now",
      wordsFromCustomers: "Words from customers.",
      pellentesqueVariusSemperOdioNonPretium:
        "Pellentesque varius semper odio non pretium.",
      previousTestimonial: "Previous testimonial",
      nextTestimonial: "Next testimonial",
      thisTemplateIsGreatUIRichAndUpToDateAlthoughItIsPrettyM:
        " This template is great, UI-rich and up-to-date. Although it is pretty much complete, I suggest to improve a bit of documentation. Thanks & Highly recommended! ",
      cEOHeadOfCompInc: "CEO & Head of Comp Inc.",
      sampleTestimonialReproducedFromTheReference:
        " Sample testimonial reproduced from the reference · ",
      of3: " of 3 ",
      primary: "primary",
      secondary: "secondary",
      error: "error",
      success: "success",
      warning: "warning",
      referenceFeatureLabelsSeeTheRouteDirectoryForThisRecrea:
        " Reference feature labels; see the Route Directory for this recreation’s actual implementation status. ",
      fairPricingForEveryone: "Fair pricing for everyone.",
      chooseTheLayoutThatFitsYourProjectTheseAreIllustrativeT:
        " Choose the layout that fits your project. These are illustrative template license cards. ",
      popular: "Popular",
      oneProject: "One Project",
      useForASingleEndProduct: "Use for a single end product.",
      useForMultipleEndProducts: "Use for multiple end products.",
      text3: "$",
      oneTimePay: "/one time pay",
      fullSourceCode: "Full source code",
      documentation: "Documentation",
      useInSaaSApp: "Use in SaaS app",
      oneYearTechnicalSupport: "One Year Technical Support",
      purchaseNow: "Purchase Now",
      demoPricingOnlyNoPurchasesVendorLicensesOrSupportContra:
        " Demo pricing only. No purchases, vendor licenses, or support contracts are sold here. ",
      frequentlyAskedQuestions: "Frequently asked questions",
      stillHaveAQuestion: " Still have a question? ",
      contactUs: "Contact us",
      or: " or ",
      appsTickets: "/apps/tickets",
      openDemoTickets: "open demo tickets",
      text4: ". ",
      demoPreview: " — demo preview",
      noPurchaseWillBeMadeThisRecreationDoesNotSellCommercial:
        " No purchase will be made. This recreation does not sell commercial template licenses. Review the original vendor’s current pricing and rights before any purchase. ",
      gotIt: "Got it",
    },
    values: {
      items1: [3, 2, 1],
      items2: [
        ["user", "Expert Advisor"],
        ["chats", "Effective Support"],
        ["creditcard", "Low Fees"],
        ["invoice", "Loan Facility"],
      ],
      items3: [
        ["chats", "Effective Support"],
        ["user", "Expert Advisor"],
        ["creditcard", "Low Fees"],
        ["invoice", "Loan Facility"],
      ],
      items4: ["Team Scheduling", "Payments", "Embedding", "Workflows"],
      items5: [
        ["2019", "When we founded Modernize"],
        ["300k+", "Customers on Modernize"],
        ["25k+", "Dashboards built using MatDash"],
      ],
      items6: [
        "6 Theme Colors",
        "Authguard",
        "65+ Page Templates",
        "45+ UI Components",
        "Vuetify",
        "3400+ Font Icons",
        "Axios",
        "i18n Vue",
        "Vue3 Carousel",
        "Easy to Customize",
        "Lots of Chart Options",
        "Lots of Table Examples",
        "Regular Updates",
        "Detailed Documentation",
        "Calendar Design",
        "Dedicated Support",
      ],
    },
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
