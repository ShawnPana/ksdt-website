import {buildLegacyTheme} from 'sanity'

export const customTheme = buildLegacyTheme({
  // KSDT Brand Colors
  '--black': '#1a1a1a',
  '--white': '#ffffff',
  
  '--gray': '#666',
  '--gray-base': '#666',
  
  '--component-bg': '#ffffff',
  '--component-text-color': '#1a1a1a',
  
  // KSDT Brand Red as primary color
  '--brand-primary': '#bc2026',
  '--default-button-color': '#666',
  '--default-button-primary-color': '#bc2026',
  '--default-button-success-color': '#bc2026',
  
  '--state-info-color': '#bc2026',
  '--state-success-color': '#bc2026',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#dc2626',
  
  '--main-navigation-color': '#1a1a1a',
  '--main-navigation-color--inverted': '#ffffff',
  
  '--focus-color': '#bc2026',

  // KSDT Brand Font
  '--font-family-base': '"Alte Haas Grotesk", system-ui, sans-serif',
})