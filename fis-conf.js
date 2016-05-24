var env={
    //默认开发环境配置
    "dev":{
        "env":"dev",
        "baseUrl":"",
        "apiHost":"/"
    },
    //产品环境配置
    "prod":{
        "env":"prod",
        "baseUrl":"",
        "apiHost":"/"
    }
};
// source setup
fis.set('project.files', ['/favicon.ico','/index.html','/login.html','/components/**','/node_modules/**','/static/**', 'test/**']);//, './map.json'
// used to do node_modules lookup
fis.hook('npm');

// used to resolve dependencies and wrap your code with `define`.
fis.hook('commonjs');

//配置mock接口模拟
fis.match('/test/**', {
    release: '$0',
    isMod: false
});
fis.match('/test/server.conf', {
    release: '/config/server.conf'
});

fis.match('/components/account/setting/**.js', {
    wrap: false
});
// our module loader 
fis.match('/node_modules/fis-mod/mod.js', {
    wrap: false
});

fis.match('/static/lib/**', {
    wrap: false
});

// !!REQUIRED 
fis.match('/node_modules/**.js', {
    isMod: true,
    useSameNameRequire: true
    //release: '/dist/$0'
});

fis.match('/components/**.{js,jsx}', {
    isMod: true,
    useSameNameRequire: true
    //release: '/dist/$0'
});

fis.match('/**', {
    url: env["dev"]["baseUrl"]+'$0'
});

//fis.match('{*.jsx,*:jsx}', {
//    parser: fis.plugin('babel-5.x', {
//        sourceMaps: true
//    }),
//    rExt: '.js'
//});

fis.match('**.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
        sourceMap: true
    })
});

fis.match('static/lib/GLOBAL_config.js', {
    globalVars: {
        apiHost: env["dev"]["apiHost"],
        baseUrl:env["dev"]["baseUrl"]
    },
    parser: fis.plugin('global-vars')
});

fis.match('::package', {
    postpackager: [
        fis.plugin('loader')
    ]
});

//产品环境场景配置
fis.media('prod')
    .match('**.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
        //useHash: true
    })
    .match('**.{css,less}', {
        //useSprite: true,
        optimizer: fis.plugin('clean-css')
        //useHash: true
    })
    // png图片压缩
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('static/lib/GLOBAL_config.js', {
        globalVars: {
            apiHost: env["prod"]["apiHost"],
            baseUrl:env["prod"]["baseUrl"]
        },
        parser: fis.plugin('global-vars')
    })
    .match('/**', {
        url: env["prod"]["baseUrl"]+'$0'
    })
    .match('::package', {
        //postpackager: [
        //    fis.plugin('loader')
        //]
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
        // packager: fis.plugin('map', {
        //     useTrack: false
        // })
    });
