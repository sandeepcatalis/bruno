import { rgba, lighten } from 'polished';

export const palette = {
  primary: {
    SOLID: 'hsl(187, 92%, 42%)',
    TEXT: 'hsl(187, 92%, 48%)',
    STRONG: 'hsl(187, 92%, 48%)',
    SUBTLE: 'hsl(187, 92%, 38%)'
  },
  hues: {
    RED: 'hsl(4, 68%, 56%)',
    ROSE: 'hsl(350, 72%, 65%)',
    BROWN: 'hsl(28, 60%, 65%)',
    ORANGE: 'hsl(16, 80%, 65%)',
    YELLOW: 'hsl(45, 85%, 68%)',
    GREEN: 'hsl(160, 64%, 58%)',
    GREEN_DARK: 'hsl(172, 80%, 40%)',
    TEAL: 'hsl(180, 65%, 52%)',
    CYAN: 'hsl(192, 78%, 68%)',
    BLUE: 'hsl(210, 85%, 70%)',
    INDIGO: 'hsl(220, 80%, 68%)',
    VIOLET: 'hsl(265, 68%, 72%)',
    PURPLE: 'hsl(280, 64%, 70%)',
    PINK: 'hsl(320, 55%, 68%)'
  },
  system: {
    CONTROL_ACCENT: '#06b6d4'
  },
  background: {
    BASE: '#0a1628',
    MANTLE: '#0f1f35',
    CRUST: '#081220',
    SURFACE0: '#142640',
    SURFACE1: '#1a3050',
    SURFACE2: '#2a4a6a'
  },
  text: {
    BASE: '#e2e8f0',
    SUBTEXT2: '#b8cce0',
    SUBTEXT1: '#8faac4',
    SUBTEXT0: '#6b8aaa'
  },
  overlay: {
    OVERLAY2: '#2a4a6a',
    OVERLAY1: '#1f3d5c',
    OVERLAY0: '#163050'
  },
  border: {
    BORDER2: '#1e3a56',
    BORDER1: '#162d48',
    BORDER0: '#0f2238'
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
  PROPERTY: palette.hues.CYAN,
  DEFINITION: palette.hues.BLUE,

  // Literals
  STRING: palette.hues.GREEN,
  NUMBER: palette.hues.ORANGE,
  ATOM: palette.hues.VIOLET,

  // Operators & punctuation (quiet)
  OPERATOR: palette.text.SUBTEXT1,
  TAG_BRACKET: palette.text.SUBTEXT1,

  // Comments should recede
  COMMENT: palette.text.SUBTEXT0
};

const colors = {
  GRAY_2: '#163050',
  GRAY_3: '#1e3a56',
  GRAY_4: '#2a4a6a',
  GRAY_5: '#8faac4'
};

const daffyOceanTheme = {
  mode: 'dark',
  brand: palette.primary.SOLID,
  text: palette.text.BASE,
  textLink: palette.hues.CYAN,
  draftColor: '#0891b2',
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
    crust: '#162d48',
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
    overlay2: '#2a4a6a',
    overlay1: '#1f3d5c',
    overlay0: '#163050'
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
    sm: '0 1px 3px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 10, 30, 0.4)',
    md: '0 2px 8px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 10, 30, 0.5)',
    lg: '0 2px 12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 10, 30, 0.5)'
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
    accent: '#06b6d4',
    border: '#1e3a56',
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
      icon: '#b8cce0',
      iconDanger: '#e05252',
      border: `solid 1px ${palette.border.BORDER1}`
    },
    dragbar: {
      border: palette.border.BORDER1,
      activeBorder: palette.border.BORDER2
    },
    responseStatus: '#b8cce0',
    responseOk: palette.hues.GREEN,
    responseError: palette.hues.RED,
    responsePending: palette.hues.BLUE,
    responseOverlayBg: rgba(palette.background.BASE, 0.8),

    card: {
      bg: '#0f1f35',
      border: 'transparent',
      hr: '#1e3a56'
    },

    graphqlDocsExplorer: {
      bg: '#0a1628',
      color: '#e2e8f0'
    }
  },

  notifications: {
    bg: colors.GRAY_3,
    list: {
      bg: '#163050',
      borderRight: '#1e3a56',
      borderBottom: '#1e3a56',
      hoverBg: '#1a3555',
      active: {
        border: '#06b6d4',
        bg: '#1e3a56',
        hoverBg: '#1e3a56'
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
      color: '#e2e8f0',
      bg: '#0e4f6e',
      border: '#0e4f6e',
      hoverBorder: '#2a4a6a'
    },
    close: {
      color: '#b8cce0',
      bg: 'transparent',
      border: 'transparent',
      hoverBorder: ''
    },
    disabled: {
      color: '#6b8aaa',
      bg: '#1a3050',
      border: '#1a3050'
    },
    danger: {
      color: '#fff',
      bg: '#dc3545',
      border: '#dc3545'
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
        text: '#0a1628',
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
      color: '#e2e8f0',
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
      color: '#6b8aaa',
      hoverColor: '#e2e8f0',
      hoverBg: '#0a1628'
    },
    example: {
      iconColor: colors.GRAY_5
    }
  },

  codemirror: {
    bg: palette.background.BASE,
    border: palette.background.BASE,
    placeholder: {
      color: '#6b8aaa',
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
    searchLineHighlightCurrent: 'rgba(6, 182, 212, 0.12)',
    searchMatch: '#06b6d4',
    searchMatchActive: '#67e8f9'
  },

  table: {
    border: '#162d48',
    thead: {
      color: '#b8cce0'
    },
    striped: '#0a1628',
    input: {
      color: '#b8cce0'
    }
  },

  plainGrid: {
    hoverBg: colors.GRAY_3
  },

  scrollbar: {
    color: 'rgb(20, 38, 64)'
  },

  dragAndDrop: {
    border: '#2a4a6a',
    borderStyle: '2px solid',
    hoverBg: 'rgba(6, 182, 212, 0.06)',
    transition: 'all 0.1s ease'
  },
  infoTip: {
    bg: palette.background.MANTLE,
    border: '#162d48',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
  },

  statusBar: {
    border: '#0f2238',
    color: '#8faac4'
  },

  console: {
    bg: '#0a1628',
    headerBg: '#0f1f35',
    contentBg: '#0a1628',
    border: '#1e3a56',
    titleColor: '#e2e8f0',
    countColor: '#6b8aaa',
    buttonColor: '#e2e8f0',
    buttonHoverBg: 'rgba(6, 182, 212, 0.1)',
    buttonHoverColor: '#ffffff',
    messageColor: '#e2e8f0',
    timestampColor: '#6b8aaa',
    emptyColor: '#6b8aaa',
    logHoverBg: 'rgba(6, 182, 212, 0.05)',
    resizeHandleHover: '#06b6d4',
    resizeHandleActive: '#06b6d4',
    dropdownBg: '#0f1f35',
    dropdownHeaderBg: '#1e3a56',
    optionHoverBg: 'rgba(6, 182, 212, 0.05)',
    optionLabelColor: '#e2e8f0',
    optionCountColor: '#6b8aaa',
    checkboxColor: palette.primary.SOLID,
    scrollbarTrack: '#0f1f35',
    scrollbarThumb: '#1e3a56',
    scrollbarThumbHover: '#2a4a6a'
  },

  grpc: {
    tabNav: {
      container: {
        bg: '#0f1f35'
      },
      button: {
        active: {
          bg: '#1e3a56',
          color: '#ffffff'
        },
        inactive: {
          bg: 'transparent',
          color: '#8faac4'
        }
      }
    },
    importPaths: {
      header: {
        text: palette.text.SUBTEXT1,
        button: {
          color: palette.text.SUBTEXT1,
          hoverColor: '#e2e8f0'
        }
      },
      error: {
        bg: 'transparent',
        text: '#e05252',
        link: {
          color: '#e05252',
          hoverColor: '#f07070'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(6, 182, 212, 0.05)',
        text: '#e2e8f0',
        icon: palette.text.SUBTEXT1,
        checkbox: {
          color: '#e2e8f0'
        },
        invalid: {
          opacity: 0.6,
          text: '#e05252'
        }
      },
      empty: {
        text: palette.text.SUBTEXT1
      },
      button: {
        bg: '#0e4f6e',
        color: '#e2e8f0',
        border: '#0e4f6e',
        hoverBorder: '#2a4a6a'
      }
    },
    protoFiles: {
      header: {
        text: palette.text.SUBTEXT1,
        button: {
          color: palette.text.SUBTEXT1,
          hoverColor: '#e2e8f0'
        }
      },
      error: {
        bg: 'transparent',
        text: '#e05252',
        link: {
          color: '#e05252',
          hoverColor: '#f07070'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(6, 182, 212, 0.05)',
        selected: {
          bg: 'rgba(6, 182, 212, 0.15)',
          border: '#06b6d4'
        },
        text: '#e2e8f0',
        secondaryText: palette.text.SUBTEXT1,
        icon: palette.text.SUBTEXT1,
        invalid: {
          opacity: 0.6,
          text: '#e05252'
        }
      },
      empty: {
        text: palette.text.SUBTEXT1
      },
      button: {
        bg: '#0e4f6e',
        color: '#e2e8f0',
        border: '#0e4f6e',
        hoverBorder: '#2a4a6a'
      }
    }
  },
  deprecationWarning: {
    bg: 'rgba(224, 82, 82, 0.1)',
    border: 'rgba(224, 82, 82, 0.1)',
    icon: '#e05252',
    text: '#b8cce0'
  },

  examples: {
    buttonBg: '#06b6d41A',
    buttonColor: '#06b6d4',
    buttonText: '#fff',
    buttonIconColor: '#fff',
    border: '#1e3a56',
    urlBar: {
      border: colors.GRAY_3,
      bg: '#0f1f35'
    },
    table: {
      thead: {
        bg: '#0f1f35',
        color: '#6b8aaa'
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
            bg: 'rgba(56, 189, 172, 0.12)',
            color: palette.hues.GREEN
          },
          developerMode: {
            bg: 'rgba(6, 182, 212, 0.11)',
            color: palette.hues.YELLOW
          }
        }
      }
    }
  }
};

export default daffyOceanTheme;
