var LinkModel = require('./../../models/Link');

var postLinks = function (req, res) {
    var url = req.body.url;
    var user = req.user;
    if (!url) {
        return res.status(400).json({
            error: 'An url should be specified.'
        });
    }
    var linkObj = new LinkModel({
        origin: url
    });
    if (user) {
        linkObj.createdBy = user._doc._id;
    }
    linkObj.save(function (error, obj) {
        if (error) {
            return res.status(500).json({
                error: 'The shorten link could not be created.'
            });
        }
        var id = obj._id;
        obj.shortenUrl = id.toString('base64');
        obj.save();
        return res.send({
            hash: id.toString('base64')
        });
    });
};

var getLink = function (req, res) {
    var shortenUrl = req.params.shortenUrl;
    if (!shortenUrl) {
        return res.status(400).json({
            error: 'A shorten url hash must be provided.'
        });
    }
    LinkModel.findOne({'shortenUrl': shortenUrl}, function (error, linkObj) {
        if (error) {
            return res.status(500).json({
                error: 'Could not retrieve the original url.'
            });
        }
        if (!linkObj) {
            return res.status(400).json({
                error: 'Could not find any url mapped to the tiny url provided.'
            });
        }
        res.redirect(linkObj.origin);
    });
};

var getLinks = function (req, res) {
    var user = req.user;
    if (!user) {
        return res.status(401).json({
            error: 'Not authenticated.'
        });
    }
    LinkModel.find({createdBy: user._doc._id}, function (error, links) {
        if (error) {
            return res.status(500).json({
                error: "Could not retrieve the user's links."
            });
        }
        return res.send({
            links: links
        });
    });
};

var updateLink = function (req, res) {
    var shortenUrl = req.params.shortenUrl;
    if (!shortenUrl) {
        return res.status(400).json({
            error: 'A shorten url hash must be provided.'
        });
    }
    var url = req.body.url;
    LinkModel.update({'shortenUrl': shortenUrl}, {origin: url}, function (error, obj) {
        if (error) {
            return res.status(500).json({
                error: 'Could not update the original url.'
            });
        }
        res.send({error: 0});
    });
};

var deleteLink = function (req, res) {
    var shortenUrl = req.params.shortenUrl;
    if (!shortenUrl) {
        return res.status(400).json({
            error: 'A shorten url hash must be provided.'
        });
    }
    LinkModel.remove({'shortenUrl': shortenUrl}, function (error) {
        if (error) {
            return res.status(500).json({
                error: 'Could not delete the recorded url.'
            });
        }
        res.send({
            error: 0
        });
    });
};

module.exports = {
    getLink: getLink,
    getLinks: getLinks,
    postLinks: postLinks,
    updateLink: updateLink,
    deleteLink: deleteLink
};
