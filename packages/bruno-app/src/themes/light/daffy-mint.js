import { rgba } from 'polished';
export const palette = {
  primary: {
    SOLID: 'hsl(160, 84%, 39%)',
    TEXT: 'hsl(160, 70%, 35%)',
    STRONG: 'hsl(160, 70%, 42%)',
    SUBTLE: 'hsl(160, 65%, 48%)'
  },
  hues: {
    RED: 'hsl(0,   65%, 50%)',
    ROSE: 'hsl(340, 55%, 48%)',
    BROWN: 'hsl(25,  50%, 38%)',
    ORANGE: 'hsl(30,  80%, 45%)',
    YELLOW: 'hsl(42,  70%, 42%)',
    LIME: 'hsl(90,  50%, 38%)',
    GREEN: 'hsl(152, 60%, 34%)',
    TEAL: 'hsl(170, 55%, 34%)',
    CYAN: 'hsl(188, 60%, 38%)',
    BLUE: 'hsl(210, 55%, 45%)',
    INDIGO: 'hsl(230, 48%, 46%)',
    VIOLET: 'hsl(255, 45%, 50%)',
    PURPLE: 'hsl(275, 48%, 48%)',
    PINK: 'hsl(335, 55%, 48%)'
  },
  system: {
    CONTROL_ACCENT: '#0d9668'
  },
  background: {
    BASE: '#f0fdf9',
    MANTLE: '#f8fffe',
    CRUST: '#edfaf5',
    SURFACE0: '#e6faf4',
    SURFACE1: '#d5f5ec',
    SURFACE2: '#c4ede3'
  },
  text: {
    BASE: '#1a3a2f',
    SUBTEXT2: '#2d5c4a',
    SUBTEXT1: '#4a7d6a',
    SUBTEXT0: '#6b9e8a'
  },
  overlay: {
    OVERLAY2: '#5a8f7c',
    OVERLAY1: '#8bb5a5',
    OVERLAY0: '#a3c9bb'
  },
  border: {
    BORDER2: '#a8d8c8',
    BORDER1: '#c8e8dd',
    BORDER0: '#dcf0e8'
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
  DEFINITION: palette.hues.TEAL,

  // Literals
  STRING: palette.hues.BROWN,
  NUMBER: palette.hues.PURPLE,
  ATOM: palette.hues.ROSE,

  // Operators & punctuation (quiet)
  OPERATOR: palette.text.SUBTEXT1,
  TAG_BRACKET: palette.text.SUBTEXT1,

  // Comments should recede
  COMMENT: palette.text.SUBTEXT0
};

const lightTheme = {
  mode: 'light',
  brand: palette.primary.SOLID,
  text: palette.text.BASE,
  textLink: palette.hues.BLUE,
  draftColor: '#0d9668',
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
    crust: palette.background.CRUST,
    surface2: palette.background.SURFACE2,
    surface1: palette.background.SURFACE1,
    surface0: palette.background.SURFACE0
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
    overlay2: palette.overlay.OVERLAY2,
    overlay1: palette.overlay.OVERLAY1,
    overlay0: palette.overlay.OVERLAY0
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
    sm: '0 1px 3px rgba(10, 80, 60, 0.10), 0 0 0 1px rgba(10, 80, 60, 0.04)',
    md: '0 2px 8px rgba(10, 80, 60, 0.12), 0 0 0 1px rgba(10, 80, 60, 0.05)',
    lg: '0 2px 12px rgba(10, 80, 60, 0.14), 0 0 0 1px rgba(10, 80, 60, 0.04)'
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
      white: palette.utility.WHITE,
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
    bg: palette.utility.WHITE,
    border: palette.border.BORDER2,
    focusBorder: palette.overlay.OVERLAY2,
    placeholder: {
      color: palette.overlay.OVERLAY1,
      opacity: 0.8
    }
  },

  sidebar: {
    color: palette.text.BASE,
    muted: palette.text.SUBTEXT1,
    bg: palette.background.MANTLE,
    dragbar: {
      border: palette.background.SURFACE2,
      activeBorder: palette.background.SURFACE2
    },

    collection: {
      item: {
        bg: palette.background.SURFACE1,
        hoverBg: palette.background.SURFACE1,
        focusBorder: palette.border.BORDER2,
        indentBorder: palette.border.BORDER1,
        active: {
          indentBorder: palette.border.BORDER1
        },
        example: {
          iconColor: palette.text.SUBTEXT2
        }
      }
    },

    dropdownIcon: {
      color: palette.text.SUBTEXT2
    }
  },

  dropdown: {
    color: palette.text.BASE,
    iconColor: palette.text.SUBTEXT2,
    bg: palette.utility.WHITE,
    hoverBg: palette.background.CRUST,
    shadow: '0 0px 3px rgba(10, 80, 60, 0.10), 0 0 0 1px rgba(10, 80, 60, 0.04)',
    border: 'none',
    separator: palette.border.BORDER1,
    selectedColor: palette.primary.TEXT,
    mutedText: palette.text.SUBTEXT0
  },

  workspace: {
    accent: palette.system.CONTROL_ACCENT,
    border: palette.border.BORDER1,
    button: {
      bg: palette.background.MANTLE
    }
  },

  request: {
    methods: {
      get: palette.hues.GREEN,
      post: palette.hues.PURPLE,
      put: palette.hues.ORANGE,
      delete: palette.hues.RED,
      patch: palette.hues.PURPLE,
      options: palette.hues.TEAL,
      head: palette.hues.CYAN
    },

    grpc: palette.hues.INDIGO,
    ws: palette.hues.ORANGE,
    gql: palette.hues.PINK
  },

  requestTabPanel: {
    url: {
      bg: palette.utility.WHITE,
      icon: palette.text.SUBTEXT2,
      iconDanger: palette.hues.RED,
      border: `solid 1px ${palette.border.BORDER1}`
    },
    dragbar: {
      border: palette.background.SURFACE2,
      activeBorder: palette.border.BORDER2
    },
    responseStatus: palette.text.SUBTEXT1,
    responseOk: palette.hues.GREEN,
    responseError: palette.hues.RED,
    responsePending: palette.hues.BLUE,
    responseOverlayBg: 'rgba(240, 253, 249, 0.6)',
    card: {
      bg: palette.background.BASE,
      border: palette.border.BORDER1,
      hr: palette.border.BORDER1
    },
    graphqlDocsExplorer: {
      bg: palette.background.BASE,
      color: palette.text.BASE
    }
  },

  notifications: {
    bg: palette.background.BASE,
    list: {
      bg: palette.background.SURFACE0,
      borderRight: 'transparent',
      borderBottom: palette.border.BORDER2,
      hoverBg: palette.background.SURFACE1,
      active: {
        border: palette.hues.BLUE,
        bg: palette.background.SURFACE1,
        hoverBg: palette.background.SURFACE2
      }
    }
  },

  modal: {
    title: {
      color: palette.text.BASE,
      bg: palette.background.SURFACE0
    },
    body: {
      color: palette.text.BASE,
      bg: palette.background.BASE
    },
    input: {
      bg: palette.background.BASE,
      border: palette.border.BORDER2,
      focusBorder: palette.overlay.OVERLAY2
    },
    backdrop: {
      opacity: 0.4
    }
  },

  button: {
    secondary: {
      color: '#1a3a2f',
      bg: '#c4ede3',
      border: '#b0e4d7',
      hoverBorder: '#5a8f7c'
    },
    close: {
      color: '#1a3a2f',
      bg: 'white',
      border: 'white',
      hoverBorder: ''
    },
    disabled: {
      color: '#6b9e8a',
      bg: palette.border.BORDER0,
      border: palette.border.BORDER1
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
        text: palette.utility.WHITE,
        border: palette.primary.SOLID
      },
      light: {
        bg: rgba(palette.primary.SOLID, 0.08),
        text: palette.primary.SOLID,
        border: rgba(palette.primary.SOLID, 0.06)
      },
      secondary: {
        bg: palette.background.MANTLE,
        border: palette.border.BORDER2,
        text: palette.text.BASE
      },
      success: {
        bg: palette.hues.GREEN,
        text: palette.utility.WHITE,
        border: palette.hues.GREEN
      },
      warning: {
        bg: palette.hues.ORANGE,
        text: palette.utility.WHITE,
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
      color: palette.text.BASE,
      border: palette.primary.STRONG
    },
    secondary: {
      active: {
        bg: palette.background.SURFACE1,
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
    bg: palette.background.CRUST,
    bottomBorder: palette.border.BORDER0,
    icon: {
      color: palette.text.SUBTEXT0,
      hoverColor: palette.text.BASE,
      hoverBg: palette.background.SURFACE1
    },
    example: {
      iconColor: palette.text.SUBTEXT2
    }
  },

  codemirror: {
    bg: palette.utility.WHITE,
    border: palette.utility.WHITE,
    placeholder: {
      color: palette.overlay.OVERLAY1,
      opacity: 0.75
    },
    gutter: {
      bg: palette.utility.WHITE
    },
    variable: {
      valid: palette.hues.GREEN,
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
    searchLineHighlightCurrent: 'rgba(90, 143, 124, 0.10)',
    searchMatch: '#0d9668',
    searchMatchActive: '#10b981'
  },

  table: {
    border: palette.border.BORDER0,
    thead: {
      color: palette.text.SUBTEXT2
    },
    striped: palette.background.SURFACE0,
    input: {
      color: palette.text.BASE
    }
  },

  plainGrid: {
    hoverBg: palette.background.CRUST
  },

  scrollbar: {
    color: 'rgb(139, 181, 165)'
  },

  dragAndDrop: {
    border: palette.overlay.OVERLAY2,
    borderStyle: '2px solid',
    hoverBg: 'rgba(90, 143, 124, 0.05)',
    transition: 'all 0.1s ease'
  },

  infoTip: {
    bg: 'white',
    border: palette.background.SURFACE1,
    boxShadow: '0 4px 12px rgba(10, 80, 60, 0.12)'
  },

  statusBar: {
    border: '#c8e8dd',
    color: 'rgb(74, 125, 106)'
  },
  console: {
    bg: '#f0fdf9',
    headerBg: '#f0fdf9',
    contentBg: '#ffffff',
    border: '#a8d8c8',
    titleColor: '#1a3a2f',
    countColor: '#4a7d6a',
    buttonColor: '#2d5c4a',
    buttonHoverBg: '#d5f5ec',
    buttonHoverColor: '#1a3a2f',
    messageColor: '#1a3a2f',
    timestampColor: '#4a7d6a',
    emptyColor: '#4a7d6a',
    logHoverBg: 'rgba(10, 80, 60, 0.03)',
    resizeHandleHover: '#10b981',
    resizeHandleActive: '#10b981',
    dropdownBg: '#ffffff',
    dropdownHeaderBg: '#f0fdf9',
    optionHoverBg: '#f0fdf9',
    optionLabelColor: '#1a3a2f',
    optionCountColor: '#4a7d6a',
    checkboxColor: palette.primary.SOLID,
    scrollbarTrack: '#f0fdf9',
    scrollbarThumb: '#a8d8c8',
    scrollbarThumbHover: '#8bb5a5'
  },

  grpc: {
    tabNav: {
      container: {
        bg: '#e6faf4'
      },
      button: {
        active: {
          bg: '#ffffff',
          color: '#1a3a2f'
        },
        inactive: {
          bg: 'transparent',
          color: '#4a7d6a'
        }
      }
    },
    importPaths: {
      header: {
        text: '#4a7d6a',
        button: {
          color: '#4a7d6a',
          hoverColor: '#1a3a2f'
        }
      },
      error: {
        bg: 'transparent',
        text: '#B91C1C',
        link: {
          color: '#B91C1C',
          hoverColor: '#dc2626'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(10, 80, 60, 0.05)',
        text: '#1a3a2f',
        icon: '#4a7d6a',
        checkbox: {
          color: '#1a3a2f'
        },
        invalid: {
          opacity: 0.6,
          text: '#B91C1C'
        }
      },
      empty: {
        text: '#4a7d6a'
      },
      button: {
        bg: '#c4ede3',
        color: '#1a3a2f',
        border: '#b0e4d7',
        hoverBorder: '#5a8f7c'
      }
    },
    protoFiles: {
      header: {
        text: '#4a7d6a',
        button: {
          color: '#4a7d6a',
          hoverColor: '#1a3a2f'
        }
      },
      error: {
        bg: 'transparent',
        text: '#B91C1C',
        link: {
          color: '#B91C1C',
          hoverColor: '#dc2626'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(10, 80, 60, 0.05)',
        selected: {
          bg: 'rgba(16, 185, 129, 0.2)',
          border: '#10b981'
        },
        text: '#1a3a2f',
        secondaryText: '#4a7d6a',
        icon: '#4a7d6a',
        invalid: {
          opacity: 0.6,
          text: '#B91C1C'
        }
      },
      empty: {
        text: '#4a7d6a'
      },
      button: {
        bg: '#c4ede3',
        color: '#1a3a2f',
        border: '#b0e4d7',
        hoverBorder: '#5a8f7c'
      }
    }
  },
  deprecationWarning: {
    bg: 'rgba(217, 31, 17, 0.1)',
    border: 'rgba(217, 31, 17, 0.1)',
    icon: '#D91F11',
    text: palette.text.BASE
  },

  examples: {
    buttonBg: 'rgba(16, 185, 129, 0.1)',
    buttonColor: '#10b981',
    buttonText: '#fff',
    buttonIconColor: '#1a3a2f',
    border: palette.border.BORDER0,
    urlBar: {
      border: palette.border.BORDER0,
      bg: '#e6faf4'
    },
    table: {
      thead: {
        bg: '#f0fdf9',
        color: '#1a3a2f'
      }
    },
    checkbox: {
      color: '#fff'
    }
  },

  app: {
    collection: {
      toolbar: {
        environmentSelector: {
          bg: palette.utility.WHITE,
          border: palette.border.BORDER1,
          icon: palette.primary.TEXT,
          text: palette.text.BASE,
          caret: palette.overlay.OVERLAY1,
          separator: palette.border.BORDER1,
          hoverBg: palette.utility.WHITE,
          hoverBorder: palette.border.BORDER2,

          noEnvironment: {
            text: palette.text.SUBTEXT1,
            bg: palette.utility.WHITE,
            border: palette.border.BORDER2,
            hoverBg: palette.utility.WHITE,
            hoverBorder: palette.overlay.OVERLAY1
          }
        },
        sandboxMode: {
          safeMode: {
            bg: 'rgba(4, 120, 87, 0.12)',
            color: palette.hues.GREEN
          },
          developerMode: {
            bg: 'rgba(204, 145, 73, 0.15)',
            color: palette.hues.YELLOW
          }
        }
      }
    }
  }
};

export default lightTheme;
