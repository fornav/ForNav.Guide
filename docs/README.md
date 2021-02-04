# ForNAV Guide

Welcome to the ForNAV getting started guide. Please follow the flow chart to get started. Alternatively you can select your Microsoft Dynamics 365 Business Central version to get started.

```mermaid
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
        graph TD
          A[Getting started with ForNAV] ==> B{Choose version}
          B ==> |Cloud| C[Install from App Source]
          B ==> |On Premise| K[Add ForNAV Granule<br>to BC License]
          C ==> D[Install ForNAV Designer<br>and Converter]
          D ==> E[Set up the<br>ForNAV Designer]
          E ==> F[Edit your first report]
          F ==> G[Buy License]
          K ==> L[Install ForNAV Designer<br>and Converter]
          L ==> M{Installation Type}
          M ==> |C-Side| N[NAV2013 - BC14]
          M ==> |Extensions| U[BC14 and over]
          N ==> O[Setup Fields webservice]
          O ==> P[Connect the ForNAV Designer]
          P ==> |NAV 2015 and higner only|Q[Install Report Pack Fob]
          Q ==> R[Install Report Pack objects]
          U --> V[/BC14 Only<br>enable extensions/]
          V ==> W[Connect the ForNAV Designer]
          W ==> X[Install the<br>ForNAV Report Pack]
          X ==> Z[Edit your first report]
          subgraph OnPrem
            K
            L
            M
            N
            O
            P
            Q
            R
            U
            V
            W
            X
            Z
          end
          subgraph Cloud
            C
            D
            E
            F
            G
          end
    click B "http://www.github.com" _blank
    click C "https://appsource.microsoft.com/en/product/dynamics-365-business-central/PUBID.fornav%7CAID.customizable_report_pack%7CPAPPID.83326d6d-11f8-49fd-981a-6f266a7c8d81" _blank
    click D "/ForNav.Guide/#/ForNAVForBCSaaS/?id=download" _blank
    click E "/ForNav.Guide/#/ForNAVForBCSaaS/?id=setup" _blank
    click F "/ForNav.Guide/#/ForNAVForBCSaaS/EditYourFirstReport?id=editing-your-first-fornav-report" _blank
    click K "https://www.fornav.com/knowledge-base/fornav-granule-required/" _blank
    click N "https://www.fornav.com/knowledge-base/troubleshooting-the-nav-web-service/" _blank
    click O "https://www.youtube.com/watch?v=hIfv0Zfh2LQ" _blank
    click P "https://www.fornav.com/knowledge-base/installing-objects-fornav-isv-granule-area/" _blank
    click L "/ForNav.Guide/#/ForNAVForBCOnPrem/?id=download" _blank
    click W "/ForNav.Guide/#/ForNAVForBCOnPrem/?id=setup" _blank
    click X "/ForNav.Guide/#/ForNAVForBCOnPrem/?id=install-the-fornav-report-pack" _blank
    click Z "/ForNav.Guide/#/ForNAVForBCOnPrem/EditYourFirstReport" _blank
```


<!-- Opens in new tab -->