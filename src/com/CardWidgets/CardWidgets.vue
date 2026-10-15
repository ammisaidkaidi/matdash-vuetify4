<script setup lang="ts">
import { VSlider } from "vuetify/components";
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { CardWidgetsContext } from "./types";

defineProps<{ context: CardWidgetsContext }>();
</script>

<template>
  <WorkspacePage
    :title="context.contentConfig.texts.cardsWidgets"
    data-batch="3"
    ><div class="b3-three">
      <v-card
        v-for="a in context.articles.slice(5, 8)"
        :key="a.id"
        class="b3-blog-card"
        ><router-link :to="context.contentConfig.texts.appsBlog + a.slug"
          ><img :src="a.image" :alt="a.title" />
          <div class="pa-5">
            <v-chip size="small" color="primary">{{ a.category }}</v-chip>
            <h2 class="my-4">{{ a.title }}</h2>
            <div class="article-meta">
              <span><Icon name="eye" :size="15" />{{ a.views }}</span
              ><span>{{ context.contentConfig.texts.text1 }}</span
              ><span>{{ context.contentConfig.texts.text2 }}</span>
            </div>
          </div></router-link
        ></v-card
      >
    </div>
    <div class="b3-four my-6">
      <v-card
        v-for="p in context.demo.products.slice(2, 6)"
        :key="p.id"
        class="b3-widget-product"
        ><router-link
          :to="context.contentConfig.texts.ecommerceProductDetail + p.id"
          ><img :src="p.image" :alt="p.name"
        /></router-link>
        <div class="pa-4">
          <h3>{{ p.name }}</h3>
          <p class="my-2">
            {{ context.money(p.price) }}
            <del class="muted">{{ context.money(p.oldPrice) }}</del>
          </p>
          <v-rating
            :model-value="p.rating"
            color="warning"
            size="17"
            readonly
            density="compact"
          /><v-btn
            color="primary"
            icon
            size="32"
            class="b3-cart-button"
            :aria-label="
              context.contentConfig.texts.add +
              p.name +
              context.contentConfig.texts.toCart
            "
            @click="
              context.addToCart(p.id);
              context.notify(context.contentConfig.texts.addedToYourLocalCart);
            "
            ><Icon name="cart" :size="17"
          /></v-btn></div
      ></v-card>
    </div>
    <div class="b3-three">
      <v-card
        v-for="([track, artist], i) in context.contentConfig.values.items1"
        :key="track"
        class="b3-music-card"
        ><div>
          <h3>{{ track }}</h3>
          <p class="muted text-caption">{{ artist }}</p>
          <v-btn
            variant="text"
            size="small"
            @click="
              context.detail = {
                title: track,
                text:
                  context.contentConfig.texts.illustrativeMusicCardFor +
                  artist +
                  context.contentConfig.texts.noAudioFileIsBundled,
              }
            "
            >{{ context.contentConfig.texts.trackDetails }}</v-btn
          >
        </div>
        <img
          :src="
            context.asset(
              context.contentConfig.texts.blogImg +
                (i + 1) +
                context.contentConfig.texts.text3,
            )
          "
          :alt="track + context.contentConfig.texts.artwork"
      /></v-card>
    </div>
    <div class="b3-three my-6">
      <v-card
        v-for="(name, i) in context.people.slice(0, 3)"
        :key="name"
        class="b3-follow-card"
        ><v-avatar size="40"
          ><img :src="context.avatar(i + 2)" :alt="name"
        /></v-avatar>
        <div>
          <h3>{{ name }}</h3>
          <small class="muted">{{
            [
              context.contentConfig.texts.elSalvador,
              context.contentConfig.texts.bulgaria,
              context.contentConfig.texts.nepal,
            ][i]
          }}</small>
        </div>
        <v-btn
          size="small"
          color="primary"
          @click="context.toggleFollow(100 + i)"
          >{{
            context.pageDemos.following.includes(100 + i)
              ? context.contentConfig.texts.followed
              : context.contentConfig.texts.follow
          }}</v-btn
        ></v-card
      >
    </div>
    <div class="b3-four">
      <v-card v-for="(name, i) in context.people" :key="name" class="b3-person"
        ><v-avatar size="66"
          ><img :src="context.avatar(i + 2)" :alt="name"
        /></v-avatar>
        <h3 class="mt-3">{{ name }}</h3>
        <p class="muted text-caption my-3">
          {{ context.contentConfig.texts.text4 }}
        </p>
        <v-btn
          block
          color="primary"
          variant="tonal"
          size="small"
          @click="
            context.pageDemos.widgetFriends.includes(name)
              ? context.pageDemos.widgetFriends.splice(
                  context.pageDemos.widgetFriends.indexOf(name),
                  1,
                )
              : context.pageDemos.widgetFriends.push(name)
          "
          >{{
            context.pageDemos.widgetFriends.includes(name)
              ? context.contentConfig.texts.friendAdded
              : context.contentConfig.texts.addFriend
          }}</v-btn
        ><v-btn
          variant="text"
          color="error"
          size="small"
          class="mt-2"
          @click="
            context.pageDemos.widgetFriends =
              context.pageDemos.widgetFriends.filter((n) => n !== name);
            context.notify(context.contentConfig.texts.localRequestRemoved);
          "
          >{{ context.contentConfig.texts.remove }}</v-btn
        ></v-card
      >
    </div>
    <div class="b3-three my-6">
      <v-card
        v-for="(name, i) in context.people.slice(0, 3)"
        :key="name"
        class="b3-person"
        ><v-avatar size="65"
          ><img :src="context.avatar(i + 2)" :alt="name"
        /></v-avatar>
        <h3 class="mt-3">{{ name }}</h3>
        <p class="muted mt-2">
          {{
            [
              context.contentConfig.texts.technologyDirector,
              context.contentConfig.texts.telecomAnalyst,
              context.contentConfig.texts.environmentalSpecialist,
            ][i]
          }}
        </p>
        <v-btn
          class="mt-3"
          variant="text"
          :to="context.contentConfig.texts.pagesSocialMediaContacts"
          >{{ context.contentConfig.texts.viewContacts }}</v-btn
        ></v-card
      >
    </div>
    <div class="b3-three">
      <v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.settings }}</h2>
        <h3 class="mt-5">{{ context.contentConfig.texts.sound }}</h3>
        <v-slider
          v-model="context.sound"
          :aria-label="context.contentConfig.texts.soundVolume"
          color="primary"
          hide-details
          :step="1"
        />
        <p>{{ context.sound }}{{ context.contentConfig.texts.text5 }}</p>
        <v-switch
          v-model="context.chat"
          color="secondary"
          :label="context.contentConfig.texts.chat"
          hide-details
        />
        <p class="muted text-caption">
          {{ context.contentConfig.texts.turnOnChatDuringCallDemoPreference }}
        </p>
        <div class="demo-form-actions">
          <v-btn
            variant="text"
            @click="
              context.sound = context.pageDemos.sound;
              context.chat = context.pageDemos.chat;
            "
            >{{ context.contentConfig.texts.cancel }}</v-btn
          ><v-btn
            color="primary"
            @click="
              context.pageDemos.sound = context.sound;
              context.pageDemos.chat = context.chat;
              context.notify(
                context.contentConfig.texts.widgetSettingsSavedLocally,
              );
            "
            >{{ context.contentConfig.texts.save }}</v-btn
          >
        </div></v-card
      ><v-card
        v-for="(name, i) in context.people.slice(0, 2)"
        :key="name"
        class="workspace-card"
        ><h3 class="mb-4">{{ name }}</h3>
        <img
          :src="
            context.asset(
              context.contentConfig.texts.s +
                (i + 1) +
                context.contentConfig.texts.text3,
            )
          "
          :alt="context.contentConfig.texts.sampleGiftFor + name"
          class="b3-gift-image"
        /><v-btn
          block
          color="primary"
          class="mt-4"
          @click="context.gift(name)"
          >{{ context.contentConfig.texts.giftToFriend5000 }}</v-btn
        ></v-card
      >
    </div>
    <div class="b3-three mt-6">
      <v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.paymentGateways }}</h2>
        <p class="muted text-caption mb-5">
          {{ context.contentConfig.texts.platformForIncome }}
        </p>
        <div
          v-for="[name, caption, value, color] in context.gateways"
          :key="name"
          class="b3-gateway"
        >
          <v-avatar :color="color" variant="tonal" rounded="lg" size="40"
            ><Icon name="creditcard" :size="19"
          /></v-avatar>
          <div>
            <h3>{{ name }}</h3>
            <small class="muted">{{ caption }}</small>
          </div>
          <strong>{{ value }}</strong>
        </div>
        <v-btn
          color="primary"
          block
          class="mt-5"
          @click="
            context.detail = {
              title: context.contentConfig.texts.sampleTransactions,
              text: context.gateways
                .map((g) => g[0] + context.contentConfig.texts.text6 + g[2])
                .join(context.contentConfig.texts.text7),
            }
          "
          >{{ context.contentConfig.texts.viewAllTransactions }}</v-btn
        ></v-card
      ><v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.upcomingActivity }}</h2>
        <p class="muted text-caption mb-5">
          {{ context.contentConfig.texts.inNewYear }}
        </p>
        <div
          v-for="(task, i) in context.contentConfig.values.items2"
          :key="task"
          class="b3-upcoming"
        >
          <v-avatar size="34" color="secondary" variant="tonal"
            ><Icon name="calendar" :size="16"
          /></v-avatar>
          <div>
            <router-link :to="context.contentConfig.texts.appsCalendar">{{
              task
            }}</router-link>
            <p class="muted text-caption">
              {{
                i === 2
                  ? context.contentConfig.texts.pending
                  : i === 4
                    ? context.contentConfig.texts.done
                    : context.contentConfig.texts.workingOn
              }}{{ context.contentConfig.texts.text7 }}{{ 5 + i * 5
              }}{{ context.contentConfig.texts.mins }}
            </p>
          </div>
        </div></v-card
      ><component :is="context.Activities" />
    </div>
    <v-dialog
      :model-value="!!context.detail"
      @update:model-value="context.detail = null"
      ><v-card v-if="context.detail" class="dialog-body"
        ><h2>{{ context.detail.title }}</h2>
        <p class="my-5">{{ context.detail.text }}</p>
        <v-btn color="primary" @click="context.detail = null">{{
          context.contentConfig.texts.close
        }}</v-btn></v-card
      ></v-dialog
    ></WorkspacePage
  >
</template>
