import query_auth from './auth';
import query_no_auth from './no_auth';
import query_bottom_nav from './bottom_nav';
import query_articles from './articles';
import query_mag_categories from './mag_categories';
import query_article, {
  query_articles_suggestions,
  query_article_favorite,
} from './article';
import query_mag, {query_mag_pub} from './mag';
import query_stories from './stories';
import query_burger_menu from './burger_menu';
import query_chat from './chat';
import query_favorite, {query_favorite_list} from './favorite';
import query_account, {
  query_account_subscription,
  query_countries,
} from './user';
import query_notification from './notification';
import query_who_gigi from './who_gigi';
import query_cgv from './cgv';
import query_privacy from './privacy';
import query_cookies from './cookies';
import query_inspiration_datas, {
  query_inspiration_detail,
  query_inspiration_by_region,
  query_inspiration_destination,
} from './inspiration';
import query_addresses_datas, {
  query_addresses_detail,
  query_addresses_card,
  query_address_favorite,
  query_search_address,
} from './addresses';
import query_map, {
  query_map_address,
  query_map_addresses,
  query_map_favorite,
} from './map';
import query_travel, {query_travel_list} from './travel';
import query_pub from './pub';
import query_membership_datas, {query_subscription_detail, query_subscriptions} from './membership';
import query_search from './search';
import query_shared from './shared';
import query_service_datas, {
  query_callslots,
  query_orders,
  query_order,
} from './service';

export {
  query_auth,
  query_no_auth,
  query_bottom_nav,
  query_articles,
  query_mag_categories,
  query_article,
  query_articles_suggestions,
  query_article_favorite,
  query_mag,
  query_mag_pub,
  query_stories,
  query_burger_menu,
  query_chat,
  query_favorite,
  query_favorite_list,
  query_account,
  query_account_subscription,
  query_countries,
  query_notification,
  query_who_gigi,
  query_cgv,
  query_privacy,
  query_cookies,
  query_inspiration_datas,
  query_inspiration_detail,
  query_inspiration_by_region,
  query_inspiration_destination,
  query_addresses_datas,
  query_addresses_detail,
  query_addresses_card,
  query_address_favorite,
  query_search_address,
  query_map,
  query_map_address,
  query_map_addresses,
  query_map_favorite,
  query_travel,
  query_travel_list,
  query_pub,
  query_membership_datas,
  query_subscription_detail,
  query_subscriptions,
  query_search,
  query_shared,
  query_service_datas,
  query_callslots,
  query_orders,
  query_order,
};
