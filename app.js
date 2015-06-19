var request = require('request'),
    cheerio = require('cheerio'),
    express = require('express'),
    logger = require('morgan'),
    fs = require('fs'),
    Canvas = require('canvas'),
    Image = Canvas.Image,
    app = express();

var ret = {};

// connect.logger + customization
function log() {
    if (!arguments.length) return logger(' > :remote-addr - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms');
    var args = Array.prototype.slice.call(arguments);
    args.unshift(' > fetching data - [' + new Date().toUTCString() + '] -');
    console.log.apply(null, args);
}

app.use(log());
app.use(express.static('public'));
app.get('/api.json', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(ret);
});

function fetch() {
    request('http://www2.sabesp.com.br/mananciais/DivulgacaoSiteSabesp.aspx', function(err, response, body) {
        if (err) {
            log('failed.', err);
            ret = {};
            return;
        }

        var $ = cheerio.load(body),
            data = [];

        $('.guardaImgBgDetalhe').each(function() {
            var tr = $(this).parent();
            data.push({
                key: tr.find('.guardaImgBg').eq(0).text(),
                value: tr.find('.guardaImgBgDetalhe').eq(0).text()
            });
        });

        log('done.');
        if (data.length) ret = data;
    });
}
app.get('/:label/:param.png', function(req, res) {

    var param = req.params.param;
    var label = req.params.label;

    var canvas = new Canvas(1200, 630)
    var context = canvas.getContext('2d');

    img.src = canvas.toBuffer();

    var squid = fs.readFileSync(__dirname + '/facebook.png');
        img = new Image;
        img.src = squid;


    context.drawImage(img, 0, 0, 1200, 630);
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "bold 150px GothamBold";
    context.fillText(param, 880, 380);
    context.font = "bold 60px GothamBold";
    context.fillText(label, 850, 140);
    var stream = canvas.createPNGStream();

    res.type("png");
    stream.pipe(res);

    console.log(canvas);

});
console.log('=> Server started');
setInterval(fetch, 1000 * 60 * 60 * 12); // 12 hours interval
fetch(); // first kick off
app.listen(process.env.PORT || 3000);
