import { rgba, lighten } from 'polished';

export const palette = {
  primary: {
    SOLID: 'hsl(15, 85%, 60%)',
    TEXT: 'hsl(15, 85%, 65%)',
    STRONG: 'hsl(15, 85%, 65%)',
    SUBTLE: 'hsl(15, 85%, 55%)'
  },
  hues: {
    RED: 'hsl(0, 75%, 55%)',
    ROSE: 'hsl(345, 80%, 68%)',
    BROWN: 'hsl(25, 60%, 65%)',
    ORANGE: 'hsl(20, 90%, 65%)',
    YELLOW: 'hsl(38, 95%, 68%)',
    GREEN: 'hsl(155, 60%, 55%)',
    GREEN_DARK: 'hsl(155, 70%, 40%)',
    TEAL: 'hsl(175, 55%, 50%)',
    CYAN: 'hsl(195, 70%, 65%)',
    BLUE: 'hsl(220, 70%, 70%)',
    INDIGO: 'hsl(250, 60%, 72%)',
    VIOLET: 'hsl(270, 65%, 72%)',
    PURPLE: 'hsl(290, 60%, 70%)',
    PINK: 'hsl(320, 65%, 70%)'
  },
  system: {
    CONTROL_ACCENT: '#e96e4f'
  },
  background: {
    BASE: '#1a0f1f',
    MANTLE: '#221525',
    CRUST: '#180d1a',
    SURFACE0: '#2a1a30',
    SURFACE1: '#3a2840',
    SURFACE2: '#5a4060'
  },
  text: {
    BASE: '#f5e6d3',
    SUBTEXT2: '#d4c0aa',
    SUBTEXT1: '#b8a08a',
    SUBTEXT0: '#8a7060'
  },
  overlay: {
    OVERLAY2: '#5a4060',
    OVERLAY1: '#4a3550',
    OVERLAY0: '#3a2840'
  },
  border: {
    BORDER2: '#3d2a45',
    BORDER1: '#2e1e35',
    BORDER0: '#241828'
  },
  utility: {
    WHITE: '#ffffff',
    BLACK: '#000000'
  }
};

palette.intent = {
  INFO: palette.hues.BLUE,
  SUCCESS: palette.hues.GREEN,
  WARNING: palette.hues.ORANGE,
  DANGER: palette.hues.RED
};

palette.syntax = {
  // Core language structure
  KEYWORD: palette.hues.ROSE,
  TAG: palette.hues.ROSE,
  // Identifiers & properties (collapsed)
  VARIABLE: palette.hues.PINK,
  PROPERTY: palette.hues.BLUE,
  DEFINITION: palette.hues.BLUE,

  // Literals
  STRING: palette.hues.BROWN,
  NUMBER: palette.hues.PINK,
  ATOM: palette.hues.ROSE,

  // Operators & punctuation (quiet)
  OPERATOR: palette.text.SUBTEXT1,
  TAG_BRACKET: palette.text.SUBTEXT1,

  // Comments should recede
  COMMENT: palette.text.SUBTEXT0
};

const colors = {
  GRAY_2: '#3a2840',
  GRAY_3: '#3d2a45',
  GRAY_4: '#5a4060',
  GRAY_5: '#d4c0aa'
};

const darkTheme = {
  mode: 'dark',
  brand: palette.primary.SOLID,
  text: palette.text.BASE,
  textLink: palette.hues.BLUE,
  draftColor: '#d4763a',
  bg: palette.background.BASE,

  primary: {
    solid: palette.primary.SOLID,
    text: palette.primary.TEXT,
    strong: palette.primary.STRONG,
    subtle: palette.primary.SUBTLE
  },

  accents: {
    primary: palette.primary.SOLID
  },

  background: {
    base: palette.background.BASE,
    mantle: palette.background.MANTLE,
    crust: '#2e1e35',
    surface0: palette.background.SURFACE0,
    surface1: colors.GRAY_3,
    surface2: colors.GRAY_4
  },

  status: {
    info: {
      background: rgba(palette.intent.INFO, 0.15),
      text: palette.intent.INFO,
      border: palette.intent.INFO
    },
    success: {
      background: rgba(palette.intent.SUCCESS, 0.15),
      text: palette.intent.SUCCESS,
      border: palette.intent.SUCCESS
    },
    warning: {
      background: rgba(palette.intent.WARNING, 0.15),
      text: palette.intent.WARNING,
      border: palette.intent.WARNING
    },
    danger: {
      background: rgba(palette.intent.DANGER, 0.15),
      text: palette.intent.DANGER,
      border: palette.intent.DANGER
    }
  },

  overlay: {
    overlay2: '#5a4060',
    overlay1: '#4a3550',
    overlay0: '#3a2840'
  },

  font: {
    size: {
      xs: '0.6875rem', // 11px
      sm: '0.75rem', // 12px
      base: '0.8125rem', // 13px
      md: '0.875rem', // 14px
      lg: '1rem', // 16px
      xl: '1.125rem' // 18px
    }
  },

  shadow: {
    sm: '0 1px 3px rgba(10, 5, 15, 0.6), 0 0 0 1px rgba(10, 5, 15, 0.4)',
    md: '0 2px 8px rgba(10, 5, 15, 0.7), 0 0 0 1px rgba(10, 5, 15, 0.5)',
    lg: '0 2px 12px rgba(10, 5, 15, 0.8), 0 0 0 1px rgba(10, 5, 15, 0.5)'
  },

  border: {
    radius: {
      sm: '4px',
      base: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px'
    },
    border2: palette.border.BORDER2,
    border1: palette.border.BORDER1,
    border0: palette.border.BORDER0
  },

  colors: {
    text: {
      white: palette.text.BASE,
      green: palette.intent.SUCCESS,
      danger: palette.intent.DANGER,
      warning: palette.intent.WARNING,
      muted: palette.text.SUBTEXT1,
      purple: palette.hues.PURPLE,
      yellow: palette.hues.YELLOW,
      subtext2: palette.text.SUBTEXT2,
      subtext1: palette.text.SUBTEXT1,
      subtext0: palette.text.SUBTEXT0
    },
    bg: {
      danger: palette.hues.RED
    },
    accent: palette.system.CONTROL_ACCENT
  },

  input: {
    bg: 'transparent',
    border: palette.border.BORDER2,
    focusBorder: rgba(palette.primary.SOLID, 0.8),
    placeholder: {
      color: palette.text.SUBTEXT1,
      opacity: 0.6
    }
  },

  sidebar: {
    color: palette.text.BASE,
    muted: palette.text.SUBTEXT1,
    bg: palette.background.BASE,
    dragbar: {
      border: palette.border.BORDER1,
      activeBorder: palette.border.BORDER2
    },

    collection: {
      item: {
        bg: palette.background.SURFACE0,
        hoverBg: palette.background.MANTLE,
        focusBorder: palette.border.BORDER2,
        indentBorder: palette.background.SURFACE0,
        active: {
          indentBorder: palette.background.SURFACE0
        },
        example: {
          iconColor: palette.text.BASE
        }
      }
    },

    dropdownIcon: {
      color: palette.text.BASE
    }
  },

  dropdown: {
    color: palette.text.BASE,
    iconColor: palette.text.SUBTEXT2,
    bg: palette.background.MANTLE,
    hoverBg: palette.background.SURFACE0,
    shadow: 'none',
    border: palette.border.BORDER1,
    separator: palette.border.BORDER1,
    selectedColor: palette.primary.TEXT,
    mutedText: palette.text.SUBTEXT1
  },

  workspace: {
    accent: '#e96e4f',
    border: '#3d2a45',
    button: {
      bg: colors.GRAY_2
    }
  },

  request: {
    methods: {
      get: palette.hues.GREEN,
      post: palette.hues.INDIGO,
      put: palette.hues.ORANGE,
      delete: lighten(0.08, palette.hues.RED),
      patch: palette.hues.ORANGE,
      options: palette.hues.TEAL,
      head: palette.hues.CYAN
    },

    grpc: palette.hues.TEAL,
    ws: palette.hues.ORANGE,
    gql: palette.hues.PINK
  },

  requestTabPanel: {
    url: {
      bg: palette.background.BASE,
      icon: '#d4c0aa',
      iconDanger: '#e9534a',
      border: `solid 1px ${palette.border.BORDER1}`
    },
    dragbar: {
      border: palette.border.BORDER1,
      activeBorder: palette.border.BORDER2
    },
    responseStatus: '#d4c0aa',
    responseOk: palette.hues.GREEN,
    responseError: palette.hues.RED,
    responsePending: palette.hues.BLUE,
    responseOverlayBg: rgba(palette.background.BASE, 0.8),

    card: {
      bg: '#221525',
      border: 'transparent',
      hr: '#3d2a45'
    },

    graphqlDocsExplorer: {
      bg: '#1a0f1f',
      color: '#f5e6d3'
    }
  },

  notifications: {
    bg: colors.GRAY_3,
    list: {
      bg: '#3a2840',
      borderRight: '#4a3550',
      borderBottom: '#4a3550',
      hoverBg: '#3d2a45',
      active: {
        border: '#e96e4f',
        bg: '#4a3550',
        hoverBg: '#4a3550'
      }
    }
  },

  modal: {
    title: {
      color: palette.text.BASE,
      bg: palette.background.BASE
    },
    body: {
      color: palette.text.BASE,
      bg: palette.background.MANTLE
    },
    input: {
      bg: 'transparent',
      border: palette.border.BORDER2,
      focusBorder: rgba(palette.primary.SOLID, 0.8)
    },
    backdrop: {
      opacity: 0.2
    }
  },

  button: {
    secondary: {
      color: '#f5e6d3',
      bg: '#5c2a3a',
      border: '#5c2a3a',
      hoverBorder: '#7a4055'
    },
    close: {
      color: '#d4c0aa',
      bg: 'transparent',
      border: 'transparent',
      hoverBorder: ''
    },
    disabled: {
      color: '#8a7060',
      bg: '#4a3550',
      border: '#4a3550'
    },
    danger: {
      color: '#fff',
      bg: '#cc3344',
      border: '#cc3344'
    }
  },
  button2: {
    color: {
      primary: {
        bg: palette.primary.SOLID,
        text: palette.utility.BLACK,
        border: palette.primary.SOLID
      },
      light: {
        bg: rgba(palette.primary.SOLID, 0.08),
        text: palette.primary.SOLID,
        border: rgba(palette.primary.SOLID, 0.06)
      },
      secondary: {
        bg: palette.background.MANTLE,
        text: palette.text.BASE,
        border: palette.border.BORDER1
      },
      success: {
        bg: palette.hues.GREEN,
        text: palette.utility.WHITE,
        border: palette.hues.GREEN
      },
      warning: {
        bg: palette.hues.ORANGE,
        text: '#1a0f1f',
        border: palette.hues.ORANGE
      },
      danger: {
        bg: palette.hues.RED,
        text: palette.utility.WHITE,
        border: palette.hues.RED
      }
    }
  },

  tabs: {
    marginRight: '1.2rem',
    active: {
      fontWeight: 400,
      color: '#f5e6d3',
      border: palette.primary.STRONG
    },
    secondary: {
      active: {
        bg: palette.background.SURFACE0,
        color: palette.text.BASE
      },
      inactive: {
        bg: palette.background.SURFACE0,
        color: palette.text.SUBTEXT1
      }
    }
  },

  requestTabs: {
    color: palette.text.BASE,
    bg: palette.background.SURFACE0,
    bottomBorder: palette.border.BORDER2,
    icon: {
      color: '#8a7060',
      hoverColor: '#f5e6d3',
      hoverBg: '#1a0f1f'
    },
    example: {
      iconColor: colors.GRAY_5
    }
  },

  codemirror: {
    bg: palette.background.BASE,
    border: palette.background.BASE,
    placeholder: {
      color: '#8a7060',
      opacity: 0.5
    },
    gutter: {
      bg: palette.background.BASE
    },
    variable: {
      valid: palette.hues.GREEN_DARK,
      invalid: palette.hues.RED,
      prompt: palette.hues.BLUE
    },
    tokens: {
      definition: palette.syntax.DEFINITION,
      property: palette.syntax.PROPERTY,
      string: palette.syntax.STRING,
      number: palette.syntax.NUMBER,
      atom: palette.syntax.ATOM,
      variable: palette.syntax.VARIABLE,
      keyword: palette.syntax.KEYWORD,
      comment: palette.syntax.COMMENT,
      operator: palette.syntax.OPERATOR,
      tag: palette.syntax.TAG,
      tagBracket: palette.syntax.TAG_BRACKET
    },
    searchLineHighlightCurrent: 'rgba(90, 64, 96, 0.25)',
    searchMatch: '#e9a84f',
    searchMatchActive: '#f5c842'
  },

  table: {
    border: '#2e1e35',
    thead: {
      color: '#d4c0aa'
    },
    striped: '#1a0f1f',
    input: {
      color: '#d4c0aa'
    }
  },

  plainGrid: {
    hoverBg: colors.GRAY_3
  },

  scrollbar: {
    color: 'rgb(58, 40, 64)'
  },

  dragAndDrop: {
    border: '#5a4060',
    borderStyle: '2px solid',
    hoverBg: 'rgba(90, 64, 96, 0.08)',
    transition: 'all 0.1s ease'
  },
  infoTip: {
    bg: palette.background.MANTLE,
    border: '#2e1e35',
    boxShadow: '0 4px 12px rgba(10, 5, 15, 0.6)'
  },

  statusBar: {
    border: '#2e1e35',
    color: '#b8a08a'
  },

  console: {
    bg: '#1a0f1f',
    headerBg: '#221525',
    contentBg: '#1a0f1f',
    border: '#3d2a45',
    titleColor: '#f5e6d3',
    countColor: '#8a7060',
    buttonColor: '#f5e6d3',
    buttonHoverBg: 'rgba(245, 230, 211, 0.1)',
    buttonHoverColor: '#ffffff',
    messageColor: '#f5e6d3',
    timestampColor: '#8a7060',
    emptyColor: '#8a7060',
    logHoverBg: 'rgba(245, 230, 211, 0.05)',
    resizeHandleHover: '#e96e4f',
    resizeHandleActive: '#e96e4f',
    dropdownBg: '#221525',
    dropdownHeaderBg: '#3a2840',
    optionHoverBg: 'rgba(245, 230, 211, 0.05)',
    optionLabelColor: '#f5e6d3',
    optionCountColor: '#8a7060',
    checkboxColor: palette.primary.SOLID,
    scrollbarTrack: '#221525',
    scrollbarThumb: '#4a3550',
    scrollbarThumbHover: '#5a4060'
  },

  grpc: {
    tabNav: {
      container: {
        bg: '#221525'
      },
      button: {
        active: {
          bg: '#3a2840',
          color: '#ffffff'
        },
        inactive: {
          bg: 'transparent',
          color: '#b8a08a'
        }
      }
    },
    importPaths: {
      header: {
        text: palette.text.SUBTEXT1,
        button: {
          color: palette.text.SUBTEXT1,
          hoverColor: '#f5e6d3'
        }
      },
      error: {
        bg: 'transparent',
        text: '#e9534a',
        link: {
          color: '#e9534a',
          hoverColor: '#ff7a6a'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(245, 230, 211, 0.05)',
        text: '#f5e6d3',
        icon: palette.text.SUBTEXT1,
        checkbox: {
          color: '#f5e6d3'
        },
        invalid: {
          opacity: 0.6,
          text: '#e9534a'
        }
      },
      empty: {
        text: palette.text.SUBTEXT1
      },
      button: {
        bg: '#5c2a3a',
        color: '#f5e6d3',
        border: '#5c2a3a',
        hoverBorder: '#7a4055'
      }
    },
    protoFiles: {
      header: {
        text: palette.text.SUBTEXT1,
        button: {
          color: palette.text.SUBTEXT1,
          hoverColor: '#f5e6d3'
        }
      },
      error: {
        bg: 'transparent',
        text: '#e9534a',
        link: {
          color: '#e9534a',
          hoverColor: '#ff7a6a'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(245, 230, 211, 0.05)',
        selected: {
          bg: 'rgba(233, 110, 79, 0.2)',
          border: '#e96e4f'
        },
        text: '#f5e6d3',
        secondaryText: palette.text.SUBTEXT1,
        icon: palette.text.SUBTEXT1,
        invalid: {
          opacity: 0.6,
          text: '#e9534a'
        }
      },
      empty: {
        text: palette.text.SUBTEXT1
      },
      button: {
        bg: '#5c2a3a',
        color: '#f5e6d3',
        border: '#5c2a3a',
        hoverBorder: '#7a4055'
      }
    }
  },
  deprecationWarning: {
    bg: 'rgba(233, 83, 74, 0.1)',
    border: 'rgba(233, 83, 74, 0.1)',
    icon: '#e9534a',
    text: '#d4c0aa'
  },

  examples: {
    buttonBg: '#e96e4f1A',
    buttonColor: '#e96e4f',
    buttonText: '#fff',
    buttonIconColor: '#fff',
    border: '#3d2a45',
    urlBar: {
      border: colors.GRAY_3,
      bg: '#2a1a30'
    },
    table: {
      thead: {
        bg: '#2a1a30',
        color: '#8a7060'
      }
    },
    checkbox: {
      color: '#000'
    }
  },

  app: {
    collection: {
      toolbar: {
        environmentSelector: {
          bg: palette.background.BASE,
          border: colors.GRAY_3,
          icon: palette.primary.TEXT,
          text: palette.text.BASE,
          caret: palette.text.SUBTEXT1,
          separator: colors.GRAY_3,
          hoverBg: palette.background.BASE,
          hoverBorder: colors.GRAY_4,

          noEnvironment: {
            text: palette.text.SUBTEXT1,
            bg: palette.background.BASE,
            border: colors.GRAY_3,
            hoverBg: palette.background.BASE,
            hoverBorder: colors.GRAY_4
          }
        },
        sandboxMode: {
          safeMode: {
            bg: 'rgba(78, 180, 140, 0.12)',
            color: palette.hues.GREEN
          },
          developerMode: {
            bg: 'rgba(233, 110, 79, 0.11)',
            color: palette.hues.YELLOW
          }
        }
      }
    }
  }
};

export default darkTheme;
