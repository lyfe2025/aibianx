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

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SiteAppearanceConfig extends Struct.ComponentSchema {
  collectionName: 'components_site_appearance_configs';
  info: {
    description: '\u7F51\u7AD9\u5916\u89C2\u8BBE\u7F6E - \u7BA1\u7406\u4E3B\u9898\u3001\u989C\u8272\u3001\u5B57\u4F53\u3001\u5E03\u5C40\u7B49\u89C6\u89C9\u76F8\u5173\u914D\u7F6E';
    displayName: '\u5916\u89C2\u8BBE\u7F6E';
  };
  attributes: {
    accentColor: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Schema.Attribute.DefaultTo<'#10B981'>;
    animationDuration: Schema.Attribute.Enumeration<
      ['fast', 'normal', 'slow']
    > &
      Schema.Attribute.DefaultTo<'normal'>;
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Schema.Attribute.DefaultTo<'#FFFFFF'>;
    borderRadius: Schema.Attribute.Enumeration<
      ['none', 'small', 'medium', 'large']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    buttonStyle: Schema.Attribute.Enumeration<
      ['solid', 'outline', 'ghost', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'gradient'>;
    cardStyle: Schema.Attribute.Enumeration<['flat', 'raised', 'outlined']> &
      Schema.Attribute.DefaultTo<'raised'>;
    customCss: Schema.Attribute.Text;
    defaultTheme: Schema.Attribute.Enumeration<['light', 'dark', 'auto']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'light'>;
    enableAnimations: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableCustomCss: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableDarkMode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    enableGlassEffect: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableGradients: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableThemeToggle: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    fontFamily: Schema.Attribute.Enumeration<
      [
        'Alibaba PuHuiTi 3.0',
        'system-ui',
        'Helvetica Neue',
        'PingFang SC',
        'Microsoft YaHei',
      ]
    > &
      Schema.Attribute.DefaultTo<'Alibaba PuHuiTi 3.0'>;
    fontSizeBase: Schema.Attribute.Enumeration<
      ['14px', '16px', '18px', '20px']
    > &
      Schema.Attribute.DefaultTo<'16px'>;
    footerStyle: Schema.Attribute.Enumeration<
      ['default', 'minimal', 'extended']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    headerHeight: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 120;
          min: 60;
        },
        number
      > &
      Schema.Attribute.DefaultTo<80>;
    headerStyle: Schema.Attribute.Enumeration<
      ['fixed', 'sticky', 'static', 'transparent']
    > &
      Schema.Attribute.DefaultTo<'sticky'>;
    layoutStyle: Schema.Attribute.Enumeration<
      ['container', 'full-width', 'boxed']
    > &
      Schema.Attribute.DefaultTo<'container'>;
    maxWidth: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1920;
          min: 1200;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1440>;
    primaryColor: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Schema.Attribute.DefaultTo<'#3B82F6'>;
    spacing: Schema.Attribute.Enumeration<['compact', 'normal', 'relaxed']> &
      Schema.Attribute.DefaultTo<'normal'>;
    textColor: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Schema.Attribute.DefaultTo<'#1F2937'>;
  };
}

export interface SiteContactConfig extends Struct.ComponentSchema {
  collectionName: 'components_site_contact_configs';
  info: {
    description: '\u7F51\u7AD9\u8054\u7CFB\u8BBE\u7F6E - \u7BA1\u7406\u8054\u7CFB\u4FE1\u606F\u3001\u793E\u4EA4\u5A92\u4F53\u3001\u6CD5\u5F8B\u6761\u6B3E\u7B49\u5BF9\u5916\u5C55\u793A\u4FE1\u606F';
    displayName: '\u8054\u7CFB\u8BBE\u7F6E';
  };
  attributes: {
    aboutPageUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'/about'>;
    bilibiliUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    businessEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'business@aibianx.com'>;
    contactAddress: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    contactEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'contact@aibianx.com'>;
    contactPageUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'/contact'>;
    contactPhone: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    copyrightText: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'\u00A9 2024 AI\u53D8\u73B0\u4E4B\u8DEF. \u4FDD\u7559\u6240\u6709\u6743\u5229.'>;
    copyrightYear: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2030;
          min: 2020;
        },
        number
      > &
      Schema.Attribute.DefaultTo<2024>;
    enableContactForm: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableSocialLinks: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableSocialShare: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    githubUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'https://github.com/aibianx'>;
    icp: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    joinUsText: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'\u6B22\u8FCE\u52A0\u5165AI\u53D8\u73B0\u4E4B\u8DEF\u793E\u533A\uFF0C\u4E0E\u5343\u4E07AI\u4ECE\u4E1A\u8005\u4E00\u8D77\u63A2\u8BA8\u53D8\u73B0\u673A\u4F1A\uFF01'>;
    linkedinUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    policeRecord: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    privacyPolicyUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'/privacy'>;
    qqGroup: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    responseTime: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'\u901A\u5E3824\u5C0F\u65F6\u5185\u56DE\u590D'>;
    supportEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'support@aibianx.com'>;
    termsOfServiceUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }> &
      Schema.Attribute.DefaultTo<'/terms'>;
    twitterUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    wechatAccount: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    wechatQr: Schema.Attribute.Media<'images'>;
    workingHours: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'\u5468\u4E00\u81F3\u5468\u4E94 9:00-18:00'>;
    youtubeUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    zhihuUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface SiteGeneralConfig extends Struct.ComponentSchema {
  collectionName: 'components_site_general_configs';
  info: {
    description: '\u7F51\u7AD9\u901A\u7528\u8BBE\u7F6E - \u7BA1\u7406\u7F51\u7AD9\u57FA\u672C\u4FE1\u606F\u3001\u8BED\u8A00\u65F6\u533A\u3001\u529F\u80FD\u5F00\u5173\u7B49\u901A\u7528\u914D\u7F6E';
    displayName: '\u901A\u7528\u8BBE\u7F6E';
  };
  attributes: {
    dateFormat: Schema.Attribute.Enumeration<
      ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY\u5E74MM\u6708DD\u65E5']
    > &
      Schema.Attribute.DefaultTo<'YYYY-MM-DD'>;
    defaultLanguage: Schema.Attribute.Enumeration<
      ['zh-CN', 'en-US', 'zh-TW', 'ja-JP']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'zh-CN'>;
    enableComments: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    enableCookieConsent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableLazyLoading: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableNewsletter: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enablePwa: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    enableRobotsTxt: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableRss: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    enableSearch: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    excerptLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 500;
          min: 50;
        },
        number
      > &
      Schema.Attribute.DefaultTo<150>;
    favicon: Schema.Attribute.Media<'images'>;
    maintenancePageUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    postsPerPage: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<12>;
    siteSlogan: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'\u6C47\u805AAI\u4E13\u5BB6\u667A\u6167\uFF0C\u5F00\u542F\u53D8\u73B0\u65B0\u65F6\u4EE3'>;
    siteTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'AI\u53D8\u73B0\u4E4B\u8DEF - \u4EBA\u5DE5\u667A\u80FD\u53D8\u73B0\u5B9E\u6218\u6307\u5357'>;
    timeFormat: Schema.Attribute.Enumeration<['24h', '12h']> &
      Schema.Attribute.DefaultTo<'24h'>;
    timezone: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'Asia/Shanghai'>;
  };
}

export interface SiteSeoConfig extends Struct.ComponentSchema {
  collectionName: 'components_site_seo_configs';
  info: {
    description: '\u641C\u7D22\u5F15\u64CE\u4F18\u5316\u8BBE\u7F6E - \u7BA1\u7406\u7F51\u7AD9SEO\u57FA\u672C\u4FE1\u606F\u3001\u641C\u7D22\u5F15\u64CE\u9A8C\u8BC1\u7801\u3001Analytics\u7B49SEO\u76F8\u5173\u914D\u7F6E';
    displayName: 'SEO\u8BBE\u7F6E';
  };
  attributes: {
    analyticsId: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    baiduSiteToken: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    baiduSubmissionStatus: Schema.Attribute.Enumeration<
      [
        'status_not_submitted',
        'status_submitted',
        'status_pending',
        'status_indexed',
      ]
    > &
      Schema.Attribute.DefaultTo<'status_not_submitted'>;
    baiduVerificationCode: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    bingVerificationCode: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    defaultOgImage: Schema.Attribute.Media<'images'>;
    enableIndexingMonitoring: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enablePerformanceTracking: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    googleSubmissionStatus: Schema.Attribute.Enumeration<
      [
        'status_not_submitted',
        'status_submitted',
        'status_pending',
        'status_indexed',
      ]
    > &
      Schema.Attribute.DefaultTo<'status_not_submitted'>;
    googleVerificationCode: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    gscPropertyUrl: Schema.Attribute.String;
    lastSitemapUpdate: Schema.Attribute.DateTime;
    primaryKeywords: Schema.Attribute.Text;
    siteDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }> &
      Schema.Attribute.DefaultTo<'\u6C47\u805AAI\u9886\u57DF\u4E13\u5BB6\u5B9E\u6218\u7ECF\u9A8C\uFF0C\u6BCF\u5468\u5206\u4EAB\u6700\u65B0\u53D8\u73B0\u673A\u4F1A\u4E0E\u5B9E\u7528\u5DE5\u5177'>;
    siteName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'AI\u53D8\u73B0\u4E4B\u8DEF'>;
    siteUrl: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://aibianx.com'>;
    twitterHandle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'@aibianx'>;
    yandexVerificationCode: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface SystemOauthProviderConfig extends Struct.ComponentSchema {
  collectionName: 'components_system_oauth_provider_configs';
  info: {
    description: '\u5355\u4E2AOAuth\u63D0\u4F9B\u5546\u914D\u7F6E - \u53EF\u590D\u7528\u7684OAuth\u63D0\u4F9B\u5546\u57FA\u7840\u914D\u7F6E\u7EC4\u4EF6';
    displayName: 'OAuth\u63D0\u4F9B\u5546\u914D\u7F6E';
  };
  attributes: {
    button_icon: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    button_text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    callback_url: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    client_id: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    client_secret: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    scope: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface SystemOauthSettingsConfig extends Struct.ComponentSchema {
  collectionName: 'components_system_oauth_settings_configs';
  info: {
    description: 'OAuth\u767B\u5F55\u914D\u7F6E - \u7BA1\u7406\u7B2C\u4E09\u65B9\u767B\u5F55\u76F8\u5173\u914D\u7F6E\uFF0C\u5305\u62ECGitHub\u3001Google\u3001\u5FAE\u4FE1\u3001QQ\u7B49';
    displayName: 'OAuth\u8BBE\u7F6E';
  };
  attributes: {
    enableOauthBindingFlow: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableOauthOnLogin: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableOauthOnRegister: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    githubOauth: Schema.Attribute.Component<
      'system.oauth-provider-config',
      false
    >;
    googleOauth: Schema.Attribute.Component<
      'system.oauth-provider-config',
      false
    >;
    maxOauthAccountsPerUser: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    oauthAutoRegister: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    oauthButtonStyle: Schema.Attribute.Enumeration<
      ['horizontal', 'vertical', 'grid']
    > &
      Schema.Attribute.DefaultTo<'horizontal'>;
    oauthCallbackTimeout: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1800;
          min: 60;
        },
        number
      > &
      Schema.Attribute.DefaultTo<300>;
    oauthDividerText: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'\u6216\u4F7F\u7528\u7B2C\u4E09\u65B9\u8D26\u53F7\u767B\u5F55'>;
    oauthEmailRequired: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    oauthEnabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    oauthLinkExistingAccount: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    oauthStateExpiry: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3600;
          min: 300;
        },
        number
      > &
      Schema.Attribute.DefaultTo<600>;
    qqOauth: Schema.Attribute.Component<'system.oauth-provider-config', false>;
    showOauthDivider: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    wechatOauth: Schema.Attribute.Component<
      'system.oauth-provider-config',
      false
    >;
    weiboOauth: Schema.Attribute.Component<
      'system.oauth-provider-config',
      false
    >;
  };
}

export interface SystemPasswordPolicyConfig extends Struct.ComponentSchema {
  collectionName: 'components_system_password_policy_configs';
  info: {
    description: '\u5BC6\u7801\u7B56\u7565\u914D\u7F6E - \u7BA1\u7406\u5BC6\u7801\u5F3A\u5EA6\u8981\u6C42\u3001\u9A8C\u8BC1\u89C4\u5219\u7B49\u5BC6\u7801\u5B89\u5168\u76F8\u5173\u914D\u7F6E';
    displayName: '\u5BC6\u7801\u7B56\u7565';
  };
  attributes: {
    commonPasswordsBlacklist: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'123456,password,123456789,12345678,12345,qwerty,abc123,admin,root'>;
    enableBruteForceProtection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enablePasswordSimilarityCheck: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enablePasswordStrengthMeter: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    maxPasswordSimilarity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 90;
          min: 50;
        },
        number
      > &
      Schema.Attribute.DefaultTo<70>;
    minimumPasswordStrength: Schema.Attribute.Enumeration<
      ['weak', 'fair', 'good', 'strong']
    > &
      Schema.Attribute.DefaultTo<'fair'>;
    passwordChangeInterval: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 30;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    passwordExpiryDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 365;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    passwordExpiryWarningDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 30;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<7>;
    passwordHistoryCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 20;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    passwordMaxLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 256;
          min: 20;
        },
        number
      > &
      Schema.Attribute.DefaultTo<128>;
    passwordMinLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 20;
          min: 6;
        },
        number
      > &
      Schema.Attribute.DefaultTo<8>;
    passwordRequireLowercase: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    passwordRequireNumber: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    passwordRequireSpecialChar: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    passwordRequireUppercase: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    specialCharacters: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'!@#$%^&*()_+-=[]{}|;:,.<>?'>;
    temporaryPasswordExpiry: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 168;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<24>;
  };
}

export interface SystemSecuritySettingsConfig extends Struct.ComponentSchema {
  collectionName: 'components_system_security_settings_configs';
  info: {
    description: '\u5B89\u5168\u8BBE\u7F6E\u914D\u7F6E - \u7BA1\u7406\u4F1A\u8BDD\u3001\u767B\u5F55\u9650\u5236\u3001IP\u63A7\u5236\u7B49\u5B89\u5168\u76F8\u5173\u914D\u7F6E';
    displayName: '\u5B89\u5168\u8BBE\u7F6E';
  };
  attributes: {
    accountLockoutDuration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 86400;
          min: 300;
        },
        number
      > &
      Schema.Attribute.DefaultTo<900>;
    allowedCountries: Schema.Attribute.Text;
    auditLogRetention: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 365;
          min: 30;
        },
        number
      > &
      Schema.Attribute.DefaultTo<90>;
    blockedCountries: Schema.Attribute.Text;
    enableAuditLog: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    enableClickjackingProtection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableContentTypeNosniff: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableCsrfProtection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableGeoBlocking: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableIpBlacklist: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableIpWhitelist: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableLoginNotification: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enablePermissionsPolicy: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableRateLimiting: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableReferrerPolicy: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableRememberMe: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableSecurityHeaders: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableXssProtection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    ipBlacklist: Schema.Attribute.Text;
    ipWhitelist: Schema.Attribute.Text;
    maxConcurrentSessions: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 20;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    maxLoginAttempts: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 3;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    rateLimitMax: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10000;
          min: 100;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1000>;
    rateLimitWindow: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 86400;
          min: 60;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3600>;
    referrerPolicy: Schema.Attribute.Enumeration<
      [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ]
    > &
      Schema.Attribute.DefaultTo<'strict-origin-when-cross-origin'>;
    rememberMeDuration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 31536000;
          min: 604800;
        },
        number
      > &
      Schema.Attribute.DefaultTo<7776000>;
    sessionTimeout: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 31536000;
          min: 3600;
        },
        number
      > &
      Schema.Attribute.DefaultTo<2592000>;
    suspiciousLoginDetection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SystemSystemMaintenanceConfig extends Struct.ComponentSchema {
  collectionName: 'components_system_system_maintenance_configs';
  info: {
    description: '\u7CFB\u7EDF\u7EF4\u62A4\u914D\u7F6E - \u7BA1\u7406\u7EF4\u62A4\u6A21\u5F0F\u3001\u7CFB\u7EDF\u6D88\u606F\u3001\u901A\u77E5\u7B49\u7CFB\u7EDF\u7EA7\u7EF4\u62A4\u529F\u80FD';
    displayName: '\u7CFB\u7EDF\u7EF4\u62A4';
  };
  attributes: {
    allowAdminAccess: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    allowedIpsDuringMaintenance: Schema.Attribute.Text;
    backupRetentionDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 365;
          min: 7;
        },
        number
      > &
      Schema.Attribute.DefaultTo<30>;
    debugMode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    emergencyContactPhone: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    enableBackupNotifications: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableDeveloperMode: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableErrorReporting: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableHealthCheck: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableMaintenanceEmail: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enablePerformanceMonitoring: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableScheduledMaintenance: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableSystemNotifications: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableUpdateNotifications: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    errorReportingLevel: Schema.Attribute.Enumeration<
      ['error', 'warning', 'info', 'debug']
    > &
      Schema.Attribute.DefaultTo<'error'>;
    estimatedDowntime: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'30\u5206\u949F'>;
    healthCheckInterval: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3600;
          min: 60;
        },
        number
      > &
      Schema.Attribute.DefaultTo<300>;
    logLevel: Schema.Attribute.Enumeration<
      ['silent', 'error', 'warn', 'info', 'debug']
    > &
      Schema.Attribute.DefaultTo<'info'>;
    maintenanceEmailTemplate: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'maintenance'>;
    maintenanceEndTime: Schema.Attribute.DateTime;
    maintenanceMessage: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }> &
      Schema.Attribute.DefaultTo<'\u7F51\u7AD9\u6B63\u5728\u8FDB\u884C\u7CFB\u7EDF\u5347\u7EA7\u7EF4\u62A4\uFF0C\u9884\u8BA130\u5206\u949F\u540E\u6062\u590D\u6B63\u5E38\u8BBF\u95EE\u3002'>;
    maintenanceMode: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    maintenanceNotificationAdvance: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 168;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<24>;
    maintenanceStartTime: Schema.Attribute.DateTime;
    maintenanceTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'\u7CFB\u7EDF\u7EF4\u62A4\u4E2D'>;
    notificationChannels: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'email,dashboard,webhook'>;
    performanceThresholds: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'response_time:1000,memory_usage:80,cpu_usage:70'>;
    systemContactEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'admin@aibianx.com'>;
  };
}

export interface SystemUserManagementConfig extends Struct.ComponentSchema {
  collectionName: 'components_system_user_management_configs';
  info: {
    description: '\u7528\u6237\u7BA1\u7406\u914D\u7F6E - \u7BA1\u7406\u7528\u6237\u6CE8\u518C\u3001\u8BA4\u8BC1\u3001\u6743\u9650\u7B49\u7528\u6237\u76F8\u5173\u529F\u80FD\u914D\u7F6E';
    displayName: '\u7528\u6237\u7BA1\u7406';
  };
  attributes: {
    allowedAvatarTypes: Schema.Attribute.Enumeration<
      ['jpg,png', 'jpg,png,gif', 'jpg,png,gif,webp']
    > &
      Schema.Attribute.DefaultTo<'jpg,png,gif'>;
    defaultUserRole: Schema.Attribute.Enumeration<
      ['authenticated', 'subscriber', 'contributor', 'author']
    > &
      Schema.Attribute.DefaultTo<'authenticated'>;
    emailVerificationEnabled: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableAccountDeletion: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableLoginNotification: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableUserApproval: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableUserListPublic: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableUserProfileEdit: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableUserStatistics: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    enableUserSuspension: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    maxAvatarSize: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10485760;
          min: 102400;
        },
        number
      > &
      Schema.Attribute.DefaultTo<2097152>;
    maxUsernameLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 10;
        },
        number
      > &
      Schema.Attribute.DefaultTo<20>;
    minUsernameLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 2;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    passwordResetEnabled: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    registrationEnabled: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    suspensionReasons: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'\u8FDD\u89C4\u53D1\u8A00,\u6076\u610F\u64CD\u4F5C,\u5783\u573E\u4FE1\u606F,\u5176\u4ED6'>;
    usernamePattern: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'^[a-zA-Z0-9_\\u4e00-\\u9fa5]+$'>;
  };
}

export interface SystemVerificationSettingsConfig
  extends Struct.ComponentSchema {
  collectionName: 'components_system_verification_settings_configs';
  info: {
    description: '\u9A8C\u8BC1\u8BBE\u7F6E\u914D\u7F6E - \u7BA1\u7406\u90AE\u7BB1\u9A8C\u8BC1\u3001\u9A8C\u8BC1\u7801\u3001\u91CD\u7F6E\u4EE4\u724C\u7B49\u9A8C\u8BC1\u76F8\u5173\u914D\u7F6E';
    displayName: '\u9A8C\u8BC1\u8BBE\u7F6E';
  };
  attributes: {
    allowedEmailDomains: Schema.Attribute.Text;
    backupCodesCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 20;
          min: 5;
        },
        number
      > &
      Schema.Attribute.DefaultTo<10>;
    blockedEmailDomains: Schema.Attribute.Text;
    captchaProvider: Schema.Attribute.Enumeration<
      ['recaptcha', 'hcaptcha', 'turnstile', 'simple']
    > &
      Schema.Attribute.DefaultTo<'recaptcha'>;
    captchaThreshold: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    emailTemplatePasswordReset: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'default'>;
    emailTemplateVerification: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'default'>;
    emailVerificationTokenExpiry: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 604800;
          min: 3600;
        },
        number
      > &
      Schema.Attribute.DefaultTo<86400>;
    enableCaptcha: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    enableSmsVerification: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    enableTwoFactorAuth: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    maxDailyVerifications: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 5;
        },
        number
      > &
      Schema.Attribute.DefaultTo<10>;
    maxVerificationAttempts: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 3;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    passwordResetTokenExpiry: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 86400;
          min: 300;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3600>;
    smsCodeExpiry: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1800;
          min: 60;
        },
        number
      > &
      Schema.Attribute.DefaultTo<300>;
    smsCodeLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 8;
          min: 4;
        },
        number
      > &
      Schema.Attribute.DefaultTo<6>;
    totpIssuer: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Schema.Attribute.DefaultTo<'AI\u53D8\u73B0\u4E4B\u8DEF'>;
    twoFactorMethods: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'email,sms,totp'>;
    verificationCodeExpiry: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3600;
          min: 60;
        },
        number
      > &
      Schema.Attribute.DefaultTo<600>;
    verificationCodeLength: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 8;
          min: 4;
        },
        number
      > &
      Schema.Attribute.DefaultTo<6>;
    verificationCodeType: Schema.Attribute.Enumeration<
      ['numeric', 'alphabetic', 'alphanumeric']
    > &
      Schema.Attribute.DefaultTo<'numeric'>;
    verificationCooldown: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 300;
          min: 30;
        },
        number
      > &
      Schema.Attribute.DefaultTo<60>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'payment.alipay-config': PaymentAlipayConfig;
      'payment.general-config': PaymentGeneralConfig;
      'payment.stripe-config': PaymentStripeConfig;
      'payment.wechat-config': PaymentWechatConfig;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'site.appearance-config': SiteAppearanceConfig;
      'site.contact-config': SiteContactConfig;
      'site.general-config': SiteGeneralConfig;
      'site.seo-config': SiteSeoConfig;
      'system.oauth-provider-config': SystemOauthProviderConfig;
      'system.oauth-settings-config': SystemOauthSettingsConfig;
      'system.password-policy-config': SystemPasswordPolicyConfig;
      'system.security-settings-config': SystemSecuritySettingsConfig;
      'system.system-maintenance-config': SystemSystemMaintenanceConfig;
      'system.user-management-config': SystemUserManagementConfig;
      'system.verification-settings-config': SystemVerificationSettingsConfig;
    }
  }
}
