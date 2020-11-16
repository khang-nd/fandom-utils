const Utils = {
  AjaxBatchDelete: {
    isScript: true,
    scripts: ["AjaxBatchDelete.js"],
    styles: ["AjaxBatchDelete.css"],
    config: {
      batchDeleteDelay: 1000,
    },
  },
  ArchiveTool: {
    isScript: true,
    scripts: ["ArchiveTool/code.js"],
    styles: ["ArchiveTool.css"],
    config: {
      _scope: "ArchiveToolConfig",
      archiveListTemplate: "ArchiveList",
      archivePageTemplate: "ArchivePage",
      archiveSubpage: "Archive",
    },
  },
  BackToTopButton: {
    isScript: true,
    scripts: ["BackToTopButton/code.js"],
    styles: ["BackToTopButton.css"],
    config: {
      _scope: "window",
      BackToTopModern: false,
      BackToTopArrow: false,
      BackToTopSpeed: 600,
      BackToTopStart: 800,
    },
  },
  FandomXP: {
    isScript: false,
    styles: ["FandomXP.css"],
  },
  FloatingToc: {
    isScript: true,
    scripts: ["FloatingToc/code.js"],
    styles: ["FloatingToc.css"],
    config: {
      _scope: "FloatingToc",
      auto: false,
      enableKey: true,
    },
  },
  LinkPreview: {
    isScript: true,
    scripts: ["LinkPreview/code.js", "LinkPreview/newpages.js"],
    styles: ["LinkPreview.css"],
    config: {
      _scope: "pPreview",
      csize: 100,
      debug: false,
      apid: false,
      defimage:
        "https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru",
      noimage:
        "https://vignette.wikia.nocookie.net/borderlands/images/f/f5/Заглушка.png/revision/latest/scale-to-width-down/200?cb=20160122074659&path-prefix=ru",
      dock: "#mw-content-text, #article-comments",
      wholepage: false,
    },
  },
  PseudoMonobook: {
    isScript: false,
    styles: ["PseudoMonobook.css"],
  },
  PurgeButton: {
    isScript: true,
    scripts: ["PurgeButton/code.js"],
  },
  QuickDiff: {
    isScript: true,
    scripts: ["QuickDiff/code.js"],
  },
  ReferencePopups: {
    isScript: true,
    scripts: ["ReferencePopups/code.configure.js", "ReferencePopups/code.js"],
    styles: ["ReferencePopups.css"],
  },
  WHAM: {
    isScript: true,
    scripts: ["WHAM/code.2.js"],
    config: {
      _scope: "window",
      WHAMBotMe: false,
      WHAMBotReason: "Cleanup",
      WHAMDelay: 100,
      WHAMDeleteReason: "Cleanup",
      WHAMBlockDuration: "2 weeks",
      WHAMBlockReason: "Vandalism",
    },
  },
  WikiActivity: {
    isScript: true,
    scripts: ["WikiActivity.js"],
    styles: ["WikiActivity.css"],
    config: {
      _scope: "rwaOptions",
      limit: 50,
      namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829],
      showBotEdits: false,
      headerLink: true,
      refresh: false,
      refreshDelay: 300000,
    },
  },
};

export default Utils;
