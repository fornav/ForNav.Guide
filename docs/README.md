# ForNAV Guide

Welcome to the ForNAV getting started guide. Please follow the flow chart to get started. Alternatively you can select your Microsoft Dynamics 365 Business Central version to get started.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {
    'primaryColor': '#e64215',
    'primaryBorderColor': '#707173',
    'primaryTextColor': 'white',
    'secondaryColor':'#707173',
    'lineColor': '#707173',
    'edgeLabelBackground': '#707173',
    'tertiaryColor': 'white',
    'textColor': '#707173',
    'tertiaryBorderColor': '#e64215'
}}}%%

graph TD
  start01[Getting started with ForNAV] ==> start02{Choose version}
  start02 ==> cloud01(Cloud)
  start02 ==> onprem01(On Premise)
  subgraph OnPrem
    onprem01 ==> onprem02[Add ForNAV Granule<br>to BC License]
    onprem02 ==> onprem03[Install ForNAV Designer<br>and Converter]
    onprem03 ==> onprem04{Installation Type}
    onprem04 ==> cs01(NAV2013 - BC14<br>C-Side)
    onprem04 ==> ex01(BC14 and over<br>Extensions)
    cs01 ==> cs02[Setup Fields webservice]
    cs02 ==> cs03[Connect the ForNAV Designer]
    cs03 ==> |NAV 2015 and higner only|cs04[Install Report Pack Fob]
    cs04 ==> cs05[Install Report Pack objects]
    ex01 --> ex02[/BC14 Only<br>enable extensions/]
    ex02 ==> ex03[Connect the ForNAV Designer]
    ex03 ==> ex04[Install the<br>ForNAV Report Pack]
    ex04 ==> ex05[Edit your first report]
  end
  subgraph Cloud
    cloud01 ==> cloud02[Install from App Source]
    cloud02 ==> cloud03[Install ForNAV Designer<br>and Converter]
    cloud03 ==> cloud04[Set up the<br>ForNAV Designer]
    cloud04 ==> cloud05[Edit your first report]
    cloud05 ==> cloud06[Buy License]
  end

  click cloud02 "https://appsource.microsoft.com/en/product/dynamics-365-business-central/PUBID.fornav%7CAID.customizable_report_pack%7CPAPPID.83326d6d-11f8-49fd-981a-6f266a7c8d81" _blank
  click D "/ForNav.Guide/#/ForNAVForBCSaaS/?id=download" _blank
  click E "/ForNav.Guide/#/ForNAVForBCSaaS/?id=setup" _blank
  click F "/ForNav.Guide/#/ForNAVForBCSaaS/EditYourFirstReport?id=editing-your-first-fornav-report" _blank
  click K "https://www.fornav.com/knowledge-base/fornav-granule-required/" _blank
  click O "https://www.fornav.com/knowledge-base/troubleshooting-the-nav-web-service/" _blank
  click N "https://www.youtube.com/watch?v=hIfv0Zfh2LQ" _blank
  click Q "https://www.fornav.com/knowledge-base/installing-objects-fornav-isv-granule-area/" _blank
  click L "/ForNav.Guide/#/ForNAVForBCOnPrem/?id=download" _blank
  click W "/ForNav.Guide/#/ForNAVForBCOnPrem/?id=setup" _blank
  click X "/ForNav.Guide/#/ForNAVForBCOnPrem/?id=install-the-fornav-report-pack" _blank
  click Z "/ForNav.Guide/#/ForNAVForBCOnPrem/EditYourFirstReport" _blank

  classDef hyperlink color:#5290AE;
  class cloud02 hyperlink;
```

classDef default fill:#e64215,Color:white,stroke:#333,stroke-width:1px;

%%{init: {'theme': 'base', 'themeVariables': { 
  'darkMode' : 'true',
  'primaryColor': '#e64215',
  'primaryBorderColor': '#707173',
  'primaryTextColor': 'white',
  'secondaryColor':'#707173',
  'lineColor': '#707173',
  'edgeLabelBackground': '#707173',
  'tertiaryColor': 'white',
  'textColor': '#707173',
  'tertiaryBorderColor': '#e64215'
}}}%%
