# Getting started

<!-- 
Explain the function of this document. Offer the mermaid chart as a means to get started

Also start next buttons on every page to help guide the reader.

 -->

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
  onprem01(On Premise)
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