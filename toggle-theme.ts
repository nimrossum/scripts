#!/usr/bin/env bun
// Name: Toggle Theme
// Description: Toggle between light / dark theme in Windows 11

import { $ } from "bun"

const themeInformation = "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize"

// Get the current theme

const currentTheme = await $`reg query "${themeInformation}" /v "AppsUseLightTheme"`.text()

console.log(currentTheme)

// Extract the theme value

const themeValue = currentTheme.match(/0x(\d)/)

// Toggle the theme

if (themeValue?.[1] === "0") {
  await $`reg add "${themeInformation}" /v "AppsUseLightTheme" /t REG_DWORD /d 1 /f`
  await $`reg add "${themeInformation}" /v "SystemUsesLightTheme" /t REG_DWORD /d 1 /f`
}
else {
  await $`reg add "${themeInformation}" /v "AppsUseLightTheme" /t REG_DWORD /d 0 /f`
  await $`reg add "${themeInformation}" /v "SystemUsesLightTheme" /t REG_DWORD /d 0 /f`
}

