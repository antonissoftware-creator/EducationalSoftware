---
name: Mediterranean Heritage System
colors:
  surface: '#fdf9f1'
  surface-dim: '#dddad2'
  surface-bright: '#fdf9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3eb'
  surface-container: '#f1ede5'
  surface-container-high: '#ece8e0'
  surface-container-highest: '#e6e2da'
  on-surface: '#1c1c17'
  on-surface-variant: '#414750'
  inverse-surface: '#31302b'
  inverse-on-surface: '#f4f0e8'
  outline: '#717881'
  outline-variant: '#c1c7d1'
  surface-tint: '#15629a'
  primary: '#00426d'
  on-primary: '#ffffff'
  primary-container: '#005a92'
  on-primary-container: '#a6d0ff'
  inverse-primary: '#9acbff'
  secondary: '#465f88'
  on-secondary: '#ffffff'
  secondary-container: '#b6d0ff'
  on-secondary-container: '#3f5881'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d4af37'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cfe4ff'
  primary-fixed-dim: '#9acbff'
  on-primary-fixed: '#001d34'
  on-primary-fixed-variant: '#004a79'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#aec7f6'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#2d476f'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fdf9f1'
  on-background: '#1c1c17'
  surface-variant: '#e6e2da'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built upon the intersection of architectural minimalism and academic prestige. It seeks to replicate the sensory experience of Santorini—expansive white-washed surfaces, deep oceanic depths, and the golden warmth of the sun—while maintaining the structural integrity of a world-class educational resource.

The style is a blend of **Minimalism** and **Modern Corporate**, utilizing generous whitespace to allow artifacts and historical narratives to breathe. Every interface element is designed to feel like a curated gallery wall: quiet, deliberate, and premium. The emotional response is one of intellectual calm and immersive discovery, moving away from the frantic energy of typical travel apps toward a dignified, "slow-tech" museum experience.

## Colors

The palette is derived from the natural landscape of the Cyclades.
- **Aegean Blue (Primary):** Used for primary actions, active states, and navigational highlights.
- **Deep Navy (Secondary):** Reserved for high-level headers, serious academic content, and deep-footer backgrounds to anchor the UI.
- **Sunset Gold (Tertiary):** An accent color used sparingly for "special" features, such as premium exhibits, saved items, or decorative borders.
- **Warm Sand (Neutral):** Provides a soft alternative to pure white for secondary containers, mimicking the texture of stone and sun-bleached surfaces.
- **Volcanic Charcoal:** Used for metadata, captions, and secondary text to provide contrast without the harshness of pure black.

Avoid high-vibrancy gradients; instead, use solid blocks of color or very subtle, large-scale tonal shifts to maintain a sophisticated atmosphere.

## Typography

Typography functions as the voice of the institution. 
- **Headings:** The use of *Playfair Display* provides a literary, editorial feel. Larger display styles should use tighter letter spacing for a more high-fashion, premium look.
- **Body:** *Plus Jakarta Sans* offers a clean, contemporary counterpoint. It is selected for its high legibility in long-form educational content and its slightly rounded, welcoming terminals.
- **Labels:** Meta-information (dates, categories, locations) should always use the `label` styles in uppercase with slight tracking (letter spacing) to differentiate academic data from narrative text.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop to preserve the "curated page" aesthetic, transitioning to a fluid model for mobile devices.

- **Desktop (12 columns):** Max container width of 1280px. Use generous 64px outer margins to create a sense of exclusivity and focus.
- **Tablet (8 columns):** 32px margins. Reflow two-column card grids into single columns where imagery requires detail.
- **Mobile (4 columns):** 16px margins. Vertical stacks are preferred to maintain large, high-quality image ratios.

Spacing should favor the `lg` (48px) and `xl` (80px) units between major sections to prevent the UI from feeling "crowded," which would contradict the luxury positioning.

## Elevation & Depth

This design system uses a **Tonal Layering** approach combined with **Ambient Shadows** to create a sense of physical presence without looking "tech-heavy."

1.  **Level 0 (Base):** Pure White (#FFFFFF) or Warm Sand (#F5F1E9).
2.  **Level 1 (Cards/Surface):** White surface with a very soft, diffused shadow (0px 4px 20px, 4% opacity of Deep Navy). 
3.  **Level 2 (Interactive/Hover):** The shadow deepens slightly (0px 8px 30px, 8% opacity) and the element may lift 2px.
4.  **Glassmorphism:** Use sparingly for navigation bars or image overlays. A 12px backdrop blur with a 60% transparent White fill creates a "frosted sea glass" effect that feels premium and light.

Borders should be used instead of shadows for secondary elements. Use a 1px solid line in `Light Grey` or `Warm Sand` (darkened by 5%) for a refined, "drawn" look.

## Shapes

The shape language is **Soft**. While the overall layout is structured and grid-based, individual elements use a subtle `0.25rem` (4px) corner radius to reference the hand-finished edges of traditional Cycladic architecture.

- **Standard Elements:** (Buttons, Inputs) use `rounded-sm`.
- **Containers:** (Cards, Modals) use `rounded-lg` (8px).
- **Interactive Accents:** Small chips or tags may use `rounded-xl` (12px) but should never be fully pill-shaped, as that feels too casual for a museum context.
- **Icons:** Use thin-stroke, linear icons with slightly rounded caps to match the typography's friendly but professional tone.

## Components

### Buttons
Primary buttons use the Aegean Blue background with White text. Secondary buttons use a Deep Navy outline with a 1px stroke. All buttons should have a minimum height of 48px to feel substantial. Text should be set in `label-lg`.

### Cards
Cards are the primary vehicle for museum artifacts. They feature a top-heavy image ratio (4:3 or 3:2), generous padding (24px) below the image, and a "Sunset Gold" 2px top-border highlight for featured content.

### Input Fields
Inputs use the "Warm Sand" background with a 1px "Light Grey" bottom border only, creating a clean, minimal look reminiscent of a guest book or archival log.

### Mediterranean Patterns
Incorporate subtle SVG patterns of geometric Greek keys or stylized waves. These should be used at 2-5% opacity as background textures in large empty sections or footer areas to reinforce the regional identity without distracting from the content.

### Educational Chips
Used for categorizing eras (e.g., "Bronze Age," "Hellenistic"). These use a "Volcanic Charcoal" 1px border with a very light tint of the Primary color as a background fill.