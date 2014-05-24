angular.module('beth-gulp-ng-entityservice', []).
    factory('entries', function() {
        return [
            {
                slug: 'elisward',
                title: 'Elis Ward Character Design',
                urls: ['http://i.imgur.com/u6pC2Xul.jpg'],
                description: 'Storyboard, Character, and Set design for an animated short story pitch about a writer struggling with depression'
            },
            {
                slug: 'nagano',
                title: 'Nagano at 6am',
                urls: ['http://i.imgur.com/6naFUr5l.jpg'],
                description: 'Nagano at 6am. 8 hours / Photoshop'
            },
            {
                slug: 'scarecrow',
                title: 'Scarecrow',
                urls: ['http://i.imgur.com/uZiv5Mxl.jpg'],
                description: 'Scarecrow. 1 hour and 30 minutes. Key-image concept done for the Scarecrow animated short pitch.'
            },
            {
                slug: 'objectdesign',
                title: 'Familiar object redesign',
                urls: ['http://24.media.tumblr.com/281a8e026882cae6b10deb2329853255/tumblr_mqoqgrXFHn1s5mn7vo1_500.png'],
                description: 'Quick 5 minute sketch on paper of the desk organizer. Added in details of the mountain forms. Scanned and taken into photoshop to color.'
            }
        ]
    });