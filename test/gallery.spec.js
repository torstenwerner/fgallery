'use strict';

var mock = require('mock-fs');
var configuration = require('../config');
var request = require('supertest');
var app = require('../app');

describe('gallery', function() {
    var mockConfig = {};
    mockConfig[configuration.galleryRoot] = {
        'some-img.jpg': new Buffer([10, 11, 1]),
        'another-img.gif': new Buffer([1, 14]),
        'some-dir' : {
            'some-video.webm': new Buffer([1, 2, 15]),
            'empty-dir': { }
        },
        'empty-dir': { }
    };
    mock(mockConfig);

    it('should return 200 OK', function() {
        request(app)
        .get('/v1/list')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });
    });

    it('should not be allowed to go outside galleryRoot', function() {
        request(app)
        .get('/v1/list/..%2F')
        .expect(403)
        .end(function(err, res) {
            if (err) throw err;
        });

        request(app)
        .get('/v1/list/../')
        .expect(403)
        .end(function(err, res) {
            if (err) throw err;
        });
    });
});
