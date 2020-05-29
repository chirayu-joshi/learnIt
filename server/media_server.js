/**
 * NodeMediaServer exposes API to list all connected clients.
 * You can access it in your browser at 'http://127.0.0.1:8888/api/streams'.
 */
// You can accept/reject incoming connection if streaming key is invalid.
// We are accepting incoming connection on default 1935 RTMP port.
const NodeMediaServer = require('node-media-server'),
    config = require('./config/default').rtmp_server,
    User = require('./database/Schema').User,
    helpers = require('./helpers/helpers');

nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
    // Reject code goes here
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    User.findOne({stream_key: stream_key}, (err, user) => {
        if (!err) {
            if (!user) {
                let session = nms.getSession(id);
                session.reject();
            } else {
                helpers.generateStreamThumbnail(stream_key);
            }
        }
    });
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

module.exports = nms;
