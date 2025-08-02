import type { Schema, Struct } from '@strapi/strapi';

export interface PaymentAlipayConfig extends Struct.ComponentSchema {
  collectionName: 'components_payment_alipay_configs';
  info: {
    description: '\u652F\u4ED8\u5B9D\u652F\u4ED8\u76F8\u5173\u914D\u7F6E\uFF0C\u5305\u542BAppID\u3001\u5BC6\u94A5\u3001\u7F51\u5173\u7B49\u5FC5\u8981\u4FE1\u606F';
    displayName: '\u652F\u4ED8\u5B9D\u914D\u7F6E';
  };
  attributes: {
    alipayPublicKey: Schema.Attribute.Text;
    appId: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    charset: Schema.Attribute.Enumeration<['utf-8', 'gbk']> &
      Schema.Attribute.DefaultTo<'utf-8'>;
    configStatus: Schema.Attribute.Enumeration<
      ['draft', 'configured', 'testing', 'active']
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    enabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    gateway: Schema.Attribute.Enumeration<
      [
        'https://openapi.alipay.com/gateway.do',
        'https://openapi.alipaydev.com/gateway.do',
      ]
    > &
      Schema.Attribute.DefaultTo<'https://openapi.alipaydev.com/gateway.do'>;
    lastTestedAt: Schema.Attribute.DateTime;
    notifyUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    privateKey: Schema.Attribute.Text;
    signType: Schema.Attribute.Enumeration<['RSA2', 'RSA']> &
      Schema.Attribute.DefaultTo<'RSA2'>;
    supportedMethods: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<{
        app: false;
        qrcode: true;
        wap: true;
        web: true;
      }>;
    testResult: Schema.Attribute.JSON;
  };
}

export interface PaymentGeneralConfig extends Struct.ComponentSchema {
  collectionName: 'components_payment_general_configs';
  info: {
    description: '\u652F\u4ED8\u7CFB\u7EDF\u901A\u7528\u914D\u7F6E\u9879\uFF0C\u5305\u542B\u8D85\u65F6\u65F6\u95F4\u3001\u91D1\u989D\u9650\u5236\u7B49\u901A\u7528\u8BBE\u7F6E';
    displayName: '\u901A\u7528\u652F\u4ED8\u914D\u7F6E';
  };
  attributes: {
    enableAutoRefund: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enablePaymentLogs: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    maxPaymentAmount: Schema.Attribute.Decimal &
      Schema.Attribute.DefaultTo<100000>;
    minPaymentAmount: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<1>;
    paymentTimeout: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 60;
          min: 5;
        },
        number
      > &
      Schema.Attribute.DefaultTo<30>;
    siteName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'AI\u53D8\u73B0\u4E4B\u8DEF'>;
  };
}

export interface PaymentStripeConfig extends Struct.ComponentSchema {
  collectionName: 'components_payment_stripe_configs';
  info: {
    description: 'Stripe\u652F\u4ED8\u76F8\u5173\u914D\u7F6E\uFF0C\u5305\u542BAPI\u5BC6\u94A5\u3001Webhook\u5BC6\u94A5\u7B49\u5FC5\u8981\u4FE1\u606F';
    displayName: 'Stripe\u914D\u7F6E';
  };
  attributes: {
    apiVersion: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Schema.Attribute.DefaultTo<'2023-10-16'>;
    automaticPaymentMethods: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    configStatus: Schema.Attribute.Enumeration<
      ['draft', 'configured', 'testing', 'active']
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    defaultCurrency: Schema.Attribute.Enumeration<
      ['usd', 'eur', 'cny', 'jpy', 'hkd', 'sgd']
    > &
      Schema.Attribute.DefaultTo<'usd'>;
    enableApplePay: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    enableGooglePay: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    lastTestedAt: Schema.Attribute.DateTime;
    publishableKey: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    secretKey: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    supportedCurrencies: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<['usd', 'eur', 'cny']>;
    supportedMethods: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<{
        alipay: true;
        card: true;
        paypal: false;
        wechat_pay: false;
      }>;
    testResult: Schema.Attribute.JSON;
    webhookEndpoint: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    webhookSecret: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface PaymentWechatConfig extends Struct.ComponentSchema {
  collectionName: 'components_payment_wechat_configs';
  info: {
    description: '\u5FAE\u4FE1\u652F\u4ED8\u76F8\u5173\u914D\u7F6E\uFF0C\u5305\u542BAppID\u3001\u5546\u6237\u53F7\u3001API\u5BC6\u94A5\u7B49\u5FC5\u8981\u4FE1\u606F';
    displayName: '\u5FAE\u4FE1\u652F\u4ED8\u914D\u7F6E';
  };
  attributes: {
    apiKey: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    apiVersion: Schema.Attribute.Enumeration<['v2', 'v3']> &
      Schema.Attribute.DefaultTo<'v3'>;
    appId: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    certificate: Schema.Attribute.Text;
    configStatus: Schema.Attribute.Enumeration<
      ['draft', 'configured', 'testing', 'active']
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    enabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    h5Domain: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    jsApiDomain: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    lastTestedAt: Schema.Attribute.DateTime;
    mchId: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    notifyUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    privateKey: Schema.Attribute.Text;
    supportedMethods: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<{
        app: false;
        h5: true;
        jsapi: true;
        miniprogram: false;
        native: true;
      }>;
    testResult: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'payment.alipay-config': PaymentAlipayConfig;
      'payment.general-config': PaymentGeneralConfig;
      'payment.stripe-config': PaymentStripeConfig;
      'payment.wechat-config': PaymentWechatConfig;
    }
  }
}
