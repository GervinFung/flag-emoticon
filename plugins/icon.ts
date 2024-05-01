import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
	ViFileTypeVue,
	ViFileTypeTypescriptOfficial,
} from 'oh-vue-icons/icons';

addIcons(ViFileTypeVue, ViFileTypeTypescriptOfficial);

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('v-icon', OhVueIcon);
});
