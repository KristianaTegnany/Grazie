import API from 'services/utils/api';
import {url} from 'services/utils/url';
import {INewResponse, IResponse} from '../auth/type';
import UserInfo from './type';

export type IAddOrder = IResponse & {
  order_id: string;
  price: {label: string};
  payment_intent: {
    customer_id: string;
    setup_intent: string;
    ephemeral_key: string;
    payment_intent: {
      id: string;
      client_secret: string;
    };
  };
};

export type IFind = {
  email?: string;
  username?: string;
};

export class UserService {
  /**
   * Create user account
   *
   * @param {UserCredential} credential
   * @returns {Promise<void>}
   */

  static async findAccount(data: IFind): Promise<IResponse> {
    return API.post(url.user.find, data);
  }

  static async updateAccount(data: UserInfo): Promise<IResponse> {
    return API.patch(url.user.account, data);
  }

  static async deleteAccount(email: string): Promise<IResponse> {
    return API.post(url.user.delete, {email});
  }

  static async cancelDeletingAccount(email: string): Promise<IResponse> {
    return API.post(url.user.cancelDeleting, {email});
  }

  static async changeEmail(email: string): Promise<INewResponse> {
    return API.post(url.user.changeEmail, {
      email: email.trim(),
    });
  }

  static async changePassword(
    password: string,
    new_password: string,
  ): Promise<IResponse> {
    return API.post(url.user.changePassword, {
      password: password.trim(),
      new_password: new_password.trim(),
    });
  }

  static async passwordRecovery(
    email: string,
  ): Promise<IResponse & {uuid: string}> {
    return API.post(url.user.passwordRecovery, {
      email: email.trim(),
    });
  }

  static async passwordSet(
    password: string,
    code: string,
    uuid: string,
  ): Promise<IResponse> {
    return API.post(url.user.passwordSet, {
      password: password.trim(),
      code,
      uuid,
    });
  }

  static async addTravel(
    title: string,
    start_at: string,
    end_at: string,
    region: number,
  ): Promise<IResponse> {
    return API.post(url.user.travel, {
      title: title.trim(),
      start_at,
      end_at,
      region,
    });
  }

  static async updateTravel(
    id: string,
    title: string,
    start_at: string,
    end_at: string,
    region: number,
  ): Promise<IResponse> {
    return API.patch(url.user.travel + '/' + id, {
      title: title.trim(),
      start_at,
      end_at,
      region,
    });
  }

  static async deleteTravel(id: string): Promise<IResponse> {
    return API.delete(url.user.travel + '/' + id);
  }

  static async addOrder(
    accommodation_name: string,
    callslot: number,
    contact_method: string,
    date: string,
    is_hosted: boolean,
    quantity: number,
    phone_number: string,
    product_ref: string,
    region: string,
    travel_purposes: string[],
    travelers_number: number,
    travel_dates?: string,
  ): Promise<IAddOrder> {
    return API.post(url.user.newOrder, {
      accommodation_name: accommodation_name.trim(),
      callslot,
      contact_method,
      date,
      is_hosted,
      quantity,
      phone_number,
      product_ref,
      region,
      travel_purposes,
      travelers_number,
      travel_dates,
    });
  }

  static async postponeOrder(
    order_id: string,
    params: {
      callslot?: number;
      date?: string;
    },
  ): Promise<IAddOrder> {
    return API.post(url.user.updateAppointment + order_id + "/postpone", params);
  }
  
  static async updateOrder(
    order_id: string,
    params: {
      accommodation_name?: string;
      callslot?: number;
      contact_method?: string;
      date?: string;
      is_hosted?: boolean;
      quantity?: number;
      phone_number?: string;
      product_ref?: string;
      region?: string;
      travel_purposes?: string[];
      travelers_number?: number;
      travel_dates?: string;
    },
  ): Promise<IAddOrder> {
    return API.patch(url.user.updateOrder + order_id, params);
  }
}
