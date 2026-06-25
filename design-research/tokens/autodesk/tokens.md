---
name: "Autodesk"
description: "Design tokens extracted from https://www.autodesk.com/"
colors:
  primary: "#000000"
  secondary: "#FFFF00"
  surface: "#FFFFFF"
  on-surface: "#0000EE"
typography:
  text-1:
    fontFamily: "ArtifaktLegend"
    fontSize: "68px"
    fontWeight: 700
    lineHeight: 1.2
  text-2:
    fontFamily: "ArtifaktLegend"
    fontSize: "68px"
    fontWeight: 700
    lineHeight: 1.2
  text-3:
    fontFamily: "ArtifaktLegend"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.2
  text-4:
    fontFamily: "ArtifaktLegend"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: 1.2
  text-5:
    fontFamily: "ArtifaktElement"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.2
  text-6:
    fontFamily: "ArtifaktElement"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.2
  text-7:
    fontFamily: "ArtifaktElement"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
  text-8:
    fontFamily: "ArtifaktElement"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.2
  text-9:
    fontFamily: "ArtifaktElement"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.2
  text-10:
    fontFamily: "ArtifaktElement"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.2
  text-11:
    fontFamily: "MS Shell Dlg \\32"
    fontSize: "24px"
    fontWeight: 400
  text-12:
    fontFamily: "MS Shell Dlg \\32"
    fontSize: "24px"
    fontWeight: 400
  text-13:
    fontFamily: "ArtifaktElement"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.5
  text-14:
    fontFamily: "ArtifaktElement"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.5
  text-15:
    fontFamily: "ArtifaktElement"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.5
  text-16:
    fontFamily: "ArtifaktElement"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
  text-17:
    fontFamily: "ArtifaktElement"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
  text-18:
    fontFamily: "MS Shell Dlg \\32"
    fontSize: "18px"
    fontWeight: 400
  text-19:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  text-20:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  text-21:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.44
  text-22:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 600
  text-23:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 600
  text-24:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.5
  text-25:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  text-26:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.5
  text-27:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.5
  text-28:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  text-29:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  text-30:
    fontFamily: "ArtifaktElement"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.5
  text-31:
    fontFamily: "ArtifaktElement"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  text-32:
    fontFamily: "ArtifaktElement"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.5
  text-33:
    fontFamily: "ArtifaktElement"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.25
  text-34:
    fontFamily: "ArtifaktElement"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.25
  text-35:
    fontFamily: "MS Shell Dlg \\32"
    fontSize: "13.3333px"
    fontWeight: 400
  text-36:
    fontFamily: "MS Shell Dlg \\32"
    fontSize: "13.3333px"
    fontWeight: 400
  text-37:
    fontFamily: "ArtifaktElement"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.17
  text-38:
    fontFamily: "ArtifaktElement"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  text-39:
    fontFamily: "ArtifaktElement"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
spacing:
  base: "8px"
  xs: "1px"
  sm: "2px"
  md: "3.5px"
  lg: "4px"
  xl: "6px"
  xxl: "8px"
  xxxl: "10px"
  xxxxl: "12px"
rounded:
  sm: "3.04px"
  md: "4px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
components:
  button-observed:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "0px"
  input-observed:
    textColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "8px 12px 8px 0px"
---

# Design System

## Overview
Design tokens extracted from autodesk.com. The YAML front matter contains machine-readable values observed by Dembrandt when available; the sections below summarize the extracted evidence without redesigning or correcting the source site.

## Colors
- **Primary** (#000000): Observed color token extracted from the site's palette, semantic CSS, or component styles.
- **Secondary** (#FFFF00): Observed color token extracted from the site's palette, semantic CSS, or component styles.
- **Surface** (#FFFFFF): Observed color token extracted from the site's palette, semantic CSS, or component styles.
- **On Surface** (#0000EE): Observed color token extracted from the site's palette, semantic CSS, or component styles.

## Typography
- **Text 1**: ArtifaktLegend, 68px, bold
- **Text 2**: ArtifaktLegend, 68px, bold
- **Text 3**: ArtifaktLegend, 48px, bold
- **Text 4**: ArtifaktLegend, 48px, bold
- **Text 5**: ArtifaktElement, 40px, bold
- **Text 6**: ArtifaktElement, 40px, bold

## Layout
Observed spacing scale: 8px spacing scale.
- **Spacing tokens**: base 8px, xs 1px, sm 2px, md 3.5px, lg 4px, xl 6px, xxl 8px, xxxl 10px, xxxxl 12px
- **Responsive breakpoints**: 0px, 2px, 5px, 95px, 98px, 440px

## Elevation & Depth
Observed box-shadow styles: rgba(0, 0, 0, 0.25) 0px 0px 4px 4px; rgb(0, 0, 0) 0px 1px 0px 0px, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px inset; rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px

## Shapes
Observed rounded-corner tokens: sm 3.04px, md 4px, lg 8px, xl 12px, full 9999px.

## Components
- **Buttons**: Observed sample with radius 8px, background #FFFFFF, text #000000, padding 0px, border 2px solid rgb(213, 213, 203)
- **Inputs**: Observed sample with 0px rgb(255, border, 8px radius
