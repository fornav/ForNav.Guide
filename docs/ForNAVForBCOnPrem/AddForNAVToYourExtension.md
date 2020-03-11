# Add ForNAV Reports to your own extension

> This is how to get up and running

Add the steps to add ForNAV Docker [ForNAV Docker](https://www.fornav.com/knowledge-base/fornav-and-docker-containers/)

To edit the ForNAV reports you need to add the dll. Add these lines to the VS Code User Settings
[VS Code Settings](https://docs.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-get-started-call-dotnet-from-al)

    "al.assemblyProbingPaths": [
        "./.netpackages",
        "C:\\Program Files\\Microsoft Dynamics 365 Business Central\\140\\Service\\Add-ins",
        "C:\\Program Files\\Reports ForNAV\\Add-ins"
    ]

## Head 2
Change the target for the extension

    "target": "OnPrem"

Add the ForNAV dependencies

    {
      "appId": "6f0293d3-86fc-4ff8-9632-54a580be6546",
      "name": "ForNAV Core",
      "publisher": "ForNAV",
      "version": "4.0.0.0"
    },
    {
      "appId": "83326d6d-11f8-49fd-981a-6f266a7c8d81",
      "name": "Customizable Report Pack",
      "publisher": "ForNAV",
      "version": "4.0.0.0"
    }

## Head 3

scvfd