import { rgba } from 'polished';

export const palette = {
  primary: {
    SOLID: 'hsl(225, 70%, 55%)',
    TEXT: 'hsl(225, 60%, 50%)',
    STRONG: 'hsl(225, 65%, 55%)',
    SUBTLE: 'hsl(225, 60%, 62%)'
  },
  hues: {
    RED: 'hsl(0,   55%, 52%)',
    ROSE: 'hsl(345, 50%, 48%)',
    BROWN: 'hsl(20,  40%, 38%)',
    ORANGE: 'hsl(25,  70%, 45%)',
    YELLOW: 'hsl(40,  65%, 45%)',
    LIME: 'hsl(90,  40%, 38%)',
    GREEN: 'hsl(155, 50%, 34%)',
    TEAL: 'hsl(180, 50%, 34%)',
    CYAN: 'hsl(200, 55%, 42%)',
    BLUE: 'hsl(220, 60%, 50%)',
    INDIGO: 'hsl(235, 50%, 48%)',
    VIOLET: 'hsl(260, 45%, 52%)',
    PURPLE: 'hsl(280, 42%, 50%)',
    PINK: 'hsl(330, 45%, 50%)'
  },
  system: {
    CONTROL_ACCENT: '#4f6df5'
  },
  background: {
    BASE: '#ffffff',
    MANTLE: '#f8fafc',
    CRUST: '#f1f5f9',
    SURFACE0: '#e8edf4',
    SURFACE1: '#e2e8f0',
    SURFACE2: '#cbd5e1'
  },
  text: {
    BASE: '#1e293b',
    SUBTEXT2: '#475569',
    SUBTEXT1: '#64748b',
    SUBTEXT0: '#94a3b8'
  },
  overlay: {
    OVERLAY2: '#64748b',
    OVERLAY1: '#94a3b8',
    OVERLAY0: '#b0bec5'
  },
  border: {
    BORDER2: '#cbd5e1',
    BORDER1: '#e2e8f0',
    BORDER0: '#f1f5f9'
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
  VARIABLE: palette.hues.VIOLET,
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

const daffySlateTheme = {
  mode: 'light',
  brand: palette.primary.SOLID,
  text: palette.text.BASE,
  textLink: palette.hues.BLUE,
  draftColor: '#4f6df5',
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
    sm: '0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04)',
    md: '0 2px 8px rgba(15, 23, 42, 0.10), 0 0 0 1px rgba(15, 23, 42, 0.05)',
    lg: '0 2px 12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04)'
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
    shadow: '0 0px 3px rgba(15, 23, 42, 0.10), 0 0 0 1px rgba(15, 23, 42, 0.04)',
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
    responseOverlayBg: 'rgba(255, 255, 255, 0.6)',
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
      color: '#1e293b',
      bg: '#e2e8f0',
      border: '#cbd5e1',
      hoverBorder: '#64748b'
    },
    close: {
      color: '#1e293b',
      bg: 'white',
      border: 'white',
      hoverBorder: ''
    },
    disabled: {
      color: '#94a3b8',
      bg: palette.border.BORDER0,
      border: '#e2e8f0'
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
    searchLineHighlightCurrent: 'rgba(100, 116, 139, 0.10)',
    searchMatch: '#3b5998',
    searchMatchActive: '#4f6df5'
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
    color: 'rgb(148, 163, 184)'
  },

  dragAndDrop: {
    border: palette.overlay.OVERLAY2,
    borderStyle: '2px solid',
    hoverBg: 'rgba(100, 116, 139, 0.05)',
    transition: 'all 0.1s ease'
  },

  infoTip: {
    bg: 'white',
    border: palette.background.SURFACE1,
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)'
  },

  statusBar: {
    border: '#e2e8f0',
    color: '#64748b'
  },
  console: {
    bg: '#f8fafc',
    headerBg: '#f8fafc',
    contentBg: '#ffffff',
    border: '#cbd5e1',
    titleColor: '#1e293b',
    countColor: '#64748b',
    buttonColor: '#475569',
    buttonHoverBg: '#e2e8f0',
    buttonHoverColor: '#1e293b',
    messageColor: '#1e293b',
    timestampColor: '#64748b',
    emptyColor: '#64748b',
    logHoverBg: 'rgba(15, 23, 42, 0.03)',
    resizeHandleHover: '#4f6df5',
    resizeHandleActive: '#4f6df5',
    dropdownBg: '#ffffff',
    dropdownHeaderBg: '#f8fafc',
    optionHoverBg: '#f8fafc',
    optionLabelColor: '#1e293b',
    optionCountColor: '#64748b',
    checkboxColor: palette.primary.SOLID,
    scrollbarTrack: '#f8fafc',
    scrollbarThumb: '#cbd5e1',
    scrollbarThumbHover: '#94a3b8'
  },

  grpc: {
    tabNav: {
      container: {
        bg: '#f1f5f9'
      },
      button: {
        active: {
          bg: '#ffffff',
          color: '#1e293b'
        },
        inactive: {
          bg: 'transparent',
          color: '#475569'
        }
      }
    },
    importPaths: {
      header: {
        text: '#64748b',
        button: {
          color: '#64748b',
          hoverColor: '#1e293b'
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
        hoverBg: 'rgba(15, 23, 42, 0.04)',
        text: '#1e293b',
        icon: '#64748b',
        checkbox: {
          color: '#1e293b'
        },
        invalid: {
          opacity: 0.6,
          text: '#B91C1C'
        }
      },
      empty: {
        text: '#64748b'
      },
      button: {
        bg: '#e2e8f0',
        color: '#1e293b',
        border: '#cbd5e1',
        hoverBorder: '#64748b'
      }
    },
    protoFiles: {
      header: {
        text: '#64748b',
        button: {
          color: '#64748b',
          hoverColor: '#1e293b'
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
        hoverBg: 'rgba(15, 23, 42, 0.04)',
        selected: {
          bg: 'rgba(79, 109, 245, 0.15)',
          border: '#4f6df5'
        },
        text: '#1e293b',
        secondaryText: '#64748b',
        icon: '#64748b',
        invalid: {
          opacity: 0.6,
          text: '#B91C1C'
        }
      },
      empty: {
        text: '#64748b'
      },
      button: {
        bg: '#e2e8f0',
        color: '#1e293b',
        border: '#cbd5e1',
        hoverBorder: '#64748b'
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
    buttonBg: 'rgba(79, 109, 245, 0.1)',
    buttonColor: '#4f6df5',
    buttonText: '#fff',
    buttonIconColor: '#1e293b',
    border: palette.border.BORDER0,
    urlBar: {
      border: palette.border.BORDER0,
      bg: '#f1f5f9'
    },
    table: {
      thead: {
        bg: '#f8fafc',
        color: '#1e293b'
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
            bg: 'rgba(79, 109, 245, 0.12)',
            color: palette.hues.BLUE
          }
        }
      }
    }
  }
};

export default daffySlateTheme;
