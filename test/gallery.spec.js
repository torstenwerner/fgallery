'use strict';

var mock = require('mock-fs');
var configuration = require('../config');
var request = require('supertest');
var assert = require('assert');
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

    it('should return 200 OK', function(done) {
        request(app)
        .get('/v1/list')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);

            done();
        });
    });

    it('should return the files mocked', function(done) {
        request(app)
        .get('/v1/list')
        .expect(function(res) {
            var expected = [{ 
                name: '/images/another-img.gif',
                thumb: '/images/thumbs/gif/another-img.jpg',
                type: 'video'
            }, { 
                name: '/images/some-img.jpg',
                thumb: '/images/thumbs/jpg/some-img.jpg',
                type: 'image'
            }];
            
            assert.deepEqual(res.body, expected);
        })
        .end(function(err, res) {
            if (err) return done(err);

            done();
        });
    });

    it('should return the dirs mocked', function(done) {
        request(app)
        .get('/v1/directories')
        .expect(function(res) {
            var expected = [{
                path: 'empty-dir',
                name: 'empty-dir'
            }, {
                path: 'some-dir',
                name: 'some-dir'
            }, {
                path: 'some-dir%2Fempty-dir',
                name: 'some-dir/empty-dir'
            }];

            assert.deepEqual(res.body, expected);
        })
        .end(function(err, res) {
            if (err) return done(err);
            console.log(res.body);
            done();
        });
    });

    it('should not be allowed to go outside galleryRoot', function(done) {
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
            if (err) return done(err);

            done();
        });
    });
});
