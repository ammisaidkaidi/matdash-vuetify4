<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const menu = ref(false),
  route = useRoute();
const links = [
  ["About Us", "/front-page/about-us"],
  ["Blog", "/front-page/blog/posts"],
  ["Portfolio", "/front-page/portfolio"],
  ["Dashboard", "/dashboards/dashboard1"],
  ["Pricing", "/front-page/pricing"],
  ["Contact", "/front-page/contact-us"],
];
</script>
<template>
  <section class="contact-page b3-front" data-page-ready="true" data-batch="3">
    <div class="b3-announcement">
      Build something great with MatDash · Vue 3 + Vuetify 4
    </div>
    <header class="front-header">
      <div class="front-container front-header-inner">
        <router-link to="/front-page/homepage" aria-label="MatDash homepage"
          ><img src="/assets/logo-Dq6uoD-m.svg" alt="MatDash" width="145"
        /></router-link>
        <nav
          :class="['front-nav', { open: menu }]"
          aria-label="Front page navigation"
        >
          <router-link
            v-for="[label, path] in links"
            :key="path"
            :to="path"
            :class="{ active: route.path === path }"
            @click="menu = false"
            >{{ label }}</router-link
          ><v-btn to="/auth/login" color="primary" rounded="pill">Log In</v-btn>
        </nav>
        <v-btn
          class="front-menu-button"
          icon
          variant="text"
          aria-label="Toggle navigation"
          :aria-expanded="menu"
          @click="menu = !menu"
          ><Icon :name="menu ? 'close' : 'menu'"
        /></v-btn>
      </div>
    </header>
    <slot />
    <section class="b3-front-cta">
      <div class="front-container">
        <Icon name="layers" :size="38" />
        <h2>
          Focus on what truly matters—creating stunning, functional designs.
        </h2>
        <p>
          Designed for ease of use and customization, this template helps you
          build professional dashboards faster.
        </p>
        <v-btn to="/auth/register" variant="outlined" size="large"
          >Register</v-btn
        >
      </div>
    </section>
    <footer class="b3-front-footer">
      <div class="front-container">
        <div class="b3-footer-columns">
          <div>
            <router-link to="/front-page/homepage"
              ><img src="/assets/logo-Dq6uoD-m.svg" alt="MatDash" width="145"
            /></router-link>
            <p class="mt-5">
              A thoughtful foundation<br />for your next application.
            </p>
          </div>
          <div
            v-for="[title, items] in [
              [
                'Applications',
                [
                  ['Calendar', '/apps/calendar'],
                  ['Chats', '/apps/chats'],
                  ['Contacts', '/apps/contacts'],
                ],
              ],
              [
                'Resources',
                [
                  ['About Us', '/front-page/about-us'],
                  ['Blog', '/front-page/blog/posts'],
                  ['Contact Us', '/front-page/contact-us'],
                ],
              ],
              [
                'Explore',
                [
                  ['Dashboard', '/dashboards/dashboard1'],
                  ['Components', '/forms/form-elements/combobox'],
                  ['Route progress', '/pages/route-directory'],
                ],
              ],
            ]"
            :key="title"
          >
            <h3>{{ title }}</h3>
            <router-link v-for="[name, path] in items" :key="path" :to="path">{{
              name
            }}</router-link>
          </div>
        </div>
        <div class="b3-footer-bottom">
          MatDash front-end recreation · Local demo, no connected services.
          <router-link to="/pages/route-directory"
            >View build progress</router-link
          >
        </div>
      </div>
    </footer>
  </section>
</template>
