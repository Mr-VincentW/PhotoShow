const minifyJSON = (content, fileName, env) => {
  let json = JSON.parse(
    content
    .toString()
    .replace(/(?:\/\*\*[\s\S]*?\*\/|\s*(?<!:)\/\/.*)/gm, '') // Remove head comments.
    .replace(/(?:^\s*[\r\n]|,(?=\s*[\r\n]\s*\}))/gm, '') // Remove other comments.
  );

  if (fileName == 'manifest.json') {
    // manifest.json.
    /^chrome-/.test(env) || delete json.update_url;

    /^firefox-/.test(env) ?
      delete json.minimum_chrome_version :
      delete json.browser_specific_settings;

    /-dev$/.test(env) && (json.name += '_dev');
  } else if (fileName == 'messages.json') {
    // i18n messages.
    (function(json) {
      Object.values(json).forEach(value => {
        delete value.description;
        typeof value == 'object' && arguments.callee(value);
      });
    })(json);
  }

  return JSON.stringify(json, ' ', /-dev$/.test(env) ? 2 : 0);
};

const lessOptimizerForFirefox = content => content.replace(/\bchrome-extension:\/\/__MSG_@@extension_id__/g, '');

////////////////////////////////////////////////////////////////////////////////
// Config for chrome development environment.
fis.media('dev').match('source/**.json', {
  optimizer: (content, file, settings) => minifyJSON(content, file.basename, 'chrome-dev')
}).match('source/**.html', {
  optimizer: fis.plugin('html-minifier', {
    removeComments: true,
  })
}).match('source/(**)', {
  release: '$1'
});

// Config for chrome production environment.
fis.media('chrome').match(/source\/.*(?<!\.min)\.js$/, {
  optimizer: fis.plugin('uglify-es', {
    mangle: {
      toplevel: true,
      reserved: ['tools']
    }
  })
}).match('source/**.json', {
  optimizer: (content, file, settings) => minifyJSON(content, file.basename, 'chrome')
}).match('source/**.less', {
  optimizer: fis.plugin('clean-css')
}).match('source/**.html', {
  optimizer: fis.plugin('html-minifier', {
    removeComments: true,
  })
}).match('source/(**)', {
  release: '$1',
  deploy: [fis.plugin('yzip', {
    zip: './chrome/PhotoShow.zip'
  }), fis.plugin('local-deliver')]
});

////////////////////////////////////////////////////////////////////////////////
// Config for firefox development environment.
fis.media('firefox-dev').match(/source\/.*(?<!\.min)\.js$/, {
  optimizer: [function(content, file, settings) {
    return content.replace(/\bchrome\./g, 'browser.');
  }]
}).match('source/**.json', {
  optimizer: (content, file, settings) => minifyJSON(content, file.basename, 'firefox-dev')
}).match('source/**.html', {
  optimizer: fis.plugin('html-minifier', {
    removeComments: true,
  })
}).match('source/**.less', {
  optimizer: lessOptimizerForFirefox
}).match('source/(**)', {
  release: '$1'
});

// Config for firefox production environment.
fis.media('firefox').match(/source\/.*(?<!\.min)\.js$/, {
  optimizer: [function(content, file, settings) {
    return content.replace(/\bchrome\./g, 'browser.');
  }, fis.plugin('uglify-es', {
    mangle: {
      toplevel: true,
      reserved: ['tools']
    }
  })]
}).match('source/**.json', {
  optimizer: (content, file, settings) => minifyJSON(content, file.basename, 'firefox')
}).match('source/**.less', {
  optimizer: [lessOptimizerForFirefox, fis.plugin('clean-css')]
}).match('source/**.html', {
  optimizer: fis.plugin('html-minifier', {
    removeComments: true,
  })
}).match('source/(**)', {
  release: '$1',
  deploy: [fis.plugin('yzip', {
    zip: './firefox/PhotoShow.zip'
  }), fis.plugin('local-deliver')]
});

////////////////////////////////////////////////////////////////////////////////
// Config for edge development environment.
fis.media('edge-dev').match('source/**.json', {
  optimizer: (content, file, settings) => minifyJSON(content, file.basename, 'edge-dev')
}).match('source/**.html', {
  optimizer: fis.plugin('html-minifier', {
    removeComments: true,
  })
}).match('source/(**)', {
  release: '$1'
});

// Config for edge production environment.
fis.media('edge').match(/source\/.*(?<!\.min)\.js$/, {
  optimizer: fis.plugin('uglify-es', {
    mangle: {
      toplevel: true,
      reserved: ['tools']
    }
  })
}).match('source/**.json', {
  optimizer: (content, file, settings) => minifyJSON(content, file.basename, 'edge')
}).match('source/**.less', {
  optimizer: fis.plugin('clean-css')
}).match('source/**.html', {
  optimizer: fis.plugin('html-minifier', {
    removeComments: true,
  })
}).match('source/(**)', {
  release: '$1',
  deploy: [fis.plugin('yzip', {
    zip: './edge/PhotoShow.zip'
  }), fis.plugin('local-deliver')]
});

////////////////////////////////////////////////////////////////////////////////
// Config for all environments.
fis.match('source/**.less', {
  parser: fis.plugin('less'),
  rExt: 'css'
});

fis.set('project.fileType.image', 'woff2');

fis.set('project.ignore', [
  'fis-conf.js',
  'fis-plugin/**',
  'node_modules/**',
  'docs/**',
  'dist/**',
  '.gitignore',
  'LICENSE',
  '*.zip',
  '*.txt',
  'dev/**',
  'chrome*/**',
  'firefox*/**',
  'edge*/**'
]);